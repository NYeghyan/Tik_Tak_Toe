import { useEffect, useState } from "react";
import "./App.css";
import React from "react";
import Login from "./Components/login";



function App() {
  const [turn, setTurn] = useState("X");
  const [cells, setCells] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState();
  const [nowinner, setNoWinner] = useState();
  const [username, setUsername] = useState();
  const [useronewincount, SetuserOneWinCount] = useState(0);
  const [usertwoewincount, SetuserTwoeWinCount] = useState(0);


  let userOne = localStorage.getItem("userOne");
  let userTwo = localStorage.getItem("userTwo");

  function checkWinner(squares) {
    let combos = {
      across: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
      down: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ],
      diagonal: [
        [0, 4, 8],
        [2, 4, 6],
      ],
    };

    for (let combo in combos) {
      combos[combo].forEach((pattern) => {
        if (
          squares[pattern[0]] === "" ||
          squares[pattern[1]] === "" ||
          squares[pattern[2]] === ""
        ) {
          //  The game is not started
        } else if (
          squares[pattern[0]] === squares[pattern[1]] &&
          squares[pattern[1]] === squares[pattern[2]]
        ) {
          setWinner(squares[pattern[0]]);
        }
      });
    }

    if (!squares.includes("") && !winner) {
      setNoWinner("Drow");
    }
  }

  const handleReset = () => {
    setTurn("X");
    setWinner(null);
    setCells(Array(9).fill(""));
  };

  const handleDrow = () => {
    handleReset();
    setNoWinner("");
    setTurn("X");
  };

  const handleclick = (num) => {
    if (cells[num] !== "") {
      return;
    }
    let squares = [...cells];
    if (turn === "X") {
      squares[num] = "X";
      setTurn("O");
    } else if (turn === "O") {
      squares[num] = "O";
      setTurn("X");
    }
    setCells(squares);
    checkWinner(squares);
  };

  useEffect(() => {
    if (winner === "X" && !nowinner) {
      SetuserOneWinCount((prev) => prev + 1);
      setUsername(userOne);
    }
    if (winner === "O" && !nowinner) {
      SetuserTwoeWinCount((prev) => prev + 1);
      setUsername(userTwo);
    }
  }, [winner]);

  const Cell = ({ num }) => {
    return (
      <button className="list-item" onClick={() => handleclick(num)}>
        {cells[num]}
      </button>
    );
  };

  return (
    <>
      <Login />

      {Login && 
      <div className="app">
        <div className="torn">
          Now Is your torn <b>{turn}</b>
        </div>
        <div className="container">
          <Cell num={0} />
          <Cell num={1} />
          <Cell num={2} />
          <Cell num={3} />
          <Cell num={4} />
          <Cell num={5} />
          <Cell num={6} />
          <Cell num={7} />
          <Cell num={8} />
          <div>
            <div>{userOne} You Are X: </div>
            <div>Winns {useronewincount}</div>
          </div>
          <div>
            <div>{userTwo} You Are O </div>
            <div> Winns : {usertwoewincount}</div>
          </div>
        </div>
        {winner && (
          <>
            <div className="winner-div">
              <p>
                {" "}
                {username} is the winner with <b>{winner} </b> mark
              </p>
              <button className="btn" onClick={handleReset}>
                PLay Again
              </button>
            </div>
            <div className="background"></div>
          </>
        )}
        {nowinner && (
          <>
            <div className="drow-div">
              <p>{nowinner}</p>
              <button className="btn" onClick={handleDrow}>
                Reset Game
              </button>
            </div>
            <div className="background"></div>
          </>
        )}
      </div>
       }
    </>
  );
}

export default App;
