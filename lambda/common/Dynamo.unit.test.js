const Dynamo = require("../common/Dynamo");

test("Dynamo is an object", () => {
    expect(typeof Dynamo).toBe('object');
});

test("Dynamo has get and write", () => {
    expect(typeof Dynamo.get).toBe('function');
    expect(typeof Dynamo.write).toBe('function');
})

const validTableName = "player-points";
const data = { ID: '23123123', score: 25, name: 'Jim' }

test('Dynamo write works', async () => {
    expect.assertions(1);

    try {
        const res = await Dynamo.write(data, validTableName);
        expect(res).toBe(data);
    } catch (err) {
        console.log("Error in Dynamo write test", err);
    }
});

test("Dynamo get works", async () => {
    expect.assertions(1);

    try {
        const res = await Dynamo.get(data.ID, validTableName);
        expect(res).toBe(data);
    } catch (err) {
        console.log('Error in dynamo get test', err);
    }
});

