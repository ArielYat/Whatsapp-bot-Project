const HL = require("../ModulesDatabase/HandleLanguage"), HP = require("../ModulesDatabase/HandlePermissions");

class HUS {
    static async ShowStats(client, bodyText, chatID, messageID, authorID, groupsDict, usersDict) {
        const userTag = "@" + usersDict[authorID].personID.replace("@c.us", "");
        const taggedMessagesAmount = usersDict[authorID].messagesTaggedIn[chatID] === undefined ? "0" : usersDict[authorID].messagesTaggedIn[chatID].length.toString();
        const permissionLevel = HP.functionPermissionToWord(groupsDict, chatID, usersDict[authorID].permissionLevel[chatID]);
        const birthDay = !!usersDict[authorID].birthday.length ? usersDict[authorID].birthday.toString().replace("[", "").replace("]", "") : HL.getGroupLang(groupsDict, chatID, "profile_birthday_error");
        await client.sendReplyWithMentions(chatID, `${userTag}
            ${HL.getGroupLang(groupsDict, chatID, "tagged_messages_amount_reply", taggedMessagesAmount)}
            ${HL.getGroupLang(groupsDict, chatID, "permission_level_reply", permissionLevel)}
            ${HL.getGroupLang(groupsDict, chatID, "profile_birthday_reply", birthDay)}`, messageID)
    }
}

module.exports = HUS;