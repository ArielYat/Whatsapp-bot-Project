import {HL} from "../ModulesDatabase/HandleLanguage.js"

export class H3T {
    static async TicTacToe(client, bodyText, chatID, messageID, groupsDict) {
        async function init() {
            bodyText = bodyText.replace(HL.getGroupLang(groupsDict, chatID, "init_tic_tac_toe"));
            bodyText = bodyText.split(",");
            const clickedRow = bodyText[1].trim(), clickedCol = bodyText[2].trim();
            board[clickedRow][clickedCol] = 1;
            await client.reply(chatID, board.toString(), messageID);
        }

        async function playerMove() {
            const catchMessages = message => message.body.match(HL.getGroupLang(groupsDict, chatID, "move_tic_tac_toe"));
            await chatID.awaitMessages(catchMessages, {max: 1, time: 6000, errors: ['time']})
                .then(caught => async function () {
                    const text = caught[0].value.split(",");
                    let clickedRow = text[0].trim(), clickedCol = text[1].trim();
                    board[clickedRow][clickedCol] = 1;
                    await sendMoveReply();
                    if (await checkWin(board, clickedRow, clickedCol))
                        await client.sendText(HL.getGroupLang(groupsDict, chatID, "win_tic_tac_toe_reply"));
                    else {
                        [clickedRow, clickedCol] = await computerMove();
                        await sendMoveReply();
                        if (clickedRow !== null && clickedCol !== null) {
                            if (await checkWin(board, clickedRow, clickedCol)) {
                                await client.sendText(HL.getGroupLang(groupsDict, chatID, "lose_tic_tac_toe_reply"));
                            } else if (board.includes(0)) {
                                await playerMove();
                            } else await client.sendText(HL.getGroupLang(groupsDict, chatID, "draw_tic_tac_toe_reply"));
                        } else await client.sendText(HL.getGroupLang(groupsDict, chatID, "draw_tic_tac_toe_reply"));
                    }
                })
                .catch(client.reply(chatID, HL.getGroupLang(groupsDict, chatID, "tic_tac_toe_time_out_error"), messageID));
        }

        async function sendMoveReply() {
            let stringForSending = HL.getGroupLang(groupsDict, chatID, "move_tic_tac_toe_reply");
            for (let i = 0; i < board.length; i++) {
                for (let j = 0; j < board.length; j++) {
                    if (board[i][j] === 0)
                        stringForSending += " — ";
                    else if (board[i][j] === 1)
                        stringForSending += " ❌ ";
                    else if (board[i][j] === 2)
                        stringForSending += " ⭕ ";
                }
                stringForSending += "\n"
            }
            await client.sendText(stringForSending);
        }

        async function checkWin(b = board, clickedRow = 1, clickedCol = 1) {
            if (b === null)
                return false;
            let count = 1, colToCheck, rowToCheck;
            colToCheck = clickedCol - 1;
            while (colToCheck > -1) {
                if (1 === b[clickedRow][colToCheck]) {
                    count++;
                    colToCheck--;
                } else
                    break;
            }
            colToCheck = clickedCol + 1;
            while (colToCheck < maxCol) {
                if (1 === b[clickedRow][colToCheck]) {
                    count++;
                    colToCheck++;
                } else
                    break;
            }
            if (count >= sequence)
                return true;
            count = 1;
            rowToCheck = clickedRow - 1;
            while (rowToCheck > -1) {
                if (1 === b[rowToCheck][clickedCol]) {
                    count++;
                    rowToCheck--;
                } else
                    break;
            }
            rowToCheck = clickedRow + 1;
            while (rowToCheck < maxRow) {
                if (1 === b[rowToCheck][clickedCol]) {
                    count++;
                    rowToCheck++;
                } else
                    break;
            }

            if (count >= sequence)
                return true;
            count = 1;
            colToCheck = clickedRow - 1;
            rowToCheck = clickedRow - 1;
            while (rowToCheck > -1) {
                if (1 === b[rowToCheck][colToCheck]) {
                    count++;
                    colToCheck--;
                    rowToCheck--;
                } else
                    break;
            }
            colToCheck = clickedRow + 1;
            rowToCheck = clickedRow + 1;
            while (rowToCheck < maxRow) {
                if (1 === b[rowToCheck][colToCheck]) {
                    count++;
                    colToCheck++;
                    rowToCheck++;
                } else
                    break;
            }

            if (count >= sequence)
                return true;
            count = 1;
            colToCheck = clickedCol + 1;
            rowToCheck = clickedRow - 1;
            while (rowToCheck > -1) {
                if (1 === b[rowToCheck][colToCheck]) {
                    count++;
                    colToCheck++;
                    rowToCheck--;
                } else
                    break;
            }
            colToCheck = clickedCol + 1;
            rowToCheck = clickedRow + 1;
            while (rowToCheck < maxRow) {
                if (1 === b[rowToCheck][colToCheck]) {
                    count++;
                    colToCheck--;
                    rowToCheck++;
                } else
                    break;
            }
            return count >= sequence;

        }

        async function computerMove() {
            if (board.includes(0)) {
                let itemsToReturn;
                for (let i = 0; i < board.length; i++) {
                    for (let j = 0; j < board[i].length; j++) {
                        if (board[i][j] !== 0) {
                            let tempBoard = JSON.parse(JSON.stringify(board));
                            tempBoard[i][j] = 2;
                            if (await checkWin(tempBoard, i, j)) {
                                board[i][j] = 2;
                                return [i, j];
                            } else {
                                board[i][j] = 2;
                                itemsToReturn = [i, j];
                            }
                        }
                    }
                }
                if (itemsToReturn)
                    return itemsToReturn;
            } else return [null, null];
        }

        let maxRow = 3, maxCol = 3, sequence = 3;
        let board = [maxRow, maxCol];
        await init();
        await playerMove();
    }
}