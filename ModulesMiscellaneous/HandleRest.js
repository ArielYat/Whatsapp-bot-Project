const botDevs = ["972543293155@c.us", "972586809911@c.us"];

class HR {
    static async handleUserRest(client, bodyText, chatID, messageID, messageAuthor, quotedMsgID, quotedMsgAuthor, restUsers) {
        if (quotedMsgID != null) {
            if (bodyText.startsWith("חסום גישה למשתמש")) {
                if (botDevs.includes(messageAuthor)) {
                    restUsers.push(quotedMsgAuthor);
                    await client.sendReplyWithMentions(chatID, "המשתמש @" + quotedMsgAuthor +
                        "נחסם בהצלחה, \n May God have mercy on your soul", messageID);
                } else client.reply(chatID, "רק כבודו יכול לחסום אנשים", messageID);
            }
            if (bodyText.startsWith("אפשר גישה למשתמש")) {
                if (botDevs.includes(messageAuthor)) {
                    const userIdIndex = restUsers.indexOf(quotedMsgAuthor);
                    restUsers.splice(userIdIndex, 1);
                    await client.sendReplyWithMentions(chatID, "המשתמש @" + quotedMsgAuthor + "שוחרר בהצלחה", messageID);
                } else await client.reply(chatID, "רק כבודו יכול לשחרר אנשים", messageID);
            }
        } else await client.reply(chatID, "נא סמן את הודעת המשתמש כדי לחסום את הפרחח", messageID);
    }

    static async handleGroupRest(client, bodyText, chatID, messageID, messageAuthor, restGroups, restGroupsSpam) {
        if (bodyText.startsWith("חסום קבוצה")) {
            if (botDevs.includes(messageAuthor)) {
                restGroups.push(chatID);
                await client.reply(chatID, "הקבוצה נחסמה בהצלחה", messageID);
            } else client.reply(chatID, "רק ארדואן בכבודו ובעצמו יכול לחסום קבוצות", messageID);
        }
        if (bodyText.startsWith("שחרר קבוצה")) {
            if (botDevs.includes(messageAuthor)) {
                const groupIdIndex = restGroups.indexOf(chatID);
                restGroups.splice(groupIdIndex, 1);
                restGroupsSpam.splice(groupIdIndex, 1);
                await client.reply(chatID, "הקבוצה שוחררה בהצלחה", messageID);
            } else await client.reply(chatID, "רק ארדואן יכול לשחרר קבוצות", messageID);
        }
    }
}

module.exports = HR;