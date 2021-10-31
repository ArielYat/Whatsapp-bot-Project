const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

class DAL {
    static async addToDataBase(filter, filter_Replay, ID, callback) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            const dbo = db.db("WhatsappBotDB");
            const objectToAddToDataBase = {filter: filter, filter_reply: filter_Replay};
            dbo.collection(ID).insertOne(objectToAddToDataBase, function (err, res) {
                if (err) throw err;
                db.close();
                callback(filter);
            });
        });
    }

    static async removeFromDataBase(filter, ID, callback) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            const dbo = db.db("WhatsappBotDB");
            const objectToRemoveFromDataBase = {filter: filter};
            dbo.collection(ID).deleteOne(objectToRemoveFromDataBase, function (err, res) {
                if (err) throw err;
                db.close();
                callback(filter);
            });
        });
    }

    static async checkIfFilterDoesNotExist(filter, filter_replay, ID, callback) {
        let check = true;
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;

            const dbo = db.db("WhatsappBotDB");
            dbo.collection(ID).find({}).toArray(function (err, result) {
                if (err) throw err;
                for (let i = 0; i < result.length; i++) {
                    if ((result[i].filter) == filter) {
                        check = false;
                    }
                }
                db.close();
                if (check) {
                    callback(false, filter, filter_replay, ID);
                } else {
                    callback(true, filter, filter_replay, ID);
                }
            });
        });
    }

    static async checkIfFilterExist(filter, ID, callback) {
        let check = false;
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;

            const dbo = db.db("WhatsappBotDB");
            dbo.collection(ID).find({}).toArray(function (err, result) {
                if (err) throw err;
                for (let i = 0; i < result.length; i++) {
                    if ((result[i].filter) == filter) {
                        check = true;
                    }
                }
                db.close();
                if (check) {
                    callback(false, filter, ID);
                } else {
                    callback(true, filter, ID);
                }
            });
        });
    }

    static async editONDataBase(filter, newFilter, ID, callback) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            const dbo = db.db("WhatsappBotDB");
            const objectToRemoveFromDataBase = {filter: filter};
            dbo.collection(ID).deleteOne(objectToRemoveFromDataBase, function (err, res) {
                if (err) throw err;
            });
            const objectToAddToDataBase = {filter: filter, filter_reply: newFilter};
            dbo.collection(ID).insertOne(objectToAddToDataBase, function (err, res) {
                if (err) throw err;
                db.close();
                callback(filter);
            });
        });
    }

    static async returnAllFiltersWIthResponse(ID, callback) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            const dbo = db.db("WhatsappBotDB");
            dbo.collection(ID).find({}).toArray(function (err, result) {
                if (err) throw err;
                callback(result);
            });
        });
    }

    static async returnFilterReply(ID, textMessage, callback) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            const dbo = db.db("WhatsappBotDB");
            dbo.collection(ID).find({}).toArray(function (err, result) {
                if (err) throw err;
                callback(result);
            });
        });
    }

    static async ReturnGroupsExistOnDataBase(ID, callback) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            const dbo = db.db("WhatsappBotDB");
            dbo.collection("Groups").find({}).toArray(function (err, result) {
                callback(result);
            });
        });
    }

    static async addTagToDataBase(tag, tagNumber, chatID, callback) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            const dbo = db.db("WhatsappBotDB");
            const objectToAddToDataBase = {groupID: chatID, Name: tag, Number: tagNumber};
            dbo.collection("Groups").insertOne(objectToAddToDataBase, function (err, res) {
                if (err) throw err;
                db.close();
                callback(tag);
            });
        });
    }

    static async checkIfTagExist(tag, chatID, callback) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            const dbo = db.db("WhatsappBotDB");
            dbo.collection("Groups").find({}).toArray(function (err, result) {
                if (err) throw err;
                db.close();
                for (let i = 0; i < result.length; i++) {
                    if (result[i].groupID === chatID) {
                        const res = result[i];
                        if (tag === res.Name) {
                            callback(false, tag, chatID)
                            return;
                        }
                    }
                }
                callback(true, tag, chatID);
            });
        });
    }

    static async remTagFromDB(tag, chatID, callback) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            const dbo = db.db("WhatsappBotDB");
            const objectToRemFromDataBase = {groupID: chatID, Name: tag};
            dbo.collection("Groups").deleteOne(objectToRemFromDataBase, function (err, res) {
                if (err) throw err;
                db.close();
                callback(tag);
            });
        });
    }

    static async returnAllTagsWIthResponse(ID, callback) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            const dbo = db.db("WhatsappBotDB");
            dbo.collection("Groups").find({}).toArray(function (err, result) {
                if (err) throw err;
                callback(result);
            });
        });
    }
}


module.exports = DAL;