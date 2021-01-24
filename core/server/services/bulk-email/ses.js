const _ = require('lodash');
const {URL} = require('url');
const logging = require('../../../shared/logging');
const configService = require('../../../shared/config');
const settingsCache = require('../settings/cache');

const BATCH_SIZE = 1000;

function createSES(config) {
    var AWS = require('aws-sdk');
    AWS.config.update({region: config.region});

    return new AWS.SES({
        apiVersion: '2010-12-01'
    });
}

function getInstance() {
    const bulkEmailConfig = configService.get('bulkEmail');
    const bulkEmailSetting = {
        accessKeyId: settingsCache.get('ses_access_key_id'),
        secretAccessKey: settingsCache.get('ses_secret_access_key')
    };
    // TODO: What is this hard-coded mailgun crap...
    const hasMailgunConfig = !!(bulkEmailConfig && bulkEmailConfig.mailgun);
    const hasMailgunSetting = !!(bulkEmailSetting && bulkEmailSetting.apiKey && bulkEmailSetting.baseUrl && bulkEmailSetting.domain);

    if (!hasMailgunConfig && !hasMailgunSetting) {
        logging.warn(`Bulk email service is not configured`);
    } else {
        let mailgunConfig = hasMailgunConfig ? bulkEmailConfig.mailgun : bulkEmailSetting;
        return createSES(mailgunConfig);
    }
    return null;
}

// recipientData format:
// {
//     'test@example.com': {
//         name: 'Test User',
//         unique_id: '12345abcde',
//         unsubscribe_url: 'https://example.com/unsub/me'
//     }
// }
function send(message, recipientData, replacements) {
    if (recipientData.length > BATCH_SIZE) {
        // err - too many recipients
    }

    let messageData = {};

    try {
        const bulkEmailConfig = configService.get('bulkEmail');
        const mailgunInstance = getInstance();

        const messageContent = _.pick(message, 'subject', 'html', 'plaintext');

        // update content to use Mailgun variable syntax for replacements
        replacements.forEach((replacement) => {
            messageContent[replacement.format] = messageContent[replacement.format].replace(
                replacement.match,
                `%recipient.${replacement.id}%`
            );
        });

        messageData = {
            to: Object.keys(recipientData),
            from: message.from,
            'h:Reply-To': message.replyTo || message.reply_to,
            subject: messageContent.subject,
            html: messageContent.html,
            text: messageContent.plaintext,
            'recipient-variables': recipientData
        };

        // add a reference to the original email record for easier mapping of mailgun event -> email
        if (message.id) {
            messageData['v:email-id'] = message.id;
        }

        const tags = ['bulk-email'];
        if (bulkEmailConfig && bulkEmailConfig.mailgun && bulkEmailConfig.mailgun.tag) {
            tags.push(bulkEmailConfig.mailgun.tag);
        }
        messageData['o:tag'] = tags;

        if (bulkEmailConfig && bulkEmailConfig.mailgun && bulkEmailConfig.mailgun.testmode) {
            messageData['o:testmode'] = true;
        }

        // enable tracking if turned on for this email
        if (message.track_opens) {
            messageData['o:tracking-opens'] = true;
        }

        return new Promise((resolve, reject) => {
            mailgunInstance.messages().send(messageData, (error, body) => {
                if (error) {
                    return reject(error);
                }

                return resolve({
                    id: body.id
                });
            });
        });
    } catch (error) {
        return Promise.reject({error, messageData});
    }
}

module.exports = {
    BATCH_SIZE,
    getInstance,
    send
};
