"use client"

import * as React from "react"
import { Moon, Sun, Laptop } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
    const { setTheme, theme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <div className="w-9 h-9" /> // Placeholder to prevent layout shift
    }

    const cycleTheme = () => {
        if (theme === 'light') setTheme('dark')
        else if (theme === 'dark') setTheme('system')
        else setTheme('light')
    }

    return (
        <button
            onClick={cycleTheme}
            className="relative rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-colors"
            aria-label="Toggle theme"
            title={`Current theme: ${theme}`}
        >
            <Sun className={`h-5 w-5 transition-all ${theme === 'light' ? 'scale-100 rotate-0' : 'scale-0 -rotate-90 absolute'}`} />
            <Moon className={`h-5 w-5 transition-all ${theme === 'dark' ? 'scale-100 rotate-0' : 'scale-0 rotate-90 absolute'}`} />
            <Laptop className={`h-5 w-5 transition-all ${theme === 'system' ? 'scale-100 rotate-0' : 'scale-0 rotate-90 absolute'}`} />
            <span className="sr-only">Toggle theme</span>
        </button>
    )
}
