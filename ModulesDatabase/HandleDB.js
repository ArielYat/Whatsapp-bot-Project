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
            switch (argType) {
                case "filters":
                    objectToAddToDataBase = {ID: ID, filter: value1, filter_reply: value2};
                    break;
                case "tags":
                    objectToAddToDataBase = {ID: ID, name: value1, phone_number: value2};
                    break;
                case "birthday":
                    objectToAddToDataBase = {ID: ID, birthDay: value1, birthMonth: value2, birthYear: value3};
                    break;
                case "lang":
                    objectToAddToDataBase = {ID: ID, lang: value1};
                    break;
                case "perm":
                    objectToAddToDataBase = {ID: ID, author: value1, perm: value2};
                    break;
                case "personBirthdayGroups":
                    objectToAddToDataBase = {ID: ID, authorID: value1};
                    break;
                case "groupPermissions":
                    objectToAddToDataBase = {ID: ID, key: value1, perm: value2};
                    break;
                case "personIn":
                    objectToAddToDataBase = {ID: ID, personID: value1};
                    break;
                case "groupAdmins":
                    objectToAddToDataBase = {ID: ID, adminsArray: value1};
                    break;
            }
            if (argType === "filters" || argType === "tags" || argType === "lang" ||
                argType === "groupPermissions" || argType === "personIn" || argType === "groupAdmins")
                argType += "-groups";
            else if (argType === "name" || argType === "birthday" || argType === "perm" || argType === "personBirthdayGroups")
                argType += "-persons"
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
            switch (argType) {
                case "filters":
                    objectToDelInDataBase = {ID: ID, filter: key};
                    break;
                case "tags":
                    objectToDelInDataBase = {ID: ID, name: key};
                    break;
                case "birthday":
                    objectToDelInDataBase = {ID: ID};
                    break;
                case "lang":
                    objectToDelInDataBase = {ID: ID};
                    break;
                case "perm":
                    objectToDelInDataBase = {ID: ID, author: key};
                    break;
                case "personBirthdayGroups":
                    objectToDelInDataBase = {ID: ID, authorID: key};
                    break;
                case "groupPermissions":
                    objectToDelInDataBase = {ID: ID, key: key};
                    break;
                case "personIn":
                    objectToDelInDataBase = {ID: ID, personID: key};
                    break;
                case "groupAdmins":
                    objectToDelInDataBase = {ID: ID};
                    break;
            }
            if (argType === "filters" || argType === "tags" || argType === "lang" ||
                argType === "groupPermissions" || argType === "personIn" || argType === "groupAdmins")
                argType += "-groups";
            else if (argType === "name" || argType === "birthday" || argType === "perm" || "personBirthdayGroups")
                argType += "-persons"
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
            let ID = object.ID, filter = object.filter, filterReply = object.filter_reply;
            if (!(ID in groupsDict))
                groupsDict[ID] = new Group(ID);
            groupsDict[ID].filters = ["add", filter, filterReply];
        }

        function creatGroupAdmins(object) {
            let ID = object.ID, adminsArray = object.adminsArray;
            if (!(ID in groupsDict))
                groupsDict[ID] = new Group(ID);
            groupsDict[ID].groupAdmins = adminsArray;
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
            usersDict[ID].birthday = ["add", birthDay, birthMonth, birthYear];
        }

        function createGroupLang(object) {
            let ID = object.ID, language = object.lang;
            if (!(ID in groupsDict))
                groupsDict[ID] = new Group(ID);
            groupsDict[ID].groupLanguage = language;
        }

        function createPersonPerm(document) {
            let ID = document.ID, author = document.author, permission = document.perm;
            if (!(author in usersDict))
                usersDict[author] = new Person(author);
            usersDict[author].permissionLevel[ID] = permission;
        }

        function createPersonGroupsBirthDays(document) {
            let ID = document.ID, authorID = document.authorID;
            if (!(authorID in usersDict))
                usersDict[authorID] = new Person(authorID);
            if (!(ID in groupsDict))
                groupsDict[ID] = new Group(ID);
            usersDict[authorID].birthDayGroups = ["add", groupsDict[ID]];
        }

        function createPersonIn(document) {
            let ID = document.ID, personID = document.personID;
            if (!(personID in usersDict))
                usersDict[personID] = new Person(personID);
            if (!(ID in groupsDict))
                groupsDict[ID] = new Group(ID);
            groupsDict[ID].personsIn = ["add", usersDict[personID]];
        }

        function createGroupPermissions(document) {
            let ID = document.ID, key = document.key, permission = document.perm;
            if (!(ID in groupsDict))
                groupsDict[ID] = new Group(ID);
            groupsDict[ID].functionPermissions = [key, permission]
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
                for (let i = 0; i < result.length; i++)
                    createGroupFilter(result[i]);
                callback();
                client.close();
            });
            dbo.collection("tags-groups").find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err + " in tags-find");
                    return;
                }
                for (let i = 0; i < result.length; i++)
                    createGroupTag(result[i]);
            });
            dbo.collection("birthday-persons").find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err + " in birthday-find");
                    return;
                }
                for (let i = 0; i < result.length; i++)
                    createPersonBirthday(result[i]);
            });
            dbo.collection("lang-groups").find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err + " in lang-find");
                    return;
                }
                for (let i = 0; i < result.length; i++)
                    createGroupLang(result[i]);
            });
            dbo.collection("groupPermissions-groups").find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err + " in groupPermissions-find");
                    return;
                }
                for (let i = 0; i < result.length; i++)
                    createGroupPermissions(result[i]);
            });
            dbo.collection("personIn-groups").find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err + " in personIn-find");
                    return;
                }
                for (let i = 0; i < result.length; i++)
                    createPersonIn(result[i]);
            });
            dbo.collection("groupAdmins-groups").find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err + " in groupAdmins-find");
                    return;
                }
                for (let i = 0; i < result.length; i++)
                    creatGroupAdmins(result[i]);
            });
            dbo.collection("perm-persons").find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err + " in permission-find");
                    return;
                }
                for (let i = 0; i < result.length; i++)
                    createPersonPerm(result[i]);
            });
            dbo.collection("personBirthdayGroups-persons").find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err + " in personBirthdayGroups-find");
                    return;
                }
                for (let i = 0; i < result.length; i++)
                    createPersonGroupsBirthDays(result[i]);
            });
        });
    }
}

module.exports = HDB;
