import {HL} from "./HandleLanguage.js";
import {HDB} from "./HandleDB.js";

export class HA {
    static async afkOn(client, chatID, messageID, authorID, groupsDict, usersDict, afkPersons) {
        const person = usersDict[authorID];
        if (!person.afk && !(afkPersons.includes(authorID))) {
            person.afk = new Date();
            await afkPersons.push(authorID);
            await HDB.addArgsToDB(authorID, person.afk, null, null, "afk", function () {
            });
            await HDB.delArgsFromDB("afkPersons", null, "rested", function () {
                HDB.addArgsToDB("afkPersons", afkPersons, null, null, "rested", function () {
                    client.sendReplyWithMentions(chatID, HL.getGroupLang(groupsDict, chatID, "afk_reply", authorID.replace("@c.us", "")), messageID);
                });
            });
        }
    }

    static async afkOff(client, chatID, messageID, authorID, groupsDict, usersDict, afkPersons) {
        const person = usersDict[authorID];
        if (!!person.afk && afkPersons.includes(authorID)) {
            person.afk = null;
            afkPersons.splice(afkPersons.indexOf(authorID), 1);
            await HDB.delArgsFromDB(authorID, null, "afk", function () {
            });
            await HDB.delArgsFromDB("afkPersons", null, "rested", function () {
                HDB.addArgsToDB("afkPersons", afkPersons, null, null, "rested", function () {
                    if (person.messagesTaggedIn[chatID] === undefined)
                        person.messagesTaggedIn[chatID] = [];
                    client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "afk_off_reply", person.messagesTaggedIn[chatID].length.toString()), messageID);
                });
            });
        }
    }

    static async afkPersonTagged(client, chatID, messageID, taggedID, afkPersons, groupsDict, usersDict) {
        if (afkPersons.includes(taggedID)) {
            const group = groupsDict[chatID], person = usersDict[taggedID];
            let tempPhoneNumber = taggedID.replace("@c.us", "");
            if (group.tags.length !== 0) {
                for (const name in group.tags) {
                    if (group.tags[name] === tempPhoneNumber)
                        tempPhoneNumber = name;
                }
            }
            const afkDate = person.afk.getDate().toString() + "." + (person.afk.getMonth() + 1).toString() + "." + person.afk.getFullYear().toString();
            const afkTime = person.afk.getHours() < 10 ? "0" + person.afk.getHours().toString() : person.afk.getHours().toString() + ":" + (person.afk.getMinutes() < 10 ? "0" + person.afk.getMinutes().toString() : person.afk.getMinutes().toString());
            await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "afk_tagged_reply", tempPhoneNumber, afkDate, afkTime), messageID);
        }
    }

}