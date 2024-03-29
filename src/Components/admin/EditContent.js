import styles from '../../assets/styles/Form.module.css'
import { useState } from 'react'
import { notification } from '../../utils/common'
import { fetchRequest, getRequest, requestOptions } from '../../utils/request'
import Textarea from './form/Textarea'

function EditContent({ content, setAllContents, setIsValid }) {
    const [editData,setEditData] = useState({
        userId: localStorage.getItem('token'),
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
        if((editData.french === "") && (editData.english === "")) {
            setIsValid(false)
        } else {
            setIsValid(true)
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
    }

    return (
        <div className='width-100 flex justify-space align-center small-column-gap'>
            <div className="width-100 flex-row-to-column justify-space medium-column-gap">
                <Textarea style={styles["area-size-2"]} string="french" value={editData.french} onChange={onEditChange}/>
                <Textarea style={styles["area-size-2"]} string="english" value={editData.english} onChange={onEditChange}/>
            </div>
            <div className='color-green cursor-default' onClick={() => handleValidate(content._id)}>OK</div>
        </div>
    )
}

export default EditContent