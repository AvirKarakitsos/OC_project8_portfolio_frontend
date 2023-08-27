import { useContext } from "react"
import { ThemeContext } from "../utils/context/ThemeContext"

function Redirection() {
    const { theme } = useContext(ThemeContext)
    return (
        <>
            <h1>Redirection</h1>
            <h3>{ theme }</h3>
        </>
    )
}

export default Redirection