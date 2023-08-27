import dataFr from '../assets/lang/fr.json'
import dataEn from '../assets/lang/en.json'

export const translate = function(input) {
    let data = null
    if(input === "fr") data = dataFr
    else data = dataEn
    return data
 }