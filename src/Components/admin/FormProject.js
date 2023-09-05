import styles from '../../assets/styles/Form.module.css'
import Input from './form/Input'
import Textarea from './form/Textarea'
import { useEffect, useState } from "react"
import { notification } from "../../utils/common"
import { deleteOptions, fetchRequest, getOptions, getRequest, requestOptions } from '../../utils/request'

function FormProject() {
    const [projects, setProjects] = useState([])
    const [project, setProject] = useState({})
    const [select, setSelect] = useState("")
    const [allCategories, setAllCategories] = useState([])
    const [isLoading, setIsLoading] = useState({categoryLoading: true, projectLoading: true})
    const [data, setData] = useState({
        title: '',
        tags: '',
        content: '',
        link: '',
        language: '',
        category: ''
    })
    const [image, setImage] = useState(null)
    const allLanguages = ["fr","en"]
    const classBtn = "flex align-center justify-center btn btn-3 no-border"
    const [counter, setCoutner] = useState(0)

    const onChange = function(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
        if(e.target.name === "content") {
            setCoutner(e.target.value.length)
        }
    }

    useEffect(() => {
        if(counter <= 440) {
            document.querySelector(".counter").style.color = "black"
        } else {
            document.querySelector(".counter").style.color = "red"
        }
    },[counter])

    const callbackProject = function(values) {
        setProjects(values)
        setIsLoading(actualValues => ({
            ...actualValues,
            projectLoading: false
        }))
    }
    const callbackCategory = function(values) {
        setAllCategories(values)
        setIsLoading(actualValues => ({
            ...actualValues,
            categoryLoading: false
        }))
    }
    
    const cleanInput = function() {
        setData(values => ({
            ...values,
            title: '',
            tags: '',
            content: '',
            link: '',
            category: '',
            language: ''
        }))
        setImage(null)
        setCoutner(0)
    }
    
    useEffect(() => getRequest("projects",callbackProject),[])

    useEffect(() => getRequest("categories",callbackCategory), [])

    useEffect(() => {
        if(select !== "") {
            fetchRequest(`projects/${select}`,getOptions)
                .then((response) => response.json())
                .then((response) => {
                    setData(values => ({
                        ...values,
                        title: response.title,
                        tags: response.tags,
                        content: response?.content[0].text,
                        link: response.link,
                        language: response?.content[0].language,
                        category: response.category
                    }))
                    setProject(response)
                 })
                 .catch((error) => console.log(error))
        } else {
            cleanInput()
            setProject({})
        }
	 }, [select])
     
    useEffect(() => {
        if(Object.keys(project).length !== 0) {
        let newText = project.content.filter(lang => lang.language === data.language)
        setData(actualValues => ({
            ...actualValues,
            content: newText.length !== 0 ? newText[0].text : ""
        }))
    }
    },[data.language,project])
    
    const handleDelete = function() {
        if(select !== "") {
            fetchRequest(`projects/${select}`,deleteOptions)
                .then(response => {
                    if(response.ok) {
                        cleanInput()
                        setSelect('')
                    } 
                    return response.json()
                })
                .then(data => {
                    console.log(data.message)
                    notification(data.message,"delete")
                    fetchRequest("projects",setProjects)
                })
                .catch(err => console.log(err.message))
        }
    }

    const handleAddProject = function(e) {
        e.preventDefault()
        
        let test = [data.title,data.tags,data.content,data.link,image,data.language,data.category]
        
        if (test.some(field => field === "")) {
            document.querySelector('.form-message').innerHTML = "Veuillez compléter tous les champs"
        } else {
            // Insise modify a project loop
            if(select !== "") {
                let newProject = {
                    userId: localStorage.getItem("token"),
                    title: data.title,
                    tags: data.tags,
                    content: [{language: data.language, text: data.content}],
                    link: data.link,
                    language: data.language,
                    category:data.category
                }
                // Case with a new image
                if(image !== null) {
                    let formData = new FormData()
                    formData.append("project",JSON.stringify(newProject))
                    formData.append("image",image)
                    let postOptionsImage = requestOptions("PUT",formData,true)

                    fetchRequest(`projects/${select}`, postOptionsImage)  
                        .then(response => {
                            if(response.ok) {
                                cleanInput()
                                setSelect('')
                                setIsLoading(actualValues => ({
                                    ...actualValues,
                                    projectLoading: true,
                                    categoryLoading: true,
                                }))
                            } 
                            return response.json()
                        })
                        .then(response => {
                            document.querySelector('.form-message').innerHTML = ""
                            console.log(response.message)
                            notification(response.message,"put")
                            getRequest("projects",callbackProject)
                        })
                        .catch(err => console.log(err.message))
                } else {         
                    //Modify with no image
                    let putOptions = requestOptions("PUT",newProject)

                    fetchRequest(`projects/${select}`, putOptions)  
                        .then(response => {
                            if(response.ok) {
                                cleanInput()
                                setSelect('')
                                setIsLoading(actualValues => ({
                                    ...actualValues,
                                    projectLoading: true,
                                    categoryLoading: true,
                                }))
                            } 
                            return response.json()
                        })
                        .then(response => {
                            document.querySelector('.form-message').innerHTML = ""
                            console.log(response.message)
                            notification(response.message,"put")
                            getRequest("projects",callbackProject)
                        })
                        .catch(err => console.log(err.message))
                }
            } else {
                //Inside a post request
                if (test.some(field => field === null)) {
                    document.querySelector('.form-message').innerHTML = "Veuillez ajouter une image"
                } else {
                    let newProject = {
                        userId: localStorage.getItem("token"),
                        title: data.title,
                        tags: data.tags,
                        content: [{language: data.language, text: data.content}],
                        link: data.link,
                        language: data.language,
                        category:data.category
                    }
                    let formData = new FormData()
                    
                    formData.append("project",JSON.stringify(newProject))
                    formData.append("image",image)

                    let postOptions = requestOptions("POST",formData,true)
                    
                    fetchRequest("projects",postOptions)
                        .then(response => {
                            if(response.ok) {
                                cleanInput()
                                setIsLoading(actualValues => ({
                                    ...actualValues,
                                    projectLoading: true,
                                    categoryLoading: true,
                                }))
                            } 
                            return response.json()
                        })
                        .then(response => {
                            document.querySelector('.form-message').innerHTML = ""
                            console.log(response.message)
                            notification(response.message,"post")
                            getRequest("projects",callbackProject)
                        })
                        .catch(err => console.log(err.message))
                }
            }
        }
    }

    return (
        <div className="flex direction-column justify-center align-center">
            <div className="flex align-center small-column-gap">
                {!isLoading.projectLoading
                    && <select 
                        name="select" 
                        id="select" 
                        className={styles["input-style"]}
                        onChange={(e) => setSelect(e.target.value)}
                    >
                        <option value=""></option>
                        {projects.map(input => <option value={input._id} key={input._id}>{input.title}</option>)}
                    </select>
                }
                <button 
                    className={select !== "" ? classBtn+" bg-red" : classBtn+" bg-dark"}
                    onClick={handleDelete}
                >
                    Supprimer
                </button>
            </div>

            <form onSubmit={handleAddProject}>
                <fieldset className={styles["form-container"]}>
                    <legend className={styles.title}>Projets</legend>
                    <label className={styles["label-style"]} htmlFor="title">
                        Titre
                        <Input string="title" value={data.title} onChange={onChange}/>
                    </label>
                    <label className={styles["label-style"]} htmlFor="tags">
                        <p>Liste de tags</p>
                        <Input string="tags" value={data.tags} onChange={onChange}/>
                    </label>
                    <div className="flex align-center small-column-gap small-row-gap">
                        <label className={styles["label-style"]} htmlFor="content">
                            <p>Contenu <span className='counter'>{counter}/440</span></p>
                            <Textarea sting="content" value={data.content} onChange={onChange}/>
                        </label>
                        <select 
                            name="language" 
                            id="language" 
                            className="size-32"
                            onChange={onChange}
                        >
                            <option value={data.language}>{data.language.toLocaleUpperCase()}</option>
                    
                            {allLanguages.map((element,index) => {
                                if (element !== data.language) {
                                    return <option key={index} value={element}>{element.toLocaleUpperCase()}</option>
                                }
                                return ''
                            } 
                            )}
                    
                        </select>
                    </div>
                    <label className={styles["label-style"]} htmlFor="link">
                        <p>Lien github</p>
                        <Input string="link" value={data.link} onChange={onChange}/>
                    </label>
                    <label className={styles["label-style"]} htmlFor="image">
                        <p>Ajouter une image</p>   
                        <input
                            className={styles["input-style"]}
                            type="file"
                            name="image"
                            id="image"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </label>
                    <label className={styles["label-style"]} htmlFor="category">
                        <p>Catégorie</p>
                        <select 
                            name="category" 
                            id="category" 
                            className={styles["input-style"]}
                            onChange={onChange}
                        >
                            <option value={data.category}>{data.category}</option>
                            {allCategories.map((element) => {
                                if (element !== data.category) {
                                    return <option key={element._id} value={element.key}>{element.french}</option>
                                }
                                return ''
                            } 
                            )}
                        </select>
                    </label>
                    <p className="form-message color-red btn"></p>
                    {select !== "" ?
                    <button type="submit" className= "btn bg-green no-border">Modifier</button>
                    : <button type="submit" className= "btn bg-blue no-border">Ajouter</button>
                    }
                </fieldset>
            </form>
        </div>
    )
}

export default FormProject