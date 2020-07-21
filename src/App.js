import React, { useState } from 'react';
import './App.css';
import ChoiceCard from './components/ChoiceCard'
import ChoiceButtons from './components/ChoiceButtons'
import Login from './components/Login'
import { CHOICES, getRoundOutcome } from './utils'


function App() {
    // State 
    const [prompt, setGamePrompt] = useState("1, 2, 3, SHOOT!");
    let [playerChoice, setPlayerChoice] = useState(null)
    let [computerChoice, setComputerChoice] = useState(null)
    const [previousWinner, setPreviousWinner] = useState(null)
    const [gameHistory, setGameHistory] = useState([]);
    const [isStartGame, setIsStartGame] = useState(false)
    const [isStartEnd, setIsStartEnd] = useState(false)
    const [classNamePrompt, setClassNamePropmt] = useState('prompt-tie')
    const [flawLess, setFlawLess] = useState({ user: 0, computer: 0 })
    const [userName, setUserName] = useState('You')
    // Function 
    const onPlayerChoose = playerChoice => {
        console.log('isStartGame:', isStartGame)
        if (isStartGame && !isStartEnd) {
            const [result, computerChoice] = getRoundOutcome(playerChoice)
            const newUserChoice = CHOICES[playerChoice]
            const newComputerChoice = CHOICES[computerChoice]
            setPlayerChoice(newUserChoice)
            setComputerChoice(newComputerChoice)

            if (result === 'Victory') {
                setPreviousWinner(userName)
                setClassNamePropmt('prompt-win')
                flawLess.user++
                if (flawLess.computer > 0) {
                    flawLess.computer = 0
                }
            } else if (result === 'Defeat') {
                setPreviousWinner('Computer')
                setClassNamePropmt('prompt-lose')
                flawLess.computer++
                if (flawLess.user > 0) {
                    flawLess.user = 0
                }
            } else {
                setPreviousWinner('Tie')
                setClassNamePropmt('prompt-tie')
            }

            setGamePrompt(result)
            setFlawLess(flawLess)
            console.log('flawLess:', flawLess)
            if (flawLess.user > 2) {
                setGamePrompt(`${userName} Flaw Less`)
                setIsStartEnd(true)
            }

            if (flawLess.computer > 2) {
                setGamePrompt('Computer Flaw Less')
                setIsStartEnd(true)
            }

            gameHistory.push(result);
            setGameHistory(gameHistory);
        }
    }
    const onStartGame = (prompt) => {
        if (prompt === 'Start') {
            setIsStartGame(true)
            setGamePrompt('Rock, Paper or Scissors')
        }
    }

    const onLogin = name => {
        console.log('onLogin:', name)
        setUserName(name.userName)
    }


    return (
        <div className="App">
            <div className="container">
                <div className="row mb-3">
                    <div className="col-md-8 themed-grid-col">
                        <Login onLogin={onLogin} />
                        <ChoiceCard title={userName} image={playerChoice && playerChoice.url} winner={true} previousWinner={previousWinner} onStartGame={onStartGame} userName={userName} />
                        <h1 className={classNamePrompt}>{prompt}</h1>
                        <ChoiceButtons onPlayerChoose={onPlayerChoose} />
                        <ChoiceCard title={'Computer'} image={computerChoice && computerChoice.url} winner={false} previousWinner={previousWinner} onStartGame={onStartGame} userName={userName} />
                    </div>
                    <div className="col-md-4 themed-grid-col">
                        <h3>History</h3>
                        <ul>
                            {gameHistory.map(result => {
                                return <li>{result}</li>;
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
