function InputText({style,string,value,onChange}) {
    return (
        <input 
            type="text"
            className={style}
            name={string}
            id={string}
            value={value}
            onChange={onChange}
            autoComplete='off'
        />
    )
}

export default InputText