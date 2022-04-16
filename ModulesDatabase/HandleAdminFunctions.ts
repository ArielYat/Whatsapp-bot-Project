import HDB from "./HandleDB.js";

const startupTime = new Date();

export default class HAF {
    static async handleUserRest(client, bodyText, chatID, messageID, quotedMsg, restPersons, restPersonsCommandSpam, person) {
        const personToBanID = quotedMsg ? quotedMsg.author : bodyText.match(/@\d+/i)[0].replace("@", "") + "@c.us";
        if (bodyText.match(/^\/Ban/i)) {
            restPersons.push(personToBanID);
            await HDB.delArgsFromDB("restArrayUsers", null, "rested", function () {
                HDB.addArgsToDB("restArrayUsers", restPersons, null, null, "rested", function () {
                    client.reply(chatID, "The user has been banned. \nMay God have mercy on your soul", messageID);
                });
            });
        } else if (bodyText.match(/^\/Unban/i)) {
            if (restPersons.includes(personToBanID) || restPersonsCommandSpam.includes(personToBanID)) {
                restPersons.splice(restPersons.indexOf(personToBanID), 1);
                await HDB.delArgsFromDB("restArrayUsers", null, "rested", function () {
                    HDB.addArgsToDB("restArrayUsers", restPersons, null, null, "rested", function () {
                        person.autoBanned = null;
                        person.commandCounter = 0;
                        restPersonsCommandSpam.splice(restPersonsCommandSpam.indexOf(personToBanID), 1);
                        client.reply(chatID, "The user has been unbanned.", messageID);
                    });
                });
            } else client.reply(chatID, "This user isn't banned.", messageID);
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
            if (restGroups.includes(chatID)) {
                restGroups.splice(restGroups.indexOf(chatID), 1);
                await HDB.delArgsFromDB("restArrayGroups", null, "rested", function () {
                    HDB.addArgsToDB("restArrayGroups", restGroups, null, null, "rested", function () {
                        group.autoBanned = null;
                        group.filterCounter = 0;
                        restGroupsFilterSpam.splice(restGroupsFilterSpam.indexOf(chatID), 1);
                        client.reply(chatID, "The group has been unblocked.", messageID);
                    });
                });
            } else client.reply(chatID, "This group isn't blocked.", messageID);
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

    static async ping(client, message, bodyText, chatID, messageID, groupsDict, usersDict, restGroups, restPersons, restGroupsFilterSpam, restPersonsCommandSpam) {
        const currentTime = new Date();
        const timeSinceStartup = new Date(currentTime.getTime() - startupTime.getTime());
        const ping = "זמן התגובה של ג'קסון בשניות בקירוב: " + ((currentTime.getTime() / 1000) - message.timestamp.toString()).toFixed(3).toString();
        const currentChatAmount = "כמות צ'טים נוכחית: " + (await client.getAllChats()).length.toString();
        const totalGroupAmount = "כמות צ'טים סך הכל: " + (Object.keys(groupsDict).length).toString();
        const totalPersonAmount = "כמות משתמשים סך הכל: " + (Object.keys(usersDict).length).toString();
        const currentMutedGroupAmount = "קבוצות מושתקות כעת: " + (restGroups.length + restGroupsFilterSpam.length).toString();
        const currentMutedPersonAmount = "משתמשים מושתקים כעת: " + (restPersons.length + restPersonsCommandSpam.length).toString();
        const timeSinceStartupString = "זמן מאז ההדלקה האחרונה: "
            + ((timeSinceStartup.getUTCDate()) - 1).toString() + " ימים, " +
            +timeSinceStartup.getUTCHours().toString() + " שעות, "
            + timeSinceStartup.getUTCMinutes().toString() + " דקות, "
            + timeSinceStartup.getUTCSeconds().toString() + " שניות";
        await client.reply(chatID, `${ping}\n${currentChatAmount}\n${totalGroupAmount}\n${totalPersonAmount}\n${currentMutedGroupAmount}\n${currentMutedPersonAmount}\n${timeSinceStartupString}`, messageID);
    }

    // noinspection JSUnusedLocalSymbols
    static async execute(client, bodyText, message, chatID, messageID, groupsDict, usersDict, restGroups, restPersons, restGroupsFilterSpam, restPersonsCommandSpam, botDevs, HURL, HF, HT, HB, HSt, HAF, HL, HSu, HP, HAPI, HW, HUS, HR, HAFK, Group, Person, Strings) {
        try {
            await eval("(async () => {" + bodyText.replace("/exec", "") + "})()");
            await client.reply(chatID, "הפקודה שהרצת בוצעה בהצלחה", messageID);
        } catch (err) {
            await client.reply(chatID, `שגיאה קרתה במהלך ביצוע הפקודה; להלן השגיאה: \n ${err.toString()}`, messageID);
        }
    }
}
