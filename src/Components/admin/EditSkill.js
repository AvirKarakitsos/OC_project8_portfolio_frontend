import styles from '../../assets/styles/Form.module.css'

function EditSkill() {
    return (
        <form>
            <input 
                type="text"
                className={styles["input-size"]}    
            />
            <button type='submit'>OK</button>
        </form>
    )
}

export default EditSkill