var AWS = require('aws-sdk');
const _ = require('lodash');
const logging = require('../../../shared/logging');
const settingsCache = require('../settings/cache');

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
        return createSES(bulkEmailSetting);
    }
    return null;
}

function send(message, recipientData, replacements) {
    if (recipientData.length > BATCH_SIZE) {
        // err - too many recipients
    }

    let templateName = 'DevTestPostNewsletter';
    const sesServiceObject = getInstance();
    var templateData = {
        Template: {
            TemplateName: templateName,
            SubjectPart: message.subject,
            HtmlPart: message.html,
            TextPart: message.plaintext
        }
    };
    // https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/ses-examples-sending-email.html#ses-examples-sendbulktemplatedemail
    let destinations = [];
    for (const recipient in recipientData) {
        destinations.push({
            Destination: {
                ToAddresses: new Array(recipient),
            },
            ReplacementTemplateData: JSON.stringify(recipientData[recipient])
        });
    }

    sesServiceObject.updateTemplate(templateData, function(err, data) {
        if (err) {
            console.log(err, err.stack);
        } else {
            console.log(data);
        }
    });

    let messageData = {
        Destinations: destinations,
        Source: 'Quick Drop Squad <squad@quickdropmedia.com>',
        Template: templateName,
        DefaultTemplateData: '{\"unsubscribe_url\": \"https://quickdropmedia.com/contact/\"}',
        ReplyToAddresses: ['squad@quickdropmedia.com'],
        ConfigurationSetName: 'QuickDropConfiugrationSet',
        DefaultTags: [{
            Name: 'source',
            Value: 'ghost-local'
        }]
    };

    return sesServiceObject.sendBulkTemplatedEmail(messageData).promise();
}

module.exports = {
    BATCH_SIZE,
    getInstance,
    send
};
