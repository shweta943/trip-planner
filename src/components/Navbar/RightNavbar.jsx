
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import IconButton from "@mui/material/IconButton";
import { Button } from '@mui/material';
import { useState } from 'react';
import LoginModal from '../SignUpModal';
import AvatarProfile from '../UI/Avatar';
import useThemeContext from '../../hooks/useThemeContext';
import { useSelector } from 'react-redux';

const RightNavbar = () => {
    const { mode, toggleTheme } = useThemeContext();
    const [formModal, setFormModal] = useState(false);
    const { userDetails } = useSelector(state => state.user);

    const getItinerary = () => {
        setFormModal(true);
    }

    return (
        <>
            {!userDetails ? (
                <Button
                    variant="outlined"
                    sx={{
                        borderRadius: '20px',
                        px: 3,
                        py: 1,
                        fontWeight: 500,
                        color: 'black',
                        // borderColor: 'primary.main',
                        textTransform: 'none',
                        transition: '0.3s ease',
                        // '&:hover': {
                        //     backgroundColor: 'primary.main',
                        //     color: 'white',
                        // }
                    }}
                    onClick={getItinerary}
                >
                    Login
                </Button>

            ) : (
                <AvatarProfile nameInitial={userDetails?.displayName?.trim()[0]} />
            )}
            <LoginModal open={formModal} onFormClose={() => setFormModal(false)} />
        </>
        // <IconButton>
        //     <IconButton color="inherit" onClick={toggleTheme}>
        //         {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        //     </IconButton>
        // </IconButton>
    )
}

export default RightNavbar;