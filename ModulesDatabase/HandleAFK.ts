import HL from "./HandleLanguage.js";
import HDB from "./HandleDB.js";

export default class HAFK {
    static async afkOn(client, chatID, messageID, authorID, groupsDict, usersDict, afkPersons) {
        if (!usersDict[authorID].afk && !(afkPersons.includes(authorID))) {
            const afkDate = new Date();
            await HDB.addArgsToDB(authorID, afkDate, null, null, "afk", function () {
                usersDict[authorID].afk = afkDate;
                afkPersons.push(authorID);
            });
            await HDB.delArgsFromDB("afkPersons", null, "rested", async function () {
                await HDB.addArgsToDB("afkPersons", afkPersons, null, null, "rested", async function () {
                    await client.sendReplyWithMentions(chatID, await HL.getGroupLang(groupsDict, chatID, "afk_reply", authorID.replace("@c.us", "")), messageID);
                });
            });
        }
    }

    static async afkOff(client, chatID, messageID, authorID, groupsDict, usersDict, afkPersons) {
        const person = usersDict[authorID];
        if (!!person.afk && afkPersons.includes(authorID)) {
            await HDB.delArgsFromDB(authorID, null, "afk", function () {
                person.afk = null;
                afkPersons.splice(afkPersons.indexOf(authorID), 1);
            });
            await HDB.delArgsFromDB("afkPersons", null, "rested", function () {
                HDB.addArgsToDB("afkPersons", afkPersons, null, null, "rested", async function () {
                    if (person.messagesTaggedIn[chatID] === undefined)
                        person.messagesTaggedIn[chatID] = [];
                    client.reply(chatID, (await HL.getGroupLang(groupsDict, chatID, "afk_off_reply", person.messagesTaggedIn[chatID].length.toString())), messageID);
                });
            });
        }
    }

    static async afkPersonTagged(client, chatID, messageID, taggedID, afkPersons, groupsDict, usersDict) {
        if (afkPersons.includes(taggedID)) {
            const group = groupsDict[chatID], person = usersDict[taggedID];
            const currentTime = new Date();
                const afkDate = person.afk.getDate().toString() + "." + (person.afk.getMonth() + 1).toString() + "." + person.afk.getFullYear().toString(),
                afkTime = person.afk.getHours() < 10 ? "0" + person.afk.getHours().toString() : person.afk.getHours().toString() + ":" + (person.afk.getMinutes() < 10 ? "0" + person.afk.getMinutes().toString() : person.afk.getMinutes().toString()),
                hoursSinceAFK = (currentTime.getTime() - person.afk.getTime()) / 3600;
            let tempPhoneNumber = taggedID.replace("@c.us", "");
            if (group.tags.length !== 0) {
                for (const name in group.tags) {
                    if (group.tags[name] === tempPhoneNumber) {
                        tempPhoneNumber = name;
                        break;
                    }
                }
            }
            await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "afk_tagged_reply", tempPhoneNumber, hoursSinceAFK, afkDate, afkTime), messageID);
        }
    }
}