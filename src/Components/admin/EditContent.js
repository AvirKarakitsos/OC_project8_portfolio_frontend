import styles from '../../assets/styles/Form.module.css'
import { useState } from 'react'
import { notification } from '../../utils/common'
import { fetchRequest, getRequest, requestOptions } from '../../utils/request'

function EditContent({ content, setAllContents }) {
    const [editData,setEditData] = useState({
        french: content.french,
        english: content.english,
    })

    const onEditChange = function(e) {
        setEditData({
            ...editData,
            [e.target.name]: e.target.value
        })
    }
   
    const handleValidate = function() {
        let putOption = requestOptions('PUT',editData)

        fetchRequest(`contents/${content._id}`,putOption)
            .then(response => response.json())
            .then(data => {
                console.log(data.message)
                notification(data.message,"put")
                getRequest("contents",setAllContents)
            })
            .catch(err => console.log(err.message))
    }

    return (
        <div className='width-100 flex justify-space align-center small-column-gap'>
            <div className="width-100 flex justify-space medium-column-gap">
                <textarea
                    className={styles["area-size-2"]}
                    name="french"
                    id="french"
                    value={editData.french}
                    onChange={onEditChange}
                >
                </textarea>
                <textarea
                    className={styles["area-size-2"]}
                    name="english"
                    id="english"
                    value={editData.english}
                    onChange={onEditChange}
                >
                </textarea>
            </div>
            <div className='color-green cursor-default' onClick={() => handleValidate(content._id)}>OK</div>
        </div>
    )
}

export default EditContent