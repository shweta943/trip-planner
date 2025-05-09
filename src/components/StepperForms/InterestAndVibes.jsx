import { useState } from "react";
import {
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
} from "@mui/material";
import FormStepLayout from '../../components/StepperForms/FormStepLayout';

const interestsList = [
  "Beach", "Trekking", "Food & Local Cuisine", "Historical Places", "Spirituality", "Nature",
];

const vibesList = [
  "Adventurous", "Romantic", "Peaceful", "Family-friendly"
];

const InterestAndVibesForm = ({ onNext }) => {
  const [formData, setFormData] = useState({
    interests: [],
    vibe: "",
    topPriorities: [],
  });

  const handleCheckboxChange = (e, key) => {
    const { checked, value } = e.target;
    setFormData((prev) => {
      const current = new Set(prev[key]);
      checked ? current.add(value) : current.delete(value);
      return { ...prev, [key]: Array.from(current) };
    });
  };

  const handleVibeChange = (e) => {
    setFormData((prev) => ({ ...prev, vibe: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can dispatch to Redux here
    console.log("Submitted Interests & Vibes:", formData);
    onNext(); // move to next step
  };

  return (
    <FormStepLayout title='Let Your Interests Guide the Way'>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <FormControl component="fieldset">
          <FormLabel>What are your interests?</FormLabel>
          <FormGroup>
            {interestsList.map((item) => (
              <FormControlLabel
                key={item}
                control={
                  <Checkbox
                    value={item}
                    checked={formData.interests.includes(item)}
                    onChange={(e) => handleCheckboxChange(e, "interests")}
                  />
                }
                label={item}
              />
            ))}
          </FormGroup>
        </FormControl>

        <FormControl component="fieldset">
          <FormLabel>Wanna Pick a vibe?</FormLabel>
          <RadioGroup value={formData.vibe} onChange={handleVibeChange}>
            {vibesList.map((item) => (
              <FormControlLabel key={item} value={item} control={<Radio />} label={item} />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>
    </FormStepLayout>
  );
};

export default InterestAndVibesForm;
