const botDevs = ["972543293155@c.us", "972586809911@c.us"];

class HR {
    //Handle user rest
    static async handleUserRest(client, message, restUsers) {
        const textMessage = message.body;
        const chatID = message.chat.id;
        const messageId = message.id;

        if (message.quotedMsg != null) {
            const responseAuthor = message.quotedMsg.author;
            const userID = message.sender.id;
            if (textMessage.startsWith("חסום גישה למשתמש")) {
                if (botDevs.includes(userID)) {
                    restUsers.push(responseAuthor);
                    await client.sendReplyWithMentions(chatID, "המשתמש @" + responseAuthor + "\n נחסם בהצלחה \n, May God have mercy on your soul", messageId);
                } else {
                    client.reply(chatID, "רק כבודו יכול לחסום אנשים", messageId);
                }
            }

            if (textMessage.startsWith("אפשר גישה למשתמש")) {
                if (botDevs.includes(userID)) {
                    const userIdIndex = restUsers.indexOf(responseAuthor);
                    restUsers.splice(userIdIndex, 1);
                    await client.sendReplyWithMentions(chatID, "המשתמש @" + responseAuthor + "\n שוחרר בהצלחה", messageId);
                } else {
                    await client.reply(chatID, "רק כבודו יכול לשחרר אנשים", messageId);
                }
            }
        }
    }
    //Handle group rest
    static async handleGroupRest(client, message, restGroups, restGroupsAuto) {
        const textMessage = message.body;
        const chatID = message.chat.id;
        const messageId = message.id;
        const responseGroupId = message.chat.id;
        const userID = message.sender.id;
        if (textMessage.startsWith("חסום קבוצה")) {
            if (botDevs.includes(userID)) {
                restGroups.push(responseGroupId);
                await client.reply(chatID, "הקבוצה נחסמה בהצלחה", messageId);
            } else {
                client.reply(chatID, "רק ארדואן בכבודו ובעצמו יכול לחסום קבוצות", messageId);
            }
        }

        if (textMessage.startsWith("שחרר קבוצה")) {
            if (botDevs.includes(userID)) {
                const groupIdIndex = restGroups.indexOf(responseGroupId);
                restGroups.splice(groupIdIndex, 1);
                restGroupsAuto.splice(groupIdIndex, 1);
                await client.reply(chatID, "הקבוצה שוחררה בהצלחה", messageId);
            } else {
                await client.reply(chatID, "רק ארדואן יכול לשחרר קבוצות", messageId);
            }
        }
    }
}

module.exports = HR;