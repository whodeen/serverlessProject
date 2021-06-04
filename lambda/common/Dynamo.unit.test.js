const Dynamo = require("../common/Dynamo");
const axios = require('axios');

test("Dynamo is an object", () => {
    expect(typeof Dynamo).toBe('object');
});

test("Dynamo has get and write", () => {
    expect(typeof Dynamo.get).toBe('function');
    expect(typeof Dynamo.write).toBe('function');
})

const validTableName = "player-points";
const data = { ID: '23123123', score: 25, name: 'Jim' }


test("PROMISE: User fetched name should be Leanne Graham", () => {
    expect.assertions(1);
    let some = axios.get("https://jsonplaceholder.typicode.com/users/1")
        .then(res => res.data)
        .catch(err => 'error');

    return some.then(data => {
        expect(data.name).toEqual("Leanne Graham");
    });
})

test("ASYNC: User fetched name should be Leanne Graham", async () => {
    let data = await axios.get("https://jsonplaceholder.typicode.com/users/1")
        .then(res => res.data)
        .catch(err => 'error');

    expect(data.name).toEqual("Leanne Graham");
})