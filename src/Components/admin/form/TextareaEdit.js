import styles from '../../../assets/styles/Form.module.css'

function TextareaEdit({string,value,onChange}) {
    return (
        <textarea
            className={styles["area-size-2"]}
            name={string}
            id={string}
            value={value}
            onChange={onChange}
        >
        </textarea>
    )
}

export default TextareaEdit