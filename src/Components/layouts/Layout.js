import styles from "../../assets/styles/Layout.module.css"
import Footer from "../Footer";
import Header from "../Header";


function Layout({children}) {
    return (
        <div className={styles.container}>
            <Header/>
            {children}
            <Footer/>
        </div>
    )
} 

export default Layout