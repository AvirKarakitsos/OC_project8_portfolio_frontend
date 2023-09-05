import styles from '../../../assets/styles/Form.module.css'

function InputEditText({string,value,onChange}) {
    return (
        <input 
            type="text"
            className={styles["input-style-2"]}
            name={string}
            id={string}
            value={value}
            onChange={onChange}
            autoComplete='off'
        />
    )
}

export default InputEditText