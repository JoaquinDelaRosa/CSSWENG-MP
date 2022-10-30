'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Customers", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "test",
    "created": "2022-10-30T08:06:58.551Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "Customers",
        {
            "id": {
                "type": Sequelize.INTEGER,
                "field": "id",
                "autoIncrement": true,
                "primaryKey": true,
                "allowNull": false
            },
            "firstName": {
                "type": Sequelize.STRING,
                "field": "firstName"
            },
            "lastName": {
                "type": Sequelize.STRING,
                "field": "lastName"
            },
            "email": {
                "type": Sequelize.STRING,
                "field": "email"
            },
            "createdAt": {
                "type": Sequelize.DATE,
                "field": "createdAt",
                "allowNull": false
            },
            "updatedAt": {
                "type": Sequelize.DATE,
                "field": "updatedAt",
                "allowNull": false
            }
        },
        {}
    ]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
