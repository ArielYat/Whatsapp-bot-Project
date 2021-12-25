class HAF {
    static async handleUserRest(client, bodyText, chatID, messageID, quotedMsgID, quotedMsgAuthor, restUsers, restUsersCommandSpam) {
        if (quotedMsgID != null) {
            if (bodyText.startsWith("חסום גישה למשתמש")) {
                restUsers.push(quotedMsgAuthor);
                await client.sendReplyWithMentions(chatID, "המשתמש @" + quotedMsgAuthor +
                    "נחסם בהצלחה, \n May God have mercy on your soul", messageID);
            }
            if (bodyText.startsWith("אפשר גישה למשתמש")) {
                restUsers.splice(restUsers.indexOf(quotedMsgAuthor), 1);
                restUsersCommandSpam.splice(restUsersCommandSpam.indexOf(quotedMsgAuthor), 1);
                await client.sendReplyWithMentions(chatID, "המשתמש @" + quotedMsgAuthor + "שוחרר בהצלחה", messageID);
            }
        }
    }

    static async handleGroupRest(client, bodyText, chatID, messageID, restGroups, restGroupsSpam) {
        if (bodyText.startsWith("חסום קבוצה")) {
            restGroups.push(chatID);
            await client.reply(chatID, "הקבוצה נחסמה בהצלחה", messageID);
        }
        if (bodyText.startsWith("שחרר קבוצה")) {
            restGroups.splice(restGroups.indexOf(chatID), 1);
            restGroupsSpam.splice(restGroupsSpam.indexOf(chatID), 1);
            await client.reply(chatID, "הקבוצה שוחררה בהצלחה", messageID);
        }
    }

    static async handleBotJoin(client, bodyText, chatID, messageID) {
        if (bodyText.startsWith("הצטרף לקבוצה ")) {
            const found = bodyText.match(/(([hH])ttps?:\/\/chat\.whatsapp\.com\/(.)+)/g);
            if (found != null) {
                try {
                    await client.joinGroupViaLink(found[0]);
                } catch (e) {
                    await client.reply(chatID, "אני חושב שהקישור לא בתוקף", messageID);
                }
            } else await client.reply(chatID, "מאסטר! הההודעה הזו לא מכילה קישור לקבוצה!", messageID);
        }
    }

    static async ping(client, bodyText, chatID, messageID) {
        if (bodyText.startsWith("ping!")) {
            client.reply(chatID, "שום דבר לעכשיו! חכו בסבלנות!", messageID)
        }
    }
}

module.exports = HAF;