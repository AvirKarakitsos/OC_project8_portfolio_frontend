import styles from '../../assets/styles/Form.module.css'
import InputText from './form/InputText'
import { useState } from 'react'
import { notification } from '../../utils/common'
import { fetchRequest, getRequest, requestOptions } from '../../utils/request'

function EditSkill({ skill, setAllSkills, setIsValid }) {
    const [skillEdit,setSkillEdit] = useState(skill.name)

    const handleValidate = function() {
        if(skillEdit === "") {
            setIsValid(false)
        } else {
            setIsValid(true)
            let updateSkill = {
                userId: localStorage.getItem('userId'),
                name: skillEdit,
                category: skill.category
            }
            let putOption = requestOptions("PUT",updateSkill)

            fetchRequest(`skills/${skill._id}`,putOption)
                .then(response => response.json())
                .then(data => {
                    console.log(data.message)
                    notification(data.message,"put")
                    getRequest("skills",setAllSkills)
                })
                .catch(err => console.log(err.message))
        }
    }

    return (
        <div className='flex align-center small-column-gap'>
            <InputText style={styles["input-style-2"]} string="skill" value={skillEdit} onChange={(e) => setSkillEdit(e.target.value)}/>
            <div className='color-green' onClick={() => handleValidate(skill._id)}>OK</div>
        </div>
    )
}

export default EditSkill