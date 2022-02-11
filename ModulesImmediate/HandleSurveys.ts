import {HL} from "../ModulesDatabase/HandleLanguage.js";

export class HSu {
    static async makeButton(client, bodyText, chatID, messageID, groupsDict) {
        let title = bodyText.match(HL.getGroupLang(groupsDict, chatID, "survey_title")),
            secondTitle = bodyText.match(HL.getGroupLang(groupsDict, chatID, "survey_subtitle")),
            thirdTitle = bodyText.match(HL.getGroupLang(groupsDict, chatID, "third_survey_title"));
        const button1 = bodyText.match(HL.getGroupLang(groupsDict, chatID, "survey_button_1")),
            button2 = bodyText.match(HL.getGroupLang(groupsDict, chatID, "survey_button_2")),
            button3 = bodyText.match(HL.getGroupLang(groupsDict, chatID, "survey_button_3"));
        if (title && secondTitle && button1) {
            title = title[0].replace(HL.getGroupLang(groupsDict, chatID, "survey_title_replace"), "").trim();
            secondTitle = secondTitle[0].replace(HL.getGroupLang(groupsDict, chatID, "second_survey_title_replace"), "").trim();
            const buttonsArray = await this.makeButtonsArray(button1, button2, button3, chatID, groupsDict);
            if (thirdTitle) {
                thirdTitle = thirdTitle[0].replace(HL.getGroupLang(groupsDict, chatID, "third_survey_title_replace"), "").trim();
                await client.sendButtons(chatID, secondTitle, buttonsArray, title, thirdTitle);
            } else await client.sendButtons(chatID, secondTitle, buttonsArray, title);
        } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "survey_creation_error"), messageID);
    }

    static async makeButtonsArray(button1, button2, button3, chatID, groupsDict) {
        let buttonsArray = [];
        if (button1) {
            buttonsArray.push({
                id: "1",
                "text": button1[0].replace(HL.getGroupLang(groupsDict, chatID, "survey_button_1_replace"), "").trim()
            });
        }
        if (button2) {
            buttonsArray.push({
                id: "2",
                "text": button2[0].replace(HL.getGroupLang(groupsDict, chatID, "survey_button_2_replace"), "").trim()
            });
        }
        if (button3) {
            buttonsArray.push({
                id: "3",
                "text": button3[0].replace(HL.getGroupLang(groupsDict, chatID, "survey_button_3_replace"), "").trim()
            });
        }
        return buttonsArray;
    }
}