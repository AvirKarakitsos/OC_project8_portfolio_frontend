import { useState } from 'react'
import styles from '../../assets/styles/Form.module.css'
import { notification } from '../../utils/common'

function EditContent({ content, setAllContents }) {
    const [frenchEdit, setFrenchEdit] = useState(content.french)
    const [englishEdit, setEnglishEdit] = useState(content.english)

    const handleValidate = function() {
        let updateContent = {
            userId: localStorage.getItem('userId'),
            french: frenchEdit,
            english: englishEdit
        }

        fetch(`http://localhost:4000/api/contents/${content._id}`,
                    {
                        method: "PUT",
                        headers: {
                            'Content-Type': 'application/json',
                            "Authorization": `Bearer ${localStorage.getItem("token")}`
                        },
                        body: JSON.stringify(updateContent)
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data.message)
                        notification(data.message,"put")
                        fetch('http://localhost:4000/api/contents')
                        .then((response) => response.json())
                        .then((response) => setAllContents(response))
                        .catch((error) => console.log(error))
                    })
                    .catch(err => console.log(err.message))
    }

    return (
        <div className='width-100 flex justify-space align-center small-column-gap'>
            <div className="width-100 flex justify-space medium-column-gap">
                <textarea
                    className={styles["area-size"]}
                    name="french"
                    id="french"
                    value={frenchEdit}
                    onChange={(e) => setFrenchEdit(e.target.value)}
                >
                </textarea>
                <textarea
                    className={styles["area-size"]}
                    name="english"
                    id="english"
                    value={englishEdit}
                    onChange={(e) => setEnglishEdit(e.target.value)}
                >
                </textarea>
            </div>
            <div className='color-green cursor-default' onClick={() => handleValidate(content._id)}>OK</div>
        </div>
    )
}

export default EditContent