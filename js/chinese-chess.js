import CheckerFactory from "./checker/checker-factory.js";
import ChessPiece from "./chess-piece.js";
import Point from "./point.js";

/**
 * 象棋类
 */
export default class ChineseChess {
    /** 棋子的画布，二维数组，9*10个格子 */
    chessPieceCanvasEl;
    /** 棋盘的画布 */
    chessBoardCanvasEl;
    /** 棋子的大小  */
    chessPieceSize;
    /** 内边距 */
    padding;
    /** 外边距 */
    margin;
    /** 当前棋盘上的棋子 */
    chessPieces;
    /** 当前选中的棋子 */
    currentSelectPrice = null;

    reasonableSet = null;

    constructor(elementId) {
        this.chessBoardCanvasEl = document.getElementById(elementId);
        this.chessPieces = [];
        for (let i = 0; i < 10; i++) {
            this.chessPieces[i] = [];
            for (let j = 0; j < 9; j++) {
                this.chessPieces[i][j] = null;
            }
        }
        const canvas = this.chessBoardCanvasEl;
        this.chessBoardCanvasEl.addEventListener("click", (e) => {
            const x = e.pageX - canvas.getBoundingClientRect().left;
            const y = e.pageY - canvas.getBoundingClientRect().top;
            const rowIndex = Math.floor(y / this.chessPieceSize);
            const colIndex = Math.floor(x / this.chessPieceSize);
            const ctx = this.chessBoardCanvasEl.getContext("2d");
            //如果当前未选中，并且当前选中位置有棋子，就做选中操作，否则就要做移动操作了。
            if (this.currentSelectPrice == null && this.chessPieces[rowIndex][colIndex] != null) {
                this.currentSelectPrice = new Point(rowIndex, colIndex);
                const selectedPiece = this.chessPieces[rowIndex][colIndex]
                this.reasonableSet = CheckerFactory.getReasonableSet(selectedPiece, this.currentSelectPrice, this);
            } else if (this.currentSelectPrice && (this.currentSelectPrice.x !== rowIndex || this.currentSelectPrice.y !== colIndex)) {
                const from = this.currentSelectPrice;
                const to = new Point(rowIndex, colIndex);
                if (from.x !== to.x || from.y !== to.y) {
                    const selectedPiece = this.chessPieces[from.x][from.y]
                    if (!CheckerFactory.check(selectedPiece, from, to, this)) {
                        alert("您会吗？")
                        return;
                    }
                    this.chessPieces[rowIndex][colIndex] = this.chessPieces[this.currentSelectPrice.x][this.currentSelectPrice.y]
                    this.chessPieces[this.currentSelectPrice.x][this.currentSelectPrice.y] = null;
                }
                this.reasonableSet = null;
                this.currentSelectPrice = null;
            } else if (this.currentSelectPrice.x === rowIndex && this.currentSelectPrice.y === colIndex) {
                //这次点击和上次点击一样。表示取消选中。
                this.reasonableSet = null;
                this.currentSelectPrice = null;
            }
            this.initChessBoard(ctx);
            this.renderChessPrices(ctx);
        });

    }

    /**
     * 初始化
     */
    init(chessPieceSize, padding) {
        this.chessPieceSize = chessPieceSize;
        this.padding = padding;
        this.width = (chessPieceSize * 8) + (padding * 2);
        this.height = (chessPieceSize * 9) + (padding * 2);
        this.chessBoardCanvasEl.width = this.width;
        this.chessBoardCanvasEl.height = this.height;
        this.chessBoardCanvasEl.style.backgroundColor = "#ebc38d";

        const ctx = this.chessBoardCanvasEl.getContext("2d");

        this.initChessBoard(ctx);
        this.initChessPrices();
        this.renderChessPrices(ctx);
    }

    /**
     * 初始化棋盘
     */
    initChessBoard(ctx) {
        ctx.clearRect(0, 0, this.width, this.height);
        const p = this.padding;
        const cps = this.chessPieceSize;
        ctx.strokeStyle = "#c88f6a"
        //画横线
        for (let i = 0; i < 10; i++) {
            this.drawLine(ctx, new Point(p, cps * i + p), new Point(cps * 8 + p, cps * i + p));
        }
        //画竖线
        for (let i = 0; i < 9; i++) {
            this.drawLine(ctx, new Point(cps * i + p, p), new Point(cps * i + p, cps * 4 + p));
            this.drawLine(ctx, new Point(cps * i + p, cps * 5 + p), new Point(cps * i + p, cps * 9 + p));
        }
        //老将的窝
        this.drawLine(ctx, new Point(cps * 3 + p, p), new Point(cps * 5 + p, cps * 2 + p));
        this.drawLine(ctx, new Point(cps * 5 + p, p), new Point(cps * 3 + p, cps * 2 + p));

        this.drawLine(ctx, new Point(cps * 3 + p, cps * 7 + p), new Point(cps * 5 + p, cps * 9 + p));
        this.drawLine(ctx, new Point(cps * 5 + p, cps * 7 + p), new Point(cps * 3 + p, cps * 9 + p));

        //炮和兵的坐标
        this.drawMark(ctx, 2, 1);
        this.drawMark(ctx, 2, 7);
        this.drawMark(ctx, 3, 0);
        this.drawMark(ctx, 3, 2);
        this.drawMark(ctx, 3, 4);
        this.drawMark(ctx, 3, 6);
        this.drawMark(ctx, 3, 8);

        this.drawMark(ctx, 7, 1);
        this.drawMark(ctx, 7, 7);
        this.drawMark(ctx, 6, 0);
        this.drawMark(ctx, 6, 2);
        this.drawMark(ctx, 6, 4);
        this.drawMark(ctx, 6, 6);
        this.drawMark(ctx, 6, 8);
    }

    //画兵和炮的位置标记
    drawMark(ctx, rowIndex, colIndex) {
        const p = this.padding;
        const s = this.chessPieceSize / 10;
        const cps = this.chessPieceSize;
        const x = cps * colIndex + p;
        const y = cps * rowIndex + p;


        if (colIndex != 8) {
            //右下
            this.drawLine(ctx, new Point(x + s + s, y + s), new Point(x + s, y + s), new Point(x + s, y + s + s));
            //右上
            this.drawLine(ctx, new Point(x + s + s, y - s), new Point(x + s, y - s), new Point(x + s, y - s - s));
        }
        if (colIndex != 0) {
            //左上
            this.drawLine(ctx, new Point(x - s - s, y - s), new Point(x - s, y - s), new Point(x - s, y - s - s));
            //左下
            this.drawLine(ctx, new Point(x - s - s, y + s), new Point(x - s, y + s), new Point(x - s, y + s + s));
        }
    }

    //画兵和炮的位置标记
    drawReasonable(ctx, rowIndex, colIndex) {
        const p = this.padding;
        const cps = this.chessPieceSize;
        const x = cps * colIndex + p;
        const y = cps * rowIndex + p;
        ctx.beginPath();
        ctx.arc(x, y, cps / 7, 0, 2 * Math.PI);
        ctx.fillStyle = "#c88f6a";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 20;
        ctx.shadowColor = "rgba(0, 0, 0, 1)";
        ctx.fill();
    }

    drawLine() {
        const ctx = arguments[0];
        for (var i = 1; i < arguments.length; i++) {
            const point = arguments[i];
            if (i === 1) {
                ctx.moveTo(point.x, point.y);
            } else {
                ctx.lineTo(point.x, point.y);
            }
        }
        ctx.stroke();
    }

    /** 初始化棋子 */
    initChessPrices() {
        // this.chessPieces[5][4] = ChessPiece.HEI_MA;
        // this.chessPieces[5][3] = ChessPiece.HEI_MA;
        this.chessPieces[0][0] = ChessPiece.HEI_JU;
        this.chessPieces[0][1] = ChessPiece.HEI_MA;
        this.chessPieces[0][2] = ChessPiece.HEI_XIANG;
        this.chessPieces[0][3] = ChessPiece.HEI_SHI;
        this.chessPieces[0][4] = ChessPiece.HEI_SHUAI;
        this.chessPieces[0][5] = ChessPiece.HEI_SHI;
        this.chessPieces[0][6] = ChessPiece.HEI_XIANG;
        this.chessPieces[0][7] = ChessPiece.HEI_MA;
        this.chessPieces[0][8] = ChessPiece.HEI_JU;
        this.chessPieces[2][1] = ChessPiece.HEI_PAO;
        this.chessPieces[2][7] = ChessPiece.HEI_PAO;
        this.chessPieces[3][0] = ChessPiece.HEI_ZU;
        this.chessPieces[3][2] = ChessPiece.HEI_ZU;
        this.chessPieces[3][4] = ChessPiece.HEI_ZU;
        this.chessPieces[3][6] = ChessPiece.HEI_ZU;
        this.chessPieces[3][8] = ChessPiece.HEI_ZU;
        this.chessPieces[3][6] = ChessPiece.HEI_ZU;

        this.chessPieces[9][0] = ChessPiece.HONG_JU;
        this.chessPieces[9][1] = ChessPiece.HONG_MA;
        this.chessPieces[9][2] = ChessPiece.HONG_XIANG;
        this.chessPieces[9][3] = ChessPiece.HONG_SHI;
        this.chessPieces[9][4] = ChessPiece.HONG_JIANG;
        this.chessPieces[9][5] = ChessPiece.HONG_SHI;
        this.chessPieces[9][6] = ChessPiece.HONG_XIANG;
        this.chessPieces[9][7] = ChessPiece.HONG_MA;
        this.chessPieces[9][8] = ChessPiece.HONG_JU;
        this.chessPieces[7][1] = ChessPiece.HONG_PAO;
        this.chessPieces[7][7] = ChessPiece.HONG_PAO;
        this.chessPieces[6][0] = ChessPiece.HONG_BING;
        this.chessPieces[6][2] = ChessPiece.HONG_BING;
        this.chessPieces[6][4] = ChessPiece.HONG_BING;
        this.chessPieces[6][6] = ChessPiece.HONG_BING;
        this.chessPieces[6][8] = ChessPiece.HONG_BING;
        this.chessPieces[6][6] = ChessPiece.HONG_BING;
    }

    renderChessPrices(ctx) {
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 9; j++) {
                const piece = this.chessPieces[i][j];
                if (piece instanceof ChessPiece) {
                    this.drawPrice(ctx, piece, i, j);
                } else if (this.reasonableSet && this.reasonableSet.has(new Point(i, j).toString())) {
                    this.drawReasonable(ctx, i, j);
                }
            }
        }
    }


    drawPrice(ctx, price, rowIndex, colIndex) {
        const p = this.padding;
        const cps = this.chessPieceSize;
        const x = cps * colIndex + p;
        const y = cps * rowIndex + p;
        ctx.font = this.chessPieceSize / 2 + "px qiti";

        if (this.currentSelectPrice != null && this.currentSelectPrice.x == rowIndex && this.currentSelectPrice.y == colIndex) {

            ctx.beginPath();
            ctx.arc(x, y, cps / 2, 0, 2 * Math.PI);
            ctx.fillStyle = price.color;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.shadowBlur = 20;
            ctx.shadowColor = "rgba(0, 0, 0, 1)";
            ctx.fill();
            ctx.font = this.chessPieceSize / 1.5 + "px qiti";
        } else {

            ctx.beginPath();
            ctx.arc(x, y, cps / 2.2, 0, 2 * Math.PI);
            ctx.fillStyle = price.color;
            ctx.shadowOffsetX = -2;
            ctx.shadowOffsetY = 2;
            ctx.shadowBlur = 10;
            ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
            ctx.fill();
        }
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 0;
        ctx.shadowColor = "";

        // ctx.beginPath();
        // ctx.arc(x, y, cps / 2.8, 0, 2 * Math.PI);
        // ctx.strokeStyle = "#ccc";
        // ctx.stroke();
        ctx.textBaseline = 'middle'; //设置文本的垂直对齐方式
        ctx.textAlign = 'center' //文字居中
        ctx.fillStyle = "#fff";
        ctx.fillText(price.content, x, y);
    }

    /**
     * 下棋
     */
    move() {

    }

}