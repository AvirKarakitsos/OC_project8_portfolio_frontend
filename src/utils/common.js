import dataFr from '../assets/lang/fr.json'
import dataEn from '../assets/lang/en.json'

//Data language
export const translate = function(input) {
    let data = null
    if(input === "fr") data = dataFr
    else data = dataEn
    return data
 }

 //Message for adding or removing project
export function notification(value,method){
    let displayMessage = document.querySelector(".message")
    displayMessage.innerHTML = value
    switch(method){
        case "post":
            displayMessage.classList.remove("blue")
            displayMessage.classList.remove("red")
            displayMessage.classList.add("green")
            break
        case "put":
            displayMessage.classList.remove("green")
            displayMessage.classList.remove("red")
            displayMessage.classList.add("blue")
            break
        case "delete":
            displayMessage.classList.remove("green")
            displayMessage.classList.add("blue")
            displayMessage.classList.add("red")
            break
        default:
            displayMessage.classList.add("")
    }
    displayMessage.style.display = "block"
    setTimeout(()=>{
        displayMessage.style.display = "none"
    },3000)
}

export function changeColor(tag) {
    document.querySelectorAll(".btn-filter").forEach(btn => {
        btn.classList = ""
        if(btn.dataset.tag === tag) {
            btn.classList.add("btn-filter", "btn", "bg-green")
        } else {
            btn.classList.add("btn-filter", "btn", "bg-green-opacity")
        }
    })
}