import styles from '../../assets/styles/Form.module.css'
import InputText from './form/InputText'
import { useState } from 'react'
import { notification } from '../../utils/common'
import { getRequest, fetchRequest, requestOptions } from '../../utils/request'

function EditCategory({ category, setAllCategories }) {
    const [editData,setEditData] = useState({
        userId: localStorage.getItem("token"),
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
            let putOption = requestOptions("PUT",editData)

            fetchRequest(`categories/${category._id}`,putOption)
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
            <div className="flex-row-to-column">
                <label className={styles["label-style"]} htmlFor="french">
                    <p>Français</p>
                    <InputText style={styles["input-style-2"]} string="french" value={editData.french} onChange={onEditChange}/>
                </label>
                <label className={styles["label-style"]} htmlFor="english">
                    <p>Anglais</p>
                    <InputText style={styles["input-style-2"]} string="english" value={editData.english} onChange={onEditChange}/>
                </label>
                <label className={styles["label-style"]} htmlFor="color">
                    <p>Couleur</p>
                    <InputText style={styles["input-style-2"]} string="color" value={editData.color} onChange={onEditChange}/>
                </label>
            </div>
            <div className='color-green cursor-default' onClick={() => handleValidate(category._id)}>OK</div>
        </div>
    )
}

export default EditCategory