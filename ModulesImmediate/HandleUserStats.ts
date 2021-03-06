import HL from "../ModulesDatabase/HandleLanguage.js";
import HP from "../ModulesDatabase/HandlePermissions.js";

export default class HUS {
    static async ShowStats(client, bodyText, chatID, messageID, authorID, groupsDict, usersDict) {
        const userTag = "@" + usersDict[authorID].personID.replace("@c.us", "");
        const taggedMessagesAmount = usersDict[authorID].messagesTaggedIn[chatID] === undefined ? "0" : usersDict[authorID].messagesTaggedIn[chatID].length.toString();
        const permissionLevel = await HP.functionPermissionToWord(groupsDict, chatID, usersDict[authorID].permissionLevel[chatID]);
        const birthDay = !!usersDict[authorID].birthday.length ? usersDict[authorID].birthday.toString().replace("[", "").replace("]", "").replace(/,/g, ".") : await HL.getGroupLang(groupsDict, chatID, "profile_birthday_error");
        await client.sendReplyWithMentions(chatID, `${userTag}\n${await HL.getGroupLang(groupsDict, chatID, "tagged_messages_amount_reply", taggedMessagesAmount)}\n${await HL.getGroupLang(groupsDict, chatID, "permission_level_reply", permissionLevel)}\n${await HL.getGroupLang(groupsDict, chatID, "profile_birthday_reply", birthDay)}`, messageID);
    }
}