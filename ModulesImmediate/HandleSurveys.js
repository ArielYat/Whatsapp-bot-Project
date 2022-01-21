import {HL} from "../ModulesDatabase/HandleLanguage";

export class HSu {
    static async makeButton(client, bodyText, chatID, messageID, groupsDict) {
        let buttonsArray = [];
        const titleRegex = HL.getGroupLang(groupsDict, chatID, "survey_title");
        const secondTitleRegex = HL.getGroupLang(groupsDict, chatID, "survey_subtitle");
        const thirdTitleRegex = HL.getGroupLang(groupsDict, chatID, "third_survey_title");
        const button1Regex = HL.getGroupLang(groupsDict, chatID, "survey_button_1");
        const button2Regex = HL.getGroupLang(groupsDict, chatID, "survey_button_2");
        const button3Regex = HL.getGroupLang(groupsDict, chatID, "survey_button_3");

        let title = bodyText.match(titleRegex), secondTitle = bodyText.match(secondTitleRegex), thirdTitle = bodyText.match(thirdTitleRegex);
        const button1 = bodyText.match(button1Regex), button2 = bodyText.match(button2Regex), button3 = bodyText.match(button3Regex);
        if (title != null && secondTitle != null && button1 != null) {
            title = title[0].replace(HL.getGroupLang(groupsDict, chatID, "survey_title_replace"), "").trim();
            secondTitle = secondTitle[0].replace(HL.getGroupLang(groupsDict, chatID, "second_survey_title_replace"), "").trim();
            buttonsArray = await this.makeButtonsArray(buttonsArray, button1, button2, button3, chatID, groupsDict);
            if (thirdTitle != null) {
                thirdTitle = thirdTitle[0].replace(HL.getGroupLang(groupsDict, chatID, "third_survey_title_replace"), "").trim();
                await client.sendButtons(chatID, secondTitle, buttonsArray, title, thirdTitle);
            } else await client.sendButtons(chatID, secondTitle, buttonsArray, title);
        } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "survey_creation_error"), messageID);
    }

    static async makeButtonsArray(buttonsArray, button1, button2, button3, chatID, groupsDict) {
        if (button1 != null) {
            buttonsArray.push({
                id: "1",
                "text": button1[0].replace(HL.getGroupLang(groupsDict, chatID, "survey_button_1_replace"), "").trim()
            });
        }
        if (button2 != null) {
            buttonsArray.push({
                id: "2",
                "text": button2[0].replace(HL.getGroupLang(groupsDict, chatID, "survey_button_2_replace"), "").trim()
            });
        }
        if (button3 != null) {
            buttonsArray.push({
                id: "3",
                "text": button3[0].replace(HL.getGroupLang(groupsDict, chatID, "survey_button_3_replace"), "").trim()
            });
        }
        return buttonsArray;
    }
}