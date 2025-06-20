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
import { useQuery } from '@tanstack/react-query';
import getGeminiResponse from '../../config/GeminiAI/geminiAi';
import { Chip, Stack, Tooltip } from '@mui/material';
import FormStepLayout from '../../components/StepperForms/FormStepLayout';
import ClassicButton from '../UI/ClassicButton';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { updateBasicDetails } from '../../redux/formDataSlice';
import { useMutation } from '@tanstack/react-query';

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


const BasicDetails = () => {

    // BasicDetails.propTypes = {
    //     onValidationChange: PropTypes.func.isRequired
    // }


    const [selectedDest, setSelectedDest] = useState('');
    const [chipDest, setChipDest] = useState([]);
    const dispatch = useDispatch();
    const basicDetails = useSelector((state) => state.stepperFormData?.formData?.basicDetails);

    const destPrompt = `Provide names of most popular 6 travel destinations in India. Include only the names of places in the response. Also dont include any array name in the json response. Respond ONLY in valid JSON format. Do NOT include markdown backticks or any explanation.`;

    const { data } = useQuery({
        queryKey: ['geminiBasicDetails', destPrompt],
        queryFn: () => getGeminiResponse(destPrompt),
        staleTime: 1000 * 60 * 60 * 24,
    });

    const budgetPrompt = `Based on the following trip details, estimate a total budget in INR. Respond ONLY with a number, without any currency symbol, explanation, or text.

                Trip Details:
                - Destination: ${basicDetails.destination || "Unknown"}
                - Start Date: ${basicDetails.startDate}
                - End Date: ${basicDetails.endDate}
                - Travelers: ${basicDetails.travelers}
                - Trip Type: ${basicDetails.tripType}

                Output format:
                Only a number like 32000;`

    // For budget setting button
    const { mutate: fetchSuggestedBudget, isPending: isBudgetPending } = useMutation({
        mutationFn: () => getGeminiResponse(budgetPrompt),
        onSuccess: (budgetData) => {
            // Example: update Redux store with suggested budget
            // const suggestedBudget = data?.budget; // or extract based on your API response
            // if (budgetData) {
            // dispatch(updateBasicDetails({ budget: suggestedBudget }));
            // Optionally show a toast/snackbar
            handleChange('budget', budgetData);
            // }
        },
    });

    // useEffect(() => {
    //     const isValid =
    //         basicDetails?.destination.trim() !== '' &&
    //         basicDetails?.startDate.trim() !== '' &&
    //         basicDetails?.endDate.trim() !== '' &&
    //         Number(basicDetails?.travelers) > 0 &&
    //         basicDetails?.tripType.trim() !== '';

    //     onValidationChange(isValid);
    // }, [basicDetails, onValidationChange]);

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

    const handleChange = (field, value) => {
        dispatch(updateBasicDetails({ [field]: value }));
    };

    const onClickChip = (destination) => {
        setSelectedDest(destination);
    };
    const handleSuggestBudgetBtn = (e) => {
        e.preventDefault();
        fetchSuggestedBudget()
    };

    return (
        <FormStepLayout title='Tell us about your Trip'>
            <Box component="form" noValidate>
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
                                value={basicDetails?.startDate}
                                onChange={(event) => handleChange('startDate', event.target.value)}
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
                                value={basicDetails?.endDate}
                                onChange={(event) => handleChange('endDate', event.target.value)}
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
                        value={basicDetails?.travelers}
                        onChange={(event) => handleChange('travelers', event.target.value)}
                    />
                </Box>

                {/* Trip Type */}
                <Box sx={{ mb: 4 }}>
                    <CssTextField
                        select
                        fullWidth
                        name="tripType"
                        label="Trip Type"
                        value={basicDetails?.tripType}
                        onChange={(event) => handleChange('tripType', event.target.value)}
                    >
                        <MenuItem value="solo">Solo</MenuItem>
                        <MenuItem value="couple">Couple</MenuItem>
                        <MenuItem value="family">Family</MenuItem>
                        <MenuItem value="friends">Friends</MenuItem>
                    </CssTextField>
                </Box>
            </Box>
        </FormStepLayout >
    );
};

export default BasicDetails;