import styles from "../assets/styles/Form.module.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/constants";

function Login() {
    const [credentials, setCrendentials] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate()

    const onChange = function(e) {
        e.preventDefault()
        setCrendentials({
            ...credentials,
            [e.target.name]: e.target.value
        }) 
    }

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
        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        }

        fetch(`${API_URL}/api/auth/login`, requestOptions)
            .then(response => {
                if(response.ok) {
                    setCrendentials({email:'', password:''})
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
            <form onSubmit={handleLogin}>
                <fieldset className={`border-black ${styles["form-container"]}`}>
                    <legend className={styles.title}>Se Connecter</legend>
                    <label htmlFor="email">
                        <p>Adresse email</p>
                        <input
                            className={styles["input-style"]}
                            type="email"
                            name="email"
                            id="email"
                            value={credentials.email}
                            onChange={onChange}
                        />
                    </label>
                    <label htmlFor="password">
                        <p>Mot de passe</p>
                        <input
                            className={styles["input-style"]}
                            type="password"
                            name="password"
                            id="password"
                            value={credentials.password}
                            onChange={onChange}
                        />
                    </label>
                    <button type="submit" className="btn dark no-border">
                        Se connecter
                    </button>
                </fieldset>
            </form>
        </div>
    )
}

export default Login