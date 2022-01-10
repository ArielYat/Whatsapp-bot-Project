const HL = require("../ModulesDatabase/HandleLanguage");

class HUS {
    async static ShowStats(client, bodyText, chatID, messageID, authorID, groupsDict, usersDict) {
        const tagUser = "@" + usersDict[authorID].replace("@c.us", "");
        const cryptoUsed = groupsDict[chatID].cryptoCheckedToday;
        const taggedLength = usersDict[authorID].messagesTaggedIn[chatID] === undefined ? 0 : usersDict[authorID].messagesTaggedIn[chatID].length
        const translateTimes = groupsDict[chatID].translationCounter;
        const functionsUses = usersDict[authorID].commandCounter;
        const filtersUses = groupsDict[chatID].filterCounter;
        await client.sendReplyWithMentions(chatID, `${tagUser} 
 ${HL.getGroupLang(groupsDict, chatID, "cryptoUsed", cryptoUsed)}
 ${HL.getGroupLang(groupsDict, chatID, "taggedLength", taggedLength)}
 ${HL.getGroupLang(groupsDict, chatID, "translateTimes", translateTimes)}
 ${HL.getGroupLang(groupsDict, chatID, "functionsUses", functionsUses)}
 ${HL.getGroupLang(groupsDict, chatID, "filtersUses", filtersUses)}`)
    }
}

module.exports = HUS;