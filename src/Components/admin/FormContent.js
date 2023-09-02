import { useEffect, useState } from 'react'
import styles from '../../assets/styles/Form.module.css'
import { API_URL } from '../../utils/constants'
import { notification } from '../../utils/common'
import EditContent from './EditContent'

function FormContent() {
    const [french, setFrench] = useState('')
    const [english, setEnglish] = useState('')
    const [allContents, setAllContents] = useState(null)
    const [display, setDisplay] = useState(null)

    useEffect(() => {
		fetch('http://localhost:4000/api/contents')
			.then((response) => response.json())
			.then((response) => {
                setAllContents(response) 
            })
			.catch((error) => console.log(error))
    }, [])

    useEffect(() => {
        setDisplay(allContents)
    }, [allContents])

    const handleAddContent = function(e) {
        e.preventDefault()
        if((french === "") || (english === "")) {
            document.querySelector('.form-message').innerHTML = "Veuillez compléter tous les champs"
        } else {
            let newContent = {
                userId: localStorage.getItem("userId"),
                french: french,
                english: english
            }
    
            fetch(`${API_URL}/api/contents`,
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify(newContent)
                })
                .then(response => {
                    if(response.ok) {
                        setFrench('')
                        setEnglish('')
                        document.querySelector('.form-message').innerHTML = ""
                    } 
                    return response.json()
                })
                .then(data => {
                    console.log(data.message)
                    notification(data.message,"post")
                    fetch('http://localhost:4000/api/contents')
                    .then((response) => response.json())
                    .then((response) => setAllContents(response))
                    .catch((error) => console.log(error))
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
        fetch(`http://localhost:4000/api/contents/${id}`,
            {
                method: "DELETE",
                headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
            })
            .then(response => response.json())
            .then(data => {
                console.log(data.message)
                notification(data.message,"delete")
                fetch('http://localhost:4000/api/contents')
                .then((response) => response.json())
                .then((response) => setAllContents(response))
                .catch((error) => console.log(error))
            })
            .catch(err => console.log(err.message))
    }
    
    return (
        <div className="flex direction-column justify-center align-center">
            <form onSubmit={handleAddContent}>
                <fieldset className={`border-black ${styles["form-container"]}`}>
                    <legend className={styles.title}>A Propos</legend>
                    <ul className='width-100 flex direction-column medium-row-gap no-bullet'>
                        {display?.map(value => 
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
                                value={french}
                                onChange={(e) => setFrench(e.target.value)}
                            >
                            </textarea>
                        </label>
                         <label className={styles["label-style-column"]} htmlFor="english">
                            <p>Anglais</p>
                            <textarea
                                className={styles["area-size"]}
                                name="english"
                                id="english"
                                value={english}
                                onChange={(e) => setEnglish(e.target.value)}
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