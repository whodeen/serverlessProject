const AWS = require('aws-sdk');

const documentClient = new AWS.DynamoDB.DocumentClient();

const Dynamo = {
    async get(ID, TableName) {
        const params = {
            TableName,
            Key: {
                ID
            }
        };

        const data = await documentClient
            .get(params)
            .promise()

        if (!data || !data.Item) {
            throw Error(`There was an error fetching the data of ID of ${ID} from ${TableName}`);
        }

        console.log(data);

        return data.Item;
    },

    async write(data, TableName) {
        if (!data.ID) {
            throw Error('No ID on the data');
        }

        const params = {
            TableName,
            Item: data
        };

        const res = await documentClient
            .put(params)
            .promise()

        if (!res) {
            throw Error(`There was an error inserting ID of ${data.ID} in table ${TableName}`);
        }

        return data;
    },

    async update({ tableName, primaryKey, primaryKeyValue, updateKey, updateValue }) {
        const params = {
            TableName: tableName,
            Key: { [primaryKey]: primaryKeyValue },
            UpdateExpression: `set ${updateKey} = :updateValue`,
            ExpressionAttributeValue: {
                ':updateValue': updateValue,
            }
        }

        return documentClient.update(params).promise();
    },

    async query({ tableName, index, quereKey, queryValue }) {
        const params = {
            TableName: tableName,
            IndexName: index,
            KeyConditionExpression: `${quereKey} = :hkey`,
            ExpressionAttributeValue: {
                ':hkey': queryValue
            }
        };

        const res = await documentClient.query(params).promise();

        return res.Item || [];
    }

}

module.exports = Dynamo;