import { Avatar } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const AvatarProfile = () => {
    const { userDetails } = useSelector((state: RootState) => state.user);
    
    const getInitial = () => {
        const user = userDetails?.[0];
        const name = user?.displayName || user?.email || '';
        return name.trim().charAt(0).toUpperCase() || '?';
    };

    return (
        <Avatar alt='User' sx={{ bgcolor: deepOrange[500] }}>{getInitial()}</Avatar>
    )
}

export default AvatarProfile;
