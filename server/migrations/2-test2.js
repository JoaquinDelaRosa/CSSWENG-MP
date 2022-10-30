'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "email" from table "Customers"
 * removeColumn "lastName" from table "Customers"
 *
 **/

var info = {
    "revision": 2,
    "name": "test2",
    "created": "2022-10-30T08:07:20.011Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["Customers", "email"]
    },
    {
        fn: "removeColumn",
        params: ["Customers", "lastName"]
    }
];

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
