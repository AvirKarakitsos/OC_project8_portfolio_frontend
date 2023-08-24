import { useState } from "react";

function Admin() {
    const [title, setTitle] = useState('')
    const [tags, setTags] = useState('')
    const [content, setContent] = useState('')
    const [link, setLink] = useState('')
    const [image, setImage] = useState(null)
    const [language, setLanguage] = useState('fr')

    const handleAddProject = function(e) {
        e.preventDefault()
        const newProject = {
            title: title,
            tags: tags,
            content: image,
            link: link,
            language: language
        }
        if(!image) console.log("Ajouter une image")
        else {
            let formData = new FormData()
            
            formData.append("project",newProject)
            formData.append("image",image)
            
            fetch(`http://localhost:4000/api/projects`,
                {
                    method: "POST",
                    headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`},
                    body: formData
                })
        }
    }
    
    return (
        <div className="container-100 flex justify-center align-center">
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
                <label className="flex align-center label-style column-gap-15" htmlFor="language">Langue
                    <select 
                        name="language" 
                        id="language" 
                        className="input-style input-size"
                        onChange={(e) => { setLanguage(e.target.value); }}
                    >
                        <option value="fr">FR</option>
                        <option value="en">EN</option>
                    </select>
                </label>
                <button type="submit" className="btn-dark no-border">
                    Valider
                </button>
            </form>
        </div>
    )
}

export default Admin