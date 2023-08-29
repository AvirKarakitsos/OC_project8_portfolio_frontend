import styles from '../../assets/styles/Form.module.css'

function Content() {
    
    return (
        <div className="flex direction-column justify-center align-center">
            <form>
                <fieldset className={`border-black ${styles["form-container"]}`}>
                    <legend className={styles.title}>A Propos</legend>
                    <select 
                        className={styles["input-size"]}
                        required
                    >
                        <option value={"fr"}></option>
                    </select>
                    <textarea
                    className={styles["area-size"]}
                    >
                    </textarea>
                </fieldset>
                <fieldset className={`border-black ${styles["form-container"]}`}>
                    <legend className={styles.title}>Compétences</legend>              
                    <select 
                        name="select" 
                        id="select" 
                        className={styles["input-style"]}
                    >
                        <option value="option1"></option>
                        <option value="option2"></option>
                        <option value="option3"></option>
                    </select>
                    <input 
                    type="text"
                    className={styles["input-style"]}
                    />
                </fieldset>
            </form>
        </div>
    )
}

export default Content