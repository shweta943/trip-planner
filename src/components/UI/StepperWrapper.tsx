import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Box, Button, Step, StepLabel, Stepper } from "@mui/material";
import { useMutation } from "@tanstack/react-query";

import { basicDetailsSchema } from "../../schemas/basicDetails..schema";
import { preferencesSchema } from "../../schemas/preferences.schema";
import { apiClient } from "../../config/backendAPI/apiClient";

import BasicDetails from "../StepperForms/BasicDetails";
import InterestAndVibes from "../StepperForms/InterestAndVibes";
import SetBudget from "../StepperForms/SetBudget";
import ReviewDetails from "../StepperForms/ReviewDetails";

export interface CreateTripPayload {
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  tripType: "solo" | "couple" | "family" | "group";
  budget?: number;
  interests: string[];
  vibe: string;
}

const createTrip = (payload: CreateTripPayload) =>
  apiClient("/api/trips", {
    method: "POST",
    body: JSON.stringify(payload),
  });

const StepperWrapper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = useState<any>(null);

  const form = useSelector((state: RootState) => state.stepperFormData);

  /* =======================
     STEPS CONFIG
  ======================= */
  const steps = [
    {
      label: "Basic Details",
      component: <BasicDetails errors={errors} />,
      schema: basicDetailsSchema,
    },
    {
      label: "Preferences",
      component: <InterestAndVibes errors={errors} />,
      schema: preferencesSchema,
    },
    {
      label: "Set Budget",
      component: <SetBudget />,
      schema: null,
    },
    {
      label: "Review",
      component: <ReviewDetails />,
      schema: null,
    },
  ];

  const currentStep = steps[activeStep];

  /* =======================
     STEP DATA (simple & clear)
  ======================= */
  const getCurrentStepData = () => {
    if (activeStep === 0) return form.basicDetails;
    if (activeStep === 1) return form.preferences;
    return {};
  };

  /* =======================
     VALIDATION (single source)
  ======================= */
  const validate = () => {
    if (!currentStep.schema) return true;

    const result = currentStep.schema.safeParse(getCurrentStepData());

    if (!result.success) {
      setErrors(result.error.format());
      return false;
    }

    setErrors(null);
    return true;
  };

  /* =======================
     API MUTATION
  ======================= */
  const mutation = useMutation({
    mutationFn: createTrip,
    onSuccess: (data: any) => {
      console.log("Trip Created:", data);
      // TODO: navigate(`/trip/${data.tripId}`);
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });

  /* =======================
     PAYLOAD
  ======================= */
  const payload: CreateTripPayload = {
    ...form.basicDetails,
    ...form.preferences,
  };

  /* =======================
     NAVIGATION (single handler)
  ======================= */
  const handleStep = (type: "next" | "back") => {
    if (type === "back") {
      setActiveStep((prev) => prev - 1);
      return;
    }
    // NEXT
    if (!validate()) return;
    const isLastStep = activeStep === steps.length - 1;

    if (isLastStep) {
      mutation.mutate(payload);
      return;
    }
    setActiveStep((prev) => prev + 1);
  };

  /* =======================
     RENDER
  ======================= */
  return (
    <Box sx={{ width: "100%" }}>
      {/* Stepper Header */}
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{
          "& .MuiStepLabel-root .Mui-completed": {
            color: "#000", // same as active
          },
          "& .MuiStepLabel-root .Mui-active": {
            color: "#000",
            fontWeight: "bold",
          },
          "& .MuiStepIcon-root.Mui-completed": {
            color: "#ff6b00", // your orange
          },
          "& .MuiStepIcon-root.Mui-active": {
            color: "#ff6b00",
          },
        }}
      >
        {steps.map((step, i) => (
          <Step key={i}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Step Content */}
      <Box sx={{ mt: 4 }}>{currentStep.component}</Box>

      {/* Navigation Buttons */}
      <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
        <Button
          disabled={activeStep === 0}
          onClick={() => handleStep("back")}
          variant="contained"
        >
          Back
        </Button>

        <Button
          onClick={() => handleStep("next")}
          variant="contained"
          disabled={mutation.isPending}
        >
          {activeStep === steps.length - 1
            ? mutation.isPending
              ? "Generating..."
              : "Generate Itinerary"
            : "Next"}
        </Button>
      </Box>
    </Box>
  );
};

export default StepperWrapper;
