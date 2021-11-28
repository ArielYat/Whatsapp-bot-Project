const group = require("./group");
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

class HDB {
    static async addArgsToDB(key, value, ID, filterOrTags, callback) {
        let objectToAddToDataBase = null;
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log(err + "addArgsToDB");
                return;
            }
            const dbo = db.db("WhatsappBotDB");
            if (filterOrTags === "filters") {
                objectToAddToDataBase = { ID: ID, filter: key, filter_reply: value };
            } else if (filterOrTags === "tags") {
                objectToAddToDataBase = { ID: ID, name: key, phone_number: value };
            }
            dbo.collection(filterOrTags + "-groups").insertOne(objectToAddToDataBase, function (err, res) {
                if (err) {
                    console.log(err + "addArgsToDB-insertOne");
                    return;
                }
                callback();
                db.close();
            });
        });
    }
    static async delArgsFromDB(key, ID, filterOrTags, callback) {
        let objectToDelToDataBase = null;
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log(err + "delArgsFromDB");
                return;
            }
            const dbo = db.db("WhatsappBotDB");
            if (filterOrTags === "filters") {
                objectToDelToDataBase = { ID: ID, filter: key };
            } else if (filterOrTags === "tags") {
                objectToDelToDataBase = { ID: ID, name: key };
            }
            dbo.collection(filterOrTags + "-groups").deleteOne(objectToDelToDataBase, function (err, res) {
                if (err) {
                    console.log(err + "delArgsFromDB-deleteOne");
                    return;
                }
                callback();
                db.close();
            });
        });
    }
    static async GetAllGroupsFromDB(groupsDict, callback) {
        function makeGroupID(document) {
            let ID = document.ID;
            let name = document.name;
            let phone_number = document.phone_number;
            if (ID in groupsDict) {
                groupsDict[ID].addTags(name, phone_number);
            }
            else {
                groupsDict[ID] = new group(ID);
                groupsDict[ID].addTags(name, phone_number);
            }
        }
        function makeGroupFilters(document) {
            let ID = document.ID;
            let filter = document.filter;
            let filter_reply = document.filter_reply;
            if (ID in groupsDict) {
                groupsDict[ID].addFilters(filter, filter_reply);
            }
            else {
                groupsDict[ID] = new group(ID);
                groupsDict[ID].addFilters(filter, filter_reply);
            }
        }
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log(err + "addArgsToDB");
                return;
            }
            const dbo = db.db("WhatsappBotDB");
            dbo.collection("tags-groups").find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err + "addArgsToDB-tags-find");
                    return;
                }
                for (let i = 0; i < result.length; i++) {
                    makeGroupID(result[i]);
                }
            });
            dbo.collection("filters-groups").find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err + "addArgsToDB-filters-find");
                    return;
                }
                for (let i = 0; i < result.length; i++) {
                    makeGroupFilters(result[i]);
                }
                callback(groupsDict);
                db.close();
            });
        });
    }
}

module.exports = HDB;