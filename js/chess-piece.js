/**
 * 棋子
 */
class ChessPiece {

    color;
    content;
    position;

    constructor(color, content) {
        this.color = color;
        this.content = content;
    }
    static HEI_JU = new ChessPiece("#232323", "车");
    static HEI_MA = new ChessPiece("#232323", "马");
    static HEI_XIANG = new ChessPiece("#232323", "相");
    static HEI_SHI = new ChessPiece("#232323", "士");
    static HEI_SHUAI = new ChessPiece("#232323", "帅");
    static HEI_PAO = new ChessPiece("#232323", "炮");
    static HEI_ZU = new ChessPiece("#232323", "卒");

    static HONG_JU = new ChessPiece("#7a0c00", "车");
    static HONG_MA = new ChessPiece("#7a0c00", "马");
    static HONG_XIANG = new ChessPiece("#7a0c00", "象");
    static HONG_SHI = new ChessPiece("#7a0c00", "士");
    static HONG_JIANG = new ChessPiece("#7a0c00", "将");
    static HONG_PAO = new ChessPiece("#7a0c00", "炮");
    static HONG_BING = new ChessPiece("#7a0c00", "兵");

}