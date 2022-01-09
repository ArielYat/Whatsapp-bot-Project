const HDB = require("./HandleDB"), HL = require("./HandleLanguage");

class HP {
    static async setFunctionPermissionLevel(client, bodyText, chatID, messageID, personPermission, functionPermissions, groupsDict) {
        bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "set_permissions"), "");
        const mutedFunction = 4;
        if (bodyText.includes("-")) {
            const textArray = bodyText.split("-");
            let permissionType = textArray[0].trim(),
                newPermissionLevel = this.changeWordToPermission(textArray[1].trim());
            if (newPermissionLevel != null) {
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
                if (newPermissionLevel >= 0
                    && (functionPermissions[permissionType] <= personPermission && newPermissionLevel <= personPermission ||
                        (newPermissionLevel === mutedFunction.toString() || (functionPermissions[permissionType] === mutedFunction.toString()
                            && newPermissionLevel <= personPermission))
                        && personPermission >= 2)) {
                    await HDB.delArgsFromDB(chatID, permissionType, "groupPermissions", function () {
                        HDB.addArgsToDB(chatID, permissionType, newPermissionLevel, null, "groupPermissions", function () {
                            groupsDict[chatID].functionPermissions = [permissionType, newPermissionLevel];
                            client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "set_permissions_reply"), messageID);
                        });
                    });
                } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "set_permissions_error"), messageID);
            } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "hyphen_reply"), messageID);
        } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "set_permissions_error"), messageID);
    }

    static async checkGroupUsersPermissionLevels(groupsDict, chatID) {
        const developerPerm = 3, mutedPerm = 0;
        for (let i = 0; i < groupsDict[chatID].personsIn.length; i++) {
            if (groupsDict[chatID].personsIn[i].permissionLevel[chatID] === null) ||
                (groupsDict[chatID].personsIn[i].permissionLevel[chatID].toString() !== developerPerm.toString() &&
                groupsDict[chatID].personsIn[i].permissionLevel[chatID].toString() !== mutedPerm.toString())) {
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
            stringForSending += permission + " - " + this.changePermissionToWord(groupsDict, chatID, groupsDict[chatID].functionPermissions[permission]) + "\n";
        client.reply(chatID, stringForSending, messageID)
    }

    static async showGroupUsersPermissions(client, chatID, messageID, groupsDict) {
        let stringForSending = "";
        for (let user in groupsDict[chatID].personsIn) {
            let tempPhoneNumber = groupsDict[chatID].personsIn[user].personID.replace("@c.us", "");
            if (Object.keys(groupsDict[chatID].tags).length) {
                for (const name in groupsDict[chatID].tags) {
                    if (groupsDict[chatID].tags[name] === tempPhoneNumber) {
                        tempPhoneNumber = name;
                    }
                }
            }
            stringForSending += tempPhoneNumber + " - " + this.changePermissionToWord(groupsDict, chatID, groupsDict[chatID].personsIn[user].permissionLevel[chatID]) + "\n";
        }
        await client.reply(chatID, stringForSending, messageID)
    }
    static changePermissionToWord(groupsDict, chatID, permissionNumber){
        switch (permissionNumber){
            case 4 || 0:
                return HL.getGroupLang(groupsDict, chatID, "muted");
            case 3:
                return HL.getGroupLang(groupsDict, chatID, "developer");
            case 2:
                return HL.getGroupLang(groupsDict, chatID, "admin");
            case 1:
                return HL.getGroupLang(groupsDict, chatID, "regular");
            default:
                return null;
        }
    }
    static changeWordToPermission(groupsDict, chatID, word){
        switch (word){
            case HL.getGroupLang(groupsDict, chatID, "muted"):
                return 0;
            case HL.getGroupLang(groupsDict, chatID, "developer"):
                return 3;
            case HL.getGroupLang(groupsDict, chatID, "admin"):
                return 2;
            case HL.getGroupLang(groupsDict, chatID, "regular"):
                return 1;
            default:
                return null;
        }
    }
}

module.exports = HP;
