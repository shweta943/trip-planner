
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import IconButton from "@mui/material/IconButton";
import { Button } from '@mui/material';

import useThemeContext from '../../hooks/useThemeContext';

const RightNavbar = () => {
    const { mode, toggleTheme } = useThemeContext();
    return (
        // <IconButton>
        //     <IconButton color="inherit" onClick={toggleTheme}>
        //         {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        //     </IconButton>
        // </IconButton>
        <Button
            variant="outlined"
            sx={{
                borderRadius: '20px',
                px: 3,
                py: 1,
                fontWeight: 500,
                // color: 'primary.main',
                // borderColor: 'primary.main',
                textTransform: 'none',
                transition: '0.3s ease',
                // '&:hover': {
                //     backgroundColor: 'primary.main',
                //     color: 'white',
                // }
            }}
        >
            Login
        </Button>

    )
}

export default RightNavbar;