import React from 'react'
const DEFAULT_IMG =
    "http://www.thewateringhole.co.uk/wp-content/uploads/2012/12/play.png";

export default function ChoiceCard(props) {
    console.log('props:', props)
    const won = props.title === props.previousWinner;
    let className
    const hasPreviousGame = props.previousWinner === 'Computer' || props.previousWinner === props.userName
    if (hasPreviousGame) className = won ? "winner" : "loser"

    let prompt;
    if (won) {
        prompt = "Won";
        className = won ? "winner" : "loser";
    } else if (props.previousWinner === "Tie") {
        prompt = "Tie";
        className = 'tie'
    } else if (props.previousWinner === null) {
        prompt = "Start";
        className = 'tie start'
    } else {
        prompt = "Lose";
    }

    return (
        <div className={`choice-card ${className}`} >
            <h1>{props.title}</h1>
            <img src={props.image || DEFAULT_IMG} alt={props.title} onClick={() => props.onStartGame(prompt)}></img>
            <h3>{prompt}</h3>
        </ div>
    )
}
