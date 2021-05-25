const Dynamo = require("../common/Dynamo");
const { v4: uuid } = require("uuid");

const tableName = process.env.signupTableName;

exports.handler = async event => {
    console.log(event);

    someObject = {
        Input: {
            signup: {
                email: 'whodeen@gmail.com'
            }
        }

    }

    const email = someObject.Input.signup.email;
    const ID = uuid();

    await Dynamo.write({ email, ID, played: 'false' }, tableName);

    return { ID };
}