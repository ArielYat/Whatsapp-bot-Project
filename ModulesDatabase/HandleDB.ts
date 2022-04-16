import Group from "../Classes/Group.js";
import Person from "../Classes/Person.js";
import apiKeys from "../apiKeys.js";
import {MongoClient} from "mongodb";

const url = apiKeys.DBurl;

export default class HDB {
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
                case "rested":
                    objectToAddToDataBase = {ID: ID, restArray: value1};
                    break;
                case "lastTagged":
                    objectToAddToDataBase = {ID: ID, personID: value1, taggedArray: value2};
                    break;
                case "reminders":
                    objectToAddToDataBase = {personID: ID, reminderDate: value1, reminderMessage: value2};
                    break;
                case "afk":
                    objectToAddToDataBase = {personID: ID, dateOfAFk: value1};
                    break;
            }
            if (argType === "filters" || argType === "tags" || argType === "lang" || argType === "groupPermissions" ||
                argType === "personIn" || argType === "groupAdmins")
                argType += "-groups";
            else if (argType === "name" || argType === "birthday" || argType === "perm" ||
                argType === "personBirthdayGroups" || argType === "lastTagged" || argType === "reminders" || argType === "afk")
                argType += "-persons"
            client.db("Cluster0").collection(argType).insertOne(objectToAddToDataBase, function (err) {
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
                case "rested":
                    objectToDelInDataBase = {ID: ID};
                    break;
                case "lastTagged":
                    objectToDelInDataBase = {ID: ID, personID: key};
                    break;
                case "reminders":
                    objectToDelInDataBase = {personID: ID, reminderDate: key};
                    break;
                case "afk":
                    objectToDelInDataBase = {personID: ID};
                    break;
            }
            if (argType === "filters" || argType === "tags" || argType === "lang" || argType === "groupPermissions" ||
                argType === "personIn" || argType === "groupAdmins")
                argType += "-groups";
            else if (argType === "name" || argType === "birthday" || argType === "perm" ||
                argType === "personBirthdayGroups" || argType === "lastTagged" || argType === "reminders" || argType === "afk")
                argType += "-persons"
            client.db("Cluster0").collection(argType).deleteOne(objectToDelInDataBase, function (err) {
                if (err) {
                    console.log(err + " in delArgsFromDB-deleteOne");
                    return;
                }
                callback()
                client.close();
            });
        });
    }

    static async GetAllGroupsFromDB(groupsDict, usersDict, restUsers, restGroups, personsWithReminders, afkPersons, callback) {
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

        function createReminders(document) {
            let personID = document.personID, reminderDate = document.reminderDate,
                reminderMessage = document.reminderMessage;
            if (!(personID in usersDict))
                usersDict[personID] = new Person(personID);
            usersDict[personID].reminders = ["add", reminderDate, reminderMessage];
        }

        function createAfk(document) {
            let personID = document.personID, afkDate = document.dateOfAFk;
            if (!(personID in usersDict))
                usersDict[personID] = new Person(personID);
            usersDict[personID].afk = new Date(afkDate);
        }

        function createRested(document) {
            let chatID = document.ID, restArray = document.restArray;
            switch (chatID) {
                case ("restArrayUsers"):
                    for (let i = 0; i < restArray.length; i++) {
                        restUsers.push(restArray[i])
                    }
                    break;
                case ("restArrayGroups"):
                    for (let i = 0; i < restArray.length; i++) {
                        restGroups.push(restArray[i])
                    }
                    break;
                case ("personsWithReminders"):
                    for (let i = 0; i < restArray.length; i++) {
                        personsWithReminders.push(restArray[i]);
                    }
                    break;
                case ("afkPersons"):
                    for (let i = 0; i < restArray.length; i++) {
                        afkPersons.push(restArray[i]);
                    }
                    break;
                default:
                    return;
            }
        }

        function createLastTagged(document) {
            let chatID = document.ID, personID = document.personID, taggedArray = document.taggedArray;
            if (!(personID in usersDict))
                usersDict[personID] = new Person(personID);
            usersDict[personID].messagesTaggedIn[chatID] = taggedArray
        }

        MongoClient.connect(url, function (err, client) {
            if (err) {
                console.log(err + "in initial retrieval of groups from DB");
                return;
            }
            const dbo = client.db("Cluster0");
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
            dbo.collection("lastTagged-persons").find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err + " in fetching lastTagged from db");
                    return;
                }
                for (let i = 0; i < result.length; i++)
                    createLastTagged(result[i]);
            });
            dbo.collection("reminders-persons").find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err + " in fetching reminders from db");
                    return;
                }
                for (let i = 0; i < result.length; i++)
                    createReminders(result[i]);
            });
            dbo.collection("afk-persons").find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err + " in fetching reminders from db");
                    return;
                }
                for (let i = 0; i < result.length; i++)
                    createAfk(result[i]);
            });
            dbo.collection("rested").find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err + " in fetching rested from db");
                    return;
                }
                for (let i = 0; i < result.length; i++)
                    createRested(result[i]);
                callback();
                client.close();
            });
        });
    }
}