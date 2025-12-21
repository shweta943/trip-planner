import { Avatar } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const AvatarProfile = () => {
    const { userDetails } = useSelector((state: RootState) => state.user);
    const initial = userDetails?.[0]?.displayName
        ?.trim()
        ?.slice(0, 1)
        ?.toUpperCase() || '?';
    return (
        <Avatar alt='User' sx={{ bgcolor: deepOrange[500] }}>{initial}</Avatar>
    )
}

export default AvatarProfile;
