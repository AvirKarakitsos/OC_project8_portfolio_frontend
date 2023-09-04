import { useState } from 'react'
import styles from '../../assets/styles/Form.module.css'
import { notification } from '../../utils/common'
import { fetchRequest, getRequest } from '../../utils/request'

function EditSkill({ skill, setAllSkills }) {
    const [skillEdit,setSkillEdit] = useState(skill.name)

    const handleValidate = function() {
        let updateSkill = {
            userId: localStorage.getItem('userId'),
            name: skillEdit,
            category: skill.category
        }

        let putOptions = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(updateSkill)
        }

        fetchRequest(`skills/${skill._id}`,putOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data.message)
                notification(data.message,"put")
                getRequest("skills",setAllSkills)
                fetch('http://localhost:4000/api/skills')
            })
            .catch(err => console.log(err.message))
    }

    return (
        <div className='flex align-center small-column-gap'>
            <input 
                type="text"
                className={styles["input-style-2"]}
                value={skillEdit}
                onChange={(e) => setSkillEdit(e.target.value)}
            />
            <div className='color-green' onClick={() => handleValidate(skill._id)}>OK</div>
        </div>
    )
}

export default EditSkill