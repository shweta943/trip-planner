// src/hooks/useAuthGuard.js
import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from './redux';

type SnackbarSeverity = 'error' | 'warning' | 'info' | 'success';

const useAuthGuard = () => {
    const { userDetails } = useAppSelector(state => state.user); // Accessing Redux store here

    const [open, setOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleButtonClick = (showSnackbar: (message: string, severity?: SnackbarSeverity) => void ) => {
        console.log('inside fn')
        if (!userDetails) {
            showSnackbar("Please login to access this feature", "error");
            return;
        }
        navigate('/#');
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    return { open, handleButtonClick, handleClose };
};

export default useAuthGuard;
