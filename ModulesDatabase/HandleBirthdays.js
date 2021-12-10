const group = require("../Group"), HDB = require("./HandleDB"), HL = require("./HandleLanguage");

class HB {
    static async checkBirthday(client, groupsDict) {
        const today = new Date();
        const dayToday = today.getDate();
        const monthToday = today.getMonth() + 1; //+1 'cause January is 0!
        const yearToday = today.getFullYear();

        for (let group in groupsDict) {
            let currentGroup = groupsDict[group];
            for (let person in currentGroup.birthdays) {
                if (currentGroup.birthdays[person][0] == dayToday && currentGroup.birthdays[person][1] == monthToday) {
                    let age = yearToday - parseInt(currentGroup.birthdays[person][2]);
                    let stringForSending = HL.getGroupLang(groupsDict, currentGroup.groupID, "send_birthday", person, age)
                    await client.sendText(currentGroup.groupID, stringForSending)
                }
            }
        }
    }

    static async addBirthday(client, bodyText, chatID, messageID, groupsDict) {
        bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "add_birthday"), "");
        if (bodyText.includes("-")) {
            bodyText = bodyText.split("-");
            const name = bodyText[0].trim();
            let fullBirthday = bodyText[1].trim();
            if (fullBirthday.includes(".")) {
                fullBirthday = fullBirthday.split(".");
                const birthDay = fullBirthday[0].trim();
                const birthMonth = fullBirthday[1].trim();
                const birthYear = fullBirthday[2].trim();
                //make new group and insert name + birthday if group isn't in DB otherwise just insert name and birthday
                if (!(chatID in groupsDict)) {
                    groupsDict[chatID] = new group(chatID);
                }
                //check if name exists in DB if it does return false otherwise add name to DB
                if (birthDay <= 31 && birthMonth <= 12 && birthYear <= 2020 && birthDay >= 0 && birthMonth >= 0 && birthYear >= 1900) {
                    if (groupsDict[chatID].addBirthday(name, birthDay, birthMonth, birthYear)) {
                        await HDB.addArgsToDB(name, birthDay, birthMonth, birthYear, chatID, "birthday", function () {
                            client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "add_birthday_reply", name), messageID);
                        });
                    } else client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "add_birthday_already_exists", name), messageID);
                } else client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "date_existence_error"), messageID);
            } else client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "date_syntax_error"), messageID);
        } else client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "hyphen"), messageID);
    }

    static async remBirthday(client, bodyText, chatID, messageID, groupsDict) {
        bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "remove_birthday"), "");
        const name = bodyText.trim();
        if (chatID in groupsDict) {
            if (groupsDict[chatID].delBirthday(name)) {
                await HDB.delArgsFromDB(name, chatID, "birthday", function () {
                    client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "remove_birthday_reply", name), messageID);
                });
            } else client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "remove_birthday_doesnt_exist"), messageID);
        } else client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "group_doesnt_have_birthdays"), messageID);
    }

    static async showBirthdays(client, chatID, messageID, groupsDict) {
        if (chatID in groupsDict) {
            let stringForSending = "";
            let birthdays = groupsDict[chatID].birthdays;
            Object.entries(birthdays).forEach(([key, value]) => {
                stringForSending += key + " - " + value[0] + "." + value[1] + "." + value[2] + "\n";
            });
            await client.reply(chatID, stringForSending, messageID);
        }
    }
}

module.exports = HB;