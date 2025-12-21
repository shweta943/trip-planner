import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface SnackBarProps {
    open: boolean;
    handleClose: () => void;
    severity: 'error' | 'warning' | 'info' | 'success';
    messageToShow: string;
}

function SnackBar ({ open, handleClose, severity, messageToShow }: SnackBarProps) {
    return (
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
                {messageToShow}
            </Alert>
        </Snackbar>
    )
};
export default SnackBar;
