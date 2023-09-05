import styles from '../../assets/styles/Form.module.css'
import { useEffect, useState } from 'react'
import { notification } from '../../utils/common'
import { deleteOptions, fetchRequest, getRequest, requestOptions } from '../../utils/request'
import InputFile from './form/InputFile'
import Select from './form/Select'

function FormVideo() {
    const [video, setVideo] = useState(null)
    const [project, setProject] = useState([])
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
        getRequest(`projects/${e.target.value}/video`,setProject)
    }

    const callback = function(data) {
        setAllProjects(data)
        setIsLoading(false)
    }
    
    useEffect(() => getRequest("projects",callback), [])
    
    const handleAddVideo = function(e) {
        e.preventDefault()
        if(data.projectId === ""  || !video ) {
            document.querySelector('.form-message').innerHTML = "Veuillez compléter les champs"
        } else {
            let formData = new FormData()
            formData.append("content",JSON.stringify(data))
            formData.append("video",video)
            let options = null
            if(project.length !== 0) {
                options = requestOptions("PUT",formData,true)
                fetchRequest(`videos/${data.projectId}`,options)
                .then(response => {
                    if(response.ok) {
                        setData({
                            ...data,
                            projectId: ""
                        })
                        setVideo(null)
                    } 
                    return response.json()
                })
                .then(data => {
                    document.querySelector('.form-message').innerHTML = ""
                    console.log(data.message)
                    notification(data.message,"put") 
                })
                .catch(err => console.log(err.message))
            } else {
                options = requestOptions("POST",formData,true)
                fetchRequest("videos",options)
                    .then(response => {
                        if(response.ok) {
                            setData({
                                ...data,
                                projectId: ""
                            })
                            setVideo(null)
                        } 
                        return response.json()
                    })
                    .then(response => {
                        document.querySelector('.form-message').innerHTML = ""
                        console.log(response.message)
                        notification(response.message,"post")
                    })
                    .catch(err => console.log(err.message))
            }
        }
    } 

    const handleDelete = function() {
        fetchRequest(`videos/${data.projectId}`,deleteOptions)
            .then(response => {
                if(response.ok) {
                    setData({
                        ...data,
                        projectId:""
                    })
                } 
                return response.json()
            })
            .then(data => {
                console.log(data.message)
                notification(data.message,"delete")
            })
            .catch(err => console.log(err.message)) 
    }

    return(
        <div className="flex direction-column justify-center align-center">
            <form onSubmit={handleAddVideo}>
                <fieldset className={`border-black ${styles["form-container"]}`}>
                    <legend className={styles.title}>Vidéo</legend>
                    <label className={styles["label-style"]} htmlFor="video">
                        <p>Ajouter une video</p>
                        <InputFile string="video" onChange={setVideo}/>
                    </label>
                    <label className={styles["label-style"]} htmlFor="projectId">
                        Choisir un projet
                        <Select string="projectId" onChange={onChange}>
                        <option value=""></option>
                            {!isLoading &&
                                allProjects?.map(input => <option value={input._id} key={input._id}>{input.title}</option>)
                            }
                        </Select>
                    </label>
                    <p className="form-message color-red btn"></p>
                    {project.length !== 0
                        ? <div className='flex justify-center small-column-gap'>
                            <button type="submit" className="btn bg-green no-border">Modifier</button>
                            <div className="btn bg-red no-border" onClick={handleDelete}>Supprimer</div>
                        </div>
                        : <button type="submit" className="btn bg-blue no-border">Ajouter</button>
                    }
                </fieldset>
            </form>
        </div>
    )
} 

export default FormVideo