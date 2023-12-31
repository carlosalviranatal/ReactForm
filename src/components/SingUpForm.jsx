import { useState } from 'react'

export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [signUpMessage, setSignUpMessage] = useState(null)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    await e.preventDefault()

    if (username.length == 0) {
      alert('Oops! Username cannot be left empty.')
      return 
  }

  if (password.length < 6) {
      alert("Password must be greater or equal to 6 characters.")
  }
  
  if (username.length < 4) {
    alert("Username must be greater or equal to 4 characters.")
  }

    try {
      const response = await fetch(
        'https://fsa-jwt-practice.herokuapp.com/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        }
      )
      const result = await response.json()
      setToken(result.token)
      setSignUpMessage(result.message)
      console.log(result)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='container'>
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username: {''}{' '}
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password: {''}{' '}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button>Submit</button>
      </form>
     {signUpMessage && <p>{signUpMessage}</p>}
    </div>
  )
}
