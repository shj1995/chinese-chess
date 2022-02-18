'use strict';
import Point from "../point.js";


export default class ShiChecker {

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
        const minX = chineseChess.chessPieces[x][y].color === 'black' ? 0 : 7;
        const maxX = chineseChess.chessPieces[x][y].color === 'black' ? 2 : 9;
        //左上
        if (x - 1 >= minX && y - 1 >= 3) {
            reasonableSet.add(new Point(x - 1, y - 1).toString());
        }
        //右上
        if (x - 1 >= minX && y + 1 <= 5) {
            reasonableSet.add(new Point(x - 1, y + 1).toString());
        }
        // 右下
        if (x + 1 <= maxX && y - 1 >= 3) {
            reasonableSet.add(new Point(x + 1, y - 1).toString());
        }
        //左下
        if (x + 1 <= maxX && y - 1 <= 5) {
            reasonableSet.add(new Point(x + 1, y + 1).toString());
        }
        return reasonableSet;
    }
}