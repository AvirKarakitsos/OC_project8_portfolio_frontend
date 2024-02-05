import styles from "../assets/styles/Form.module.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRequest, requestOptions } from "../utils/request";

function Login() {
    const [credentials, setCrendentials] = useState({
        email: '',
        password: ''
    })
    const [isValid, setIsValid] = useState(true)
    
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
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(credentials)
    //     }

    //     fetch('http://localhost:4000/api/auth/signup', requestOptions)
    //         .then(response => {
    //             if(response.ok) {
    //                 setCrendentials({email:'', password:''})
    //             } 
    //             return response.json()
    //         })
    //         .then(data=> console.log(data.message))
    //         .catch(err => console.log(err.message))
    // }

    const handleLogin = function(e){
		e.preventDefault()
        if((credentials.email === "") || (credentials.password === "")) {
            setIsValid(false)
        } else {
        setIsValid(true)
        let postOption = requestOptions("POST",credentials) 

        fetchRequest("auth/login",postOption)
            .then(response => {
                if(response.ok) {
                    setCrendentials({email:'', password:''})
                } 
                return response.json()
            })
            .then(response => {
                if(!response.userId) {
                    console.log(response.message)
                } else {
                    localStorage.setItem("token", response.token)
                    localStorage.setItem("userId", response.userId)
                    navigate('/admin')
                }
            })
            .catch(err => console.log(err.message))
        }
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
                    {!isValid && <p className="form-message color-red btn">"Veuillez compléter tous les champs"</p> }
                    <button type="submit" className="btn bg-dark no-border">
                        Se connecter
                    </button>
                </fieldset>
            </form>
        </div>
    )
}

export default Login