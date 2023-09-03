import styles from '../../assets/styles/Form.module.css'
import { useEffect, useState } from 'react'
import { notification } from '../../utils/common'
import EditCategory from './EditCategory'
import { getRequest, postRequest } from '../../utils/request'

function FormCategory() {
    const [data,setData] = useState({
        french: '',
        english: '',
        color: ''
    })
    const [allCategories, setAllCategories] = useState([])
    const [isLoading, setIsLoading] = useState(true)

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

    useEffect(() => {
        getRequest("categories",callback)
    }, [])

    const handleAddCategory = function(e) {
        e.preventDefault()
        if((data.french === "") || (data.english === "") || (data.color === "")) {
            document.querySelector('.form-message').innerHTML = "Veuillez compléter tous les champs"
        } else {
            const requestOptions = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(data)
            }

            postRequest("categories",requestOptions)
                .then(response => {
                    if(response.ok) {
                        setData({
                            french: '',
                            english: '',
                            color: ''
                        })
                        document.querySelector('.form-message').innerHTML = ""
                    } 
                    return response.json()
                })
                .then(data => {
                    console.log(data.message)
                    notification(data.message,"post")
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
        fetch(`http://localhost:4000/api/categories/${id}`,
            {
                method: "DELETE",
                headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
            })
            .then(response => response.json())
            .then(data => {
                console.log(data.message)
                notification(data.message,"delete")
                fetch('http://localhost:4000/api/categories')
                .then((response) => response.json())
                .then((response) => setAllCategories(response))
                .catch((error) => console.log(error))
            })
            .catch(err => console.log(err.message))
    }

    return (
        <div className="flex direction-column justify-center align-center">
            <form onSubmit={handleAddCategory}>
                <fieldset className={`border-black ${styles["form-container"]}`}>
                    <legend className={styles.title}>Catégories</legend>

                    <ul className='width-100 flex direction-column tiny-row-gap no-bullet'>
                        {!isLoading && allCategories.map(value =>
                            <li className='width-100 flex justify-space medium-column-gap' key={value._id}>
                                {!value.edit
                                    ? <div className='width-100 flex justify-space'>
                                        <p>{value?.french}</p>
                                        <p>{value?.english}</p>
                                        <p>{value?.color}</p>
                                    </div>
                                    : <EditCategory category={value} setAllCategories={setAllCategories}/>
                                }
                                <div className='flex aling-center tiny-column-gap'>
                                    <i className="fa-solid fa-pen-to-square color-blue" onClick={() => handleEdit(value._id)}></i>
                                    <i className="fa-solid fa-trash color-grey" onClick={() => handleDelete(value._id)}></i>
                                </div>
                            </li>
                        )}
                    </ul>
            
                    <div className='width-100 flex small-column-gap'>
                        <label className={styles["label-style"]} htmlFor="french">
                            Français
                            <input 
                                type="text"
                                className={styles["input-style"]}
                                name="french"
                                id="french"
                                value={data.french}
                                onChange={onChange}
                                autoComplete='off'
                            />
                        </label>
                        <label className={styles["label-style"]} htmlFor="english">
                            Anglais
                            <input 
                                type="text"
                                className={styles["input-style"]}
                                name="english"
                                id="english"
                                value={data.english}
                                onChange={onChange}
                                autoComplete='off'
                            />
                        </label>
                        <label className={styles["label-style"]} htmlFor="color">
                            Couleur
                            <input 
                                type="text"
                                className={styles["input-style"]}
                                name="color"
                                id="color"
                                value={data.color}
                                onChange={onChange}
                                autoComplete='off'
                            />
                        </label>
                    </div>
                        <p className="form-message color-red btn"></p>
                        <button className='btn bg-blue no-border'>Ajouter</button>
                </fieldset>
            </form>
        </div>
    )
}

export default FormCategory