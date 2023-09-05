import styles from '../../../assets/styles/Form.module.css'

function Textarea({string,value,onChange}) {
    return (
        <textarea
            className={styles["area-size"]}
            name={string}
            id={string}
            value={value}
            onChange={onChange}
        >
        </textarea>
    )
}

export default Textarea