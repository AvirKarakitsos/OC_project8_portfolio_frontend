import styles from '../../../assets/styles/Form.module.css'

function Select({string,onChange,children}) {
    return (
        <select 
            className={styles["input-style"]} 
            name={string}
            id={string} 
            onChange={onChange}
        >
            {children}
        </select>
    )
}

export default Select