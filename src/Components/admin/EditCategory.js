import styles from '../../assets/styles/Form.module.css'
import { useState } from 'react'
import { notification } from '../../utils/common'
import { getRequest, fetchRequest } from '../../utils/request'

function EditCategory({ category, setAllCategories }) {
    const [editData,setEditData] = useState({
        french: category.french,
        english: category.english,
        color: category.color
    })

    const onEditChange = function(e) {
        setEditData({
            ...editData,
            [e.target.name]: e.target.value
        })
    }

    const handleValidate = function() {
        if((editData.french === "") || (editData.english === "") || (editData.color === "")) {
            document.querySelector('.form-message').innerHTML = "Veuillez compléter tous les champs"
        } else {
            let requestOptions = {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(editData)
            }
            fetchRequest(`categories/${category._id}`,requestOptions)
                .then(response => response.json())
                .then(data => {
                    document.querySelector('.form-message').innerHTML = ""
                    console.log(data.message)
                    notification(data.message,"put")
                    getRequest("categories",setAllCategories)
                })
                .catch(err => console.log(err.message))
        }
    }

    return (
        <div className='flex align-center small-column-gap'>
            <div className="flex">
                <label className={styles["label-style"]} htmlFor="french">
                    <p>Français</p>
                    <input 
                        type="text"
                        className={styles["input-style-2"]}
                        name="french"
                        id="french"
                        value={editData.french}
                        onChange={onEditChange}
                        autoComplete='off'
                    />
                </label>
                <label className={styles["label-style"]} htmlFor="english">
                    <p>Anglais</p>
                    <input 
                        type="text"
                        className={styles["input-style-2"]}
                        name="english"
                        id="english"
                        value={editData.english}
                        onChange={onEditChange}
                        autoComplete='off'
                    />
                </label>
                <label className={styles["label-style"]} htmlFor="color">
                    <p>Couleur</p>
                    <input 
                        type="text"
                        className={styles["input-style-2"]}
                        name="color"
                        id="color"
                        value={editData.color}
                        onChange={onEditChange}
                        autoComplete='off'
                    />
                </label>
            </div>
            <div className='color-green cursor-default' onClick={() => handleValidate(category._id)}>OK</div>
        </div>
    )
}

export default EditCategory