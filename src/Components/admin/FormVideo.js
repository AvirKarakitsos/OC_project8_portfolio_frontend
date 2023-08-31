import { useEffect, useState } from 'react'
import styles from '../../assets/styles/Form.module.css'
import { notification } from '../../utils/common'

function FormVideo() {
    const [video, setVideo] = useState(null)
    const [allProjects, setAllProjects] = useState(null)
    const [oneProject, setOneProject] = useState(null)

    const handleAddVideo = function(e) {
        e.preventDefault()
            if(!oneProject || !video ) {
                document.querySelector('.form-message').innerHTML = "Veuillez compléter les champs"
            } else {
            let newVideo = {
                userId: localStorage.getItem("userId"),
                projectId: oneProject
            }

            let formData = new FormData()
            formData.append("content",JSON.stringify(newVideo))
            formData.append("video",video)

            fetch(`http://localhost:4000/api/videos`,
            {
                method: "POST",
                headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`},
                body: formData
            })
            .then(response => {
                if(response.ok) {
                    setOneProject(null)
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

    useEffect(() => {
        fetch('http://localhost:4000/api/projects')
        .then((response) => response.json())
        .then((response) => setAllProjects(response))
        .catch((error) => console.log(error))
    },[])

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
                    <label className={styles["label-style"]} htmlFor="project">
                        Choisir un projet
                        <select 
                            name="project"
                            id="project" 
                            className={styles["input-style"]}
                            onChange={(e) => setOneProject(e.target.value)}
                        >
                        <option value=""></option>
                            {allProjects?.map(project => <option value={project._id} key={project._id}>{project.title}</option>)}
                        </select>
                    </label>
                    <p className="form-message color-red btn"></p>
                    <button type="submit" className= "btn blue no-border">Ajouter</button>
                </fieldset>
            </form>
        </div>
    )
} 

export default FormVideo