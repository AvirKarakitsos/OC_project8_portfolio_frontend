import styles from "../../assets/styles/Layout.module.css"
import Footer from "../Footer";
import Header from "../Header";
import { ThemeContext } from "../../utils/context/ThemeContext";
import { useContext } from "react";

function Layout({children}) {
    const {theme} = useContext(ThemeContext)
    return (
        <div className={theme === 'light' ? styles.container : `${styles.container} bg-darker-1 color-white`}>
            <div className={styles["sub-container"]}>
                <Header/>
                {children}
                <Footer/>
            </div>
        </div>
    )
} 

export default Layout