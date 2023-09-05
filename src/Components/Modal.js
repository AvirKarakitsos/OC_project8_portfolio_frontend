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
                    document.querySelector(`.${styles.video}`)?.pause()
                    modalContainer.close()
                    setModal('')
                })
                document.querySelector(".modal-container").addEventListener("mousedown", (event) => event.stopPropagation())
            }
            getRequest(`projects/${modal}/video`,option)
        }
    },[modal,setModal])

    return(
        <dialog id="modal" className={styles.modal}>
            <div className="modal-container flex">
                { video.length !== 0
                    ? <video className={styles.video} src={video[0].videoUrl} controls autoPlay muted={true} ></video>
                    // : <i className="fa-solid fa-wrench large-font-size color-grey"></i>
                    : <svg className={`large-font-size ${styles.icone}`}  xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M352 320c88.4 0 160-71.6 160-160c0-15.3-2.2-30.1-6.2-44.2c-3.1-10.8-16.4-13.2-24.3-5.3l-76.8 76.8c-3 3-7.1 4.7-11.3 4.7H336c-8.8 0-16-7.2-16-16V118.6c0-4.2 1.7-8.3 4.7-11.3l76.8-76.8c7.9-7.9 5.4-21.2-5.3-24.3C382.1 2.2 367.3 0 352 0C263.6 0 192 71.6 192 160c0 19.1 3.4 37.5 9.5 54.5L19.9 396.1C7.2 408.8 0 426.1 0 444.1C0 481.6 30.4 512 67.9 512c18 0 35.3-7.2 48-19.9L297.5 310.5c17 6.2 35.4 9.5 54.5 9.5zM80 408a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" fill="grey"/></svg>
                }
            </div>
        </dialog>
    )
}

export default Modal