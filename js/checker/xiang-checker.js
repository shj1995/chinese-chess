'use strict';
import Point from "../point.js";


export default class XiangChecker {

    // 。 O 。 。 。 O 。 。
    // 。 。 。 。 。 。 。 。
    // 。 。 。 X 。 。 。 。
    // 。 。 。 。 。 。 。 。
    // 。 O 。 。 。 O 。 。

    check(piece, from, to, chineseChess) {
        //判断是否过河
        if (piece.color === 'black' && to.x > 4) {
            return false;
        } else if (piece.color === 'maroon' && to.x < 5) {
            return false;
        }
        let reasonableSet = this.getReasonableSet(from, chineseChess);
        return reasonableSet.has(to.toString());
    }

    getReasonableSet(from, chineseChess) {
        const reasonableSet = new Set();
        let x = from.x;
        let y = from.y;

        //左上
        if (x && y && !chineseChess.chessPieces[x - 1][y - 1]) {
            reasonableSet.add(new Point(x - 2, y - 2).toString());
        }
        //右上
        if (x && y < 8 && !chineseChess.chessPieces[x - 1][y + 1]) {
            reasonableSet.add(new Point(x - 2, y + 2).toString());
        }
        // 右下
        if (x < 9 && y && !chineseChess.chessPieces[x + 1][y - 1]) {
            reasonableSet.add(new Point(x + 2, y - 2).toString());
        }
        //左下
        if (x < 9 && y < 8 && !chineseChess.chessPieces[x + 1][y + 1]) {
            reasonableSet.add(new Point(x + 2, y - 2).toString());
            reasonableSet.add(new Point(x + 2, y + 2).toString());
        }
        return reasonableSet;
    }
}