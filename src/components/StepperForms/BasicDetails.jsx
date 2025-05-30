import { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    Grid2,
    MenuItem,
    Divider,
    Typography
    // Autocomplete
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Autocomplete from '../UI/Autocomplete';
import Slider from '@mui/material/Slider';
import { useQuery } from '@tanstack/react-query';
import getGeminiResponse from '../../config/GeminiAI/geminiAi';
import { Chip, Stack, Tooltip } from '@mui/material';
import FormStepLayout from '../../components/StepperForms/FormStepLayout';
import ClassicButton from '../UI/ClassicButton';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { updateBasicDetails } from '../../redux/formDataSlice';


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

const prompt = `Provide names of most popular 6 travel destinations in India. Include only the names of places in the response. Also dont include any array name in the json response.`;

const BasicDetails = ({ onValidate }) => {

    BasicDetails.propTypes = {
        onValidate: PropTypes.func.isRequired
    }


    const [selectedDest, setSelectedDest] = useState('');
    const [chipDest, setChipDest] = useState([]);
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.stepperFormData?.formData?.basicDetails);

    const { data } = useQuery({
        queryKey: ['geminiBasicDetails', prompt],
        queryFn: () => getGeminiResponse(prompt),
        staleTime: 1000 * 60 * 60 * 24,
    });

    useEffect(() => {
        if (!data) return;

        if (Array.isArray(data)) {
            setChipDest(data);
        } else if (Array.isArray(data?.destinations)) {
            setChipDest(data.destinations);
        } else if (Array.isArray(data?.popular_destinations)) {
            setChipDest(data.popular_destinations);
        } else {
            console.warn("Unexpected Gemini data format:", data);
            setChipDest([]);
        }
    }, [data]);

    const handleChange = (field) => (e) => {
        dispatch(updateBasicDetails({ field, value: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext(formData); // Pass data to parent
    };
    const onClickChip = (destination) => {
        setSelectedDest(destination);
    };

    return (
        <FormStepLayout title='Tell us about your Trip'>
            <Box component="form" onSubmit={handleSubmit} noValidate>
                {/* Destination */}
                <Box sx={{ mb: 4 }}>
                    <Autocomplete />
                    <Stack direction="row" spacing={1} sx={{
                        justifyContent: "center",
                        alignItems: "center",
                        mt: 2,
                        mb: 2
                    }}>
                        {chipDest?.map((dest, index) => (
                            <Tooltip title="Popular destination suggested by AI" arrow key={index}>
                                <Chip label={dest} size="small" onClick={() => onClickChip(dest)} sx={{
                                    background: 'linear-gradient(to right, #fce3ec, #ffe8d6)',
                                    color: '#d6336c',
                                    fontWeight: 500,
                                }}
                                />
                            </Tooltip>
                        ))}
                        {chipDest.length === 0 && <Chip label="No suggestions found" disabled />}
                    </Stack>
                </Box>

                {/* Dates */}
                <Box sx={{ mb: 4 }}>
                    <Grid2 container spacing={2} mb={2}>
                        <Grid2 item xs={12} sm={6}>
                            <CssTextField
                                fullWidth
                                type="date"
                                label="Start Date"
                                name="startDate"
                                value={formData?.startDate}
                                onChange={handleChange('startDate')}
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
                                value={formData?.endDate}
                                onChange={handleChange('endDate')}
                                InputLabelProps={{ shrink: true }}
                                required
                            />
                        </Grid2>
                    </Grid2>
                </Box>

                {/* Travelers */}
                <Box sx={{ mb: 4 }}>
                    <CssTextField
                        fullWidth
                        type="number"
                        name="travelers"
                        label="Number of Travelers"
                        value={formData?.travelers}
                        onChange={handleChange('travelers')}
                    />
                </Box>

                {/* Trip Type */}
                <Box sx={{ mb: 4 }}>
                    <CssTextField
                        select
                        fullWidth
                        name="tripType"
                        label="Trip Type"
                        value={formData?.tripType}
                        onChange={handleChange('tripType')}
                    >
                        <MenuItem value="solo">Solo</MenuItem>
                        <MenuItem value="couple">Couple</MenuItem>
                        <MenuItem value="family">Family</MenuItem>
                        <MenuItem value="friends">Friends</MenuItem>
                    </CssTextField>
                </Box>

                <Box mb={3}>
                    <Typography variant="subtitle1" fontWeight="bold">Choose Your Own Budget</Typography>
                    <Slider
                        value={formData?.budget}
                        onChange={(e, newValue) =>
                            setFormData((prev) => ({ ...prev, budget: newValue }))
                        }
                        min={5000}
                        max={200000}
                        step={5000}
                        valueLabelDisplay="on"
                        sx={{
                            color: '#d6336c',
                            fontWeight: 500,
                        }}
                        marks={[
                            { value: 5000, label: "5K" },
                            { value: 50000, label: "50K" },
                            { value: 100000, label: "1L" },
                            { value: 200000, label: "2L" },
                        ]}
                    />
                </Box>
                <Box display="flex" alignItems="center" my={2}>
                    <Divider sx={{ flexGrow: 1 }} />
                    <Typography sx={{ mx: 2, color: 'gray' }}>OR</Typography>
                    <Divider sx={{ flexGrow: 1 }} />
                </Box>

                <div>
                    <ClassicButton text="Set a Smart Budget for me" />
                </div>
            </Box>
        </FormStepLayout >
    );
};

export default BasicDetails;