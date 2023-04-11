import HDB from "./HandleDB.js";
import HL from "./HandleLanguage.js";

export default class HB {
    static async checkBirthdays(client, usersDict, groupsDict) {
        const today = new Date();
        const dayToday = today.getDate().toString(), monthToday = (today.getMonth() + 1).toString(),
            yearToday = today.getFullYear();
        for (const person in usersDict) {
            if (usersDict[person].birthday[0] === dayToday && usersDict[person].birthday[1] === monthToday) {
                const age = yearToday - parseInt(usersDict[person].birthday[2]);
                for (let group in usersDict[person].birthDayGroups) {
                    const personTag = "@" + usersDict[person].personID.replace("@c.us", "");
                    const stringForSending = await HL.getGroupLang(groupsDict, usersDict[person].birthDayGroups[group].groupID,
                        "birthday_wishes_reply", personTag, age);
                    try {
                        await client.sendTextWithMentions(usersDict[person].birthDayGroups[group].groupID, stringForSending);
                    } catch (err) {
                        console.log("error occurred while sending happy birbday");
                    }
                }
            }
        }
    }

    static async addBirthday(client, bodyText, chatID, authorID, messageID, groupsDict, usersDict) {
        bodyText = bodyText.replace(await HL.getGroupLang(groupsDict, chatID, "add_birthday"), "");
        const fullBirthday = bodyText.trim().split(".");
        if (fullBirthday.length !== 3) {
            await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "date_syntax_error"), messageID);
            return;
        }

        const birthDay = fullBirthday[0].trim(), birthMonth = fullBirthday[1].trim(),
            birthYear = fullBirthday[2].trim();
        if (!(birthDay <= 31 && birthMonth <= 12 && birthYear <= 2100 && birthDay >= 0 && birthMonth >= 1)) {
            await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "date_existence_error"), messageID);
            return;
        }
        if (!(birthMonth == 2 && birthDay <= 29)) {
            await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "february_date_error"), messageID);
            return;
        }

        const authorTag = "@" + authorID.replace("@c.us", "");
        if (!usersDict[authorID].birthday.length) {
            await HDB.addArgsToDB(authorID, birthDay, birthMonth, birthYear, "birthday", async function () {
                usersDict[authorID].birthday = ["add", birthDay, birthMonth, birthYear];
                await client.sendReplyWithMentions(chatID, await HL.getGroupLang(groupsDict, chatID, "add_birthday_reply", authorTag), messageID);
            });
        } else await client.sendReplyWithMentions(chatID, await HL.getGroupLang(groupsDict, chatID, "add_birthday_already_exists_error", authorTag), messageID);
    }

    static async remBirthday(client, bodyText, authorID, chatID, messageID, groupsDict, usersDict) {
        const authorTag = "@" + authorID.replace("@c.us", "");
        if (!!usersDict[authorID].birthday.length) {
            await HDB.delArgsFromDB(authorID, null, "birthday", async function () {
                usersDict[authorID].birthday = ["delete"];
                await client.sendReplyWithMentions(chatID, await HL.getGroupLang(groupsDict, chatID, "remove_birthday_reply", authorTag), messageID);
            });
        } else client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "remove_birthday_doesnt_exist_error"), messageID);
    }

    static async showBirthdays(client, chatID, messageID, groupsDict) {
        const group = groupsDict[chatID];
        if (!Object.keys(group.personsIn).length) {
            await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "group_doesnt_have_birthdays_error"), messageID);
            return;
        }
        let stringForSending = "";
        for (let i = 0; i < group.personsIn.length; i++) {
            const person = group.personsIn[i];
            const birthday = person.birthday;
            let tempPhoneNumber = person.personID.replace("@c.us", "");
            if (group.tags.length !== 0) {
                for (const name in group.tags) {
                    if (group.tags[name] === tempPhoneNumber)
                        tempPhoneNumber = name;
                }
            }
            if (birthday.length !== 0)
                stringForSending += tempPhoneNumber + " - " + birthday[0] + "." + birthday[1] + "." + birthday[2] + "\n";
        }
        await client.reply(chatID, stringForSending, messageID);
    }

    static async addCurrentGroupToBirthDayBroadcastList(client, bodyText, chatID, messageID, authorID, groupsDict, usersDict) {
        if (!usersDict[authorID].birthday.length) {
            await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "person_doesnt_have_birthday_error"), messageID);
            return;
        }
        if ((usersDict[authorID].birthDayGroups).includes(groupsDict[chatID])) {
            await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "birthday_added_to_group_error"), messageID);
            return;
        }
        await HDB.addArgsToDB(chatID, authorID, null, null, "personBirthdayGroups", async function () {
            usersDict[authorID].birthDayGroups = ["add", groupsDict[chatID]];
            client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "birthday_added_to_group_reply"), messageID);
        });
    }

    static async remCurrentGroupFromBirthDayBroadcastList(client, bodyText, chatID, messageID, authorID, groupsDict, usersDict) {
        if (!usersDict[authorID].birthday.length) {
            await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "person_doesnt_have_birthday_error"), messageID);
            return;
        }
        if (!(usersDict[authorID].birthDayGroups).includes(groupsDict[chatID])) {
            await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "birthday_removed_from_group_error"), messageID);
            return;
        }
        await HDB.delArgsFromDB(chatID, authorID, "personBirthdayGroups", async function () {
            usersDict[authorID].birthDayGroups = ["delete", groupsDict[chatID]];
            client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "birthday_removed_from_group_reply"), messageID);
        });
    }
}