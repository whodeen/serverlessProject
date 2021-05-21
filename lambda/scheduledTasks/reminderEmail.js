const AWS = require('aws-sdk');
const Responses = require('../common/API_Responses');

const SES = new AWS.SES();

exports.handler = async event => {
    console.log('event', event);
    const message = `Hey don't forget that you're breathtaking`;
    const EMAIL = 'whodeen@gmail.com'

    const params = {
        Destination: {
            ToAddresses: [ EMAIL ]
        },
        Message: {
            Body: {
                Text: { Data: message }
            },
            Subject: { Data: 'subject'}
        },
        Source: EMAIL
    }

    try {
        await SES.sendEmail(params).promise();
        return Responses._200({ message: 'email sent successfuly'});
    } catch(err) {
        console.log('error', err);
        return Responses._400({ message: err });
    } 
}