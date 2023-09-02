import { useEffect, useState } from "react";
import styles from '../../assets/styles/Form.module.css'
import { notification } from "../../utils/common";

function FormProject() {
    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState({});
    const [select, setSelect] = useState("")
    const [allCategories, setAllCategories] = useState([])
    const [isLoading, setIsLoading] = useState({categoryLoading: true, projectLoading: true})
    
    const [title, setTitle] = useState('')
    const [tags, setTags] = useState('')
    const [content, setContent] = useState('')
    const [link, setLink] = useState('')
    const [image, setImage] = useState(null)
    const [language, setLanguage] = useState('')
    const [category, setCategory] = useState('')

    const allLanguages = ["fr","en"]


    const classBtn = "flex align-center justify-center btn btn-3 no-border"

    useEffect(() => {
		fetch('http://localhost:4000/api/projects')
			.then((response) => response.json())
			.then((response) => {
                setProjects(response)
                setIsLoading(actualValues => ({
                    ...actualValues,
                    projectLoading: false
                }))
            })
			.catch((error) => console.log(error))
	 }, [])

    useEffect(() => {
		fetch('http://localhost:4000/api/categories')
			.then((response) => response.json())
			.then((response) => {
                setAllCategories(response)
                setIsLoading(actualValues => ({
                    ...actualValues,
                    categoryLoading: false
                }))
            })
			.catch((error) => console.log(error))
	 }, [])

    useEffect(() => {
        if(select !== "") {
            fetch(`http://localhost:4000/api/projects/${select}`,
            {
                method: "GET",
                headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
            })
                .then((response) => response.json())
                .then((response) => {
                    setTitle(response.title)
                    setTags(response.tags)
                    setContent(response.content[0].text)
                    setLanguage(response.content[0].language)
                    setLink(response.link)
                    setCategory(response.category)

                    setProject(response)
                 })
                 .catch((error) => console.log(error))
        } else {
            setTitle('')
            setTags('')
            setContent('')
            setLink('')
            setLanguage('')
            setCategory('')

            setProject({})
        }
	 }, [select])

     useEffect(() => {
        if(Object.keys(project).length !== 0) {
            let newText = project.content.filter(lang => lang.language === language)
            setContent(newText.length !== 0 ? newText[0].text : "")
        }
     },[language, project])
    
    const handleDelete = function() {
        if(select !== "") {
            fetch(`http://localhost:4000/api/projects/${select}`,
                {
                    method: "DELETE",
                    headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
                })
                .then(response => {
                    if(response.ok) {
                        setTitle('')
                        setTags('')
                        setContent('')
                        setLink('')
                        setLanguage('')
                        setCategory('')
                        setImage(null)
                        setSelect('')
                    } 
                    return response.json()
                })
                .then(data => {
                    console.log(data.message)
                    notification(data.message,"delete")
                    fetch('http://localhost:4000/api/projects')
                    .then((response) => response.json())
                    .then((response) => setProjects(response))
                    .catch((error) => console.log(error))
                })
                .catch(err => console.log(err.message))
        }
    }

    const handleAddProject = function(e) {
        e.preventDefault()
        let test = [title,tags,content,link,image,language,category]
        
        if (test.some(field => field === "")) {
            document.querySelector('.form-message').innerHTML = "Veuillez compléter tous les champs"
        } else {           
            let newProject = {
                userId: localStorage.getItem("userId"),
                title: title,
                tags: tags,
                content: [{language:language,text:content}],
                link: link,
                category: category
            }

            if(select !== "") {
                fetch(`http://localhost:4000/api/projects/${select}`,
                    {
                        method: "PUT",
                        headers: {
                            'Content-Type': 'application/json',
                            "Authorization": `Bearer ${localStorage.getItem("token")}`
                        },
                        body: JSON.stringify(newProject)
                    })
                    .then(response => {
                        if(response.ok) {
                            setTitle('')
                            setTags('')
                            setContent('')
                            setLink('')
                            setLanguage('')
                            setCategory('')
                            setImage(null)
                            setSelect('')
                            setIsLoading(actualValues => ({
                                ...actualValues,
                                projectLoading: true,
                                categoryLoading: true,
                            }))
                        } 
                        return response.json()
                    })
                    .then(data => {
                        console.log(data.message)
                        notification(data.message,"put")
                        fetch('http://localhost:4000/api/projects')
                        .then((response) => response.json())
                        .then((response) => setProjects(response))
                        .catch((error) => console.log(error))
                    })
                    .catch(err => console.log(err.message))

            } else {
                if (test.some(field => field === null)) {
                    document.querySelector('.form-message').innerHTML = "Veuillez ajouter une image"
                } else {
                    let formData = new FormData()
                    
                    formData.append("project",JSON.stringify( newProject))
                    formData.append("image",image)
                    
                    fetch(`http://localhost:4000/api/projects`,
                        {
                            method: "POST",
                            headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`},
                            body: formData
                        })
                        .then(response => {
                            if(response.ok) {
                                setTitle('')
                                setTags('')
                                setContent('')
                                setLink('')
                                setLanguage('')
                                setCategory('')
                                setImage(null)
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
                            fetch('http://localhost:4000/api/projects')
                            .then((response) => response.json())
                            .then((response) => setProjects(response))
                            .catch((error) => console.log(error))
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
                        {projects.map(project => <option value={project._id} key={project._id}>{project.title}</option>)}
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
                    <label className={styles["label-style"]} htmlFor={title}>
                        Titre
                        <input
                            className={styles["input-style"]}
                            type="text"
                            name="title"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            
                        />
                    </label>
                    <label className={styles["label-style"]} htmlFor="tags">
                        <p>Liste de tags</p>
                        <input
                            className={styles["input-style"]}
                            type="text"
                            name="tags"
                            id="tags"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            
                        />
                    </label>
                    <div className="flex align-center small-column-gap">
                        <label className={styles["label-style"]} htmlFor="content">
                            <p>Contenu</p>
                            <textarea
                                className={styles["area-size"]}
                                name="content"
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                
                            >
                            </textarea>
                        </label>
                        <select 
                            name="language" 
                            id="language" 
                            className={styles["input-size"]}
                            onChange={(e) => setLanguage(e.target.value)}
                            
                        >
                            <option value={language}>{language.toLocaleUpperCase()}</option>
                    
                            {allLanguages.map((element,index) => {
                                if (element !== language) {
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
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            
                        />
                    </label>
                    <label className={styles["label-style"]} htmlFor="image">
                        <p>Ajouter une image</p>   
                        <input
                            className={styles["input-style"]}
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </label>
                    <label className={styles["label-style"]} htmlFor="image">
                        <p>Catégorie</p>
                        <select 
                            name="category" 
                            id="category" 
                            className={styles["input-style"]}
                            onChange={(e) => setCategory(e.target.value)}
                            
                        >
                            <option value={category}>{category}</option>
                            {allCategories.map((element) => {
                                if (element !== category) {
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