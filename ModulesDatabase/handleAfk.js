import {HL} from "./HandleLanguage.js";
import {HDB} from "./HandleDB.js";

export class HA {
    static async handleAfk(client, person, chatID, groupsDict, messageID, afkPersons) {
        if (person.afk === null && !(afkPersons.includes(person.personID))) {
            person.afk = await new Date();
            await afkPersons.push(person.personID);
            await HDB.addArgsToDB(person.personID, person.afk, null, null, "afk", function () {
            });
            await HDB.delArgsFromDB("afkPersons", null, "rested", function () {
                HDB.addArgsToDB("afkPersons", afkPersons, null, null, "rested", function () {
                    client.sendReplyWithMentions(chatID, HL.getGroupLang(groupsDict, chatID, "afk_reply", person.personID.replace("@c.us", "")), messageID);
                });
            });
        }
    }

    static async afkOff(client, person, chatID, groupsDict, messageID, afkPersons) {
        if (person.afk !== null && afkPersons.includes(person.personID)) {
            person.afk = await null;
            afkPersons.splice(afkPersons.indexOf(person.personID), 1);
            await HDB.delArgsFromDB(person.personID, null, "afk", function () {
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

    static async handleAfkTagged(client, chatID, afkPersons, taggedID, groupsDict, usersDict, messageID) {
        if (afkPersons.includes(taggedID)) {
            const group = groupsDict[chatID];
            const person = usersDict[taggedID];
            let tempPhoneNumber = person.personID.replace("@c.us", "");
            if (group.tags.length !== 0) {
                for (const name in group.tags) {
                    if (group.tags[name] === tempPhoneNumber)
                        tempPhoneNumber = name;
                }
            }
            const dateOfAfk = person.afk.getDate().toString() + "." + (person.afk.getMonth() + 1).toString() + "." + person.afk.getFullYear().toString();
            const timeOfAfk = person.afk.getHours() < 10 ? "0" + person.afk.getHours().toString() : person.afk.getHours().toString() + ":" + (person.afk.getMinutes() < 10 ? "0" + person.afk.getMinutes().toString() : person.afk.getMinutes().toString());
            const dateSleep = HL.getGroupLang(groupsDict, chatID, "afk_tagged_reply_date", dateOfAfk, timeOfAfk);
            await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "afk_tagged_reply", tempPhoneNumber, dateSleep), messageID);
        }
    }

}