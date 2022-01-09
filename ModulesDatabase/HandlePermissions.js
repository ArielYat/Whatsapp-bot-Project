const HDB = require("./HandleDB"), HL = require("./HandleLanguage");

class HP {
    static async setFunctionPermissionLevel(client, bodyText, chatID, messageID, personPermission, groupFunctionPermissions, groupsDict) {
        bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "set_permissions"), "");
        if (bodyText.includes("-")) {
            const textArray = bodyText.split("-");
            const newPermissionLevel = this.wordToFunctionPermission(groupsDict, chatID, textArray[1].trim());
            if (newPermissionLevel) {
                const permissionType = this.wordToFunctionType(groupsDict, chatID, textArray[0].trim());
                if (permissionType) {
                    if (newPermissionLevel >= 0 &&
                        ((groupFunctionPermissions[permissionType] <= personPermission
                        && newPermissionLevel <= personPermission) ||
                        (personPermission >= 2 && (newPermissionLevel === 4 ||
                            (groupFunctionPermissions[permissionType] === 4 && newPermissionLevel <= personPermission))))
                    ) {
                        await HDB.delArgsFromDB(chatID, permissionType, "groupPermissions", function () {
                            HDB.addArgsToDB(chatID, permissionType, newPermissionLevel, null, "groupPermissions", function () {
                                groupsDict[chatID].functionPermissions = [permissionType, newPermissionLevel];
                                client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "set_permissions_reply"), messageID);
                            });
                        });
                    } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "set_permissions_error"), messageID);
                } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "permission_option_does_not_exist_error"), messageID)
            }else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "permission_level_does_not_exist_error"), messageID)
        } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "hyphen_reply"), messageID);
    }

    static async checkGroupUsersPermissionLevels(groupsDict, chatID) {
        const developerPerm = 3, mutedPerm = 0;
        for (let i = 0; i < groupsDict[chatID].personsIn.length; i++) {
            if (groupsDict[chatID].personsIn[i].permissionLevel[chatID] === null ||
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
            stringForSending += this.functionTypeToWord(groupsDict, chatID, permission) + " - " +
                this.functionPermissionToWord(groupsDict, chatID, groupsDict[chatID].functionPermissions[permission]) + "\n";
        client.reply(chatID, stringForSending, messageID)
    }

    static async showGroupUsersPermissions(client, chatID, messageID, groupsDict) {
        let stringForSending = "";
        for (let user in groupsDict[chatID].personsIn) {
            let tempPhoneNumber = groupsDict[chatID].personsIn[user].personID.replace("@c.us", "");
            if (groupsDict[chatID].tags.length !== 0) {
                for (const name in groupsDict[chatID].tags) {
                    if (groupsDict[chatID].tags[name] === tempPhoneNumber)
                        tempPhoneNumber = name;
                }
            }
            stringForSending += tempPhoneNumber + " - " + this.functionPermissionToWord(groupsDict, chatID, groupsDict[chatID].personsIn[user].permissionLevel[chatID]) + "\n";
        }
        await client.reply(chatID, stringForSending, messageID)
    }

    static functionPermissionToWord(groupsDict, chatID, permissionNumber) {
        switch (permissionNumber.toString()) {
            case "4":
                return HL.getGroupLang(groupsDict, chatID, "muted_permission_level");
            case "0":
                return HL.getGroupLang(groupsDict, chatID, "muted_permission_level");
            case "3":
                return HL.getGroupLang(groupsDict, chatID, "developer_permission_level");
            case "2":
                return HL.getGroupLang(groupsDict, chatID, "admin_permission_level");
            case "1":
                return HL.getGroupLang(groupsDict, chatID, "regular_permission_level");
            default:
                return null;
        }
    }

    static wordToFunctionPermission(groupsDict, chatID, text) {
        switch (text) {
            case HL.getGroupLang(groupsDict, chatID, "muted_permission_level"):
                return 4;
            case HL.getGroupLang(groupsDict, chatID, "developer_permission_level"):
                return 3;
            case HL.getGroupLang(groupsDict, chatID, "admin_permission_level"):
                return 2;
            case HL.getGroupLang(groupsDict, chatID, "regular_permission_level"):
                return 1;
            default:
                return null;
        }
    }

    static functionTypeToWord(groupsDict, chatID, permissionType) {
        switch (permissionType) {
            case "filters":
                return HL.getGroupLang(groupsDict, chatID, "filters_permission_type_replace")
            case "tags":
                return HL.getGroupLang(groupsDict, chatID, "tags_permission_type_replace");
            case "handleFilters":
                return HL.getGroupLang(groupsDict, chatID, "handleFilters_permission_type_replace");
            case "handleTags":
                return HL.getGroupLang(groupsDict, chatID, "handleTags_permission_type_replace");
            case "handleBirthdays":
                return HL.getGroupLang(groupsDict, chatID, "handleBirthdays_permission_type_replace");
            case "handleShows":
                return HL.getGroupLang(groupsDict, chatID, "handleShows_permission_type_replace");
            case "handleOther":
                return HL.getGroupLang(groupsDict, chatID, "handleOther_permission_type_replace");
            default:
                return null;
        }
    }

    static wordToFunctionType(groupsDict, chatID, text) {
        switch (text) {
            case HL.getGroupLang(groupsDict, chatID, "filters_permission_type"):
                return "filters"
            case HL.getGroupLang(groupsDict, chatID, "tags_permission_type"):
                return "tags"
            case HL.getGroupLang(groupsDict, chatID, "handleFilters_permission_type"):
                return "handleFilters"
            case HL.getGroupLang(groupsDict, chatID, "handleTags_permission_type"):
                return "handleTags"
            case HL.getGroupLang(groupsDict, chatID, "handleBirthdays_permission_type"):
                return "handleBirthdays"
            case HL.getGroupLang(groupsDict, chatID, "handleShows_permission_type"):
                return "handleShows"
            case HL.getGroupLang(groupsDict, chatID, "handleOther_permission_type"):
                return "handleOther"
            default:
        }
    }
}

module.exports = HP;
