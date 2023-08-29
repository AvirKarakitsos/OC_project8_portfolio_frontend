import { useState } from 'react'
import styles from '../../assets/styles/Form.module.css'
import { API_URL } from '../../utils/constants'

function Content() {
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const handleAddSkill = function(e) {
        e.preventDefault()
        let newSkill = {
            userId: localStorage.getItem("userId"),
            name: name,
            category: category
        }
        console.log(newSkill)

        fetch(`${API_URL}/api/skills`,
            {
                method: "POST",
                headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`},
                body: JSON.stringify(newSkill)
            })
            .then(response => {
                if(response.ok) {
                    setName('')
                    setCategory('')
                } 
                return response.json()
            })
            .then(data => console.log(data.message))
            .catch(err => console.log(err.message))
    }
    
    return (
        <div className="flex direction-column justify-center align-center">
            <form onSubmit={handleAddSkill}>
                <fieldset className={`border-black ${styles["form-container"]}`}>
                    <legend className={styles.title}>Compétences</legend>              
                    <div className='width-100 flex justify-space'>
                        <div>
                            <p>Client</p>
                            <ul className='no-bullet'>
                                <li></li>
                            </ul>
                        </div>
                        <div>
                            <p>Serveur</p>
                            <ul className='no-bullet'>
                                <li></li>
                            </ul>
                        </div>
                        <div>
                            <p>Outils</p>
                            <ul className='no-bullet'>
                                <li></li>
                            </ul>
                        </div>
                    </div>
                    <div className='width-100 flex small-column-gap'>
                        <input 
                            type="text"
                            className={styles["input-style"]}
                            name="name"
                            id="name"
                            value={name}
                            onChange={(e) => { setName(e.target.value); }}
                            required
                        />
                        <select 
                            name="category" 
                            id="category" 
                            className={styles["input-style"]}
                            onChange={(e) => { setCategory(e.target.value); }}
                            required
                        >
                            <option value=""></option>
                            <option value="client">Client</option>
                            <option value="server">Serveur</option>
                            <option value="tool">Outils</option>
                        </select>
                    </div>
                        <button className='btn blue no-border'>Ajouter</button>
                </fieldset>
            </form>
        </div>
    )
}

export default Content