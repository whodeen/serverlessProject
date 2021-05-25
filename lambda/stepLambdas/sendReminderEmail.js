const AWS = require('aws-sdk');

const SES = new AWS.SES();

exports.handler = async event => {
    console.log('event', event);

    const email = event.Input.Payload.email;

    const message = `Hi from step functions!`;

    const params = {
        Destination: {
            ToAddresses: [email]
        },
        Message: {
            Body: {
                Text: { Data: message }
            },
            Subject: { Data: 'Reminder' }
        },
        Source: 'whodeen@gmail.com'
    }

    try {
        await SES.sendEmail(params).promise();
        return;
    } catch (err) {
        console.log('error sending email', err);
        throw err;
    }

}