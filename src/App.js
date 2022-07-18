import { useState, useEffect } from 'react'
import './App.css';

import Button from './components/button/button.component';
import Dice from './components/dice/dice.component';

function App() {
  const [gameState, setGameState] = useState("not started") // options: "not started" / "started" / "finished"
  const [dicesResults, setDicesResults] = useState([])
  const rollDie = () => Math.ceil(Math.random() * 6)

  const startGameButtonHandler = () => {
    setGameState("started")
    setDicesResults(state => {
      const newDiecesResults = []
      for (let i = 1; i < 11; i++) {
        const dice = {
          id: i,
          roll: rollDie(),
          isHeld: false
        }
        newDiecesResults.push(dice)
      }
      return newDiecesResults
    })
  }

  const rollDiecesButtonHandler = () => {
    setDicesResults(state => state.map(die => {
      return die.isHeld === false ? { ...die, roll: rollDie() } : die
    }))
  }

  const holdDice = (id) => {
    setDicesResults(state => state.map(die => {
      return die.id !== id ? die : { ...die, isHeld: !die.isHeld }
    })
    )
  }

  useEffect(() => {
    if (gameState === "started") {
      dicesResults.every((die, index, array) => die.roll === array[0].roll) && setGameState("finished")
    }
  }, [dicesResults])

  useEffect(() => {
    gameState === "finished" && setDicesResults(state => state.map(die => {
      return { ...die, isHeld: true }
    }))
  }, [gameState])

  return (
    <div className="App">
      <Button
        onClickHandler={startGameButtonHandler}
        text={gameState === "started" ? "Restart" : "Start Game"}
      />
      <div className='allDicesContainer'>
        {gameState !== "not started" && dicesResults.map(dice => <Dice key={dice.id} dice={dice} onclickHandler={() => holdDice(dice.id)} />)}
      </div>
      {gameState === "started" && <Button
        onClickHandler={rollDiecesButtonHandler}
        text="Roll dieces"
      />}
      {gameState === "finished" && <h2>You win!!!!</h2>}


    </div>
  );
}

export default App;