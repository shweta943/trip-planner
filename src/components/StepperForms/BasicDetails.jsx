import { useState } from 'react';
import {
    Box,
    TextField,
    Typography,
    Paper,
    Grid2,
    MenuItem
} from '@mui/material';
import { styled } from '@mui/material/styles';

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#A0AAB4',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#B2BAC2',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#E0E3E7',
        },
        '&:hover fieldset': {
            borderColor: '#B2BAC2',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#6F7E8C',
        },
    },
});


const BasicDetails = ({ onNext }) => {
    const [formData, setFormData] = useState({
        destination: '',
        startDate: '',
        endDate: '',
        travelers: 1,
        tripType: 'solo',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext(formData); // Pass data to parent
    };

    return (
        <Paper
            elevation={6}
            sx={{
                maxWidth: '700px',
                mx: 'auto',
                p: 4,
                mt: 5,
                borderRadius: 4,
                backgroundColor: 'white',
            }}
        >
            <Typography
                variant="h5"
                fontWeight="bold"
                textAlign="center"
                color="text.primary"
                gutterBottom
            >
                Tell Us About Your Trip
            </Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate>
                {/* Destination */}
                <Box mb={2}>
                    <CssTextField
                        fullWidth
                        label="Destination"
                        name="destination"
                        value={formData.destination}
                        onChange={handleChange}
                        placeholder="e.g. Manali, Rajasthan"
                        required
                    />
                </Box>

                {/* Dates */}
                <Grid2 container spacing={2} mb={2}>
                    <Grid2 item xs={12} sm={6}>
                        <CssTextField
                            fullWidth
                            type="date"
                            label="Start Date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                            required
                        />
                    </Grid2>
                    <Grid2 item xs={12} sm={6}>
                        <CssTextField
                            fullWidth
                            type="date"
                            label="End Date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                            required
                        />
                    </Grid2>
                </Grid2>

                {/* Travelers */}
                <Box mb={2}>
                    <CssTextField
                        fullWidth
                        type="number"
                        name="travelers"
                        label="Number of Travelers"
                        value={formData.travelers}
                        onChange={handleChange}
                    />
                </Box>

                {/* Trip Type */}
                <Box mb={2}>
                    <CssTextField
                        select
                        fullWidth
                        name="tripType"
                        label="Trip Type"
                        value={formData.tripType}
                        onChange={handleChange}
                    >
                        <MenuItem value="solo">Solo</MenuItem>
                        <MenuItem value="couple">Couple</MenuItem>
                        <MenuItem value="family">Family</MenuItem>
                        <MenuItem value="friends">Friends</MenuItem>
                    </CssTextField>
                </Box>

                {/* <CssTextField label="Custom CSS" id="custom-css-outlined-input" /> */}

                {/* Submit Button */}
                <button
                    className="mt-6 px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 rounded-lg shadow-lg hover:shadow-orange-500/50 transition duration-300"
                    // onClick={handleButtonClick}
                >
                    Get Itinerary
                </button>

            </Box>
        </Paper>
    );
};

export default BasicDetails;