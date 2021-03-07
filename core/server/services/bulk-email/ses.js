var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-2'});
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

    let templateName = 'TestPostNewsletter';
    const sesServiceObject = getInstance();
    var templateData = {
        Template: {
            TemplateName: templateName,
            SubjectPart: message.subject,
            HtmlPart: message.html,
            TextPart: message.plaintext
        }
    };

    let templatePromise = sesServiceObject.updateTemplate(templateData).promise();
    templatePromise.then(function(data) {
        console.log(`Template ${templateName} updated`);
    }).catch(function(err) {
        console.error(err, err.stack);
    });

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

    let messageData = {
        Destinations: destinations,
        Source: 'Dev <dev@quickdropmedia.com>',
        Template: templateName,
        DefaultTemplateData: '{ \"unsubscribe_url\":\"https://quickdropmedia.com/contact/\"}',
        ReplyToAddresses: ['dev@quickdropmedia.com']
    };
    console.log(messageData);
    console.log(messageData["Destinations"][0]["Destination"]);

    try {
        var sendPromise = sesServiceObject.sendBulkTemplatedEmail(messageData).promise();
        sendPromise.then(function(data) {
            console.log(data);
        }).catch(function(err) {
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
