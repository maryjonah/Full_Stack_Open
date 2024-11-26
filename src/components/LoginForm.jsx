import { useState } from 'react'

const LoginForm = ({ handleLogin }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
  
    const loginForm = event => {
        event.preventDefault()
        handleLogin({
            username: username,
            password: password
        })
        setUsername('')
        setPassword('')
    }    

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={ loginForm }>
                <div>
                    username <input value={ username } onChange={ event => setUsername(event.target.value) } />
                </div>
                <div>
                    password <input value={ password } onChange={ event => setPassword(event.target.value) } />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )    
}

export default LoginForm
