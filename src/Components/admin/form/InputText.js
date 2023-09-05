import styles from '../../../assets/styles/Form.module.css'

function InputText({string,value,onChange}) {
    return (
        <input 
            type="text"
            className={styles["input-style"]}
            name={string}
            id={string}
            value={value}
            onChange={onChange}
            autoComplete='off'
        />
    )
}

export default InputText