const mongoose = require('mongoose');
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};
const database = {
    connect: function (url) {
        mongoose.connect(url, options, function (error) {
            if (error)
                throw error;
        });
    },
    insertOne: function (model, doc, callback) {
        model.create(doc, function (error, result) {
            if (error)
                return callback(false);
            return callback(true);
        });
    },
    insertMany: function (model, docs, callback) {
        model.insertMany(docs, function (error, result) {
            if (error)
                return callback(false);
            return callback(true);
        });
    },
    findOne: function (model, query, projection, callback) {
        model.findOne(query, projection, function (error, result) {
            if (error)
                return callback(false);
            return callback(result);
        });
    },
    findMany: function (model, query, projection, callback) {
        model.find(query, projection, function (error, result) {
            if (error)
                return callback(false);
            return callback(result);
        });
    },
    updateOne: function (model, filter, update, callback) {
        model.updateOne(filter, update, function (error, result) {
            if (error)
                return callback(false);
            return callback(true);
        });
    },
    updateMany: function (model, filter, update, callback) {
        model.updateMany(filter, update, function (error, result) {
            if (error)
                return callback(false);
            return callback(true);
        });
    },
    deleteOne: function (model, conditions, callback) {
        model.deleteOne(conditions, function (error, result) {
            if (error)
                return callback(false);
            return callback(true);
        });
    },
    deleteMany: function (model, conditions, callback) {
        model.deleteMany(conditions, function (error, result) {
            if (error)
                return callback(false);
            return callback(true);
        });
    }
};
module.exports = database;
//# sourceMappingURL=database.js.map