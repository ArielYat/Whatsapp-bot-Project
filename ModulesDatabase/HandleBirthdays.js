import {HDB} from "./HandleDB.js";
import {HL} from "./HandleLanguage.js";

export class HB {
    static async checkBirthdays(client, usersDict, groupsDict) {
        const today = new Date();
        const dayToday = today.getDate().toString(), monthToday = (today.getMonth() + 1).toString(),
            yearToday = today.getFullYear();
        for (const person in usersDict) {
            if (usersDict[person].birthday[0] === dayToday && usersDict[person].birthday[1] === monthToday) {
                const age = yearToday - parseInt(usersDict[person].birthday[2]);
                for (let group in usersDict[person].birthDayGroups) {
                    let personTag = usersDict[person].personID;
                    personTag = "@" + personTag.replace("@c.us", "");
                    let stringForSending = HL.getGroupLang(groupsDict, usersDict[person].birthDayGroups[group].groupID,
                        "birthday_wishes_reply", personTag, age)
                    try {
                        await client.sendTextWithMentions(usersDict[person].birthDayGroups[group].groupID, stringForSending)
                    } catch (e) {
                        console.log("error occurred during sending birthday");
                    }
                }
            }
        }
    }

    static async addBirthday(client, bodyText, chatID, authorID, messageID, groupsDict, usersDict) {
        bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "add_birthday"), "");
        let fullBirthday = bodyText.trim();
        if (fullBirthday.split(".").length === 3) {
            fullBirthday = fullBirthday.split(".");
            const birthDay = fullBirthday[0].trim(), birthMonth = fullBirthday[1].trim(), birthYear = fullBirthday[2].trim();
            if (birthDay <= 31 && birthMonth <= 12 && birthYear <= 2100 && birthDay >= 0 && birthMonth >= 0) {
                let authorTag = "@" + authorID.replace("@c.us", "");
                if (!usersDict[authorID].birthday.length) {
                    await HDB.addArgsToDB(authorID, birthDay, birthMonth, birthYear, "birthday", function () {
                        usersDict[authorID].birthday = ["add", birthDay, birthMonth, birthYear];
                        client.sendReplyWithMentions(chatID, HL.getGroupLang(groupsDict, chatID, "add_birthday_reply", authorTag), messageID);
                    });
                } else await client.sendReplyWithMentions(chatID, HL.getGroupLang(groupsDict, chatID, "add_birthday_already_exists_error", authorTag), messageID);
            } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "date_existence_error"), messageID);
        } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "date_syntax_error"), messageID);
    }

    static async remBirthday(client, bodyText, authorID, chatID, messageID, groupsDict, usersDict) {
        let authorTag = "@" + authorID.replace("@c.us", "");
        if (!!usersDict[authorID].birthday.length) {
            await HDB.delArgsFromDB(authorID, null, "birthday", function () {
                usersDict[authorID].birthday = ["delete"];
                client.sendReplyWithMentions(chatID, HL.getGroupLang(groupsDict, chatID, "remove_birthday_reply", authorTag), messageID);
            });
        } else client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "remove_birthday_doesnt_exist_error"), messageID);
    }

    static async showBirthdays(client, chatID, messageID, groupsDict) {
        const group = groupsDict[chatID];
        if (Object.keys(group.personsIn).length) {
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
        } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "group_doesnt_have_birthdays_error"), messageID);
    }

    static async addCurrentGroupToBirthDayBroadcastList(client, bodyText, chatID, messageID, authorID, groupsDict, usersDict) {
        if (!!usersDict[authorID].birthday.length) {
            if (!(usersDict[authorID].birthDayGroups).includes(groupsDict[chatID])) {
                await HDB.addArgsToDB(chatID, authorID, null, null, "personBirthdayGroups", function () {
                    usersDict[authorID].birthDayGroups = ["add", groupsDict[chatID]];
                    client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "birthday_added_to_group_reply"), messageID);
                });
            } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "birthday_added_to_group_error"), messageID);
        } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "person_doesnt_have_birthday_error"), messageID);
    }

    static async remCurrentGroupFromBirthDayBroadcastList(client, bodyText, chatID, messageID, authorID, groupsDict, usersDict) {
        if (!!usersDict[authorID].birthday.length) {
            if ((usersDict[authorID].birthDayGroups).includes(groupsDict[chatID])) {
                await HDB.delArgsFromDB(chatID, authorID, "personBirthdayGroups", function () {
                    usersDict[authorID].birthDayGroups = ["delete", groupsDict[chatID]];
                    client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "birthday_removed_from_group_reply"), messageID);
                });
            } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "birthday_removed_from_group_error"), messageID);
        } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "person_doesnt_have_birthday_error"), messageID);
    }
}