import styles from '../../assets/styles/Form.module.css'
import { useEffect, useState } from 'react'
import { notification } from '../../utils/common'
import { fetchRequest, getRequest, requestOptions } from '../../utils/request'

function FormVideo() {
    const [video, setVideo] = useState(null)
    const [data, setData] = useState({
        userId: localStorage.getItem("userId"),
        projectId: ""
    })
    const [allProjects, setAllProjects] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const onChange = function(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleAddVideo = function(e) {
        e.preventDefault()
            if(data.projectId === ""  || !video ) {
                document.querySelector('.form-message').innerHTML = "Veuillez compléter les champs"
            } else {
            let formData = new FormData()
            formData.append("content",JSON.stringify(data))
            formData.append("video",video)

            let postOptions = requestOptions("POST",formData,true)
            fetchRequest("videos",postOptions)
                .then(response => {
                    if(response.ok) {
                        setData({
                            ...data,
                            projectId: ""
                        })
                        setVideo(null)
                        document.querySelector('.form-message').innerHTML = ""
                    } 
                    return response.json()
                })
                .then(data => {
                    console.log(data.message)
                    notification(data.message,"post")
                })
                .catch(err => console.log(err.message))
        }
    } 

    const callback = function(data) {
        setAllProjects(data)
        setIsLoading(false)
    }
    
    useEffect(() => getRequest("projects",callback), [])

    return(
        <div className="flex direction-column justify-center align-center">
            <form onSubmit={handleAddVideo}>
                <fieldset className={`border-black ${styles["form-container"]}`}>
                    <legend className={styles.title}>Vidéo</legend>
                    <label className={styles["label-style"]} htmlFor="video">
                        <p>Ajouter une video</p>   
                        <input
                            className={styles["input-style"]}
                            type="file"
                            id="video"
                            onChange={(e) => setVideo(e.target.files[0])}
                        />
                    </label>
                    <label className={styles["label-style"]} htmlFor="projectId">
                        Choisir un projet
                        <select 
                            name="projectId"
                            id="projectId" 
                            className={styles["input-style"]}
                            onChange={onChange}
                        >
                        <option value=""></option>
                            {!isLoading &&
                                allProjects?.map(project => <option value={project._id} key={project._id}>{project.title}</option>)
                            }
                        </select>
                    </label>
                    <p className="form-message color-red btn"></p>
                    <button type="submit" className= "btn bg-blue no-border">Ajouter</button>
                </fieldset>
            </form>
        </div>
    )
} 

export default FormVideo