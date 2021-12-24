const HDB = require("./HandleDB"), HL = require("./HandleLanguage");

class HP {
    static async setPermissionOfDifferentFunc(client, bodyText, personPermission, permissionFunctions, groupsDict, chatID, messageID) {
        bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "set_permissions"), "");
        const textArray = bodyText.split("-");
        let permissionType = textArray[0].trim();
        let newPermissionLevel = textArray[1];
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
            case HL.getGroupLang(groupsDict, chatID, "handleOthers"):
                permissionType = "handleOthers"
                break;
            default:
                await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "permission_option_does_not_exist_error"), messageID)
                return;
        }
        let currentPermissionLevel = permissionFunctions[permissionType];
        if (newPermissionLevel <= personPermission && currentPermissionLevel <= personPermission && newPermissionLevel >= 0) {
            groupsDict[chatID].functionPermissions = [permissionType, newPermissionLevel];
            await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "set_permissions_reply"), messageID);
            await HDB.delArgsFromDB(chatID, permissionType, "groupPermissions", function () {
                HDB.addArgsToDB(chatID, permissionType, newPermissionLevel, null, "groupPermissions", function () {
                    console.log(permissionType + "Permission changed successful on group" + chatID);
                });
            });
        } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "set_permissions_error"), messageID);
    }

    static async checkPermissionLevels(groupsDict, chatID, callback) {
        for (let i = 0; i < groupsDict.personsIn.length; i++) {
            let highestPerm = 3;
            let mutedPerm = 0;
            if (groupsDict.personsIn[i].permissionLevel !== highestPerm.toString() &&
                groupsDict.personsIn[i].permissionLevel !== mutedPerm.toString()) {
                await this.checkPermissionOfPerson(groupsDict[chatID], groupsDict.personsIn[i], chatID);
            }
        }
        callback()
    }
    static async checkPermissionOfPerson(group, person, chatID){
        if (group.groupAdmins.includes(person.personID)) {
            person.permissionLevel = 2;
            await HDB.delArgsFromDB(chatID, person.personID, "perm", function () {
                HDB.addArgsToDB(chatID, person.personID, 2, null, "perm", function () {
                    console.log("person permission changed successfully");
                });
            });
        } else {
            person.permissionLevel = 1;
            await HDB.delArgsFromDB(chatID, person.personID, "perm", function () {
                HDB.addArgsToDB(chatID, person.personID, 1, null, "perm", function () {
                    console.log("person permission changed successfully");
                });
            });
        }
    }
    static async muteParticipant(client,bodyText, chatID, messageID, authorID, groupsDict, usersDict) {
        bodyText = bodyText.split(" ");
        if (bodyText < 4) {
            const personID = bodyText[4];
            if (groupsDict[chatID].personsIn.includes(personID)) {
                if(usersDict[authorID].permissionLevel[chatID] > groupsDict[chatID].personsIn[personID].permissionLevel[chatID]) {
                    groupsDict[chatID].personsIn[personID].permissionLevel[chatID] = 0;
                    await HDB.delArgsFromDB(chatID, groupsDict[chatID].personsIn[personID].personID, "perm", function () {
                        HDB.addArgsToDB(chatID, groupsDict[chatID].personsIn[personID].personID, 0, null, "perm", function () {
                            console.log("person muted successfully");
                            client.reply(chatID, HL.getGroupLang(groupsDict, chatID,
                                "mute_participant_reply"), messageID);
                        });
                    });
                }
                else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID,
                    "set_permissions_error"), messageID);

            }
            else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID,
                "participant_not_in_the_group"), messageID);

        } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID,
            "didNot_Choose_participant"), messageID);
    }
    static async unMuteParticipant(client,bodyText, chatID, messageID, authorID, groupsDict, usersDict) {
        bodyText = bodyText.split(" ");
        if (bodyText < 4) {
            const personID = bodyText[4];
            if (groupsDict[chatID].personsIn.includes(personID)) {
                if(usersDict[authorID].permissionLevel[chatID] > groupsDict[chatID].personsIn[personID].permissionLevel[chatID]){
                    await this.checkPermissionOfPerson(groupsDict[chatID], groupsDict.personsIn[personID], chatID);
                    await client.reply(chatID, HL.getGroupLang(groupsDict, chatID,
                        "unmute_participant_reply"), messageID);
                }
                else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID,
                    "set_permissions_error"), messageID);

            }
            else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID,
                "participant_not_in_the_group"), messageID);

        } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID,
            "didNot_Choose_participant"), messageID);
    }
    static async getGroupAdminsFunc(chatID){

    }
}

module.exports = HP;