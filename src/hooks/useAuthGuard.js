// src/hooks/useAuthGuard.js
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuthGuard = () => {
    const { userDetails } = useSelector(state => state.user); // Accessing Redux store here

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleButtonClick = (showSnackbar) => {
        console.log('inside fn')
        if (!userDetails) {
            showSnackbar("Please login to access this feature", "error");
            return;
        }
        navigate('/#');
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    return { open, handleButtonClick, handleClose };
};

export default useAuthGuard;
