const HDB = require("./HandleDB"), HL = require("./HandleLanguage");

class HB {
    static async checkBirthdays(client, usersDict) {
        const today = new Date();
        for (const person in usersDict) {
            if (usersDict[person].birthday[0] === today.getDate().toString() &&
                usersDict[person].birthday[1] === (today.getMonth() + 1).toString()) { //+1 'cause January is 0!
                const age = today.getFullYear() - parseInt(usersDict[person].birthday[2]);
                for (let group in usersDict[person].birthDayGroups) {
                    let stringForSending = HL.getGroupLang(group, usersDict[person].birthDayGroups[group].groupID,
                        "send_birthday_wishes", usersDict[person].personName, age)
                    await client.sendText(usersDict[person].birthDayGroups[group].groupID, stringForSending)
                }
            }
        }
    }

    static async addBirthday(client, bodyText, chatID, authorID, messageID, groupsDict, usersDict) {
        bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "add_birthday"), "");
        if (bodyText.includes("-")) {
            bodyText = bodyText.split("-");
            let fullBirthday = bodyText[1].trim();
            if (fullBirthday.split(".").length - 1 === 2) {
                fullBirthday = fullBirthday.split(".");
                const birthDay = fullBirthday[0].trim(), birthMonth = fullBirthday[1].trim(),
                    birthYear = fullBirthday[2].trim();
                if (birthDay <= 31 && birthMonth <= 12 && birthDay >= 0 && birthMonth >= 0 && typeof birthYear === "number") {
                    if (usersDict[authorID].doesBirthdayExist()) {
                        usersDict[authorID].birthday = ["push", birthDay, birthMonth, birthYear]
                        await HDB.addArgsToDB(authorID, birthDay, birthMonth, birthYear, "birthday", function () {
                            client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "add_birthday_reply",
                                usersDict[authorID].personName), messageID);
                        });
                    } else client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "add_birthday_error_already_exists",
                        usersDict[authorID].personName), messageID);
                } else client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "date_existence_error"), messageID);
            } else client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "date_syntax_error"), messageID);
        } else client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "hyphen_reply"), messageID);
    }

    static async remBirthday(client, bodyText, authorID, chatID, messageID, groupsDict, usersDict) {
        if (!usersDict[authorID].doesBirthdayExist()) {
            usersDict[authorID].birthday = ["delete"]
            await HDB.delArgsFromDB(authorID, null, "birthday", function () {
                client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "remove_birthday_reply",
                    usersDict[authorID].personName), messageID);
            });
        } else client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "remove_birthday_error_doesnt_exist"), messageID);
    }

    static async showBirthdays(client, chatID, messageID, groupsDict) {
        if (groupsDict[chatID].personsIn) {
            let stringForSending = "";
            for (const person in groupsDict[chatID].personsIn) {
                Object.entries(groupsDict[chatID].personsIn[person].birthday).forEach(([key, value]) => {
                    stringForSending += key + " - " + value[0] + "." + value[1] + "." + value[2] + "\n";
                });
            }
            await client.reply(chatID, stringForSending, messageID);
        } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "group_doesnt_have_birthdays_error"), messageID);
    }

    static async addCurrentGroupToBirthDayBroadcastList(client, bodyText, chatID, messageID, authorID, groupsDict, usersDict) {
        bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "add_group_birthDay"), "");
        if (groupsDict[chatID].birthDayGroups) {
            if (bodyText in usersDict && usersDict[bodyText].birthday && usersDict[authorID].doesBirthdayExist()) {
                usersDict[authorID].birthDayGroups = ["add", groupsDict[chatID]]
                await HDB.addArgsToDB(authorID, chatID, null, null, "groups_Of_BirthDays_Of_person", chatID, function () {
                    client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "birthDay_added_to_group_reply"), messageID);
                });
            } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "birthDay_added_to_group_error"), messageID);
        } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "personBirthDayGroups"), messageID);
    }

    static async remCurrentGroupFromBirthDayBroadcastList(client, bodyText, chatID, messageID, authorID, groupsDict, usersDict) {
        bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "remove_group_birthDay"), "");
        bodyText += "c.us"
        if (groupsDict[chatID].birthDayGroups) {
            if (bodyText in usersDict && usersDict[bodyText].birthday && usersDict[authorID].doesBirthdayExist()) {
                usersDict[chatID].birthDayGroups = ["rem", groupsDict[chatID]]
                await HDB.delArgsFromDB(authorID, null, "groups_Of_BirthDays_Of_person", function () {
                    client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "birthDay_removed_from_group_reply"), messageID);
                });
            } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "birthDay_removed_from_group_error"), messageID);
        } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "personBirthDayGroups"), messageID);
    }
}

module.exports = HB;