import { useEffect } from "react"
import kasa from '../assets/videos/Kasa.mp4'
import styles from '../assets/styles/Modal.module.css'

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
        <dialog id="modal" className={styles.modal}>
            <div className="modal-container flex">
                <video className={styles.video} src={kasa} controls autoPlay muted={true} ></video>
            </div>
        </dialog>
    )
}

export default Modal