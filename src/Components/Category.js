import { useContext } from "react"
import { LanguageContext } from '../utils/context/LanguageContext'
import { ThemeContext } from "../utils/context/ThemeContext"

function Category({ category, handleFilter }) {
	const { lang } = useContext(LanguageContext)
    const { theme } = useContext(ThemeContext)
    
    return(
        <li data-tag={category.key} className='list-filter' onClick={() => handleFilter(category.key)}>
            {lang === "fr"
                ? <button className="btn-filter btn no-border bg-green-opacity">{category.french}</button>
                : <button className="btn-filter btn no-border bg-green-opacity">{category.english}</button>
            }
        </li>
    )
}

export default Category