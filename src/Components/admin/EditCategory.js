import styles from '../../assets/styles/Form.module.css'
import { useState } from 'react'
import { notification } from '../../utils/common'

function EditCategory({ category, setAllCategories }) {
    const [frenchEdit, setFrenchEdit] = useState(category.french)
    const [englishEdit, setEnglishEdit] = useState(category.english)
    const [colorEdit, setColorEdit] = useState(category.color)

    const handleValidate = function() {
        if((frenchEdit === "") || (englishEdit === "") || (colorEdit === "")) {
            document.querySelector('.form-message').innerHTML = "Veuillez compléter tous les champs"
        } else {

        
            let updateCategory = {
                userId: localStorage.getItem('userId'),
                french: frenchEdit,
                english: englishEdit,
                color: colorEdit
            }

            fetch(`http://localhost:4000/api/categories/${category._id}`,
                        {
                            method: "PUT",
                            headers: {
                                'Content-Type': 'application/json',
                                "Authorization": `Bearer ${localStorage.getItem("token")}`
                            },
                            body: JSON.stringify(updateCategory)
                        })
                        .then(response => response.json())
                        .then(data => {
                            document.querySelector('.form-message').innerHTML = ""
                            console.log(data.message)
                            notification(data.message,"put")
                            fetch('http://localhost:4000/api/categories')
                            .then((response) => response.json())
                            .then((response) => setAllCategories(response))
                            .catch((error) => console.log(error))
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
                            value={frenchEdit}
                            onChange={(e) => setFrenchEdit(e.target.value)}
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
                            value={englishEdit}
                            onChange={(e) => setEnglishEdit(e.target.value)}
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
                            value={colorEdit}
                            onChange={(e) => setColorEdit(e.target.value)}
                            autoComplete='off'
                        />
                </label>
            </div>
            <div className='color-green cursor-default' onClick={() => handleValidate(category._id)}>OK</div>
        </div>
    )
}

export default EditCategory