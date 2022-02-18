/**
 * 棋子
 */
export default class ChessPiece {

    code;
    color;
    content;
    position;

    constructor(code,color, content) {
        this.code = code;
        this.color = color;
        this.content = content;
    }
    static HEI_JU = new ChessPiece("HEI_JU","black", "车");
    static HEI_MA = new ChessPiece("HEI_MA","black", "马");
    static HEI_XIANG = new ChessPiece("HEI_XIANG","black", "相");
    static HEI_SHI = new ChessPiece("HEI_SHI","black", "士");
    static HEI_SHUAI = new ChessPiece("HEI_SHUAI","black", "帅");
    static HEI_PAO = new ChessPiece("HEI_PAO","black", "炮");
    static HEI_ZU = new ChessPiece("HEI_ZU","black", "卒");

    static HONG_JU = new ChessPiece("HONG_JU","maroon", "车");
    static HONG_MA = new ChessPiece("HONG_MA","maroon", "马");
    static HONG_XIANG = new ChessPiece("HONG_XIANG","maroon", "象");
    static HONG_SHI = new ChessPiece("HONG_SHI","maroon", "士");
    static HONG_JIANG = new ChessPiece("HONG_JIANG","maroon", "将");
    static HONG_PAO = new ChessPiece("HONG_PAO","maroon", "炮");
    static HONG_BING = new ChessPiece("HONG_BING","maroon", "兵");

}
