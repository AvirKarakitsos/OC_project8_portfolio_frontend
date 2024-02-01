import { useContext } from "react"
import { LanguageContext } from '../utils/context/LanguageContext'

function Category({ category, handleFilter, tag }) {
	const { lang } = useContext(LanguageContext)
    
    return(
        <li data-tag={category.key} className='list-filter' onClick={() => handleFilter(category.key)}>
            {lang === "fr"
                ? <button className={tag === category.key ? "btn-filter btn no-border bg-green" : "btn-filter btn no-border bg-green-opacity"}>{category.french}</button>
                : <button className={tag === category.key ? "btn-filter btn no-border bg-green" : "btn-filter btn no-border bg-green-opacity"}>{category.english}</button>
            }
        </li>
    )
}

export default Category