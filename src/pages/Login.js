import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../assets/styles/Form.module.css"

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    // const handleConnect= function(e){
	// 	e.preventDefault()
    //     const newUser = {
    //         email: email,
    //         password: password
    //     }
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(newUser)
    //     }

    //     fetch('http://localhost:4000/api/auth/signup', requestOptions)
    //         .then(response => {
    //             if(response.ok) {
    //                 setEmail('')
    //                 setPassword('')
    //             } 
    //             return response.json()
    //         })
    //         .then(data=> console.log(data.message))
    //         .catch(err => console.log(err.message))
    // }


    const handleLogin = function(e){
		e.preventDefault()
        let newUser = {
            email: email,
            password: password
        }
        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        }

        fetch('http://localhost:4000/api/auth/login', requestOptions)
            .then(response => {
                if(response.ok) {
                    setEmail('')
                    setPassword('')
                } 
                return response.json()
            })
            .then(data => {
                if (!data?.token) {
                    console.log("error connection")
                } else {
                    localStorage.setItem("token", data.token)
                    localStorage.setItem("userId", data.userId)
                    navigate('/admin')
                }
            })
            .catch(err => console.log(err.message))
    }

    return (
        <div className="container-100 flex justify-center align-center">
            <form onSubmit={handleLogin} className={`border-black ${styles["form-container"]}`}>
                <legend className={styles.title}>Se Connecter</legend>
                <label htmlFor={email}>
                    <p>Adresse email</p>
                    <input
                        className={styles["input-style"]}
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label htmlFor="password">
                    <p>Mot de passe</p>
                    <input
                        className={styles["input-style"]}
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button type="submit" className="btn dark no-border">
                    Se connecter
                </button>
            </form>
        </div>
    )
}

export default Login