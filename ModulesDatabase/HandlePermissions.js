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
            if (groupsDict.personsIn[i].permissionLevel !== highestPerm.toString() &&
                [chatID].groupAdmins.includes(groupsDict[chatID].personsIn[i].personID)) {
                groupsDict.personsIn[i].permissionLevel = 2;
                await HDB.delArgsFromDB(chatID, groupsDict.personsIn[i].personID, "perm", function () {
                    HDB.addArgsToDB(chatID, groupsDict.personsIn[i].personID, 2, null, "perm", function () {
                        console.log("person permission changed successfully");
                    });
                });
                callback()
            }
        }
    }
}

module.exports = HP;