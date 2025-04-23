import { Avatar } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { useSelector } from 'react-redux';

const AvatarProfile = () => {
    const { userDetails } = useSelector(state => state.user);
    const initial = userDetails?.displayName?.trim()[0];

    return (
        <Avatar alt='User' sx={{ bgcolor: deepOrange[500] }}>{initial}</Avatar>
    )
}

export default AvatarProfile;
