const HDB = require("./HandleDB"), HL = require("./HandleLanguage");

class HB {
    static async checkBirthdays(client, usersDict, groupsDict) {
        const today = new Date();
        for (const person in usersDict) {
            if (usersDict[person].birthday[0] === today.getDate().toString() &&
                usersDict[person].birthday[1] === (today.getMonth() + 1).toString()) { //+1 'cause January is 0!
                const age = today.getFullYear() - parseInt(usersDict[person].birthday[2]);
                for (let group in usersDict[person].birthDayGroups) {
                    let personTag = usersDict[person].personID;
                    personTag = personTag.replace("@c.us", "");
                    personTag = "@" + personTag;
                    let stringForSending = HL.getGroupLang(groupsDict, usersDict[person].birthDayGroups[group].groupID,
                        "birthday_wishes_reply", personTag, age)
                    await client.sendTextWithMentions(usersDict[person].birthDayGroups[group].groupID, stringForSending)
                }
            }
        }
    }

    static async addBirthday(client, bodyText, chatID, authorID, messageID, groupsDict, usersDict) {
        bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "add_birthday"), "");
        let fullBirthday = bodyText.trim();
        if (fullBirthday.split(".").length === 3) {
            fullBirthday = fullBirthday.split(".");
            const birthDay = fullBirthday[0].trim(), birthMonth = fullBirthday[1].trim(),
                birthYear = fullBirthday[2].trim();
            if (birthDay <= 31 && birthMonth <= 12 && birthYear <= 2100 && birthDay >= 0 && birthMonth >= 0) {
                let authorTag = authorID.replace("@c.us", "");
                authorTag = "@" + authorTag;
                if (!usersDict[authorID].doesBirthdayExist()) {
                    usersDict[authorID].birthday = ["add", birthDay, birthMonth, birthYear]
                    await HDB.addArgsToDB(authorID, birthDay, birthMonth, birthYear, "birthday", function () {
                        client.sendReplyWithMentions(chatID, HL.getGroupLang(groupsDict, chatID, "add_birthday_reply", authorTag), messageID);
                    });
                } else await client.sendReplyWithMentions(chatID, HL.getGroupLang(groupsDict, chatID, "add_birthday_already_exists_error",
                    authorTag), messageID);
            } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "date_existence_error"), messageID);
        } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "date_syntax_error"), messageID);
    }

    static async remBirthday(client, bodyText, authorID, chatID, messageID, groupsDict, usersDict) {
        let authorTag = authorID.replace("@c.us", "");
        authorTag = "@" + authorTag;
        if (usersDict[authorID].doesBirthdayExist()) {
            usersDict[authorID].birthday = ["delete"]
            await HDB.delArgsFromDB(authorID, null, "birthday", function () {
                client.sendReplyWithMentions(chatID, HL.getGroupLang(groupsDict, chatID, "remove_birthday_reply", authorTag), messageID);
            });
        } else client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "remove_birthday_doesnt_exist_error"), messageID);
    }

    static async showBirthdays(client, chatID, messageID, groupsDict, usersDict) {
        if (!!Object.keys(groupsDict[chatID].personsIn).length) {
            let stringForSending = "";
            for (const person in groupsDict[chatID].personsIn) {
                let birthdays = groupsDict[chatID].personsIn[person].birthday;
                if(birthdays.length !== 0) {
                    let tagID = groupsDict[chatID].personsIn[person].personID;
                    tagID = tagID.replace("@c.us", "");
                    tagID = "@" + tagID;
                    stringForSending += tagID + " - " + birthdays[0] + "." + birthdays[1] + "." + birthdays[2] + "\n";
                }
            }
            await client.sendReplyWithMentions(chatID, stringForSending, messageID);
        } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "group_doesnt_have_birthdays_error"), messageID);
    }

    static async addCurrentGroupToBirthDayBroadcastList(client, bodyText, chatID, messageID, authorID, groupsDict, usersDict) {
        if (usersDict[authorID].doesBirthdayExist()) {
                if(!(usersDict[authorID].birthDayGroups).includes(groupsDict[chatID])) {
                    usersDict[authorID].birthDayGroups = ["add", groupsDict[chatID]]
                    await HDB.addArgsToDB(chatID, authorID, null, null, "personBirthdayGroups", function () {
                        client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "birthday_added_to_group_reply"), messageID);
                    });
                } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "birthday_added_to_group_error"), messageID);
        } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "person_doesnt_have_birthday_groups_error"), messageID);
    }

    static async remCurrentGroupFromBirthDayBroadcastList(client, bodyText, chatID, messageID, authorID, groupsDict, usersDict) {
        if (usersDict[authorID].doesBirthdayExist()) {
            if((usersDict[authorID].birthDayGroups).includes(groupsDict[chatID])) {
                usersDict[authorID].birthDayGroups = ["delete", groupsDict[chatID]]
                await HDB.delArgsFromDB(chatID, authorID, "personBirthdayGroups", function () {
                    client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "birthday_removed_from_group_reply"), messageID);
                });
            } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "birthday_removed_from_group_error"), messageID);
        } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "person_doesnt_have_birthday_groups_error"), messageID);
    }
}

module.exports = HB;