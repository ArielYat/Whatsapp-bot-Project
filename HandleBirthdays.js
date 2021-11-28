const group = require("./group");
const HDB = require("./HandleDB");

class HB {
    static async addBirthday(client, bodyText, chatID, messageID, groupsDict) {
        bodyText = bodyText.replace("הוסף יום הולדת", "");
        if (bodyText.includes("-")) {
            bodyText = bodyText.split("-");
            const tag = bodyText[0].trim();
            const fullbirthday = bodyText[1].trim();
            if (fullbirthday.includes(".")) {
                fullbirthday.fullbirthday.split(".");
                const birthday = fullbirthday[0].trim();
                const birthmonth = fullbirthday[1].trim();
                //make new group and insert tag + birthday if group isn't in DB otherwise just insert tag and birthday
                if (!(chatID in groupsDict)) {
                    groupsDict[chatID] = new group(chatID);
                }
                //check if tag exists in DB if it does return false otherwise add tag to DB
                if (groupsDict[chatID].addBirthday(tag, birthday, birthmonth)) {
                    await HDB.addArgsToDB(tag, birthday, birthmonth, chatID, "birthday", function () {
                        client.reply(chatID, "יום ההולדת של האדם " + tag + " נוסף בהצלחה", messageID);
                    });
                }
                else {
                    client.reply(chatID, "יום ההולדת " + tag + " כבר קיים במאגר של קבוצה זו", messageID);
                }
            }
            else {
                client.reply(chatID, "לא ככה כותבים תאריך...", messageID);
            }
        }
        else {
            client.reply(chatID, "להשתמש במקף זה באמת לא כל כך קשה...", messageID);
        }
    }
    static async remBirthday(client, bodyText, chatID, messageID, groupsDict) {
        bodyText = bodyText.replace("הסר יום הולדת", "");
        const tag = bodyText.trim();
        if (chatID in groupsDict) {
            if (groupsDict[chatID].delBirthday(tag)) {
                await HDB.delArgsFromDB(tag, chatID, "birthday", function () {
                    client.reply(chatID, "יום ההולדת של האדם " + tag + " הוסר בהצלחה", messageID);
                });
            }
            else {
                client.reply(chatID, "רק דוקטור דופנשמירץ יכול למחוק ימי הולדת לא קיימים", messageID);
            }
        }
        else {
            client.reply(chatID, "אין ימי הולדת בקבוצה זו - אולי תוסיפו כמה?", messageID);
        }
    }
    static async showBirthdays(client, chatID, messageID, groupsDict) {
        if (chatID in groupsDict) {
            let stringForSending = "";
            let birthdays = groupsDict[chatID].birthdays;
            Object.entries(birthdays).forEach(([key, value]) => {
                stringForSending += key + " - " + value + "\n";
            });
            await client.reply(chatID, stringForSending, messageID);
        }
    }
}

module.exports = HB;