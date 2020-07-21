import React, { useState } from 'react';
import './App.css';
import ChoiceCard from './components/ChoiceCard'
import ChoiceButtons from './components/ChoiceButtons'
import { CHOICES, getRoundOutcome } from './utils'


function App() {
    // State 
    const [prompt, setGamePrompt] = useState("1, 2, 3, SHOOT!");
    let [playerChoice, setPlayerChoice] = useState(null)
    let [computerChoice, setComputerChoice] = useState(null)
    const [previousWinner, setPreviousWinner] = useState(null)
    const [gameHistory, setGameHistory] = useState([]);

    // Function 
    const onPlayerChoose = playerChoice => {
        const [result, computerChoice] = getRoundOutcome(playerChoice)
        const newUserChoice = CHOICES[playerChoice]
        const newComputerChoice = CHOICES[computerChoice]
        setPlayerChoice(newUserChoice)
        setComputerChoice(newComputerChoice)

        if (result === 'Victory') {
            setPreviousWinner('You')
        } else if (result === 'Defeat') {
            setPreviousWinner('Computer')
        } else {
            setPreviousWinner('Tie')
        }

        setGamePrompt(result)
        gameHistory.push(result);
        setGameHistory(gameHistory);

    }

    return (
        <div className="App">
            <div className="container justify-content-between">
                <div className="row mb-3">
                    <div className="col-md-8 themed-grid-col">
                        <ChoiceCard title={'You'} image={playerChoice && playerChoice.url} winner={true} previousWinner={previousWinner} />
                        <h1>{prompt}</h1>
                        <ChoiceButtons onPlayerChoose={onPlayerChoose} />
                        <ChoiceCard title={'Computer'} image={computerChoice && computerChoice.url} winner={false} previousWinner={previousWinner} />
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
