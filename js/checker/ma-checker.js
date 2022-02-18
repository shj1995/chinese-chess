'use strict';
import ChessPiece from '../chess-piece.js';
import Point from "../point.js";


export default class MaChecker {

    // 。 。 O 。 O 。 。 。
    // 。 O 。 。 。 O 。 。
    // 。 。 。 X 。 。 。 。
    // 。 O 。 。 。 O 。 。
    // 。 。 O 。 O 。 。 。

    check(piece, from, to, chineseChess) {
        let reasonableSet = this.getReasonableSet(from, chineseChess);
        return reasonableSet.has(to.toString());
    }

    getReasonableSet(from, chineseChess) {
        const reasonableSet = new Set();
        let x = from.x;
        let y = from.y;
        if (y && !chineseChess.chessPieces[x][y - 1]) {
            reasonableSet.add(new Point(x - 1, y - 2).toString());
            reasonableSet.add(new Point(x + 1, y - 2).toString());
        }
        if (y < 8 && !chineseChess.chessPieces[x][y + 1]) {
            reasonableSet.add(new Point(x - 1, y + 2).toString());
            reasonableSet.add(new Point(x + 1, y + 2).toString());
        }
        if (x && !chineseChess.chessPieces[x - 1][y]) {
            reasonableSet.add(new Point(x - 2, y - 1).toString());
            reasonableSet.add(new Point(x - 2, y + 1).toString());
        }
        if (x < 9 && !chineseChess.chessPieces[x + 1][y]) {
            reasonableSet.add(new Point(x + 2, y - 1).toString());
            reasonableSet.add(new Point(x + 2, y + 1).toString());
        }
        return reasonableSet;
    }
}