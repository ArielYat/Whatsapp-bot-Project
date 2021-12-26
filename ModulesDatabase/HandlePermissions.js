const HDB = require("./HandleDB"), HL = require("./HandleLanguage");

class HP {
    static async setPermissionLevelOfFunctions(client, bodyText, personPermission, permissionFunctions, groupsDict, chatID, messageID) {
        bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "set_permissions"), "");
        if (bodyText.includes("-")) {
            const textArray = bodyText.split("-");
            let permissionType = textArray[0].trim();
            let newPermissionLevel = textArray[1].trim();
            switch (permissionType) {
                case HL.getGroupLang(groupsDict, chatID, "filters"):
                    permissionType = "filters"
                    break;
                case HL.getGroupLang(groupsDict, chatID, "tags"):
                    permissionType = "tags"
                    break;
                case HL.getGroupLang(groupsDict, chatID, "handleFilters"):
                    permissionType = "handleFilters"
                    break;
                case HL.getGroupLang(groupsDict, chatID, "handleTags"):
                    permissionType = "handleTags"
                    break;
                case HL.getGroupLang(groupsDict, chatID, "handleBirthdays"):
                    permissionType = "handleBirthdays"
                    break;
                case HL.getGroupLang(groupsDict, chatID, "handleShows"):
                    permissionType = "handleShows"
                    break;
                case HL.getGroupLang(groupsDict, chatID, "handleImmediate"):
                    permissionType = "handleImmediate"
                    break;
                default:
                    await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "permission_option_does_not_exist_error"), messageID)
                    return;
            }
            let currentPermissionLevel = permissionFunctions[permissionType];
            if (newPermissionLevel <= personPermission && currentPermissionLevel <= personPermission && newPermissionLevel > 0) {
                groupsDict[chatID].functionPermissions = [permissionType, newPermissionLevel];
                await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "set_permissions_reply"), messageID);
                await HDB.delArgsFromDB(chatID, permissionType, "groupPermissions", function () {
                    HDB.addArgsToDB(chatID, permissionType, newPermissionLevel, null, "groupPermissions", function () {
                        console.log(permissionType + "Permission changed successful on group" + chatID);
                    });
                });
            } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "set_permissions_error"), messageID);
        } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "hyphen_reply"), messageID);
    }

    static async checkPermissionLevels(groupsDict, chatID, callback) {
        for (let i = 0; i < groupsDict[chatID].personsIn.length; i++) {
            const developerPerm = 3, mutedPerm = 0;
            if (groupsDict[chatID].personsIn[i].permissionLevel[chatID].toString() !== developerPerm.toString() &&
                groupsDict[chatID].personsIn[i].permissionLevel[chatID].toString() !== mutedPerm.toString()) {
                await this.checkPermissionOfPerson(groupsDict[chatID], groupsDict[chatID].personsIn[i], chatID);
            }
        }
        callback()
    }

    static async checkPermissionOfPerson(group, person, chatID) {
        if (group.groupAdmins.includes(person.personID)) {
            person.permissionLevel[chatID] = 2;
            await HDB.delArgsFromDB(chatID, person.personID, "perm", function () {
                HDB.addArgsToDB(chatID, person.personID, 2, null, "perm", function () {
                    console.log("person permission changed successfully");
                });
            });
        } else {
            person.permissionLevel[chatID] = 1;
            await HDB.delArgsFromDB(chatID, person.personID, "perm", function () {
                HDB.addArgsToDB(chatID, person.personID, 1, null, "perm", function () {
                    console.log("person permission changed successfully");
                });
            });
        }
    }

    static async muteParticipant(client, bodyText, chatID, messageID, authorID, groupsDict, usersDict) {
        bodyText = bodyText.split(" ");
        if (bodyText.length === 2) {
            let personTag = bodyText[1].trim();
            let personID = personTag.replace("@", "");
            personID += "@c.us";
            const isIDEqualPersonID = (person) => personID === person.personID;
            if ((groupsDict[chatID].personsIn.some(isIDEqualPersonID))) {
                if (usersDict[authorID].permissionLevel[chatID] > usersDict[personID].permissionLevel[chatID]) {
                    usersDict[personID].permissionLevel[chatID] = 0;
                    await HDB.delArgsFromDB(chatID, usersDict[personID].personID, "perm", function () {
                        HDB.addArgsToDB(chatID, usersDict[personID].personID, 0, null, "perm", function () {
                            console.log("person muted successfully");
                            client.sendReplyWithMentions(chatID, HL.getGroupLang(groupsDict, chatID, "mute_participant_reply", personTag), messageID);
                        });
                    });
                } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "set_permissions_error"), messageID);
            } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "participant_not_in_group_error"), messageID);
        } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "no_participant_chosen_error"), messageID);
    }

    static async unmuteParticipant(client, bodyText, chatID, messageID, authorID, groupsDict, usersDict) {
        bodyText = bodyText.split(" ");
        if (bodyText.length === 3) {
            let personTag = bodyText[2].trim();
            let personID = personTag.replace("@", "");
            personID += "@c.us";
            const isIDEqualPersonID = (person) => personID === person.personID;
            if ((groupsDict[chatID].personsIn.some(isIDEqualPersonID))) {
                if (usersDict[authorID].permissionLevel[chatID] > usersDict[personID].permissionLevel[chatID]) {
                    await this.checkPermissionOfPerson(groupsDict[chatID], usersDict[personID], chatID);
                    await client.sendReplyWithMentions(chatID, HL.getGroupLang(groupsDict, chatID, "unmute_participant_reply", personTag), messageID);
                } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "set_permissions_error"), messageID);
            } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "participant_not_in_group_error"), messageID);
        } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "no_participant_chosen_error"), messageID);
    }

    static async showGroupFunctionsPermissions(client, chatID, messageID, groupsDict) {
        let permString = "";
        for (let permission in groupsDict[chatID].functionPermissions) {
            permString += permission + " - " + groupsDict[chatID].functionPermissions[permission] + "\n";
        }
        client.reply(chatID, permString, messageID)
    }

    static async showGroupUsersPermissions(client, chatID, messageID, groupsDict) {
        let permString = "";
        for (let user in groupsDict[chatID].personsIn) {
            permString += "@" + groupsDict[chatID].personsIn[user].personID.replace("@c.us", "") + " - " + groupsDict[chatID].personsIn[user].permissionLevel[chatID] + "\n";
        }
        client.sendReplyWithMentions(chatID, permString, messageID)
    }
}

module.exports = HP;