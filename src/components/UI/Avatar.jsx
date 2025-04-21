import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import PropTypes from 'prop-types';

const AvatarProfile = ({ initial }) => {
    // ✅ Prop validation
    AvatarProfile.propTypes = {
        initial: PropTypes.string.isRequired,
    };
    return (
        <div>
            <Avatar alt='User' sx={{ bgcolor: deepOrange[500] }}>{initial}</Avatar>
        </div>
    )
}

export default AvatarProfile;
