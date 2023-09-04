import styles from '../assets/styles/Modal.module.css'
import { useEffect, useState } from "react"
import { getRequest } from "../utils/request"

function Modal({modal, setModal}) {
    const [video, setVideo] = useState([])

    useEffect(()=> {
        if(modal !== "") {
            let option = function(values) {
                setVideo(values)
                let modalContainer = document.getElementById("modal")
                modalContainer.showModal()
                modalContainer.addEventListener("mousedown", () => {
                    modalContainer.close()
                })
                document.querySelector(".modal-container").addEventListener("mousedown", (event) => event.stopPropagation())
            }
            getRequest(`projects/${modal}/video`,option)
        }
    },[modal])

    return(
        <dialog id="modal" className={styles.modal}>
            <div className="modal-container flex">
                { video.length !== 0
                    ? <video className={styles.video} src={video[0].videoUrl} controls autoPlay muted={true} ></video>
                    : <i className="fa-solid fa-wrench large-font-size color-grey"></i>
                }
            </div>
        </dialog>
    )
}

export default Modal