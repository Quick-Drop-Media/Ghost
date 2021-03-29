var AWS = require('aws-sdk');
const _ = require('lodash');
const logging = require('../../../shared/logging');
const settingsCache = require('../settings/cache');

const BATCH_SIZE = 40;

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
    let templateName = 'GhostNewsletter';
    const sesServiceObject = getInstance();
    var templateData = {
        Template: {
            TemplateName: templateName,
            SubjectPart: message.subject.replace('[Test] ', ''),
            HtmlPart: message.html,
            TextPart: message.plaintext
        }
    };

    console.log('Sending email with subject: ' + templateData.Template.SubjectPart);
    sesServiceObject.updateTemplate(templateData, function(err, data) {
        if (err) {
            console.log(err, err.stack);
        } else {
            console.log(data);
        }
    });

    let destinations = [];
    let messageData = {
        Source: 'Quick Drop Squad <squad@quickdropmedia.com>',
        Template: templateName,
        DefaultTemplateData: '{\"unsubscribe_url\": \"https://quickdropmedia.com/contact/\"}',
        ReplyToAddresses: ['squad@quickdropmedia.com'],
        ConfigurationSetName: 'QuickDropConfigurationSet',
        DefaultTags: [{
            Name: 'environment',
            Value: process.env.NODE_ENV
        }]
    };

    for (const recipient in recipientData) {
        destinations.push({
            Destination: {
                ToAddresses: new Array(recipient),
            },
            ReplacementTemplateData: JSON.stringify(recipientData[recipient])
        });
        if (destinations.length >= BATCH_SIZE) {
            messageData.Destinations = destinations;
            console.log('Sending ' + destinations.length + ' bulk emails.');
            sesServiceObject.sendBulkTemplatedEmail(messageData).promise().then(function(data) {
                console.log(data);
            }).catch(function (data) {
                console.log(data);
            });
            destinations = [];
        }
    }

    messageData.Destinations = destinations;
    console.log('Sending ' + destinations.length + ' bulk emails.');
    return sesServiceObject.sendBulkTemplatedEmail(messageData).promise();
}

module.exports = {
    BATCH_SIZE,
    getInstance,
    send
};
