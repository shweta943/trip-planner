import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import PropTypes from 'prop-types';


function SnackBar ({ open, handleClose, severity, messageToShow }) {

    SnackBar.propTypes = {
        handleClose: PropTypes.func.isRequired,
        open: PropTypes.bool.isRequired,
        severity: PropTypes.string.isRequired,
        messageToShow: PropTypes.string.isRequired
    };
    return (
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
                {messageToShow}
            </Alert>
        </Snackbar>
    )
};
export default SnackBar;
