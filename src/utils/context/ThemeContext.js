import { createContext, useState } from "react"

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem("mode") ?? "light")
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
        localStorage.setItem("mode", theme)
    }
 
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}