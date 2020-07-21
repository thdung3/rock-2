import React from 'react'

export default function ChoiceButtons(props) {
    return (
        <div className="container d-flex justify-content-around">
            <button type="button" className="btn btn-success btn-lg" onClick={() => props.onPlayerChoose('rock')}>Rock</button>
            <button type="button" className="btn btn-success btn-lg" onClick={() => props.onPlayerChoose('paper')}>Paper</button>
            <button type="button" className="btn btn-success btn-lg" onClick={() => props.onPlayerChoose('scissors')}>Scissors</button>
        </div>
    )
}

