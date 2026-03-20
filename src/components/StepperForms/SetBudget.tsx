import { Box, Typography, Slider, TextField, Divider } from "@mui/material";
import ClassicButton from "../UI/ClassicButton";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { updateBasicDetails } from "../../redux/stepperFormSlice";
import { useMutation } from "@tanstack/react-query";
// import getGeminiResponse from '../../config/GeminiAI/geminiAi';

const SetBudget = () => {
  const dispatch = useAppDispatch();
  const basicDetails = useAppSelector(
    (state) => state.stepperFormData?.formData?.basicDetails,
  );

  const budgetPrompt = `Based on the following trip details, estimate a total budget in INR. Respond ONLY with a number, without any currency symbol, explanation, or text.

    Trip Details:
    - Destination: ${basicDetails?.destination || "Unknown"}
    - Start Date: ${basicDetails?.startDate}
    - End Date: ${basicDetails?.endDate}
    - Travelers: ${basicDetails?.travelers}
    - Trip Type: ${basicDetails?.tripType}

    Output format:
    Only a number like 32000`;

  const { mutate: fetchSuggestedBudget, isPending: isBudgetPending } =
    useMutation<string>({
      mutationFn: () => getGeminiResponse(budgetPrompt),
      onSuccess: (budgetData: string) => {
        const budgetNumber = Number(budgetData);
        if (budgetNumber >= 5000 && budgetNumber <= 200000) {
          handleChange("budget", budgetNumber);
        }
      },
    });

  const handleChange = (field: string, value: string | number) => {
    dispatch(updateBasicDetails({ [field]: value }));
  };

  const handleSuggestBudgetBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetchSuggestedBudget();
  };

  return (
    <>
      {/* Budget section */}
      <Box mb={3}>
        <Typography variant="subtitle1" fontWeight="bold">
          Choose Your Own Budget
        </Typography>
        <Slider
          value={Number(basicDetails?.budget) || 5000}
          onChange={(e: Event, newValue: number | number[]) =>
            handleChange("budget", newValue as number)
          }
          min={5000}
          max={200000}
          step={5000}
          valueLabelDisplay="on"
          sx={{
            color: "#d6336c",
            fontWeight: 500,
          }}
          marks={[
            { value: 5000, label: "5K" },
            { value: 50000, label: "50K" },
            { value: 100000, label: "1L" },
            { value: 200000, label: "2L" },
          ]}
        />
        <TextField
          type="number"
          label="₹"
          size="small"
          value={basicDetails?.budget || 5000}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const newBudget = Number(e.target.value);
            if (newBudget >= 5000 && newBudget <= 200000) {
              handleChange("budget", newBudget);
            }
          }}
          inputProps={{
            step: 5000,
            min: 5000,
            max: 200000,
            style: { width: "100px" },
          }}
        />
      </Box>
      <Box display="flex" alignItems="center" my={2}>
        <Divider sx={{ flexGrow: 1 }} />
        <Typography sx={{ mx: 2, color: "gray" }}>OR</Typography>
        <Divider sx={{ flexGrow: 1 }} />
      </Box>

      <div>
        <ClassicButton
          onClick={() => fetchSuggestedBudget()}
          isDisabled={isBudgetPending}
          text="Set a Smart Budget for me"
        />
      </div>
    </>
  );
};

export default SetBudget;
