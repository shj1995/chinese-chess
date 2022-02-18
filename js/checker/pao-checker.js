'use strict';
import Point from "../point.js";


export default class PaoChecker {

    //      3 4 5
    // 。 。 。 O 。 O 。 。 。 。
    // 。 。 。 。 X 。 。 。 。 。
    // 。 。 。 O 。 O 。 。 。 。
    // 。 。 。 。 。 。 。 。 。 。
    // 。 。 。 。 。 。 。 。 。 。

    check(piece, from, to, chineseChess) {
        let reasonableSet = this.getReasonableSet(from, chineseChess);
        return reasonableSet.has(to.toString());
    }

    getReasonableSet(from, chineseChess) {
        const reasonableSet = new Set();
        let x = from.x;
        let y = from.y;
        // 往上
        for (let i = x - 1; i >= 0; i--) {
            if (chineseChess.chessPieces[i][y]) {
                while (i >= 0) {
                    i--;
                    if (chineseChess.chessPieces[i][y]) {
                        reasonableSet.add(new Point(i, y).toString());
                        break;
                    }
                }
                break;
            }
            reasonableSet.add(new Point(i, y).toString());
        }
        // 往下
        for (let i = x + 1; i <= 9; i++) {
            if (chineseChess.chessPieces[i][y]) {
                while (i <= 9) {
                    i++;
                    if (chineseChess.chessPieces[i][y]) {
                        reasonableSet.add(new Point(i, y).toString());
                        break;
                    }
                }
                break;
            }
            reasonableSet.add(new Point(i, y).toString());
        }
        // 往左
        for (let i = y - 1; i >= 0; i--) {
            if (chineseChess.chessPieces[x][i]) {
                while (i >= 0) {
                    i--;
                    if (chineseChess.chessPieces[x][i]) {
                        reasonableSet.add(new Point(x, i).toString());
                        break;
                    }
                }
                break;
            }
            reasonableSet.add(new Point(x, i).toString());
        }
        // 往右
        for (let i = y + 1; i <= 8; i++) {
            if (chineseChess.chessPieces[x][i]) {
                while (i <= 8) {
                    i++;
                    if (chineseChess.chessPieces[x][i]) {
                        reasonableSet.add(new Point(x, i).toString());
                    }
                    break;
                }
                break;
            }
            reasonableSet.add(new Point(x, i).toString());
        }
        return reasonableSet;
    }
}