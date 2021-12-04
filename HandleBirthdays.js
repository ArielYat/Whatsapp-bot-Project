const group = require("./Group");
const HDB = require("./HandleDB");
const stringsHelp = require("./StringLang");

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
                    let age = parseInt(currentGroup.birthdays[person][2]) - yearToday;
                    let stringForSending = stringsHelp.getGroupLang(groupsDict, currentGroup.groupID,
                        "send_birthday", person, age)
                    await client.sendText(currentGroup.groupID, stringForSending)
                }
            }
        }
    }
    static async addBirthday(client, bodyText, chatID, messageID, groupsDict) {
        bodyText = bodyText.replace(stringsHelp.getGroupLang(groupsDict, chatID, "add_birthDay"), "");
        if (bodyText.includes("-")) {
            bodyText = bodyText.split("-");
            const name = bodyText[0].trim();
            let fullBirthday = bodyText[1].trim();
            if (fullBirthday.includes(".")) {
                fullBirthday = fullBirthday.split(".");
                const birthDay = fullBirthday[0].trim();
                const BirthMonth = fullBirthday[1].trim();
                const BirthYear = fullBirthday[2].trim();
                //make new group and insert name + birthday if group isn't in DB otherwise just insert name and birthday
                if (!(chatID in groupsDict)) {
                    groupsDict[chatID] = new group(chatID);
                }
                //check if name exists in DB if it does return false otherwise add name to DB
                if (birthDay <= 31 && BirthMonth <= 12 && birthDay >= 0 && BirthMonth >= 0
                    && birthDay >= 1900 && birthDay <= 2020) {
                    if (groupsDict[chatID].addBirthday(name, birthDay, BirthMonth, BirthYear)) {
                        await HDB.addArgsToDB(name, birthDay, BirthMonth, BirthYear, chatID, "birthday", function () {
                            client.reply(chatID, stringsHelp.getGroupLang(groupsDict, chatID,
                                "add_birthday_reply", name), messageID);
                        });
                    } else {
                        client.reply(chatID, stringsHelp.getGroupLang(groupsDict, chatID,
                            "add_birthday_already_exists", name), messageID);
                    }
                }
                else {
                    client.reply(chatID, stringsHelp.getGroupLang(groupsDict, chatID,
                        "date_existence"), messageID);
                }
            }
            else {
                client.reply(chatID, stringsHelp.getGroupLang(groupsDict, chatID,
                    "date_syntax"), messageID);
            }
        }
        else {
            client.reply(chatID, stringsHelp.getGroupLang(groupsDict, chatID,
                "hyphen"), messageID);
        }
    }
    static async remBirthday(client, bodyText, chatID, messageID, groupsDict) {
        bodyText = bodyText.replace(stringsHelp.getGroupLang(groupsDict, chatID, "remove_birthDay"), "");
        const name = bodyText.trim();
        if (chatID in groupsDict) {
            if (groupsDict[chatID].delBirthday(name)) {
                await HDB.delArgsFromDB(name, chatID, "birthday", function () {
                    client.reply(chatID, stringsHelp.getGroupLang(groupsDict, chatID,
                        "remove_birthDay_reply", name), messageID);
                });
            }
            else {
                client.reply(chatID, stringsHelp.getGroupLang(groupsDict, chatID,
                    "remove_birthday_doesnt_exist"), messageID);
            }
        }
        else {
            client.reply(chatID, stringsHelp.getGroupLang(groupsDict, chatID,
                "group_doesnt_have_birthdays"), messageID);
        }
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