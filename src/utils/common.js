import dataFr from '../assets/lang/fr.json'
import dataEn from '../assets/lang/en.json'

//Data language
export function translate(input) {
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
            displayMessage.classList.remove("bg-blue")
            displayMessage.classList.remove("bg-red")
            displayMessage.classList.add("bg-green")
            break
        case "put":
            displayMessage.classList.remove("bg-green")
            displayMessage.classList.remove("bg-red")
            displayMessage.classList.add("bg-blue")
            break
        case "delete":
            displayMessage.classList.remove("bg-green")
            displayMessage.classList.add("bg-blue")
            displayMessage.classList.add("bg-red")
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
    document.querySelectorAll(".list-filter").forEach(btn => {
        btn.children[0].classList = ""
        if(btn.dataset.tag === tag) {
            btn.children[0].classList.add("btn-filter", "btn", "no-border", "bg-green")
        } else {
            btn.children[0].classList.add("btn-filter", "btn", "no-border", "bg-green-opacity")
        }
    })
}