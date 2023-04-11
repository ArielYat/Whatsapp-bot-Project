// noinspection SpellCheckingInspection

import HL from "../ModulesDatabase/HandleLanguage.js";
import apiKeys from "../apiKeys.js";
import puppeteer from "puppeteer";
import {createCanvas, loadImage} from 'canvas';
import {encode} from "html-entities";

export default class HS {
    static async handleStickers(client, message, bodyText, chatID, messageID, groupsDict) {
        function draw(img, ctx) {
            const buffer = createCanvas(512, 512), bufferctx = buffer.getContext('2d');
            bufferctx.drawImage(img, 0, 0);
            const imageData = bufferctx.getImageData(0, 0, buffer.width, buffer.height);
            let data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {
                if (data[i] + data[i + 1] + data[i + 2] < 80) {
                    data[i + 3] = 0;
                }
            }
            ctx.putImageData(imageData, 0, 0);
        }

        function trimCanvas(canvas) {
            const ctx = canvas.getContext('2d'),
                copy = createCanvas(512, 512).getContext('2d'),
                pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
            let bound = {
                top: null,
                left: null,
                right: null,
                bottom: null
            };
            // Iterate over every pixel to find the highest
            // and where it ends on every axis ()
            for (let i = 0; i < pixels.data.length; i += 4) {
                if (pixels.data[i + 3] !== 0) {
                    let x = (i / 4) % canvas.width;
                    let y = Math.floor((i / 4) / canvas.width);
                    if (bound.top === null) {
                        bound.top = y;
                    }
                    if (bound.left === null) {
                        bound.left = x + 5;
                    } else if (x < bound.left && x > 5) {
                        bound.left = x;
                    }
                    if (bound.right === null) {
                        bound.right = x;
                    } else if (bound.right < x) {
                        bound.right = x;
                    }
                    if (bound.bottom === null) {
                        bound.bottom = y;
                    } else if (bound.bottom < y && x > 5) {
                        bound.bottom = y;
                    }
                }
            }
            // Calculate the height and width of the content
            const trimHeight = bound.bottom - bound.top, trimWidth = bound.right - bound.left;
            const trimmed = ctx.getImageData(bound.left, bound.top, trimWidth, trimHeight);
            copy.canvas.width = trimWidth;
            copy.canvas.height = trimHeight;
            copy.putImageData(trimmed, 0, 0);
            // Return trimmed canvas
            return copy.canvas;
        }

        bodyText = bodyText.replace(await HL.getGroupLang(groupsDict, chatID, "make_sticker"), "").trim();
        const messageType = message.quotedMsgObj ? message.quotedMsgObj.type : message.type;
        message = message.quotedMsgObj ? message.quotedMsgObj : message;
        const noCrop = (await HL.getGroupLang(groupsDict, chatID, "crop_sticker")).test(bodyText),
            highQuality = (await HL.getGroupLang(groupsDict, chatID, "high_Quality")).test(bodyText),
            mediumQuality = (await HL.getGroupLang(groupsDict, chatID, "medium_Quality")).test(bodyText);
        const date = new Date();
        const hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        const time = hour + ":" + minutes;
        try {
            if (messageType === "image") {
                const mediaData = await client.decryptMedia(message);
                await client.sendImageAsStickerAsReply(chatID, mediaData, messageID, {
                    author: "הרולד האל־מת",
                    pack: "חצול",
                    keepScale: noCrop
                });
            } else if (messageType === "video") {
                const mediaData = await client.decryptMedia(message);
                await client.sendMp4AsSticker(chatID, mediaData, {crop: !noCrop}, {
                    author: "הרולד האל־מת",
                    pack: "חצול",
                    keepScale: noCrop
                }, messageID);
            } else if (messageType === "chat") {
                //written in collaboration with Laniad27
                let canvas = createCanvas(512, 512)
                let ctx = canvas.getContext('2d')
                let phoneNumber = message.sender.formattedName.replace("⁦", "").replace("⁩", "");
                await (async () => {
                    let messageBody = encode(message.body),
                        messageTime = encode(time),
                        messageName = encode(message.sender.pushname),
                        messagePhone = phoneNumber;
                    const browser = await puppeteer.launch({
                        headless: true,
                        args: ['--no-sandbox', '--disable-setuid-sandbox']
                    });
                    const page = await browser.newPage();
                    if (highQuality) {
                        await page.setViewport({
                            width: 256,
                            height: 1024,
                            deviceScaleFactor: 2,
                        });
                    } else if (mediumQuality) {
                        await page.setViewport({
                            width: 362,
                            height: 1024,
                            deviceScaleFactor: 1.414,
                        });
                    } else {
                        await page.setViewport({
                            width: 512,
                            height: 1024,
                            deviceScaleFactor: 1,
                        });
                    }
                    await page.goto(apiKeys.stickerTemplatePath);
                    await page.evaluate(function (messageBody, messageTime, messagePhone, messageName) {
                        let domBody = document.querySelector('#app > div > div > div > div > div._2jGOb.copyable-text > div > span.i0jNr.selectable-text.copyable-text > span');
                        domBody.innerHTML = messageBody
                        let domTime = document.querySelector('#app > div > div > div > div > div._1beEj > div > span');
                        domTime.innerHTML = messageTime;
                        let domPhone = document.querySelector('#app > div > div > div > div > div.hooVq.color-2._1B9Rc > span._1BUvv');
                        domPhone.innerHTML = messagePhone;
                        let domName = document.querySelector('#app > div > div > div > div > div.hooVq.color-2._1B9Rc > span._1u3M2.ggj6brxn.gfz4du6o.r7fjleex.g0rxnol2.lhj4utae.le5p0ye3.ajgl1lbb.edeob0r2.i0jNr');
                        domName.innerHTML = messageName;
                        document.querySelector('#app > div > div > div > div > div.hooVq.color-2._1B9Rc').classList.remove('color-2');
                        let random = Math.floor(Math.random() * 21);
                        document.querySelector('#app > div > div > div > div > div.hooVq._1B9Rc').classList.add(`color-${random}`);

                    }, messageBody, messageTime, messagePhone, messageName);
                    let base64 = await page.screenshot({encoding: "base64", fullPage: true, omitBackground: true})
                    await browser.close();
                    loadImage('data:image/png;base64,' + base64).then((image) => {
                        draw(image, ctx);
                        let ntx = trimCanvas(canvas);
                        loadImage(ntx.toDataURL()).then((image) => {
                            let canvas = createCanvas(512, 512);
                            let ctx = canvas.getContext('2d');
                            if (image.height > image.width) {
                                ctx.drawImage(image, 0, 0, image.width, image.height, 256 - 256 * image.width / image.height, 0, 512 * image.width / image.height, 512);
                            } else {
                                ctx.drawImage(image, 0, 0, image.width, image.height, 0, 256 - 256 * image.height / image.width, 512, 512 * image.height / image.width);
                            }
                            client.sendImageAsSticker(message.chatId, canvas.toDataURL(), {
                                author: "הרולד האל־מת",
                                pack: "חצול",
                            });
                        });
                    });
                })();
            } else await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "not_sticker_material_error"), messageID);
        } catch (err) {
            console.log("error occurred at sticker creation" + err);
        }
    }

    static async createTextSticker(client, bodyText, chatID, messageID, groupsDict) {
        bodyText = bodyText.replace(await HL.getGroupLang(groupsDict, chatID, "create_text_sticker"), "").trim();
        const canvas = createCanvas(150, 150), drawingBoard = canvas.getContext("2d");
        let color, text;
        if (bodyText.includes("-") && bodyText.split("-").length >= 2) {
            bodyText = bodyText.split("-");
            color = bodyText[0].trim();
            text = bodyText[1].trim();
        } else {
            color = "black";
            text = bodyText.trim();
        }
        try {
            //written by Laniad27
            let lainadIndex = 0, wordArray = text.split(" "), finalText = "";
            while (lainadIndex !== wordArray.length) {
                if (drawingBoard.measureText(wordArray.slice(0, lainadIndex + 1).join(' ')).width > 100) {
                    if (lainadIndex === 0) {
                        finalText += wordArray.slice(0, 1).join(' ') + '\n';
                        wordArray = wordArray.slice(lainadIndex + 1);
                    } else {
                        finalText += wordArray.slice(0, lainadIndex).join(' ') + '\n';
                        wordArray = wordArray.slice(lainadIndex);
                    }
                    lainadIndex = -1;
                }
                lainadIndex++;
            }
            finalText += wordArray.join(' ');
            drawingBoard.font = "16px Sans serif";
            drawingBoard.fillStyle = color;
            drawingBoard.textAlign = "center";
            drawingBoard.fillText(finalText, 75, 75);
            await client.sendImageAsStickerAsReply(chatID, canvas.toDataURL(), messageID, {
                author: "הרולד האל־מת",
                pack: "חצול"
            });
        } catch (err) {
            await client.reply(chatID, await HL.getGroupLang(groupsDict, chatID, "text_sticker_error"), messageID);
            console.log("error occurred at text sticker creation" + err);
        }
    }
}