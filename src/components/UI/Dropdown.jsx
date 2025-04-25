import { useState } from 'react';
import { Menu, IconButton } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import AvatarProfile from './Avatar';
import { auth } from '../../config/Firebase/firebase';
import { useNavigate } from 'react-router-dom';


const Dropdown = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleAvatarClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = (e) => {
        handleClose();
        e.preventDefault();
        auth.signOut();
        // useNavigate
    };

    return (
        <>
            <IconButton onClick={handleAvatarClick} size="small" sx={{ ml: 2 }}>
                <AvatarProfile />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={handleClose}>My Profile</MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
};

export default Dropdown;
