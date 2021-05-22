const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

const tableName = process.env.tableName;

exports.handler = async event => { 
    if (!event.pathParameters || !event.pathParameters.ID) {
        return Responses._400({message: 'missing the ID from the path'});
    }

    let ID = event.pathParameters.ID;
    let { score } = JSON.parse(event.body);

    const res = await Dynamo.update({
        tableName,
        primaryKey: 'ID',
        primaryKeyValue: ID,
        updateKey: 'score',
        updateValue: score
    })

    return Responses._200({});
}