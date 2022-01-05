const Group = require("../Classes/Group"), Person = require("../Classes/Person"), HL = require("./HandleLanguage");
const {useragent} = require("@open-wa/wa-automate");
const MongoClient = require('mongodb').MongoClient, url = "mongodb://localhost:27017/";

class HDB {
    static async addArgsToDB(ID, value1, value2, value3, argType, callback) {
        let objectToAddToDataBase;
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
            if (argType === "filters" || argType === "tags" || argType === "lang" || argType === "groupPermissions" ||
                argType === "personIn" || argType === "groupAdmins")
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
        let objectToDelInDataBase;
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
            if (argType === "filters" || argType === "tags" || argType === "lang" || argType === "groupPermissions" ||
                argType === "personIn" || argType === "groupAdmins")
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

    static async chaArgsInDB(ID, value1, value2, value3, argType, callback) {
        let objectToChangeInDataBase;
        MongoClient.connect(url, function (err, client) {
            if (err) {
                console.log(err + " in chaArgsInDB");
                return;
            }
            switch (argType) {
                case "filters":
                    objectToChangeInDataBase = {ID: ID, filter: value1, filter_reply: value2};
                    break;
                case "tags":
                    objectToChangeInDataBase = {ID: ID, name: value1, phone_number: value2};
                    break;
                case "birthday":
                    objectToChangeInDataBase = {ID: ID, birthDay: value1, birthMonth: value2, birthYear: value3};
                    break;
                case "lang":
                    objectToChangeInDataBase = {ID: ID, lang: value1};
                    break;
                case "perm":
                    objectToChangeInDataBase = {ID: ID, author: value1, perm: value2};
                    break;
                case "personBirthdayGroups":
                    objectToChangeInDataBase = {ID: ID, authorID: value1};
                    break;
                case "groupPermissions":
                    objectToChangeInDataBase = {ID: ID, key: value1, perm: value2}; //key == function. Yatskan is a moron
                    break;
                case "personIn":
                    objectToChangeInDataBase = {ID: ID, personID: value1};
                    break;
                case "groupAdmins":
                    objectToChangeInDataBase = {ID: ID, adminsArray: value1};
                    break;
            }
            if (argType === "filters" || argType === "tags" || argType === "lang" || argType === "groupPermissions" ||
                argType === "personIn" || argType === "groupAdmins")
                argType += "-groups";
            else if (argType === "name" || argType === "birthday" || argType === "perm" || argType === "personBirthdayGroups")
                argType += "-persons"
            client.db("WhatsappBotDB").collection(argType).deleteOne(objectToChangeInDataBase, function (err) {
                if (err) {
                    console.log(err + " in chaArgsInDB-deleteOne");
                    return;
                }
                client.db("WhatsappBotDB").collection(argType).insertOne(objectToChangeInDataBase, function (err) {
                    if (err) {
                        console.log(err + " in chaArgsInDB-insertOne");
                        return;
                    }
                    callback();
                    client.close();
                });
            });
        });
    }

    static async GetAllGroupsFromDB(groupsDict, usersDict, callback) {
        function createGroupFilter(object) {
            let chatID = object.ID, filter = object.filter, filterReply = object.filter_reply;
            if (!(chatID in groupsDict))
                groupsDict[chatID] = new Group(chatID);
            groupsDict[chatID].filters = ["add", filter, filterReply];
        }

        function creatGroupAdmins(object) {
            let chatID = object.ID, adminsArray = object.adminsArray;
            if (!(chatID in groupsDict))
                groupsDict[chatID] = new Group(chatID);
            groupsDict[chatID].groupAdmins = adminsArray;
        }

        function createGroupTag(object) {
            let chatID = object.ID, name = object.name, phoneNumber = object.phone_number;
            if (!(chatID in groupsDict))
                groupsDict[chatID] = new Group(chatID);
            groupsDict[chatID].tags = ["add", name, phoneNumber];
        }

        function createPersonBirthday(object) {
            let personID = object.ID, birthDay = object.birthDay, birthMonth = object.birthMonth,
                birthYear = object.birthYear;
            if (!(personID in usersDict))
                usersDict[personID] = new Person(personID);
            usersDict[personID].birthday = ["add", birthDay, birthMonth, birthYear];
        }

        function createGroupLang(object) {
            let chatID = object.ID, language = object.lang;
            if (!(chatID in groupsDict))
                groupsDict[chatID] = new Group(chatID);
            groupsDict[chatID].groupLanguage = language;
        }

        function createPersonPerm(document) {
            let chatID = document.ID, personID = document.author, permission = document.perm;
            if (!(personID in usersDict))
                usersDict[personID] = new Person(personID);
            usersDict[personID].permissionLevel[chatID] = permission;
        }

        function createPersonGroupsBirthDays(document) {
            let chatID = document.ID, personID = document.authorID;
            if (!(personID in usersDict))
                usersDict[personID] = new Person(personID);
            if (!(chatID in groupsDict))
                groupsDict[chatID] = new Group(chatID);
            usersDict[personID].birthDayGroups = ["add", groupsDict[chatID]];
        }

        function createPersonIn(document) {
            let chatID = document.ID, personID = document.personID;
            if (!(personID in usersDict))
                usersDict[personID] = new Person(personID);
            if (!(chatID in groupsDict))
                groupsDict[chatID] = new Group(chatID);
            groupsDict[chatID].personsIn = ["add", usersDict[personID]];
        }

        function createGroupPermissions(document) {
            let chatID = document.ID, func = document.key, permission = document.perm;
            if (!(chatID in groupsDict))
                groupsDict[chatID] = new Group(chatID);
            groupsDict[chatID].functionPermissions = [func, permission]
        }

        MongoClient.connect(url, function (err, client) {
            if (err) {
                console.log(err + "in initial retrieval of groups from DB");
                return;
            }
            const dbo = client.db("WhatsappBotDB");
            dbo.collection("filters-groups").find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err + " in fetching filters from db");
                    return;
                }
                for (let i = 0; i < result.length; i++)
                    createGroupFilter(result[i]);
            });
            dbo.collection("tags-groups").find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err + " in fetching tags from db");
                    return;
                }
                for (let i = 0; i < result.length; i++)
                    createGroupTag(result[i]);
            });
            dbo.collection("birthday-persons").find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err + " in fetching birthday from db");
                    return;
                }
                for (let i = 0; i < result.length; i++)
                    createPersonBirthday(result[i]);
            });
            dbo.collection("lang-groups").find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err + " in fetching lang from db");
                    return;
                }
                for (let i = 0; i < result.length; i++)
                    createGroupLang(result[i]);
            });
            dbo.collection("groupPermissions-groups").find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err + " in fetching groupPermissions from db");
                    return;
                }
                for (let i = 0; i < result.length; i++)
                    createGroupPermissions(result[i]);
            });
            dbo.collection("personIn-groups").find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err + " in fetching personIn from db");
                    return;
                }
                for (let i = 0; i < result.length; i++)
                    createPersonIn(result[i]);
            });
            dbo.collection("groupAdmins-groups").find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err + " in fetching groupAdmins from db");
                    return;
                }
                for (let i = 0; i < result.length; i++)
                    creatGroupAdmins(result[i]);
            });
            dbo.collection("perm-persons").find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err + " in fetching permission from db");
                    return;
                }
                for (let i = 0; i < result.length; i++)
                    createPersonPerm(result[i]);
            });
            dbo.collection("personBirthdayGroups-persons").find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err + " in fetching personBirthdayGroups from db");
                    return;
                }
                for (let i = 0; i < result.length; i++)
                    createPersonGroupsBirthDays(result[i]);
            });
            callback();
            client.close();
        });
    }

    static async deleteGroupFromDB(waClient, groupsDict, chatID, messageID) {
        MongoClient.connect(url, function (err, mongoClient) {
            const dbo = mongoClient.db("WhatsappBotDB");
            dbo.collection("filters-groups").find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err + " in fetching filters from db");
                    return;
                }
                for (let i = 0; i < result.length; i++)
                    if (result[i].id === chatID)
                        dbo.collection("filters-groups").deleteOne(result[i]);

            });
            dbo.collection("tags-groups").find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err + " in fetching tags from db");
                    return;
                }
                for (let i = 0; i < result.length; i++)
                    if (result[i].id === chatID)
                        dbo.collection("tags-groups").deleteOne(result[i]);
            });
            dbo.collection("lang-groups").find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err + " in fetching lang from db");
                    return;
                }
                for (let i = 0; i < result.length; i++)
                    if (result[i].id === chatID)
                        dbo.collection("lang-groups").deleteOne(result[i]);
            });
            dbo.collection("groupPermissions-groups").find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err + " in fetching groupPermissions from db");
                    return;
                }
                for (let i = 0; i < result.length; i++)
                    if (result[i].id === chatID)
                        dbo.collection("groupPermissions-groups").deleteOne(result[i]);
            });
            dbo.collection("personIn-groups").find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err + " in fetching personIn from db");
                    return;
                }
                for (let i = 0; i < result.length; i++)
                    if (result[i].id === chatID)
                        dbo.collection("personIn-groups").deleteOne(result[i]);
            });
            dbo.collection("groupAdmins-groups").find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err + " in fetching groupAdmins from db");
                    return;
                }
                for (let i = 0; i < result.length; i++)
                    if (result[i].id === chatID)
                        dbo.collection("groupAdmins-groups").deleteOne(result[i]);
            });
            mongoClient.close();
        });
        waClient.reply(chatID, HL.getGroupLang(groupsDict, chatID, "delete_group_from_db_reply", messageID, true));
        delete groupsDict[chatID];
    }

    static async deletePersonFromDB(waClient, usersDict, personID, groupsDict, chatID, messageID) {
        MongoClient.connect(url, function (err, mongoClient) {
            const dbo = mongoClient.db("WhatsappBotDB");
            dbo.collection("birthday-persons").find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err + " in fetching birthday from db");
                    return;
                }
                for (let i = 0; i < result.length; i++)
                    if (result[i].id === personID)
                        dbo.collection("birthday-persons").deleteOne(result[i]);
            });
            dbo.collection("perm-persons").find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err + " in fetching permission from db");
                    return;
                }
                for (let i = 0; i < result.length; i++)
                    if (result[i].id === personID)
                        dbo.collection("perm-persons").deleteOne(result[i]);
            });
            dbo.collection("personBirthdayGroups-persons").find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err + " in fetching personBirthdayGroups from db");
                    return;
                }
                for (let i = 0; i < result.length; i++)
                    if (result[i].id === personID)
                        dbo.collection("personBirthdayGroups-persons").deleteOne(result[i]);
            });
            mongoClient.close();
        });
        waClient.reply(chatID, HL.getGroupLang(groupsDict, chatID, "delete_person_from_db_reply", messageID, true));
        delete usersDict[personID];
    }
}

module.exports = HDB;
