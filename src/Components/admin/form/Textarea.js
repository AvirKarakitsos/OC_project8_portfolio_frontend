function Textarea({style,string,value,onChange}) {
    return (
        <textarea
            className={style}
            name={string}
            id={string}
            value={value}
            onChange={onChange}
        >
        </textarea>
    )
}

export default Textarea