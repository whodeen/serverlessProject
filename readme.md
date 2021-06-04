# DynamoDB models

User

```json
{
  "hash_key": "user#[string]",
  "range_key": "profile#",
  "created": "ISOString",
  "email": "string",
  "password": "string",
}
```

Token

```json
{
  "hash_key": "token#[string]",
  "range_key": "token",
  "username": "string",
  "created": "ISOString"
}
```

Exchange

```json
{
  "hash_key": "user#[username]",
  "range_key": "exchange#ID#conversion#ID",
  "created": "ISOString",
  "from": "string",
  "result": "number",
  "to": "string",
  "value": "number"
}
```

### Example of how proceeded request should be stored in the DB

Request

```json
{
  "fromCurrency": "btc",
  "value": 85,
  "toCurrencies": ["uah", "rub", "usd"]
}
```

DynamoDB

```json
{
  "hash": "user#1",
  "range": "exchange#1#conversion#1",
  "created": "10-10-2020",
  "from": "btc",
  "result": 89989403.88574,
  "to": "uah",
  "value": 85
}

{
  "hash": "user#1",
  "range": "exchange#1#conversion#2",
  "created": "10-10-2020",
  "from": "btc",
  "result": 241264531.63394502,
  "to": "rub",
  "value": 85
}

{
  "hash": "user#1",
  "range": "exchange#1#conversion#3",
  "created": "10-10-2020",
  "from": "btc",
  "result": 3293727.23207,
  "to": "usd",
  "value": 85
}
```
