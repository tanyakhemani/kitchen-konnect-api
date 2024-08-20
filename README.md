# Kitchen-Konnect

kitchen-konnect UI repository link: https://github.com/tanyakhemani/kitchen-konnect

## App Setup

1. Install dependencies

```
npm install
```

### DB setup

1. Add a .env file by referring .env.sample example

2. Create tables in the DB

```
npx knex migrate:latest
```

3. Populating the tables in the DB with seed data

```
npx knex seed:run
```

## Run app

```
node index.js
```
