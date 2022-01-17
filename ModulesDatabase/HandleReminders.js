const HDB = require("./HandleDB"), HL = require("./HandleLanguage");

class HR {
    static async addReminder(client, bodyText, chatID, messageID, person, groupsDict, message, personsWithReminders) {
        const messageType = message.quotedMsgObj ? message.quotedMsgObj.type : message.type;
        message = message.quotedMsgObj ? message.quotedMsgObj : message;
        bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "add_reminder"), "").trim();
        let repeatReminder = !!(bodyText.match(HL.getGroupLang(groupsDict, chatID, "repeatReminder")));
        const date = new Date();
        let matchedDateWithYear = bodyText.match(/^\d{1,2}\.\d{1,2}\.\d{4}/g);
        let matchedDateWithoutYear = !matchedDateWithYear ? bodyText.match(/^\d{1,2}\.\d{1,2}/g) : null;
        let time = bodyText.match(/\d{1,2}:\d{2}/g);
        if (time) {
            time = time[0];
            const timeArray = time.split(":")
            const hour = parseInt(timeArray[0]);
            const minutes = parseInt(timeArray[1]);
            if (hour > 0 && minutes > 0 && hour < 24 && minutes < 60) {
                let month, day, year;
                switch (true) {
                    case (!!matchedDateWithoutYear):
                        matchedDateWithoutYear = matchedDateWithoutYear[0];
                        const matchedDateWithoutYearArray = matchedDateWithoutYear.split(".");
                        day = parseInt(matchedDateWithoutYearArray[0]);
                        month = parseInt(matchedDateWithoutYearArray[1]) - 1;
                        year = date.getFullYear();
                        bodyText = bodyText.replace(matchedDateWithoutYear, "").trim();
                        break;
                    case (!!matchedDateWithYear):
                        matchedDateWithYear = matchedDateWithYear[0];
                        const matchedDateWithYearArray = matchedDateWithYear.split(".");
                        day = parseInt(matchedDateWithYearArray[0]);
                        month = parseInt(matchedDateWithYearArray[1]) - 1;
                        year = parseInt(matchedDateWithYearArray[2]);
                        bodyText = bodyText.replace(matchedDateWithYear, "").trim();
                        break;
                    default:
                        day = date.getDate();
                        month = date.getMonth();
                        year = date.getFullYear();
                }
                const reminderDate = new Date(year, month, day, hour, minutes);
                let reminder = null;
                if (messageType === "image")
                    reminder = repeatReminder ? "repeatReminderImage" + await client.decryptMedia(message) : "Image" + await client.decryptMedia(message);
                else if (messageType === "video")
                    reminder = repeatReminder ? "repeatReminderVideo" + await client.decryptMedia(message) : "Video" + await client.decryptMedia(message);
                else if (messageType === "chat")
                    reminder = repeatReminder ? "repeatReminder" +
                        bodyText.replace(time, "").trim().replace(HL.getGroupLang(groupsDict, chatID, "repeatReminder"), "") :
                        bodyText.replace(time, "").trim()
                if (reminder != null) {
                    if (!person.doesReminderExist(reminderDate)) {
                        await HDB.addArgsToDB(chatID, reminderDate, reminder, null, "reminders", function () {
                            person.reminders = ["add", reminderDate, reminder];
                            !personsWithReminders.includes(chatID) ? personsWithReminders.push(chatID) : {};
                            HDB.delArgsFromDB("personsWithReminders", null, "rested", function () {
                                HDB.addArgsToDB("personsWithReminders", personsWithReminders, null, null, "rested", function () {
                                    client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "add_reminder_reply", time), messageID);
                                });
                            });
                        });
                    } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "reminder_already_exists_error"), messageID);
                }
            } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "reminder_time_error"), messageID);
        } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "reminder_time_error"), messageID);
    }

    static async removeReminder(client, bodyText, chatID, messageID, person, groupsDict, personsWithReminders) {
        bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "remove_reminder"), "").trim();
        const date = new Date();
        let matchedDateWithYear = bodyText.match(/^\d{1,2}\.\d{1,2}\.\d{4}/g);
        let matchedDateWithoutYear = !matchedDateWithYear ? bodyText.match(/^\d{1,2}\.\d{1,2}/g) : null;
        let time = bodyText.match(/\d{1,2}:\d{2}/g);
        if (time) {
            time = time[0];
            let timeArray = time.split(":"), hour = parseInt(timeArray[0]), minutes = parseInt(timeArray[1]), month,
                day, year;
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
                    if (Object.keys(person.reminders).length === 0) {
                        personsWithReminders.splice(personsWithReminders.indexOf(chatID), 1);
                        HDB.delArgsFromDB("personsWithReminders", null, "rested", function () {
                            HDB.addArgsToDB("personsWithReminders", personsWithReminders, null, null, "rested", function () {
                                client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "remove_reminder_reply", time), messageID);
                            });
                        });
                    }
                });
            } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "reminder_doesnt_exist_error"), messageID);
        } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "reminder_time_error"), messageID);
    }

    static async showReminders(client, person, groupsDict, messageID, chatID) {
        let stringForSending = "";
        if (Object.keys(person.reminders).length !== 0) {
            for (let reminder in person.reminders) {
                const reminderDate = new Date(reminder);
                let reminderData = person.reminders[reminder];
                if (reminderData.startsWith("repeatReminder")) {
                    stringForSending += "*repeat* \n";
                    reminderData = reminderData.replace("repeatReminder", "");
                }
                if (reminderData.startsWith("Video")) {
                    stringForSending += `${reminderDate.getDate()}. ${reminderDate.getMonth() + 1}. ${reminderDate.getFullYear()} \n[${reminderDate.getHours()}:${reminderDate.getMinutes()}] - ${HL.getGroupLang(groupsDict, chatID, "video")}\n\n`
                } else if (reminderData.startsWith("Image")) {
                    stringForSending += `${reminderDate.getDate()}. ${reminderDate.getMonth() + 1}. ${reminderDate.getFullYear()} \n[${reminderDate.getHours()}:${reminderDate.getMinutes()}] - ${HL.getGroupLang(groupsDict, chatID, "image")}\n\n`;
                } else {
                    stringForSending += `${reminderDate.getDate()}. ${reminderDate.getMonth() + 1}. ${reminderDate.getFullYear()} \n[${reminderDate.getHours()}:${reminderDate.getMinutes()}] - ${reminderData.trim()}\n\n`;
                }
            }
            await client.reply(chatID, stringForSending, messageID);
        } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "show_reminder_error"), messageID);
    }
}

module.exports = HR;