'use strict'
import ChessPiece from '../chess-piece.js';
import MaChecker from './ma-checker.js'
import JuChecker from "./ju-checker.js";
import XiangChecker from "./xiang-checker.js";
import ShiChecker from "./shi-checker.js";
import JiangChecker from "./jiang-checker.js";
import PaoChecker from "./pao-checker.js";
import BingChecker from "./bing-checker.js";

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

        CheckerFactory.registry.set(ChessPiece.HEI_SHI.code, new ShiChecker());
        CheckerFactory.registry.set(ChessPiece.HONG_SHI.code, new ShiChecker());

        CheckerFactory.registry.set(ChessPiece.HEI_SHUAI.code, new JiangChecker());
        CheckerFactory.registry.set(ChessPiece.HONG_JIANG.code, new JiangChecker());

        CheckerFactory.registry.set(ChessPiece.HEI_PAO.code, new PaoChecker());
        CheckerFactory.registry.set(ChessPiece.HONG_PAO.code, new PaoChecker());

        CheckerFactory.registry.set(ChessPiece.HEI_ZU.code, new BingChecker());
        CheckerFactory.registry.set(ChessPiece.HONG_BING.code, new BingChecker());

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