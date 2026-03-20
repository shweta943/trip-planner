import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Grid2,
  MenuItem,
  Divider,
  Typography,
  // Autocomplete
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Autocomplete from "../UI/Autocomplete";
import { useQuery } from "@tanstack/react-query";
// import getGeminiResponse from '../../config/GeminiAI/geminiAi';
import { Chip, Stack, Tooltip } from "@mui/material";
import FormStepLayout from "./FormStepLayout";
import { useDispatch, useSelector } from "react-redux";
import { updateBasicDetails } from "../../redux/stepperFormSlice";
import { useMutation } from "@tanstack/react-query";
import { RootState } from "../../redux/store";
import { apiClient } from "../../config/backendAPI/apiClient";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#A0AAB4",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#E0E3E7",
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6F7E8C",
    },
  },
});

const BasicDetails = () => {
  const [selectedDest, setSelectedDest] = useState<string>("");
  const dispatch = useDispatch();
  const basicDetails = useSelector(
    (state: RootState) => state.stepperFormData?.basicDetails,
  );

  // Fetch popular destinations from backend API
  const {
    data: dest,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["popular-destinations"],
    queryFn: async () => {
      const response = await apiClient("/api/ai/popular-destinations");
      return response.destinations;
    },
  });

  const budgetPrompt = `Based on the following trip details, estimate a total budget in INR. Respond ONLY with a number, without any currency symbol, explanation, or text.

                Trip Details:
                - Destination: ${basicDetails.destination || "Unknown"}
                - Start Date: ${basicDetails.startDate}
                - End Date: ${basicDetails.endDate}
                - Travelers: ${basicDetails.travelers}
                - Trip Type: ${basicDetails.tripType}

                Output format:
                Only a number like 32000;`;

  // For budget setting button
  // const { mutate: fetchSuggestedBudget, isPending: isBudgetPending } = useMutation<string>({
  //     mutationFn: () => getGeminiResponse(budgetPrompt),
  //     onSuccess: (budgetData) => {
  //         // Example: update Redux store with suggested budget
  //         // const suggestedBudget = data?.budget; // or extract based on your API response
  //         // if (budgetData) {
  //         // dispatch(updateBasicDetails({ budget: suggestedBudget }));
  //         // Optionally show a toast/snackbar
  //         handleChange('budget', budgetData);
  //     },
  // });

  const handleChange = (field: string, value: string | number) => {
    dispatch(updateBasicDetails({ [field]: value }));
  };

  const onClickChip = (destination: string) => {
    setSelectedDest(destination);
  };
  const handleSuggestBudgetBtn = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // fetchSuggestedBudget()
  };

  return (
    <FormStepLayout title="Tell us about your Trip">
      <Box component="form" noValidate>
        {/* Destination */}
        <Box sx={{ mb: 4 }}>
          <Autocomplete />
          <Stack
            direction="row"
            spacing={1}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              mt: 2,
              mb: 2,
            }}
          >
            {dest?.destinations?.map((dest: string, index: number) => (
              <Tooltip
                title="Popular destination suggested by AI"
                arrow
                key={index}
              >
                <Chip
                  label={dest}
                  size="small"
                  onClick={() => onClickChip(dest)}
                  sx={{
                    background: "linear-gradient(to right, #fce3ec, #ffe8d6)",
                    color: "#d6336c",
                    fontWeight: 500,
                  }}
                />
              </Tooltip>
            ))}
            {dest?.destinations?.length === 0 && (
              <Chip label="No suggestions found" disabled />
            )}
          </Stack>
        </Box>

        {/* Dates */}
        <Box sx={{ mb: 4 }}>
          <Grid2 container spacing={2} mb={2}>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <CssTextField
                fullWidth
                type="date"
                label="Start Date"
                name="startDate"
                value={basicDetails?.startDate}
                onChange={(event) =>
                  handleChange("startDate", event.target.value)
                }
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <CssTextField
                fullWidth
                type="date"
                label="End Date"
                name="endDate"
                value={basicDetails?.endDate}
                onChange={(event) =>
                  handleChange("endDate", event.target.value)
                }
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
            onChange={(event) => handleChange("travelers", event.target.value)}
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
            onChange={(event) => handleChange("tripType", event.target.value)}
          >
            <MenuItem value="solo">Solo</MenuItem>
            <MenuItem value="couple">Couple</MenuItem>
            <MenuItem value="family">Family</MenuItem>
            <MenuItem value="friends">Friends</MenuItem>
          </CssTextField>
        </Box>
      </Box>
    </FormStepLayout>
  );
};

export default BasicDetails;
