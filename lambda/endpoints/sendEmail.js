const Responses = require('../common/API_Responses');
const AWS  = require('aws-sdk');

const SES = new AWS.SES();

exports.handler = async event => {
    console.log('event', event);

    const { to, from, subject, text} = JSON.parse(event.body);

    if (!to) {
        return Responses._400({ message: "to is required in the body"});
    } else if (!from) {
        return Responses._400({ message: "from is required in the body"});
    } else if (!subject) {
        return Responses._400({ message: "subject is required in the body"});
    } else if (!text) {
        return Responses._400({ message: "text is required in the body"});
    }

    const params = {
        Destination: {
            ToAddresses: [ to ]
        },
        Message: {
            Body: {
                Text: { Data: text }
            },
            Subject: { Data: subject}
        },
        Source: from
    }

    try {
        await SES.sendEmail(params).promise();
        return Responses._200({});
    } catch(err) {
        console.log('error sending email', err);
        return Responses._400({ message: 'The email failed to send'})
    }

}