
function Card({project}) {
    const smallUrl = project.imageUrl.split("/images/")[0] + "/images/small/" + project.imageUrl.split("/images/")[1]

    return (
        <article className="box">
            <h3 className="subtitle">{project.title}</h3>
            <div className='box-picture'>
                <picture className="picture">
                    <source media="(max-width: 450px)" srcSet={smallUrl}/>
                    <img src={project.imageUrl} alt="projet react"/>
                </picture>
            </div>
            <section className="box-section">
                <p><b>Tags: </b><span>{project.tags}</span></p>
                <p className="box-description">{project.content}</p>
                <p><a href={project.link} target="_blank" rel="noreferrer">En savoir plus...</a></p>
            </section>
        </article>    
    )
}

export default Card