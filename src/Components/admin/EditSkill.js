import { useState } from 'react'
import styles from '../../assets/styles/Form.module.css'
import { notification } from '../../utils/common'

function EditSkill({ skill, setAll }) {
    const [skillEdit,setSkillEdit] = useState(skill.name)

    const handleValidate = function() {
        console.log(skillEdit)
        let updateSkill = {
            userId: localStorage.getItem('userId'),
            name: skillEdit,
            category: skill.category
        }

        fetch(`http://localhost:4000/api/skills/${skill._id}`,
                    {
                        method: "PUT",
                        headers: {
                            'Content-Type': 'application/json',
                            "Authorization": `Bearer ${localStorage.getItem("token")}`
                        },
                        body: JSON.stringify(updateSkill)
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data.message)
                        notification(data.message,"put")
                        fetch('http://localhost:4000/api/skills')
                        .then((response) => response.json())
                        .then((response) => setAll(response))
                        .catch((error) => console.log(error))
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