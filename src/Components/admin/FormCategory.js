import styles from '../../assets/styles/Form.module.css'
import EditCategory from './EditCategory'
import InputText from './form/InputText'
import { useEffect, useState } from 'react'
import { notification } from '../../utils/common'
import { getRequest, fetchRequest, requestOptions, deleteOptions } from '../../utils/request'

function FormCategory() {
    const [data,setData] = useState({
        userId: localStorage.getItem('token'),
        french: '',
        english: '',
        color: ''
    })
    const [allCategories, setAllCategories] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isValid, setIsValid] = useState(true)

    const onChange = function(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const callback = function(values) {
        setAllCategories(values)
        setIsLoading(false)
    }

    useEffect(() => getRequest("categories",callback), [])

    const handleAddCategory = function(e) {
        e.preventDefault()
        if((data.french === "") || (data.english === "") || (data.color === "")) {
            setIsValid(false)
        } else {
            setIsValid(true)
            let options = requestOptions("POST", data) 
            fetchRequest("categories",options)
                .then(response => {
                    if(response.ok) {
                        setData( values => ( {
                            ...values,
                            french: '',
                            english: '',
                            color: ''
                        } ))
                    } 
                    return response.json()
                })
                .then(response => {
                    console.log(response.message)
                    notification(response.message,"post")
                    getRequest("categories",setAllCategories)
                })
                .catch(err => console.log(err.message))
        }
    }

    const handleEdit = function(id) {
        let copy = [...allCategories]
        copy.forEach(content => {
            if(content._id === id) {
                content.edit = true
                setAllCategories(copy)
            }
        })
    }

    const handleDelete = function(id) {
        fetchRequest(`categories/${id}`,deleteOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data.message)
                notification(data.message,"delete")
                getRequest("categories",setAllCategories)
            })
            .catch(err => console.log(err.message))
    }

    return (
        <div className="flex direction-column justify-center align-center">
            <form onSubmit={handleAddCategory}>
                <fieldset className={styles["form-container"]}>
                    <legend className={styles.title}>Catégories</legend>

                    <ul className='width-100 flex direction-column small-row-gap no-bullet'>
                        {!isLoading && allCategories.map(value =>
                            <li className='width-100 flex justify-space medium-column-gap' key={value._id}>
                                {!value.edit
                                    ? <div className='width-100 flex-row-to-column justify-space tiny-row-gap-2'>
                                        <p>{value?.french}</p>
                                        <p>{value?.english}</p>
                                        <p>{value?.color}</p>
                                    </div>
                                    : <EditCategory category={value} setAllCategories={setAllCategories} setIsValid={setIsValid}/>
                                }
                                <div className='flex aling-center tiny-column-gap'>
                                    <i className="fa-solid fa-pen-to-square color-blue" onClick={() => handleEdit(value._id)}></i>
                                    <i className="fa-solid fa-trash color-grey" onClick={() => handleDelete(value._id)}></i>
                                </div>
                            </li>
                        )}
                    </ul>
            
                    <div className='width-100 flex-row-to-column small-column-gap'>
                        <label className={styles["label-style"]} htmlFor="french">
                            Français
                            <InputText style={styles["input-style"]} string="french" value={data.french} onChange={onChange} />
                        </label>
                        <label className={styles["label-style"]} htmlFor="english">
                            Anglais
                            <InputText style={styles["input-style"]} string="english" value={data.english} onChange={onChange}/>
                        </label>
                        <label className={styles["label-style"]} htmlFor="color">
                            Couleur
                            <InputText style={styles["input-style"]} string="color" value={data.color} onChange={onChange}/>
                        </label>
                    </div>
                    {!isValid && <p className="form-message color-red btn">"Veuillez compléter tous les champs"</p> }
                    <button className='btn bg-blue no-border'>Ajouter</button>
                </fieldset>
            </form>
        </div>
    )
}

export default FormCategory