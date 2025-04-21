import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import PropTypes from 'prop-types';

const SnackBar = ({ open, handleClose }) => {

    SnackBar.propTypes = {
        handleClose: PropTypes.func.isRequired,
        open: PropTypes.bool.isRequired,
    };
    return (
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
                Please login to access this feature!
            </Alert>
        </Snackbar>
    )
};
export default SnackBar;
