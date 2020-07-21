import React, { useState } from 'react'

export default function Login(props) {
    console.log('Login.props:', props)
    let [userName, setUserName] = useState('')

    const myChangeHandler = (event) => {
        setUserName(event.target.value)
    }

    return (
        <div className="row justify-content-center">
            <label>Name:</label>
            <input type='text' onChange={myChangeHandler} />
            <input className="btn btn-primary" type='submit' onClick={() => props.onLogin({ userName })} />
        </div>
    )
}
