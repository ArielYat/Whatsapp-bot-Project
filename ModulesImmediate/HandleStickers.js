import {HL} from "../ModulesDatabase/HandleLanguage.js";
import nodeFetch from "node-fetch";
import canvas from "node-canvas";

export class HSt {
    static async handleStickers(client, message, bodyText, chatID, messageID, groupsDict) {
        bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "make_sticker"), "").trim();
        const messageType = message.quotedMsgObj ? message.quotedMsgObj.type : message.type;
        message = message.quotedMsgObj ? message.quotedMsgObj : message;
        const noCrop = !!bodyText.match(HL.getGroupLang(groupsDict, chatID, "crop_sticker"));
        if (messageType === "image") {
            const mediaData = await client.decryptMedia(message);
            await client.sendImageAsSticker(chatID, mediaData, {author: "ג'ון האגדי", pack: "חצול", keepScale: noCrop});
        } else if (messageType === "video") {
            const mediaData = await client.decryptMedia(message);
            await client.sendMp4AsSticker(chatID, mediaData, {crop: !noCrop}, {author: "ג'ון האגדי", pack: "חצול", keepScale: noCrop});
        } else await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "not_sticker_material_error"), messageID);
    }

    static async createTextSticker(client, bodyText, chatID, messageID, groupsDict) {
        bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "create_text_sticker"), "").trim();
        bodyText = bodyText.split(",")
        const canvas = createCanvas(150, 150);
        let drawingBoard = canvas.getContext("2d");
        try {
            const url = encodeURI(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${bodyText[0]}`);
            let response = await nodeFetch(url, {
                method: 'GET', headers: {
                    'Accept': 'application/json'
                },
            });
            response = await response.json();
            groupsDict[chatID].translationCounter++;
            drawingBoard.font = "10px Times New Roman";
            drawingBoard.fillStyle = response;
            drawingBoard.textAlign = "center";
            drawingBoard.fillText(bodyText[1], 0, 0);
            await client.sendImageAsSticker(chatID, canvas.toDataURL(), {author: "ג'ון האגדי", pack: "חצול"});
        } catch (err) {
            await client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "text_sticker_error"), messageID)
        }
    }
}