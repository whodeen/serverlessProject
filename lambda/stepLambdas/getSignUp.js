const Dynamo = require("../common/Dynamo");

const tableName = process.env.signupTableName;

exports.handler = async event => {
    console.log(event);

    const ID = event.Input.Payload.ID;
    const ID = uuid();

    const row = await Dynamo.get(ID, tableName);

    return row;
}