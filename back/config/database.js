const fs = require('fs');

module.exports = {
    development: {
        //sqlite
        dialect: 'sqlite',
        storage: 'dev.database.sqlite'
    },
    test: {
        //sqlite
        dialect: 'sqlite',
        storage: 'test.database.sqlite'
    },
    production: {
        //sqlite
        dialect: 'sqlite',
        storage: 'prod.database.sqlite'
    }
};