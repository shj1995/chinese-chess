'use strict';
import Point from "../point.js";


export default class JiangChecker {

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
        //上
        if (x - 1 >= minX && y - 1 >= 3) {
            reasonableSet.add(new Point(x - 1, y).toString());
        }
        //下
        if (x + 1 <= maxX && y - 1 >= 3) {
            reasonableSet.add(new Point(x + 1, y).toString());
        }
        //左
        if (x + 1 <= maxX && y - 1 <= 5) {
            reasonableSet.add(new Point(x, y - 1).toString());
        }
        //右
        if (x - 1 >= minX && y + 1 <= 5) {
            reasonableSet.add(new Point(x, y + 1).toString());
        }
        return reasonableSet;
    }
}