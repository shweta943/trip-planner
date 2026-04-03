import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Box, Button, Step, StepLabel, Stepper } from "@mui/material";
import { useMutation } from "@tanstack/react-query";

// import your schemas
import { basicDetailsSchema } from "../../schemas/basicDetails..schema";
import { preferencesSchema } from "../../schemas/preferences.schema";
import { apiClient } from "../../config/backendAPI/apiClient";

// import components
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

const createTrip = (payload: CreateTripPayload) => {
  return apiClient("/api/trips", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};
const StepperWrapper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = useState<any>(null);

  const stepperForm = useSelector((state: RootState) => state.stepperFormData);

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

  /* =======================
     GET STEP DATA
  ======================= */

  const getStepData = () => {
    switch (activeStep) {
      case 0:
        return stepperForm.basicDetails;
      case 1:
        return stepperForm.preferences;
      default:
        return {};
    }
  };

  /* =======================
     VALIDATION
  ======================= */

  const validateStep = () => {
    const currentStep = steps[activeStep];

    if (!currentStep.schema) return true;

    const result = currentStep.schema.safeParse(getStepData());

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
  });

  /* =======================
     BUILD PAYLOAD
  ======================= */

  const buildPayload = () => {
    return {
      ...stepperForm.basicDetails,
      ...stepperForm.preferences,
    };
  };

  /* =======================
     NAVIGATION
  ======================= */

  const handleNext = () => {
    const isValid = validateStep();

    if (!isValid) return;

    if (activeStep === steps.length - 1) {
      handleSubmit();
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  /* =======================
     SUBMIT
  ======================= */

  const handleSubmit = () => {
    const payload = buildPayload();

    mutation.mutate(payload, {
      onSuccess: (data: any) => {
        console.log("Trip Created:", data);
        // TODO: navigate(`/trip/${data.tripId}`)
      },
      onError: (error) => {
        console.error("Error:", error);
      },
    });
  };

  /* =======================
     BUTTON STATE
  ======================= */

  const isStepValid = useMemo(() => {
    const currentStep = steps[activeStep];

    if (!currentStep.schema) return true;

    return currentStep.schema.safeParse(getStepData()).success;
  }, [activeStep, stepperForm]);

  /* =======================
     RENDER
  ======================= */

  return (
    <Box sx={{ width: "100%" }}>
      {/* Stepper Header */}
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Step Content */}
      <Box sx={{ mt: 4 }}>{steps[activeStep].component}</Box>

      {/* Navigation Buttons */}
      <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          variant="outlined"
        >
          Back
        </Button>

        <Button
          onClick={handleNext}
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
