import { useEffect, useState } from "react";

function Admin() {
    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState({});
    const [select, setSelect] = useState("")
    
    const [title, setTitle] = useState('')
    const [tags, setTags] = useState('')
    const [content, setContent] = useState('')
    const [link, setLink] = useState('')
    const [image, setImage] = useState(null)
    const [language, setLanguage] = useState('')
    const [type, setType] = useState('')

    const allLanguages = ["fr","en"]
    const allTypes = ["perso",'openclassrooms']
    const classBtn = "flex align-center justify-center btn btn-delete no-border"

    useEffect(() => {
		fetch('http://localhost:4000/api/projects')
			 .then((response) => response.json())
			 .then((response) => setProjects(response))
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
                    setType(response.type)

                    setProject(response)
                 })
                 .catch((error) => console.log(error))
        } else {
            setTitle('')
            setTags('')
            setContent('')
            setLink('')
            setLanguage('')
            setType('')

            setProject({})
        }
	 }, [select])

     useEffect(() => {
        if(Object.keys(project).length !== 0) {
            let newText = project.content.filter(lang => lang.language === language)
            setContent(newText[0]?.text)
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
                        setImage(null)
                    } 
                    return response.json()
                })
                .then(data => console.log(data.message))
                .catch(err => console.log(err.message))
        }
    }

    const handleAddProject = function(e) {
        e.preventDefault()
        let newProject = {
            title: title,
            tags: tags,
            content: [{language:language,text:content}],
            link: link,
            type: type
        }

        if(select !== "") {
            fetch(`http://localhost:4000/api/projects/${select}`,
                    {
                        method: "PUT",
                        headers: {
                            'Content-Type': 'application/json',
                            "Authorization": `Bearer ${localStorage.getItem("token")}`},
                        body: JSON.stringify(newProject)
                    })
                    .then(response => {
                        if(response.ok) {
                            setTitle('')
                            setTags('')
                            setContent('')
                            setLink('')
                            setImage(null)
                        } 
                        return response.json()
                    })
                    .then(data => console.log(data.message))
                    .catch(err => console.log(err.message))

        } else {
            if(!image) console.log("Ajouter une image")
            else {
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
                            setImage(null)
                        } 
                        return response.json()
                    })
                    .then(data => console.log(data.message))
                    .catch(err => console.log(err.message))
            }
        }
    }
    
    return (
        <div className="container-100 flex direction-column justify-center align-center">
            <div className="flex align-center justify-center column-gap-15">
                <label className="flex align-center label-style column-gap-15" htmlFor="select">Projet
                    <select 
                        name="select" 
                        id="select" 
                        className="input-style input-size"
                        onChange={(e) => { setSelect(e.target.value); }}
                    >
                        <option value=""></option>
                        {projects.map(project => <option value={project._id} key={project._id}>{project.title}</option>)}
                    </select>
                </label>
                <button 
                    className={select !== "" ? classBtn+" red" : classBtn+" dark"}
                    onClick={handleDelete}
                    >
                        Supprimer
                    </button>
            </div>
            <form onSubmit={handleAddProject} className="form-container flex justify-center align-center border-black">
                <label className="flex align-center label-style column-gap-15" htmlFor={title}>
                    Titre
                    <input
                        className="input-style input-size"
                        type="text"
                        name="title"
                        id="title"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value); }}
                        required
                    />
                </label>
                <label className="flex align-center label-style column-gap-15" htmlFor="tags">
                    <p>Liste de tags</p>
                    <input
                        className="input-style input-size"
                        type="text"
                        name="tags"
                        id="tags"
                        value={tags}
                        onChange={(e) => { setTags(e.target.value); }}
                        required
                    />
                </label>
                <div className="flex align-center column-gap-15">
                    <label className="flex align-center label-style column-gap-15" htmlFor="content">
                        <p>Contenu</p>
                        <textarea
                            className="input-style area-size"
                            name="content"
                            id="content"
                            value={content}
                            onChange={(e) => { setContent(e.target.value); }}
                            required
                        >
                        </textarea>
                    </label>
                    <select 
                        name="language" 
                        id="language" 
                        className="input-size"
                        onChange={(e) => { setLanguage(e.target.value); }}
                        required
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
                <label className="flex align-center label-style column-gap-15" htmlFor="link">
                    <p>Lien github</p>
                    <input
                        className="input-style input-size"
                        type="text"
                        name="link"
                        id="link"
                        value={link}
                        onChange={(e) => { setLink(e.target.value); }}
                        required
                    />
                </label>
                <label className="flex align-center label-style column-gap-15" htmlFor="image">
                    <p>Ajouter une image</p>   
                    <input
                        className="input-style input-size"
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={(e) => { setImage(e.target.files[0]); }}
                    />
                </label>
                <label className="flex align-center label-style column-gap-15" htmlFor="image">
                    <p>Projet</p>
                    <select 
                        name="type" 
                        id="type" 
                        className="input-style input-size"
                        onChange={(e) => { setType(e.target.value); }}
                    >

                        <option value={type}>{type}</option>
                
                        {allTypes.map((element,index) => {
                            if (element !== type) {
                                return <option key={index} value={element}>{element}</option>
                            }
                            return ''
                        } 
                        )}
                    </select>
                </label>
                {select !== "" ?
                <button type="submit" className= "btn green no-border">Modifier</button>
                : <button type="submit" className= "btn blue no-border">Ajouter</button>
                }
            </form>
        </div>
    )
}

export default Admin