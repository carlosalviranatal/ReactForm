import { useState } from "react";

export default function Authenticate({ token }) {
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);
    const [usernameDisplay, setUsernameDisplay] = useState(null)
  
    async function handleClick() {
      try {
        const response = await fetch(
          "https://fsa-jwt-practice.herokuapp.com/authenticate",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();
        console.log(result)
        setSuccessMessage(result.message);
        setUsernameDisplay(result.data.username)
      } catch (error) {
        setError(error.message);
      }
    }

    return(
        <>
        <h2>Authentication</h2>
        {successMessage && <p>{successMessage}</p>}
        {error && <p>{error}</p>}
        {usernameDisplay && <p>Your username is: <b>{usernameDisplay}</b></p>}
        <button onClick={handleClick}>Authenticate Token</button>
        </>
    )
}