import styles from '../../assets/styles/Form.module.css'
import EditSkill from './EditSkill'
import InputText from './form/InputText'
import { useEffect, useState } from 'react'
import { notification } from '../../utils/common'
import { deleteOptions, fetchRequest, getRequest, requestOptions } from '../../utils/request'
import Select from './form/Select'

function FormSkill() {
    const [data,setData] = useState({
        userId: localStorage.getItem("userId"),
        name: '',
        category: '',
    })
    const [allSkills, setAllSkills] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const allCategories = ["client","server","tool"]

    const [client, setClient] = useState(null)
    const [server, setServer] = useState(null)
    const [tool, setTool] = useState(null)
    const [isValid, setIsValid] = useState(true)

    const onChange = function(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const callback = function(values) {
        setAllSkills(values)
        setIsLoading(false)
    }

    useEffect(() => getRequest("skills",callback), [])

    useEffect(() => {
        setClient(allSkills?.filter(value => value.category === "client"))
        setServer(allSkills?.filter(value => value.category === "server"))
        setTool(allSkills?.filter(value => value.category === "tool"))
    }, [allSkills])

    const handleAddSkill = function(e) {
        e.preventDefault()
        if((data.name === "") || (data.category === "")) {
            setIsValid(false)
        } else {
            setIsValid(true)
            let postOptions = requestOptions("POST",data)
            fetchRequest("skills",postOptions)
                .then(response => {
                    if(response.ok) {
                        setData( {
                            ...data,
                            name: '', 
                            category: ''
                        })
                        setIsLoading(true)
                    } 
                    return response.json()
                })
                .then(response => {
                    console.log(response.message)
                    notification(response.message,"post")
                    getRequest("skills",callback)
                })
                .catch(err => console.log(err.message))
        }
    }

    const handleEdit = function(id) {
        let copy = [...allSkills]
        copy.forEach(skill => {
            if(skill._id === id) {
                skill.edit = true
                setAllSkills(copy)
            }
        })
    }

    const handleDelete = function(id) {
        fetchRequest(`skills/${id}`, deleteOptions)
            .then(response => response.json())
            .then(data => {
                setIsLoading(true)
                console.log(data.message)
                notification(data.message,"delete")
                getRequest("skills",callback)
            })
            .catch(err => console.log(err.message))
    }
    
    return (
        <div className="flex direction-column justify-center align-center">
            <form onSubmit={handleAddSkill}>
                <fieldset className={styles["form-container"]}>
                    <legend className={styles.title}>Compétences</legend>              
                    <div className={styles["grid-container"]}>
                        <div>
                            <p className={styles.subtitle}>Client</p>
                            <ul className='flex direction-column tiny-row-gap no-bullet'>
                                {!isLoading && client?.map(value => 
                                    <li className='flex justify-space tiny-column-gap' key={value._id}>
                                        {!value.edit
                                            ? <p>{value?.name}</p>
                                            : <EditSkill skill={value} setAllSkills={setAllSkills}/>
                                        }
                                        <div className='flex aling-center tiny-column-gap'>
                                            <i className="fa-solid fa-pen-to-square color-blue" onClick={() => handleEdit(value._id)}></i>
                                            <i className="fa-solid fa-trash color-grey" onClick={() => handleDelete(value._id)}></i>
                                        </div>
                                    </li>
                                )}  
                            </ul>
                        </div>
                        <div>
                            <p className={styles.subtitle}>Serveur</p>
                            <ul className='flex direction-column tiny-row-gap no-bullet'>
                                {!isLoading && server?.map(value => 
                                    <li className='flex justify-space tiny-column-gap' key={value._id}>
                                        {!value.edit
                                            ? <p>{value?.name}</p>
                                            : <EditSkill skill={value} setAllSkills={setAllSkills} setIsValid={setIsValid}/>
                                        }
                                        <div className='flex aling-center tiny-column-gap'>
                                            <i className="fa-solid fa-pen-to-square color-blue" onClick={() => handleEdit(value._id)}></i>
                                            <i className="fa-solid fa-trash color-grey" onClick={() => handleDelete(value._id)}></i>
                                        </div>
                                    </li>
                                )}  
                            </ul>
                        </div>
                        <div>
                            <p className={styles.subtitle}>Base de données</p>
                            <ul className='flex direction-column tiny-row-gap no-bullet'>
                                {!isLoading && tool?.map(value => 
                                    <li className='flex justify-space tiny-column-gap' key={value._id}>
                                        {!value.edit
                                            ? <p>{value?.name}</p>
                                            : <EditSkill skill={value} setAllSkills={setAllSkills}/>
                                        }
                                        <div className='flex aling-center tiny-column-gap'>
                                            <i className="fa-solid fa-pen-to-square color-blue" onClick={() => handleEdit(value._id)}></i>
                                            <i className="fa-solid fa-trash color-grey" onClick={() => handleDelete(value._id)}></i>
                                        </div>
                                    </li>
                                )}  
                            </ul>
                        </div>
                    </div>
                    <div className='width-100 flex-row-to-column small-column-gap'>
                        <InputText style={styles["input-style"]} string="name" value={data.name} onChange={onChange}/>
                        <Select style={styles["input-style"]} string="category" onChange={onChange}>
                            <option value={data.category}>{data.category}</option>
                            {allCategories.map((element,index) => {
                                if (element !== data.category) {
                                    return <option key={index} value={element}>{element}</option>
                                }
                                return ''
                            } 
                            )}
                        </Select>
                    </div>
                    {!isValid && <p className="form-message color-red btn">"Veuillez compléter tous les champs"</p> }
                    <button className='btn bg-blue no-border'>Ajouter</button>
                </fieldset>
            </form>
        </div>
    )
}

export default FormSkill