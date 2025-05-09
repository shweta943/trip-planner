// components/UI/FormStepLayout.jsx
import { Paper, Typography } from "@mui/material";
import PropTypes from 'prop-types';

const FormStepLayout = ({ title, children }) => {

    FormStepLayout.propTypes = {
        title: PropTypes.string.isRequired,
        children: PropTypes.node.isRequired
    }
    return (
        <Paper
            elevation={6}
            sx={{
                maxWidth: "700px",
                mx: "auto",
                p: 4,
                mt: 5,
                borderRadius: 4,
                backgroundColor: "white",
            }}
        >
            <Typography
                variant="h5"
                fontWeight="bold"
                textAlign="center"
                color="text.primary"
                gutterBottom
            >
                {title}
            </Typography>

            {children}
        </Paper>
    );
};

export default FormStepLayout;
