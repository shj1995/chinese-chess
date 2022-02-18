'use strict';
import Point from "../point.js";


export default class BingChecker {

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
        const x = from.x;
        const y = from.y;
        let isPro = false;
        let isBlack = chineseChess.chessPieces[x][y].color === 'black';
        if (isBlack && from.x > 4) {
            isPro = true;
        } else if (chineseChess.chessPieces[x][y].color !== 'black' && from.x < 5) {
            isPro = true;
        }
        if (isBlack) {
            //下
            if (x + 1 <= 9) {
                reasonableSet.add(new Point(x + 1, y).toString());
            }
        } else {
            //上
            if (x - 1 >= 0) {
                reasonableSet.add(new Point(x - 1, y).toString());
            }
        }
        if (isPro) {
            //左
            if (y - 1 >= 0) {
                reasonableSet.add(new Point(x, y - 1).toString());
            }
            //右
            if (y + 1 <= 8) {
                reasonableSet.add(new Point(x, y + 1).toString());
            }
        }
        return reasonableSet;
    }
}