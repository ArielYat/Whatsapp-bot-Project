const group = require("../Group");
const MongoClient = require('mongodb').MongoClient, url = "mongodb://localhost:27017/";

class HDB {
    static async addArgsToDB(key, value1, value2, value3, ID, argType, callback) {
        let objectToAddToDataBase = null;
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log(err + "addArgsToDB");
                return;
            }
            const dbo = db.db("WhatsappBotDB");
            if (argType === "filters")
                objectToAddToDataBase = {ID: ID, filter: key, filter_reply: value1};
            else if (argType === "tags")
                objectToAddToDataBase = {ID: ID, name: key, phone_number: value1};
            else if (argType === "birthday")
                objectToAddToDataBase = {ID: ID, name: key, birthDay: value1, birthMonth: value2, birthYear: value3};
            else if (argType === "lang")
                objectToAddToDataBase = {ID: ID, lang: key};
            dbo.collection(argType + "-groups").insertOne(objectToAddToDataBase, function (err) {
                if (err) {
                    console.log(err + "addArgsToDB-insertOne");
                    return;
                }
                callback();
                db.close();
            });
        });
    }

    static async delArgsFromDB(key, ID, argType, callback) {
        let objectToDelToDataBase = null;
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log(err + "delArgsFromDB");
                return;
            }
            const dbo = db.db("WhatsappBotDB");
            if (argType === "filters")
                objectToDelToDataBase = {ID: ID, filter: key};
            else if (argType === "tags")
                objectToDelToDataBase = {ID: ID, name: key};
            else if (argType === "birthday")
                objectToDelToDataBase = {ID: ID, name: key};
            else if (argType === "lang")
                objectToDelToDataBase = {ID: ID};
            dbo.collection(argType + "-groups").deleteOne(objectToDelToDataBase, function (err) {
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
        function createGroupTag(document) {
            let ID = document.ID, name = document.name;
            let phoneNumber = document.phone_number;
            if (ID in groupsDict)
                groupsDict[ID].addTag(name, phoneNumber);
            else {
                groupsDict[ID] = new group(ID);
                groupsDict[ID].addTag(name, phoneNumber);
            }
        }

        function createGroupFilter(document) {
            let ID = document.ID, filter = document.filter;
            let filterReply = document.filter_reply;
            if (ID in groupsDict)
                groupsDict[ID].addFilter(filter, filterReply);
            else {
                groupsDict[ID] = new group(ID);
                groupsDict[ID].addFilter(filter, filterReply);
            }
        }

        function createGroupBirthday(document) {
            let ID = document.ID, name = document.name;
            let birthDay = document.birthDay, birthMonth = document.birthMonth, birthYear = document.birthYear;
            if (ID in groupsDict)
                groupsDict[ID].addBirthday(name, birthDay, birthMonth, birthYear);
            else {
                groupsDict[ID] = new group(ID);
                groupsDict[ID].addBirthday(name, birthDay, birthMonth, birthYear);
            }
        }

        function createGroupLang(document) {
            let ID = document.ID, language = document.lang;
            if (ID in groupsDict)
                groupsDict[ID].groupLanguage = language;
            else {
                groupsDict[ID] = new group(ID);
                groupsDict[ID].groupLanguage = language;
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
                    createGroupTag(result[i]);
                }
            });
            dbo.collection("filters-groups").find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err + "addArgsToDB-filters-find");
                    return;
                }
                for (let i = 0; i < result.length; i++) {
                    createGroupFilter(result[i]);
                }
                callback(groupsDict);
            });
            dbo.collection("birthday-groups").find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err + "addArgsToDB-birthday-find");
                    return;
                }
                for (let i = 0; i < result.length; i++) {
                    createGroupBirthday(result[i]);
                }
            });
            dbo.collection("lang-groups").find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err + "lang-find");
                    return;
                }
                for (let i = 0; i < result.length; i++) {
                    createGroupLang(result[i]);
                }
                db.close();
            });
        });
    }
}

module.exports = HDB;
