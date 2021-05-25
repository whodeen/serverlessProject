const Responses = require('../common/API_Responses');

exports.handler = async event => {
    console.log('event', event);
    debugger;
    if (!event.pathParameters || !event.pathParameters.ID) {
        return Responses._400({ message: 'missing the ID from the path' });
    }

    let ID = event.pathParameters.ID;

    if (data[ID]) {
        return Responses._200(data[ID]);
    }

    return Responses._400({ message: 'no ID in data' });
}

const data = {
    1234: { name: 'Some Name', age: 30, job: 'journalist' },
    3123: { name: 'Another Name', age: 23, job: 'uneployed' },
    5453: { name: 'Some Other', age: 12, job: 'student' },
}