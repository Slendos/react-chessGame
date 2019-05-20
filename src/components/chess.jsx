import React, { Component } from "react";
import { toast } from "react-toastify";

import Popup from "./popup";
import Square from "./square";
import Buttons from "./buttons";
import Alph from "./alph";
import Num from "./num";
import Sideboard from "./sideboard";

import rochadeMove from "./utils/rochade";
import isChecked from "./utils/isChecked";
import isCheckmate from "./utils/isCheckmate";
import { showValidMoves } from "./utils/showValidMoves";
import getMovementHistory from "./utils/movementHistory";
import movePiece from "./utils/movePiece";
import passantMove from "./utils/passantMove";

import "react-toastify/dist/ReactToastify.css";
import { prepareBoard } from "./utils/prepareBoard";

toast.configure();

let toastOptions = {
  autoClose: 1800
};
class Chess extends Component {
  state = {
    board: Array(120), // rendering board
    clicked: false, // variable for checking if we are in phase 1 or 2
    previousClicked: [], // store
    validMoves: [], // higlight valid moves
    turn_white: true, // changing turns
    reverse: false, // rotating board after each turn
    popupChoice: false, // when pawn reaches last square you can choose chess figure
    // when pawn reaches opposite end of board
    popupItems: {
      clicked: [],
      pieceName: "",
      color: ""
    },
    checkedWhite: false, // is white checked
    checkedBlack: false, // is black checked
    history: [], // storing history
    movementHistory: [], // stringified history
    lastMove: undefined, // storing last move that was made
    current: true // checking if we are in latest history move
  };

  componentDidMount() {
    console.log("MOUNT");
    this.renderBoard();
  }

  renderBoard = () => {
    let board = prepareBoard();
    // starting state
    this.setState({
      board: board,
      validMoves: [],
      clicked: false,
      previousClicked: [],
      turn_white: true,
      reverse: false,
      checkedWhite: false,
      checkedBlack: false,
      lastMove: undefined,
      current: true,
      history: [],
      movementHistory: []
    });
  };

  handleRotation = () => {
    this.setState({ reverse: !this.state.reverse });
  };

  handleReset = () => {
    this.renderBoard();
  };

  handlePawnChange = (piece, clicked) => {
    let board = [...this.state.board];
    let index = clicked.id;
    board[index].chessPiece = piece;
    this.setState({ board, popupChoice: false });
  };

  // changing board
  handleHistorySearch = (board, count, index) => {
    let current;
    // find out if we are i latest move
    count === index + 1 ? (current = true) : (current = false);
    this.setState({
      board: board,
      current,
      validMoves: []
    });
  };

  popupChoice = (pieceName, clicked) => {
    let popupItems = Object.assign({}, this.state.popupItems);
    popupItems.pieceName = pieceName;
    popupItems.clicked = clicked;
    popupItems.color = pieceName.substring(0, 1);
    this.setState({ popupChoice: true, popupItems });
  };

  // first click on piece
  handleClick = clickedPiece => {
    // prettier-ignore
    const { board: boardState, previousClicked, clicked, lastMove } = this.state;
    const { turn_white } = this.state;

    // check if it is second click in row or clicked on empty square
    if (clickedPiece.chessPiece === 0 || !this.state.current) return;

    let boardCopy = [...boardState];
    // let chessPiece = clickedPiece.chessPiece.substring(1, 2);
    let color = clickedPiece.chessPiece.substring(0, 1);

    // validating with witch pieces we can move
    if (turn_white && color === "b") { toast.error(`It isn't ${color} move`, toastOptions); return; } // prettier-ignore
    if (!turn_white && color === "w") { toast.error(`it isn't ${color} move`, toastOptions); return; } // prettier-ignore

    let validMoves = showValidMoves(clickedPiece, boardCopy, lastMove);
    if (validMoves.length === 0) return;
    this.setState({
      clicked: !clicked,
      previousClicked: clickedPiece,
      validMoves: validMoves
    });
  };

  // second click -> moving figure
  handleMove = clickedPiece => {
    // prettier-ignore
    const { board: boardState, previousClicked, clicked, validMoves, lastMove, turn_white } = this.state;
    const previous = { ...previousClicked };
    const current = { ...clickedPiece };

    let clonedBoard = JSON.parse(JSON.stringify(boardState));
    let board = boardState.slice(0);

    // IF WE DO INVALID MOVE -> RETURN
    if (!validMoves.find(a => a && a.calcId === clickedPiece.calcId)) {
      toast.error("invalid move", toastOptions);
      this.setState({ clicked: false, validMoves: [] });
      return;
    }
    // prettier-ignore
    this.specialFiguresMov(clickedPiece, previousClicked, lastMove, board);

    board = movePiece(board, clickedPiece, previousClicked);
    // CHECK KING IF HE ISN'T "CHECKED"
    let checkedBlack = isChecked(board, "b");
    let checkedWhite = isChecked(board, "w");

    // undo move if the one who moves has checked king after turn
    if ((checkedWhite && turn_white) || (checkedBlack && !turn_white)) {
      // invalid move, undo move
      toast.info("check", toastOptions);
      board = clonedBoard;
      this.setState({
        board,
        clicked: !clicked,
        validMoves: [],
        checkedWhite: false,
        checkedBlack: false
      });
      return;
    }
    // CHECK IF IT IS END OF GAME
    if (checkedBlack) {
      let isEnd = isCheckmate(board, "b", clickedPiece);
      if (isEnd)
        toast.success("CHECKMATE- White won restart game to play again", {
          ...toastOptions,
          className: "white-background"
        });
      else {
        toast.info("check", toastOptions);
      }
      // toast("ez win");
    } else if (checkedWhite) {
      let isEnd = isCheckmate(board, "w");
      if (isEnd)
        toast.success("CHECKMATE Black won restart game to play again", {
          ...toastOptions,
          className: "black-background"
        });
      else {
        toast.info("check", toastOptions);
      }
    }

    this.handleHistory(current, previous, board);

    this.setState({
      clicked: !clicked, // revert click
      board, // update board with new move
      validMoves: [], // clear
      turn_white: !this.state.turn_white, // invert move
      checkedWhite,
      checkedBlack
    });
  };

  handleHistory = (current, previous, board) => {
    let history = [...this.state.history];
    let clonedArray = JSON.parse(JSON.stringify(board));
    history = [...history, clonedArray];
    history.push();

    let movementHistory = [...this.state.movementHistory];
    let movement = getMovementHistory(current, previous);
    movementHistory.push(movement);

    this.setState({
      history,
      movementHistory,
      lastMove: { from: previous, to: current }
    });
  };

  specialFiguresMov = (current, previous, lastMove, board) => {
    // prettier-ignore
    let previousPiece = previous.chessPiece.substring(1, 2);
    if ((current.calcId < 29 || current.calcId > 90) && previousPiece === "P") {
      this.popupChoice(previous.chessPiece, current);
      toast.info("Choose one of figures", toastOptions);
    }

    if (previousPiece === "K") {
      board = rochadeMove(previous, current, board);
    }

    if (previousPiece === "P" && lastMove) {
      board = passantMove(board, lastMove, current, previous);
    }
  };

  render() {
    const {
      board,
      reverse,
      popupChoice,
      popupItems,
      clicked,
      turn_white
    } = this.state;
    const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const numbers = [8, 7, 6, 5, 4, 3, 2, 1];
    return (
      <div>
        <div className="content">
          <Buttons
            reverse={reverse}
            handleReset={this.handleReset}
            handleRotation={this.handleRotation}
          />
          <div className="parent">
            <div className={`chessboard ${reverse && "reverse"}`}>
              {board.map(square => (
                <Square
                  key={square.squareId}
                  data={square}
                  clicked={clicked}
                  handleClick={this.handleClick}
                  handleMove={this.handleMove}
                  validMoves={this.state.validMoves}
                  reverse={reverse}
                  board={board}
                  turn_white={turn_white}
                />
              ))}
            </div>
            {popupChoice && (
              <Popup
                popupItems={popupItems}
                handleClick={this.handlePawnChange}
              />
            )}
            <Num numbers={numbers} reverse={reverse} />
            <Alph letters={letters} reverse={reverse} />
          </div>
          <Sideboard
            isReverse={reverse}
            history={this.state.movementHistory}
            boardHistory={this.state.history}
            historySearch={this.handleHistorySearch}
            turn_white={turn_white}
          />
        </div>
      </div>
    );
  }
}

export default Chess;
