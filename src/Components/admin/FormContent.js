import styles from '../../assets/styles/Form.module.css'
import EditContent from './EditContent'
import { useEffect, useState } from 'react'
import { notification } from '../../utils/common'
import { deleteOptions, fetchRequest, getRequest, requestOptions } from '../../utils/request'

function FormContent() {
    const [data,setData] = useState({
        userId: localStorage.getItem('token'),
        french: '',
        english: '',
    })
    const [allContents, setAllContents] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const onChange = function(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const callback = function(values) {
        setAllContents(values)
        setIsLoading(false)
    }

    useEffect(() => {
        getRequest("contents",callback)
    }, [])

    const handleAddContent = function(e) {
        e.preventDefault()
        if((data.french === "") || (data.english === "")) {
            document.querySelector('.form-message').innerHTML = "Veuillez compléter tous les champs"
        } else {
            let options = requestOptions("POST",data)
            fetchRequest("contents",options)
                .then(response => {
                    if(response.ok) {
                        setData( values => ( {
                            ...values,
                            french: '',
                            english: ''
                        } ))
                        document.querySelector('.form-message').innerHTML = ""
                    } 
                    return response.json()
                })
                .then(data => {
                    console.log(data.message)
                    notification(data.message,"post")
                    getRequest("contents",setAllContents)
                })
                .catch(err => console.log(err.message))
        }
    }

    const handleEdit = function(id) {
        let copy = [...allContents]
        copy.forEach(content => {
            if(content._id === id) {
                content.edit = true
                setAllContents(copy)
            }
        })
    }

    const handleDelete = function(id) {
        fetchRequest(`contents/${id}`,deleteOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data.message)
                notification(data.message,"delete")
                getRequest("contents",setAllContents)
            })
            .catch(err => console.log(err.message))
    }
    
    return (
        <div className="flex direction-column justify-center align-center">
            <form onSubmit={handleAddContent}>
                <fieldset className={`border-black ${styles["form-container"]}`}>
                    <legend className={styles.title}>A Propos</legend>
                    <ul className='width-100 flex direction-column medium-row-gap no-bullet'>
                        {!isLoading && allContents.map(value => 
                            <li className='flex justify-space small-column-gap' key={value._id}>
                                {!value.edit
                                    ? <div className='width-100 flex justify-space'>
                                        <p className={styles.paragraph}>{value?.french}</p>
                                        <p className={styles.paragraph}>{value?.english}</p>
                                    </div>
                                    : <EditContent content={value} setAllContents={setAllContents}/>
                                }
                                <div className='flex aling-center tiny-column-gap'>
                                    <i className="fa-solid fa-pen-to-square color-blue" onClick={() => handleEdit(value._id)}></i>
                                    <i className="fa-solid fa-trash color-grey" onClick={() => handleDelete(value._id)}></i>
                                </div>
                            </li>
                        )}
                    </ul>
                    <div className="width-100 flex justify-space medium-column-gap">
                        <label className={styles["label-style-column"]} htmlFor="french">
                            <p>Français</p>
                            <textarea
                                className={styles["area-size"]}
                                name="french"
                                id="french"
                                value={data.french}
                                onChange={onChange}
                            >
                            </textarea>
                        </label>
                         <label className={styles["label-style-column"]} htmlFor="english">
                            <p>Anglais</p>
                            <textarea
                                className={styles["area-size"]}
                                name="english"
                                id="english"
                                value={data.english}
                                onChange={onChange}
                            >
                            </textarea>
                        </label>
                    </div>
                    <p className="form-message color-red btn"></p>
                    <button className='btn bg-blue no-border'>Ajouter</button>
                </fieldset>
            </form>
        </div>
    )
}

export default FormContent