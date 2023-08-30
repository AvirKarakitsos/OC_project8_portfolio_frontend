import { useEffect, useState } from 'react'
import styles from '../../assets/styles/Form.module.css'
import { API_URL } from '../../utils/constants'
import EditSkill from './EditSkill'

function Content() {
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [all, setAll] = useState(null)
    const allCategories = ["client","server","tool"]

    const [client, setClient] = useState(null)
    const [server, setServer] = useState(null)
    const [tool, setTool] = useState(null)

    useEffect(() => {
		fetch('http://localhost:4000/api/skills')
			.then((response) => response.json())
			.then((response) => {
                setAll(response) 
            })
			 .catch((error) => console.log(error))
    }, [])

    useEffect(() => {
        setClient(all?.filter(value => value.category === "client"))
        setServer(all?.filter(value => value.category === "server"))
        setTool(all?.filter(value => value.category === "tool"))
        
    }, [all])

    const handleAddSkill = function(e) {
        e.preventDefault()
        let newSkill = {
            userId: localStorage.getItem("userId"),
            name: name,
            category: category
        }

        fetch(`${API_URL}/api/skills`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(newSkill)
            })
            .then(response => {
                if(response.ok) {
                    setName('')
                    setCategory('')
                } 
                return response.json()
            })
            .then(data => {
                console.log(data.message)
                fetch('http://localhost:4000/api/skills')
                .then((response) => response.json())
                .then((response) => setAll(response))
                .catch((error) => console.log(error))
            })
            .catch(err => console.log(err.message))
    }

    const handleEdit = function(id) {
        let copy = [...all]
        copy.forEach(skill => {
            if(skill._id === id) {
                skill.edit = true
                setAll(copy)
            }
        })
    }

    const handleDelete = function(id) {
        fetch(`http://localhost:4000/api/skills/${id}`,
            {
                method: "DELETE",
                headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
            })
            .then(response => response.json())
            .then(data => {
                console.log(data.message)
                fetch('http://localhost:4000/api/skills')
                .then((response) => response.json())
                .then((response) => setAll(response))
                .catch((error) => console.log(error))
            })
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
                                {client?.map(value => 
                                    <li className='flex justify-space' key={value._id}>
                                        {!value.edit
                                            ? <p>{value?.name}</p>
                                            : <EditSkill skill={value} setAll={setAll}/>
                                        }
                                        <i className="fa-solid fa-pen-to-square" onClick={() => handleEdit(value._id)}></i>
                                        <i className="fa-solid fa-trash" onClick={() => handleDelete(value._id)}></i>
                                    </li>
                                )}  
                            </ul>
                        </div>
                        <div>
                            <p>Serveur</p>
                            <ul className='no-bullet'>
                                {server?.map(value => 
                                    <li className='flex justify-space' key={value._id}>
                                        {!value.edit
                                            ? <p>{value?.name}</p>
                                            : <EditSkill skill={value} setAll={setAll}/>
                                        }
                                        <i className="fa-solid fa-pen-to-square" onClick={() => handleEdit(value._id)}></i>
                                        <i className="fa-solid fa-trash" onClick={() => handleDelete(value._id)}></i>
                                    </li>
                                )}  
                            </ul>
                        </div>
                        <div>
                            <p>Outils</p>
                            <ul className='no-bullet'>
                                {tool?.map(value => 
                                    <li className='flex justify-space' key={value._id}>
                                        {!value.edit
                                            ? <p>{value?.name}</p>
                                            : <EditSkill skill={value} setAll={setAll}/>
                                        }
                                        <i className="fa-solid fa-pen-to-square" onClick={() => handleEdit(value._id)}></i>
                                        <i className="fa-solid fa-trash" onClick={() => handleDelete(value._id)}></i>
                                    </li>
                                )}  
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
                            onChange={(e) => setName(e.target.value)}
                            autoComplete='off'
                            required
                        />
                        <select 
                            name="category" 
                            id="category" 
                            className={styles["input-style"]}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        >
                            <option value={category}>{category}</option>
                            {allCategories.map((element,index) => {
                                if (element !== category) {
                                    return <option key={index} value={element}>{element}</option>
                                }
                                return ''
                            } 
                            )}
                        </select>
                    </div>
                        <button className='btn blue no-border'>Ajouter</button>
                </fieldset>
            </form>
        </div>
    )
}

export default Content