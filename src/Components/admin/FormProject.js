import styles from '../../assets/styles/Form.module.css'
import { useEffect, useState } from "react"
import { notification } from "../../utils/common"
import { deleteOptions, fetchRequest, getOptions, getRequest } from '../../utils/request'

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

    const onChange = function(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

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
            language: '',
            category: ''
        }))
        setImage(null)
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
                        content: response.content[0].text,
                        link: response.link,
                        language: response.content[0].language,
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
        
    //     let test = [data.title,data.tags,data.content,data.link,image,data.language,data.category]
        
    //     if (test.some(field => field === "")) {
    //         document.querySelector('.form-message').innerHTML = "Veuillez compléter tous les champs"
    //     } else {           
    //         if(select !== "") {
    //             let putOptions = {
    //                 method: "PUT",
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     "Authorization": `Bearer ${localStorage.getItem("token")}`
    //                 },
    //                 body: JSON.stringify(data)
    //             }
    //             fetchRequest(`projects/${select}`, putOptions)  
    //                 .then(response => {
    //                     if(response.ok) {
    //                         cleanInput()
    //                         setSelect('')
    //                         setIsLoading(actualValues => ({
    //                             ...actualValues,
    //                             projectLoading: true,
    //                             categoryLoading: true,
    //                         }))
    //                     } 
    //                     return response.json()
    //                 })
    //                 .then(data => {
    //                     console.log(data.message)
    //                     notification(data.message,"put")
    //                     getRequest("projects",setProjects)
    //                 })
    //                 .catch(err => console.log(err.message))
    //         } else {
    //             if (test.some(field => field === null)) {
    //                 document.querySelector('.form-message').innerHTML = "Veuillez ajouter une image"
    //             } else {
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

                    let postOptions = {
                        method: "POST",
                        headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`},
                        body: formData
                    }
                    
                    fetchRequest("projects",postOptions)
                        .then(response => {
                            if(response.ok) {
                                cleanInput()
                                setIsLoading(actualValues => ({
                                    ...actualValues,
                                    projectLoading: true,
                                    categoryLoading: true,
                                }))
                                document.querySelector('.form-message').innerHTML = ""
                            } 
                            return response.json()
                        })
                        .then(data => {
                            console.log(data.message)
                            notification(data.message,"post")
                            getRequest("projects",setProjects)
                        })
                        .catch(err => console.log(err.message))
                //}
            //}
        //}
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
                <fieldset className={`border-black ${styles["form-container"]}`}>
                    <legend className={styles.title}>Projets</legend>
                    <label className={styles["label-style"]} htmlFor="title">
                        Titre
                        <input
                            className={styles["input-style"]}
                            type="text"
                            name="title"
                            id="title"
                            value={data.title}
                            onChange={onChange}
                        />
                    </label>
                    <label className={styles["label-style"]} htmlFor="tags">
                        <p>Liste de tags</p>
                        <input
                            className={styles["input-style"]}
                            type="text"
                            name="tags"
                            id="tags"
                            value={data.tags}
                            onChange={onChange}
                        />
                    </label>
                    <div className="flex align-center small-column-gap">
                        <label className={styles["label-style"]} htmlFor="content">
                            <p>Contenu</p>
                            <textarea
                                className={styles["area-size"]}
                                name="content"
                                id="content"
                                value={data.content}
                                onChange={onChange} 
                            >
                            </textarea>
                        </label>
                        <select 
                            name="language" 
                            id="language" 
                            className={styles["input-size"]}
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
                        <input
                            className={styles["input-style"]}
                            type="text"
                            name="link"
                            id="link"
                            value={data.link}
                            onChange={onChange}
                        />
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
                            <option value=""></option>
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