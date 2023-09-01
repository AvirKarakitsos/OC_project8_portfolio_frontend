import { useContext } from "react"
import { LanguageContext } from '../utils/context/LanguageContext'

function Category({ category, handleFilter }) {
	const { lang} = useContext(LanguageContext)
    
    return(
        <li data-tag={category.key} className='btn-filter btn bg-green' onClick={() => handleFilter(category.key)}>
            {lang === "fr"
                ? category.french
                : category.english
            }
        </li>
    )
}

export default Category