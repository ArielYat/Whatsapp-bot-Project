const HDB = require("./HandleDB"), HL = require("./HandleLanguage");

class HP {
    static async setFunctionPermissionLevel(client, bodyText, chatID, messageID, personPermission, functionPermissions, groupsDict) {
        bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "set_permissions"), "");
        if (bodyText.includes("-")) {
            const textArray = bodyText.split("-");
            let permissionType = textArray[0].trim(), newPermissionLevel = textArray[1].trim();
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
            if (newPermissionLevel <= personPermission && functionPermissions[permissionType] <= personPermission && newPermissionLevel > 0) {
                await HDB.delArgsFromDB(chatID, permissionType, "groupPermissions", function () {
                    HDB.addArgsToDB(chatID, permissionType, newPermissionLevel, null, "groupPermissions", function () {
                        groupsDict[chatID].functionPermissions = [permissionType, newPermissionLevel];
                        client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "set_permissions_reply"), messageID);
                    });
                });
            } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "set_permissions_error"), messageID);
        } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "hyphen_reply"), messageID);
    }

    static async checkGroupUsersPermissionLevels(groupsDict, chatID) {
        const developerPerm = 3, mutedPerm = 0;
        for (let i = 0; i < groupsDict[chatID].personsIn.length; i++) {
            if (groupsDict[chatID].personsIn[i].permissionLevel[chatID].toString() !== developerPerm.toString() &&
                groupsDict[chatID].personsIn[i].permissionLevel[chatID].toString() !== mutedPerm.toString()) {
                await this.autoAssignPersonPermissions(groupsDict[chatID], groupsDict[chatID].personsIn[i], chatID);
            }
        }
    }

    static async autoAssignPersonPermissions(group, person, chatID) {
        if (group.groupAdmins.includes(person.personID)) {
            await HDB.delArgsFromDB(chatID, person.personID, "perm", function () {
                HDB.addArgsToDB(chatID, person.personID, 2, null, "perm", function () {
                    person.permissionLevel[chatID] = 2;
                });
            });
        } else {
            await HDB.delArgsFromDB(chatID, person.personID, "perm", function () {
                HDB.addArgsToDB(chatID, person.personID, 1, null, "perm", function () {
                    person.permissionLevel[chatID] = 1;
                });
            });
        }
    }

    static async muteParticipant(client, bodyText, chatID, messageID, authorID, groupsDict, usersDict) {
        bodyText = bodyText.split(" ");
        if (bodyText.length === 2) {
            const personTag = bodyText[1].trim(), personID = personTag.replace("@", "") + "@c.us";
            if ((groupsDict[chatID].personsIn.some((person) => personID === person.personID))) {
                if (usersDict[authorID].permissionLevel[chatID] > usersDict[personID].permissionLevel[chatID]) {
                    await HDB.delArgsFromDB(chatID, personID, "perm", function () {
                        HDB.addArgsToDB(chatID, personID, 0, null, "perm", function () {
                            usersDict[personID].permissionLevel[chatID] = 0;
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
            const personTag = bodyText[2].trim(), personID = personTag.replace("@", "") + "@c.us";
            if ((groupsDict[chatID].personsIn.some((person) => personID === person.personID))) {
                if (usersDict[authorID].permissionLevel[chatID] > usersDict[personID].permissionLevel[chatID]) {
                    await this.autoAssignPersonPermissions(groupsDict[chatID], usersDict[personID], chatID);
                    await client.sendReplyWithMentions(chatID, HL.getGroupLang(groupsDict, chatID, "unmute_participant_reply", personTag), messageID);
                } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "set_permissions_error"), messageID);
            } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "participant_not_in_group_error"), messageID);
        } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "no_participant_chosen_error"), messageID);
    }

    static async showGroupFunctionsPermissions(client, chatID, messageID, groupsDict) {
        let stringForSending = "";
        for (let permission in groupsDict[chatID].functionPermissions)
            stringForSending += permission + " - " + groupsDict[chatID].functionPermissions[permission] + "\n";
        client.reply(chatID, stringForSending, messageID)
    }

    static async showGroupUsersPermissions(client, chatID, messageID, groupsDict) {
        let stringForSending = "";
        for (let user in groupsDict[chatID].personsIn)
            stringForSending += "@" + groupsDict[chatID].personsIn[user].personID.replace("@c.us", "") + " - " + groupsDict[chatID].personsIn[user].permissionLevel[chatID] + "\n";
        await client.sendReplyWithMentions(chatID, stringForSending, messageID)
    }
}

module.exports = HP;