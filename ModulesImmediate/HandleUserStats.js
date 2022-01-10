const HL = require("../ModulesDatabase/HandleLanguage"), HP = require("../ModulesDatabase/HandlePermissions");

class HUS {
    static async ShowStats(client, bodyText, chatID, messageID, authorID, groupsDict, usersDict) {
        const tagUser = "@" + usersDict[authorID].personID.replace("@c.us", "");
        const cryptoUsed = groupsDict[chatID].cryptoCheckedToday;
        const taggedLength = usersDict[authorID].messagesTaggedIn[chatID] === undefined ? 0 : usersDict[authorID].messagesTaggedIn[chatID].length
        const translateTimes = groupsDict[chatID].translationCounter;
        const rank = HP.functionPermissionToWord(groupsDict, chatID, usersDict[authorID].permissionLevel[chatID]);
        const birthDay = !!usersDict[authorID].birthday.length ? usersDict[authorID].birthday.toString().replace("[", "").replace("]", "") : HL.getGroupLang(groupsDict, chatID, "birthDay_message_error");
        await client.sendReplyWithMentions(chatID, `${tagUser} 
 ${HL.getGroupLang(groupsDict, chatID, "cryptoUsed", cryptoUsed.toString())}
 ${HL.getGroupLang(groupsDict, chatID, "taggedLength", taggedLength.toString())}
 ${HL.getGroupLang(groupsDict, chatID, "translateTimes", translateTimes.toString())}
 ${HL.getGroupLang(groupsDict, chatID, "rank", rank)}
 ${HL.getGroupLang(groupsDict, chatID, "birthDay_message", birthDay)}`, messageID)
    }
}

module.exports = HUS;