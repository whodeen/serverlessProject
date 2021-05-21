const Responses = require("../common/API_Responses");
const AWS = require('aws-sdk');
const SNS = new AWS.SNS({ apiVersion: '2010-03-31' });


exports.handler = async event => {
    console.log('event', event);

    const body = JSON.parse(event.body);


    if (!body) {
        return Responses._400({ message: "body is required" });
    } else if (!body.phoneNumber) {
        return Responses._400({ message: "phoneNumber is required in the body" });
    } else if (!body.message) {
        return Responses._400({ message: "message is required in the body" });
    }

    const AttributeParams = {
        attributes: {
            DefaultSMSType: 'Promotional'
        },
    };

    const messageParams = {
        Message: body.message,
        PhoneNumber: body.phoneNumber,
    };

    try {
        await SNS.setSMSAttributes(AttributeParams).promise();
        await SNS.publish(messageParams).promise();

        return Responses._200({ message: "SMS sent successfuly"});
    } catch (err) {
        console.error('error', err);
        return Responses._400({ message: "Text failed to send"});
    }
}