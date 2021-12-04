const HL = require("./HandleLanguage");

class HBu {
    static async makeButton(client, message, groupsDict) {
        let textMessage = message.body;
        let chatID = message.chat.id;
        if (textMessage.startsWith(HL.getGroupLang(groupsDict, chatID, "make_survey"))) {
            let buttonsArray = [];
            const titleRegex = HL.getGroupLang(groupsDict, chatID, "survey_title");
            const secondTitleRegex = HL.getGroupLang(groupsDict, chatID, "survey_second_title");
            const thirdTitleRegex = HL.getGroupLang(groupsDict, chatID, "survey_third_title");
            const button1Regex = HL.getGroupLang(groupsDict, chatID, "survey_button1");
            const button2Regex = HL.getGroupLang(groupsDict, chatID, "survey_button2");
            const button3Regex = HL.getGroupLang(groupsDict, chatID, "survey_button3");

            let title = textMessage.match(titleRegex)
            let secondTitle = textMessage.match(secondTitleRegex)
            let thirdTitle = textMessage.match(thirdTitleRegex);
            let button1 = textMessage.match(button1Regex);
            let button2 = textMessage.match(button2Regex);
            let button3 = textMessage.match(button3Regex);
            buttonsArray = this.makeButtonsArray(buttonsArray, button1, button2, button3, groupsDict, chatID);
            if (title != null && secondTitle != null && buttonsArray.length > 0) {
                title = title[0].replace(HL.getGroupLang(groupsDict, chatID, "survey_title_replace"), "").trim();
                secondTitle = secondTitle[0].replace(HL.getGroupLang(groupsDict, chatID,
                    "survey_second_title_replace"), "").trim();
                if (thirdTitle != null) {
                    thirdTitle = thirdTitle[0].replace(HL.getGroupLang(groupsDict, chatID,
                        "survey_third_title_replace"), "").trim();
                    await client.sendButtons(chatID, secondTitle, buttonsArray, title, thirdTitle);
                } else {
                    await client.sendButtons(chatID, secondTitle, buttonsArray, title);
                }
            } else {
                await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "survey_reply"), message.id);
            }
        }

    }
    static makeButtonsArray(buttonsArray, button1, button2, button3, groupsDict, chatID) {
        if (button1 != null) {
            buttonsArray.push({
                id: "1",
                "text": button1[0].replace(HL.getGroupLang(groupsDict, chatID, "survey_button1_replace"), "").trim()
            });
        }
        if (button2 != null) {
            buttonsArray.push({
                id: "1",
                "text": button2[0].replace(HL.getGroupLang(groupsDict, chatID, "survey_button2_replace"), "").trim()
            });
        }
        if (button3 != null) {
            buttonsArray.push({
                id: "1",
                "text": button3[0].replace(HL.getGroupLang(groupsDict, chatID, "survey_button3_replace"), "").trim()
            });
        }
        return buttonsArray;
    }
}

module.exports = HBu;