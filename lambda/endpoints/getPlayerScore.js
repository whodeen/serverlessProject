const Responses = require('../common/API_Responses');
const tableName = process.env.tableName;
const Dynamo = require('../common/Dynamo');

exports.handler = async event => {
    console.log('event', event);
 
    if (!event.pathParameters || !event.pathParameters.ID) {
        return Responses._400({message: 'missing the ID from the path'});
    }

    let ID = event.pathParameters.ID;

    const user = await Dynamo.get(ID, tableName).catch(err => {
        console.log('error in Dynamo Get', err);
        return null;
    });

    console.log(user);

    if (!Dynamo) {
        return Responses._400({ message: 'Failed to get user by ID' })
    }

    return Responses._200({ user });
}