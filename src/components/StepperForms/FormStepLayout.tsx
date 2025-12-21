// components/UI/FormStepLayout.jsx
import { Paper, Typography } from "@mui/material";

interface FormStepLayoutProps {
    title: string;
    children: React.ReactNode;
}

const FormStepLayout = ({ title, children }: FormStepLayoutProps) => {
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
