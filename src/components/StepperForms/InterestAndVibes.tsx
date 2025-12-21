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
import FormStepLayout from './FormStepLayout';

const interestsList = [
  "Beach", "Trekking", "Food & Local Cuisine", "Historical Places", "Spirituality", "Nature",
] as const;

const vibesList = [
  "Adventurous", "Romantic", "Peaceful", "Family-friendly"
] as const;

interface InterestAndVibesFormProps {
  interests?: string[];
  vibe?: string;
  topPriorities?: string[];
}

interface InterestAndVibesFormProps {
  onNext?: () => void;
}

const InterestAndVibesForm = ({ onNext }: InterestAndVibesFormProps) => {
  const [formData, setFormData] = useState({
    interests: [] as string[],
    vibe: "",
    topPriorities: [] as string[],
  });

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, key: "interests" | "topPriorities") => {
    const { checked, value } = e.target;
    setFormData((prev) => {
      const current = new Set(prev[key]);
      checked ? current.add(value) : current.delete(value);
      return { ...prev, [key]: Array.from(current) };
    });
  };

  const handleVibeChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, vibe: e.currentTarget.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // You can dispatch to Redux here
    console.log("Submitted Interests & Vibes:", formData);
    if (onNext) {
      onNext(); // move to next step
    }
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
