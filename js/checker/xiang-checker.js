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

        const minX = chineseChess.chessPieces[x][y].color === 'black' ? 0 : 5;
        const maxX = chineseChess.chessPieces[x][y].color === 'black' ? 4 : 9;

        //左上
        if (x - 2 >= minX && y && !chineseChess.chessPieces[x - 1][y - 1]) {
            reasonableSet.add(new Point(x - 2, y - 2).toString());
        }
        //右上
        if (x - 2 >= minX && y < 8 && !chineseChess.chessPieces[x - 1][y + 1]) {
            reasonableSet.add(new Point(x - 2, y + 2).toString());
        }
        // 右下
        if (x + 2 <= maxX && y && !chineseChess.chessPieces[x + 1][y - 1]) {
            reasonableSet.add(new Point(x + 2, y - 2).toString());
        }
        //左下
        if (x + 2 <= maxX && y < 8 && !chineseChess.chessPieces[x + 1][y + 1]) {
            reasonableSet.add(new Point(x + 2, y + 2).toString());
        }
        return reasonableSet;
    }
}