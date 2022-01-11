const HDB = require("./HandleDB")

class HAF {
    static async handleUserRest(client, bodyText, chatID, messageID, quotedMsg, restUsers, restUsersCommandSpam, user) {
        if (quotedMsg) {
            const quotedMsgAuthor = quotedMsg.author
            if (bodyText.startsWith("חסום גישה למשתמש")) {
                await HDB.delArgsFromDB("restArrayUsers", null, "rested", function () {
                    HDB.addArgsToDB("restArrayUsers", restUsers, null, null, "rested", function () {
                        restUsers.push(quotedMsgAuthor);
                        client.sendReplyWithMentions(chatID, "המשתמש @" + quotedMsgAuthor + " נחסם בהצלחה, \n May God have mercy on your soul", messageID);
                    });
                });
            }
            if (bodyText.startsWith("אפשר גישה למשתמש")) {
                await HDB.delArgsFromDB("restArrayUsers", null, "rested", function () {
                    HDB.addArgsToDB("restArrayUsers", restUsers, null, null, "rested", function () {
                        restUsers.splice(restUsers.indexOf(quotedMsgAuthor), 1);
                        restUsersCommandSpam.splice(restUsersCommandSpam.indexOf(quotedMsgAuthor), 1);
                        user.commandCounter = 0;
                        client.sendReplyWithMentions(chatID, "המשתמש @" + quotedMsgAuthor + " שוחרר בהצלחה", messageID);
                    });
                });
            }
        }
    }

    static async handleGroupRest(client, bodyText, chatID, messageID, restGroups, restGroupsSpam, group) {
        if (bodyText.startsWith("חסום קבוצה")) {
            await HDB.delArgsFromDB("restArrayGroups", null, "rested", function () {
                HDB.addArgsToDB("restArrayGroups", restGroups, null, null, "rested", function () {
                    restGroups.push(chatID);
                    client.reply(chatID, "הקבוצה נחסמה בהצלחה", messageID);
                });
            });
        }
        if (bodyText.startsWith("שחרר קבוצה")) {
            await HDB.delArgsFromDB("restArrayGroups", null, "rested", function () {
                HDB.addArgsToDB("restArrayGroups", restGroups, null, null, "rested", function () {
                    restGroups.splice(restGroups.indexOf(chatID), 1);
                    restGroupsSpam.splice(restGroupsSpam.indexOf(chatID), 1);
                    group.filterCounter = 0;
                    client.reply(chatID, "הקבוצה שוחררה בהצלחה", messageID);
                });
            });
        }
    }

    static async handleBotJoin(client, bodyText, chatID, messageID) {
        const urlsInMessage = bodyText.match(/(([hH])ttps?:\/\/chat\.whatsapp\.com\/(.)+)/g);
        if (urlsInMessage) {
            try {
                let URL = urlsInMessage[0];
                await client.joinGroupViaLink(URL);
            } catch (err) {
                await client.reply(chatID, "אני חושב שהקישור לא בתוקף", messageID);
            }
        } else await client.reply(chatID, "מאסטר! הההודעה הזו לא מכילה קישור לקבוצה!", messageID);
    }

    static async ping(client, bodyText, chatID, messageID, groupsDict, usersDict, restGroups, restUsers, restGroupsFilterSpam, restUsersCommandSpam) {
        const groupAmount = "כמות קבוצות סך הכל: " + (Object.keys(groupsDict).length).toString();
        const userAmount = "כמות משתמשים סך הכל: " + (Object.keys(usersDict).length).toString();
        const mutedGroups = "קבוצות מושתקות כעת: " + (restGroups.length + restGroupsFilterSpam.length).toString();
        const mutedUsers = "משתמשים מושתקים כעת: " + (restUsers.length + restUsersCommandSpam.length).toString();
        await client.reply(chatID, `${groupAmount}\n${userAmount}\n${mutedGroups}\n${mutedUsers}`, messageID);
    }

    static async execute(client, bodyText, message, chatID, messageID, groupsDict, usersDict, restGroups, restUsers, restGroupsFilterSpam, restUsersCommandSpam, botDevs) {
        try {
            eval(bodyText.replace("/exec", ""));
            await client.reply(message.chat.id, "הפקודה שהרצת בוצעה בהצלחה", message.id);
        } catch (err) {
            await client.reply(message.chat.id, `שגיאה קרתה במהלך ביצוע הפקודה; להלן השגיאה: \n ${err.toString()} `, message.id);
        }
    }
}

module.exports = HAF;
