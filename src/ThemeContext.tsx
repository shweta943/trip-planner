import { createContext, useMemo, useState } from "react";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Define theme mode type
type ThemeMode = "light" | "dark";

export interface ThemeContextType {
    mode: ThemeMode;
    toggleTheme: () => void;
}
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
    children: React.ReactNode;
}

// eslint-disable-next-line react/prop-types
const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [mode, setMode] = useState<ThemeMode>("light");

    const toggleTheme = () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
    };

    const theme = useMemo(() =>
        createTheme({
            palette: {
                mode,
                primary: {
                    main: mode === "light" ? "#fff" : "#90caf9",
                },
                background: {
                    default: mode === "light" ? "#fff" : "#121212",
                    paper: mode === "light" ? "#f5f5f5" : "#1e1e1e",
                },
            },
        }), [mode]);

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;