const group = require("./Group");
const HDB = require("./HandleDB");

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
                    let stringForSending = "מזל טוב ל" + person + " , הוא/היא בן/בת " +
                        (parseInt(currentGroup.birthdays[person][2]) - yearToday + " היום! ");
                    client.sendText(currentGroup.groupID, stringForSending)
                }
            }
        }
    }
    static async addBirthday(client, bodyText, chatID, messageID, groupsDict) {
        bodyText = bodyText.replace("הוסף יום הולדת", "");
        if (bodyText.includes("-")) {
            bodyText = bodyText.split("-");
            const name = bodyText[0].trim();
            let fullBirthday = bodyText[1].trim();
            if (fullBirthday.includes(".")) {
                fullBirthday = fullBirthday.split(".");
                const birthday = fullBirthday[0].trim();
                const BirthMonth = fullBirthday[1].trim();
                const BirthYear = fullBirthday[2].trim();
                //make new group and insert name + birthday if group isn't in DB otherwise just insert name and birthday
                if (!(chatID in groupsDict)) {
                    groupsDict[chatID] = new group(chatID);
                }
                //check if name exists in DB if it does return false otherwise add name to DB
                if (birthday <= 31 && BirthMonth <= 12 && birthday >= 0 && BirthMonth >= 0) {
                    if (groupsDict[chatID].addBirthday(name, birthday, BirthMonth, BirthYear)) {
                        await HDB.addArgsToDB(name, birthday, BirthMonth, BirthYear, chatID, "birthday", function () {
                            client.reply(chatID, "יום ההולדת של האדם " + name + " נוסף בהצלחה", messageID);
                        });
                    } else {
                        client.reply(chatID, "יום ההולדת של האדם " + name + " כבר קיים במאגר של קבוצה זו", messageID);
                    }
                }
                else {
                    client.reply(chatID, "התאריך שהזנת לא מציאותי, בדיוק כמוך", messageID);
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
        const name = bodyText.trim();
        if (chatID in groupsDict) {
            if (groupsDict[chatID].delBirthday(name)) {
                await HDB.delArgsFromDB(name, chatID, "birthday", function () {
                    client.reply(chatID, "יום ההולדת של האדם " + name + " הוסר בהצלחה", messageID);
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
                stringForSending += key + " - " + value[0] + "." + value[1] + "." + value[2] + "\n";
            });
            await client.reply(chatID, stringForSending, messageID);
        }
    }
}

module.exports = HB;