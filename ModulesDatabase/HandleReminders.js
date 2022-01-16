const HL = require("./HandleLanguage");
const HDB = require("./HandleDB");

class HR {
    static async addReminder(client, bodyText, chatID, messageID, person, groupsDict, personWithReminders) {
        bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "add_reminder"), "").trim();
        let matchedDateWithYear = bodyText.match(/^\d{1,2}\.\d{1,2}\.\d{4}/g);
        let matchedDateWithoutYear = !matchedDateWithYear ? bodyText.match(/^\d{2}\.\d{2}/g) : null;
        let time = bodyText.match(/\d{1,2}:\d{2}/g);
        let date = new Date();
        if (time) {
            time = time[0];
            let timeArray = time.split(":")
            let hour = parseInt(timeArray[0]);
            let minutes = parseInt(timeArray[1]);
            if (hour > 0 && minutes > 0 && hour < 24 && minutes < 60) {
                let month;
                let day;
                let year;
                switch (true) {
                    case (!!matchedDateWithoutYear):
                        matchedDateWithoutYear = matchedDateWithoutYear[0];
                        let matchedDateWithoutYearArray = matchedDateWithoutYear.split(".");
                        day = parseInt(matchedDateWithoutYearArray[0]);
                        month = parseInt(matchedDateWithoutYearArray[1]) - 1; //month on javascript
                        year = date.getFullYear();
                        bodyText = bodyText.replace(matchedDateWithoutYear, "").trim();
                        break;
                    case (!!matchedDateWithYear):
                        matchedDateWithYear = matchedDateWithYear[0];
                        let matchedDateWithYearArray = matchedDateWithYear.split(".");
                        day = parseInt(matchedDateWithYearArray[0]);
                        month = parseInt(matchedDateWithYearArray[1]) - 1; //month on javascript
                        year = parseInt(matchedDateWithYearArray[2]);
                        bodyText = bodyText.replace(matchedDateWithYear, "").trim();
                        break;
                    default:
                        day = date.getDate();
                        month = date.getMonth();
                        year = date.getFullYear();
                }
                let reminderDate = new Date(year, month, day, hour, minutes);
                bodyText = bodyText.replace(time, "").trim();
                if (!person.doesReminderExist(reminderDate)) {
                    await HDB.addArgsToDB(chatID, reminderDate, bodyText, null, "reminders", function () {
                        person.reminders = ["add", reminderDate, bodyText];
                        client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "add_reminder_reply", bodyText), messageID);
                        !personWithReminders.includes(chatID) ? personWithReminders.push(chatID) : {};
                        HDB.delArgsFromDB("personWithReminders", null, "rested", function () {
                            HDB.addArgsToDB("personWithReminders", personWithReminders, null, null, "rested", function () {
                                {
                                }
                            });
                        });
                    });
                } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "reminder_already_exist_error"), messageID);
            } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "reminder_hour_error"), messageID);
        } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "reminder_hour_error"), messageID);
    }

    static async removeReminder(client, bodyText, chatID, messageID, person, groupsDict, personWithReminders) {
        bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "remove_reminder"), "").trim();
        let matchedDateWithYear = bodyText.match(/^\d{1,2}\.\d{1,2}\.\d{4}/g);
        let matchedDateWithoutYear = !matchedDateWithYear ? bodyText.match(/^\d{2}\.\d{2}/g) : null;
        let time = bodyText.match(/\d{1,2}:\d{2}/g);
        let date = new Date();
        if (time) {
            time = time[0];
            let timeArray = time.split(":");
            let hour = timeArray[0];
            let minutes = timeArray[1];
            let month;
            let day;
            let year;
            switch (true) {
                case (!!matchedDateWithoutYear):
                    matchedDateWithoutYear = matchedDateWithoutYear[0];
                    let matchedDateWithoutYearArray = matchedDateWithoutYear.split(".");
                    day = matchedDateWithoutYearArray[0];
                    month = matchedDateWithoutYearArray[1] - 1; //month on javascript
                    year = date.getFullYear();
                    break;
                case (!!matchedDateWithYear):
                    matchedDateWithYear = matchedDateWithYear[0];
                    let matchedDateWithYearArray = matchedDateWithYear.split(".");
                    day = matchedDateWithYearArray[0];
                    month = matchedDateWithYearArray[1] - 1; //month on javascript
                    year = matchedDateWithYearArray[2];
                    break;
                default:
                    day = date.getDate();
                    month = date.getMonth();
                    year = date.getFullYear();
            }
            let reminderDate = new Date(year, month, day, hour, minutes);
            if (person.doesReminderExist(reminderDate)) {
                await HDB.delArgsFromDB(chatID, reminderDate, "reminders", function () {
                    person.reminders = ["delete", reminderDate];
                    client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "remove_reminder_reply", bodyText), messageID);
                    if (Object.keys(person.reminders).length === 0) {
                        personWithReminders.splice(personWithReminders.indexOf(chatID), 1);
                        HDB.delArgsFromDB("personWithReminders", null, "rested", function () {
                            HDB.addArgsToDB("personWithReminders", personWithReminders, null, null, "rested", function () {
                                {
                                }
                            });
                        });
                    }
                });
            } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "reminder_doesnt_exist_error"), messageID);
        } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "reminder_hour_error"), messageID);
    }

    static async showReminders(client, person, groupsDict, messageID, chatID) {
        let stringForSending = "";
        if (Object.keys(person.reminders).length === 0) {
            await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "show_reminder_error"), messageID);
        } else {
            for (let reminder in person.reminders) {
                let tempDate = new Date(reminder);
                stringForSending += `${tempDate.getDate()}. ${tempDate.getMonth() + 1}. ${tempDate.getFullYear()} \n[${tempDate.getHours()}:${tempDate.getMinutes()}] - ${person.reminders[reminder]}\n\n`
            }
            await client.reply(chatID, stringForSending, messageID);
        }
    }
}

module.exports = HR;