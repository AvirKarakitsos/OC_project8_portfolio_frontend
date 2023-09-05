import styles from '../../../assets/styles/Form.module.css'

function InputFile({string,onChange}) {
    return (
        <input
            className={styles["input-style"]}
            type="file"
            id={string}
            name={string}
            onChange={(e) => onChange(e.target.files[0])}
        />
    )
}

export default InputFile