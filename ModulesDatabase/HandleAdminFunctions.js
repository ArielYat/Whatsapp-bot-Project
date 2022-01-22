import {HDB} from "./HandleDB.js";

export class HAF {
     static async handleUserRest(client, bodyText, chatID, messageID, quotedMsg, restPersons, restPersonsCommandSpam, person) {
        const personToBan = quotedMsg ? quotedMsg.author : bodyText.match(/@\d+/i)[0].replace("@", "") + "@c.us";
        if (bodyText.match(/^\/Ban/i)) {
            restPersons.push(personToBan);
            await HDB.delArgsFromDB("restArrayUsers", null, "rested", function () {
                HDB.addArgsToDB("restArrayUsers", restPersons, null, null, "rested", function () {
                    client.reply(chatID, "The user has been banned. \nMay God have mercy on your soul", messageID);
                });
            });
        } else if (bodyText.match(/^\/Unban/i)) {
            restPersons.splice(restPersons.indexOf(personToBan), 1);
            await HDB.delArgsFromDB("restArrayUsers", null, "rested", function () {
                HDB.addArgsToDB("restArrayUsers", restPersons, null, null, "rested", function () {
                    person.autoBanned = null;
                    person.commandCounter = 0;
                    restPersonsCommandSpam.splice(restPersonsCommandSpam.indexOf(personToBan), 1);
                    client.reply(chatID, "The user has been unbanned.", messageID);
                });
            });
        }
    }

    static async handleGroupRest(client, bodyText, chatID, messageID, restGroups, restGroupsFilterSpam, group) {
        if (bodyText.match(/^\/Block group/i)) {
            restGroups.push(chatID);
            await HDB.delArgsFromDB("restArrayGroups", null, "rested", function () {
                HDB.addArgsToDB("restArrayGroups", restGroups, null, null, "rested", function () {
                    client.reply(chatID, "The group has been blocked. \nSuck it idiots", messageID);
                });
            });
        } else if (bodyText.match(/^\/Unblock group/i)) {
            restGroups.splice(restGroups.indexOf(chatID), 1);
            await HDB.delArgsFromDB("restArrayGroups", null, "rested", function () {
                HDB.addArgsToDB("restArrayGroups", restGroups, null, null, "rested", function () {
                    group.autoBanned = null;
                    group.filterCounter = 0;
                    restGroupsFilterSpam.splice(restGroupsFilterSpam.indexOf(chatID), 1);
                    client.reply(chatID, "The group has been unblocked.", messageID);
                });
            });
        }
    }

    static async handleBotJoin(client, bodyText, chatID, messageID) {
        const urlsInMessage = bodyText.match(/(([hH])ttps?:\/\/chat\.whatsapp\.com\/(.)+)/g);
        if (urlsInMessage) {
            try {
                await client.joinGroupViaLink(urlsInMessage[0]);
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

    // noinspection JSUnusedLocalSymbols
    static async execute(client, bodyText, message, chatID, messageID, groupsDict, usersDict, restGroups, restPersons, restGroupsFilterSpam, restPersonsCommandSpam, botDevs, HURL, HF, HT, HB, HSt, HAF, HL, HSu, HP, HAPI, HW, HUS, HR, Group, Person, Strings) {
        try {
            await eval("(async () => {" + bodyText.replace("/exec", "") + "})()");
            await client.reply(message.chat.id, "הפקודה שהרצת בוצעה בהצלחה", message.id);
        } catch (err) {
            await client.reply(message.chat.id, `שגיאה קרתה במהלך ביצוע הפקודה; להלן השגיאה: \n ${err.toString()} `, message.id);
        }
    }
}