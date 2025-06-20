// components/UI/FormStepLayout.jsx
import { Box, Typography, Slider, TextField, Divider } from "@mui/material";
import ClassicButton from '../UI/ClassicButton'
import PropTypes from "prop-types";

const SetBudget = () => {
  return (
    <>
      {/* Budget section */}
      <Box mb={3}>
        <Typography variant="subtitle1" fontWeight="bold">
          Choose Your Own Budget
        </Typography>
        <Slider
          value={basicDetails?.budget}
          onChange={(e, newValue) => handleChange("budget", newValue)}
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
          onChange={(e) => {
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
          onClick={handleSuggestBudgetBtn}
          isDisabled={isBudgetPending}
          text="Set a Smart Budget for me"
        />
      </div>
    </>
  );
};

export default SetBudget;
