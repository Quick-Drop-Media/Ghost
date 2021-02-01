const AWS = require('aws-sdk');
const _ = require('lodash');
const logging = require('../../../shared/logging');
const settingsCache = require('../settings/cache');

//
const BATCH_SIZE = 50;

function createSES(config) {
    AWS.config.update({
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
        region: config.region
    });
    return new AWS.SES({apiVersion: '2010-12-01'});
}

function getInstance() {
    const bulkEmailSetting = {
        accessKeyId: settingsCache.get('ses_access_key_id'),
        secretAccessKey: settingsCache.get('ses_secret_access_key'),
        region: settingsCache.get('ses_region')
    };
    const hasBulkEmailSettings = !!(bulkEmailSetting && bulkEmailSetting.accessKeyId && bulkEmailSetting.secretAccessKey && bulkEmailSetting.region);

    if (!hasBulkEmailSettings) {
        logging.warn(`Bulk email service is not configured`);
    } else {
        return createSES(hasBulkEmailSettings);
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
        // TODO: ^ wait where is the error?
    }
    const sesServiceObject = getInstance();

    const messageContent = _.pick(message, 'subject', 'html', 'plaintext');

    var templateData = {
        Template: {
            TemplateName: 'TestTemplate',
            SubjectPart: 'Greetings, {{name}}!',
            HtmlPart: messageContent,
            TextPart: 'Dear {{name}},\r\nYour favorite animal is {{favoriteanimal}}.'
        }
    };
    console.log('Yo I am creating a template!');
    console.log('?????');
    // TODO: Use update in future? Check if already exists.
    new AWS.SES({apiVersion: '2010-12-01'}).createTemplate(templateData, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
    });

    // https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/ses-examples-sending-email.html#ses-examples-sendbulktemplatedemail
    var messageData = {
        Destinations: [
            {
                Destination: {
                    ToAddresses: ['matt@quickdropmedia.com']
                },
                ReplacementTemplateData: '{ \"name\":\"Matt\", \"favoriteanimal\":\"angelfish\" }'
            },
            {
                Destination: {
                    ToAddresses: ['dev@quickdropmedia.com']
                },
                ReplacementTemplateData: '{ \"name\":\"Dev User\", \"favoriteanimal\":\"kangaroo\" }'
            }
        ],
        Source: 'Mary Major <mary.major@example.com>',
        Template: 'TestTemplate',
        DefaultTemplateData: '{ \"name\":\"Quick Dropper\", \"favoriteanimal\":\"t-rex\" }',
        ReplyToAddresses: ['squad@quickdropmedia.com']
    };

    try {
        console.log('SCHMO HI YA SEND EMAIL PLEASE!!!');
        var sendPromise = sesServiceObject.sendBulkTemplatedEmail(messageData).promise();
        sendPromise.then(function(data) {
            console.log('SCHMO sendPromise.then()');
            console.log(data);
        }).catch(function(err) {
            console.log('SCHMO sendPromise.catch()');
            console.log(err, err.stack);
        });
        return sendPromise;
    } catch (error) {
        return Promise.reject({error, messageData});
    }
}

module.exports = {
    BATCH_SIZE,
    getInstance,
    send
};
