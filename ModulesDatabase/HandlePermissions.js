const HDB = require("./HandleDB"), HL = require("./HandleLanguage");

class HP {
    static async setPermissionOfDifferentFunc(client, bodyText, personPermission, permissionFunctions, groupsDict, chatID, messageID) {
        bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "set_Permissions"), "");
        const textArray = bodyText.split("-");
        let permissionFunc = textArray[0].trim();
        let newPermAccess = textArray[1];
        switch (permissionFunc) {
            case HL.getGroupLang(groupsDict, chatID, "filters"):
                permissionFunc = "filters"
                break;
            case HL.getGroupLang(groupsDict, chatID, "handleFilters"):
                permissionFunc = "handleFilters"
                break;
            case HL.getGroupLang(groupsDict, chatID, "handleBirthdays"):
                permissionFunc = "handleBirthdays"
                break;
            case HL.getGroupLang(groupsDict, chatID, "tags"):
                permissionFunc = "tags"
                break;
            case HL.getGroupLang(groupsDict, chatID, "handleTags"):
                permissionFunc = "handleTags"
                break;
            case HL.getGroupLang(groupsDict, chatID, "handleOthers"):
                permissionFunc = "handleOthers"
                break;
            default:
                await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "option_Not_Exist"), messageID)
                return;
        }
        let currentPermission = permissionFunctions[permissionFunc];
        if(newPermAccess <= personPermission && currentPermission <= personPermission && newPermAccess >= 0){
            groupsDict[chatID].SetPermissionFunction(permissionFunc, newPermAccess);
            await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "set_Permissions_reply"), messageID);
            await HDB.delArgsFromDB(chatID, permissionFunc, "groupPermissions", function (){
                HDB.addArgsToDB(chatID, permissionFunc, newPermAccess, null, "groupPermissions", function (){
                    console.log(permissionFunc + "Permission changed successful on group" + chatID);
                });
            });
        }
        else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "set_Permissions_error"), messageID);
    }
    static async checkPermissionLevels(groupsDict, chatID, callback){
        for (let i = 0; i < groupsDict.personsIn.length; i++) {
            if(groupsDict.personsIn[i].permissionLevel != 3 &&
                [chatID].adminsOfTheGroups.includes(groupsDict.personsIn[i].personID)){
                groupsDict.personsIn[i].permissionLevel = 2;
                await HDB.delArgsFromDB(chatID, groupsDict.personsIn[i].personID, "perm", function (){
                    HDB.addArgsToDB(chatID, groupsDict.personsIn[i].personID, 2, null, "perm", function (){
                        console.log("person permission changed successfully");
                    });
                });
                callback()
            }
        }
    }
}

module.exports = HP;