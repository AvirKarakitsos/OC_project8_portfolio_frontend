function Select({style,string,onChange,children}) {
    return (
        <select 
            className={style}
            name={string}
            id={string} 
            onChange={onChange}
        >
            {children}
        </select>
    )
}

export default Select