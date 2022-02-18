'use strict'
import ChessPiece from '../chess-piece.js';
import MaChecker from './ma-checker.js'
import JuChecker from "./ju-checker.js";
import XiangChecker from "./xiang-checker.js";

export default class CheckerFactory {
    constructor() {

    }

    static init() {
        CheckerFactory.registry = new Map();
        CheckerFactory.registry.set(ChessPiece.HEI_MA.code, new MaChecker());
        CheckerFactory.registry.set(ChessPiece.HONG_MA.code, new MaChecker());

        CheckerFactory.registry.set(ChessPiece.HEI_JU.code, new JuChecker());
        CheckerFactory.registry.set(ChessPiece.HONG_JU.code, new JuChecker());

        CheckerFactory.registry.set(ChessPiece.HEI_XIANG.code, new XiangChecker());
        CheckerFactory.registry.set(ChessPiece.HONG_XIANG.code, new XiangChecker());
        console.log("1", CheckerFactory.registry);
        CheckerFactory.initialized = true;
    }

    static registry;
    static initialized = false;

    static check(piece, from, to, chineseChess) {
        if (!CheckerFactory.initialized) {
            CheckerFactory.init();
        }
        const checker = CheckerFactory.registry.get(piece.code)
        if (checker == null) {
            return false;
        }
        if (chineseChess.chessPieces[to.x][to.y] && chineseChess.chessPieces[from.x][from.y].color === chineseChess.chessPieces[to.x][to.y].color) {
            return false;
        }
        return checker.check(piece, from, to, chineseChess);
    }

    static getReasonableSet(piece, from, chineseChess) {
        if (!CheckerFactory.initialized) {
            CheckerFactory.init();
        }
        const checker = CheckerFactory.registry.get(piece.code)
        if (checker == null) {
            return new Set();
        }
        return checker.getReasonableSet(from, chineseChess);
    }


}