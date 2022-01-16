const HL = require("./HandleLanguage");
const HDB = require("./HandleDB");

class HR {
    async static addReminder(client, bodyText, chatID, messageID, person, groupsDict) {
        bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "add_reminder"), "")
        let matchedDateWithYear = bodyText.match(/^\d{2}\.\d{2}\.\d{4}$/g);
        let matchedDateWithoutYear = bodyText.match(/^\d{2}\.\d{2}$/g);
        let time = bodyText.match(/^\d{1,2}:\d{2}$/);
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
                    bodyText = bodyText.replace(matchedDateWithoutYear, "");
                    break;
                case (!!matchedDateWithYear):
                    matchedDateWithYear = matchedDateWithYear[0];
                    let matchedDateWithYearArray = matchedDateWithYear.split(".");
                    day = matchedDateWithYearArray[0];
                    month = matchedDateWithYearArray[1] - 1; //month on javascript
                    year = matchedDateWithYearArray[2];
                    bodyText = bodyText.replace(matchedDateWithYear, "");
                    break;
                default:
                    day = date.getDay();
                    month = date.getMonth();
                    year = date.getFullYear();
            }
            let reminderDate = new Date(year, month, day, hour, minutes);
            bodyText = bodyText.replace(time, "");
            if (!person.doesReminderExist(reminderDate)) {
                await HDB.addArgsToDB(chatID, reminderDate, bodyText, null, "reminders", function () {
                    person.reminders = ["add", reminderDate, bodyText];
                    client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "add_reminder_reply", bodyText), messageID);
                });
            } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "reminder_already_exist_error"), messageID);

        } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "add_reminder_hour_error"), messageID);
    }

    async static removeReminder(client, bodyText, chatID, messageID, person, groupsDict) {
        bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "remove_reminder"), "");
        let matchedDateWithYear = bodyText.match(/^\d{2}\.\d{2}\.\d{4}$/g);
        let matchedDateWithoutYear = bodyText.match(/^\d{2}\.\d{2}$/g);
        let time = bodyText.match(/^\d{1,2}:\d{2}$/);
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
                    day = date.getDay();
                    month = date.getMonth();
                    year = date.getFullYear();
            }
            let reminderDate = new Date(year, month, day, hour, minutes);
            if (person.doesReminderExist(reminderDate)) {
                await HDB.delArgsFromDB(chatID, reminderDate, "reminders", function () {
                    person.reminders = ["delete", reminderDate];
                    client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "remove_reminder_reply", bodyText), messageID);
                });
            } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "reminder_doesnt_exist_error"), messageID);
        } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "remove_reminder_hour_error"), messageID);
    }
}

module.exports = HR;