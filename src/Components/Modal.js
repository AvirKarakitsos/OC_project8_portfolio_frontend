import { useEffect, useState } from "react"
import styles from '../assets/styles/Modal.module.css'
import { API_URL } from "../utils/constants"

function Modal({modal, setModal}) {
    const [video, setVideo] = useState(null)

    useEffect(()=> {
        if(modal !== "") {
            fetch(`${API_URL}/api/projects/${modal}/video`)
            .then((response) => response.json())
            .then((response) => {
                setVideo(response)
                let modalContainer = document.getElementById("modal")
                modalContainer.showModal()
                modalContainer.addEventListener("mousedown", () => {
                    modalContainer.close()
                    setModal("")
                })
                document.querySelector(".modal-container").addEventListener("mousedown", (event) => event.stopPropagation())
        })    
        .catch((error) => console.log(error))
        }
    },[modal, setModal])

    return(
        <dialog id="modal" className={styles.modal}>
            <div className="modal-container flex">
                { video !== null
                    ? <video className={styles.video} src={video[0].videoUrl} controls autoPlay muted={true} ></video>
                    : <i className="fa-solid fa-wrench"></i>
                }
            </div>
        </dialog>
    )
}

export default Modal