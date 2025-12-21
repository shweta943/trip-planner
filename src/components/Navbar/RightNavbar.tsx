import { useState } from 'react';
import { Button } from '@mui/material';
import LoginModal from '../SignUpModal';
import useThemeContext from '../../hooks/useThemeContext';
import { useSelector } from 'react-redux';
import Dropdown from '../UI/Dropdown';
import { RootState } from '../../redux/store';

interface RightNavbarProps {
    showSnackbar: (message: string, severity: 'success' | 'error' | 'info' | 'warning') => void;
}

const RightNavbar = ({ showSnackbar }: RightNavbarProps) => {
    const { mode, toggleTheme } = useThemeContext();
    const [formModal, setFormModal] = useState(false);
    const { userDetails } = useSelector((state: RootState) => state.user);

    const getItinerary = () => {
        setFormModal(true);
    }

    return (
        <>
            {!userDetails ? (
                <Button
                    variant="contained"
                    sx={{
                        borderRadius: '20px',
                        px: 3,
                        py: 1,
                        fontWeight: 500,
                        color: 'black',
                        // borderColor: 'primary.main',
                        // textTransform: 'none',
                        transition: '0.3s ease',
                        border:"none",
                        outline:"none !important"
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
                <Dropdown />

            )}
            <LoginModal open={formModal} onFormClose={() => setFormModal(false)} showSnackbar={showSnackbar} />
        </>
        // <IconButton>
        //     <IconButton color="inherit" onClick={toggleTheme}>
        //         {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        //     </IconButton>
        // </IconButton>
    )
}

export default RightNavbar;