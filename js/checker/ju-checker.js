'use strict';
import Point from "../point.js";


export default class JuChecker {

    // 。 。 。 O 。 。 。 。
    // 。 。 。 O 。 。 。 。
    // O O O X O O O O
    // 。 。 。 O 。 。 。 。
    // 。 。 。 O 。 。 。 。

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
            reasonableSet.add(new Point(i, y).toString());
            if (chineseChess.chessPieces[i][y]){
                break;
            }
        }
        // 往下
        for (let i = x + 1; i <= 9; i++) {
            reasonableSet.add(new Point(i, y).toString());
            if (chineseChess.chessPieces[i][y]){
                break;
            }
        }
        // 往左
        for (let i = y - 1; i >= 0; i--) {
            reasonableSet.add(new Point(x, i).toString());
            if (chineseChess.chessPieces[x][i]){
                break;
            }
        }
        // 往右
        for (let i = y + 1; i <= 8; i++) {
            reasonableSet.add(new Point(x, i).toString());
            if (chineseChess.chessPieces[x][i]){
                break;
            }
        }
        return reasonableSet;
    }
}