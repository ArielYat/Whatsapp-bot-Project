const Group = require("../Group"), Person = require("../Person");
const MongoClient = require('mongodb').MongoClient, url = "mongodb://localhost:27017/";

class HDB {
    static async addArgsToDB(ID, value1, value2, value3, argType, callback) {
        let objectToAddToDataBase = null;
        MongoClient.connect(url, function (err, client) {
            if (err) {
                console.log(err + " in addArgsToDB");
                return;
            }
            if (argType === "filters")
                objectToAddToDataBase = {ID: ID, filter: value1, filter_reply: value2};
            else if (argType === "tags")
                objectToAddToDataBase = {ID: ID, name: value1, phone_number: value2};
            else if (argType === "birthday")
                objectToAddToDataBase = {ID: ID, birthDay: value1, birthMonth: value2, birthYear: value3};
            else if (argType === "lang")
                objectToAddToDataBase = {ID: ID, lang: value1};
            else if (argType === "perm")
                objectToAddToDataBase = {ID: ID, perm: value1};
            else if (argType === "personBirthdayGroups") {
                objectToAddToDataBase = {ID: ID, groupID: value1};
            }
            if (argType === "filters" || argType === "tags" || argType === "lang")
                objectToAddToDataBase += "-groups";
            else if (argType === "name" || argType === "birthday" || argType === "perm" || "personBirthdayGroups")
                objectToAddToDataBase += "-persons"
            client.db("WhatsappBotDB").collection(argType).insertOne(objectToAddToDataBase, function (err) {
                if (err) {
                    console.log(err + " in addArgsToDB-insertOne");
                    return;
                }
                callback();
                client.close();
            });
        });
    }

    static async delArgsFromDB(ID, key, argType, callback) {
        let objectToDelInDataBase = null;
        MongoClient.connect(url, function (err, client) {
            if (err) {
                console.log(err + " in delArgsFromDB");
                return;
            }
            if (argType === "filters")
                objectToDelInDataBase = {ID: ID, filter: key};
            else if (argType === "tags")
                objectToDelInDataBase = {ID: ID, name: key};
            else if (argType === "birthday")
                objectToDelInDataBase = {ID: ID};
            else if (argType === "lang")
                objectToDelInDataBase = {ID: ID};
            else if (argType === "perm")
                objectToDelInDataBase = {ID: ID};
            else if (argType === "lang")
                objectToDelInDataBase = {ID: ID};
            else if (argType === "personBirthdayGroups") {
                objectToDelInDataBase = {ID: ID};
            }
            if (argType === "filters" || argType === "tags" || argType === "lang")
                objectToDelInDataBase += "-groups";
            else if (argType === "name" || argType === "birthday" || argType === "perm" || "personBirthdayGroups")
                objectToDelInDataBase += "-persons"
            client.db("WhatsappBotDB").collection(argType).deleteOne(objectToDelInDataBase, function (err) {
                if (err) {
                    console.log(err + " in delArgsFromDB-deleteOne");
                    return;
                }
                callback()
                client.close();
            });
        });
    }

    static async GetAllGroupsFromDB(groupsDict, usersDict, callback) {
        function createGroupFilter(object) {
            let ID = object.ID, filter = object.filters, filterReply = object.filter_reply;
            if (!(ID in groupsDict))
                groupsDict[ID] = new Group(ID);
            groupsDict[ID].filters = ["add", filter, filterReply];
        }

        function createGroupTag(object) {
            let ID = object.ID, name = object.name, phoneNumber = object.phone_number;
            if (!(ID in groupsDict))
                groupsDict[ID] = new Group(ID);
            groupsDict[ID].tags = ["add", name, phoneNumber];
        }

        function createPersonBirthday(object) {
            let ID = object.ID, birthDay = object.birthDay, birthMonth = object.birthMonth,
                birthYear = object.birthYear;
            if (!(ID in usersDict))
                usersDict[ID] = new Person(ID);
            usersDict[ID].birthday = ["push", birthDay, birthMonth, birthYear];
        }

        function createGroupLang(object) {
            let ID = object.ID, language = object.lang;
            if (!(ID in groupsDict))
                groupsDict[ID] = new Group(ID);
            groupsDict[ID].groupLanguage = language;
        }

        function createPersonName(document) {
            let ID = document.ID, personName = document.personName;
            if (!(ID in usersDict))
                usersDict[ID] = new Person(ID);
            usersDict[ID].personName = personName;
        }

        function createPersonPerm(document) {
            let ID = document.ID, permission = document.permissions;
            if (!(ID in usersDict))
                usersDict[ID] = new Person(ID);
            usersDict[ID].permissionLevel = permission;
        }

        function createPersonGroupsBirthDays(document) {
            let ID = document.ID, groupID = document.groupID;
            if (!(ID in usersDict))
                usersDict[ID] = new Person(ID);
            if (!(groupID in groupsDict))
                groupsDict[groupID] = new Group(groupID);
            usersDict[ID].birthDayGroups = ["add", groupsDict[groupID]];
        }

        MongoClient.connect(url, function (err, client) {
            if (err) {
                console.log(err + "addArgsToDB");
                return;
            }
            const dbo = client.db("WhatsappBotDB");
            dbo.collection("filters-groups").find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err + " in filters-find");
                    return;
                }
                for (let i = 0; i < result.length; i++) {
                    createGroupFilter(result[i]);
                }
            });
            dbo.collection("tags-groups").find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err + " in tags-find");
                    return;
                }
                for (let i = 0; i < result.length; i++) {
                    createGroupTag(result[i]);
                }
            });
            dbo.collection("birthday-persons").find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err + " in birthday-find");
                    return;
                }
                for (let i = 0; i < result.length; i++) {
                    createPersonBirthday(result[i]);
                }
            });
            dbo.collection("lang-groups").find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err + " in lang-find");
                    return;
                }
                for (let i = 0; i < result.length; i++) {
                    createGroupLang(result[i]);
                }
            });
            dbo.collection("name-persons").find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err + " in name-find");
                    return;
                }
                for (let i = 0; i < result.length; i++) {
                    createPersonName(result[i]);
                }
            });
            dbo.collection("permission-persons").find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err + " in permission-find");
                    return;
                }
                for (let i = 0; i < result.length; i++) {
                    createPersonPerm(result[i]);
                }
            });
            dbo.collection("personBirthdayGroups-persons").find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err + " in personBirthdayGroups-find");
                    return;
                }
                for (let i = 0; i < result.length; i++) {
                    createPersonGroupsBirthDays(result[i]);
                }
            });
            callback();
            client.close();
        });
    }
}

module.exports = HDB;
