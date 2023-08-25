import { useEffect } from "react"
import kasa from '../assets/videos/Kasa.mp4'

function Modal({modal, setModal}) {

    useEffect(()=> {
        if(modal !== "") {
            let modalContainer = document.getElementById("modal")
            modalContainer.showModal()
            modalContainer.addEventListener("mousedown", () => {
                modalContainer.close()
                setModal("")
            })    
            document.querySelector(".modal-container").addEventListener("mousedown", (event) => event.stopPropagation())
        }
    },[modal, setModal])

    return(
        <dialog id="modal">
            <div className="modal-container flex">
                <video src={kasa} controls></video>
            </div>
        </dialog>
    )
}

export default Modal