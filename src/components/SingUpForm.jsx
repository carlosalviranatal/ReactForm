import { useState } from "react"

export default function SignUpForm (){

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    async function handleSubmit(e){
        await e.preventDefault()
        console.log(username, password)
        try {
            const response = await fetch(
                'https://fsa-jwt-practice.herokuapp.com/signup', {
                    method: "POST",
                    body: JSON.stringify({ username, password})
                }
            )
            const result = response.json()
            console.log(result)
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <h2>Sign Up</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Username: {""} <input value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label>
                    Password: {""} <input value={password} onChange={(e)=> setPassword(e.target.value)}/>
                </label>
                <button>Submit</button>
            </form>
        </>
    )
}