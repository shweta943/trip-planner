import BasicDetails from "../components/StepperForms/BasicDetails";
import InterestAndVibes from "../components/StepperForms/InterestAndVibes";
import CultureHeritage from "../components/StepperForms/CultureHeritage";
import StepperWrapper from "../components/UI/StepperWrapper";
import { useState } from 'react';

const GenerateTrip = () => {

  //- Control steps from here
  const steps = [
    {
      label: "Tell Us About Your Trip",
      Component: BasicDetails,
    },
    {
      label: "Choose Your Interests & Vibes",
      Component: InterestAndVibes,
    },
    {
      label: "Explore Indian Culture & Heritage",
      Component: CultureHeritage,
    },
  ];
  return (
    <div className="p-20">
      <StepperWrapper stepsComponents={steps} />
    </div>
  )
}

export default GenerateTrip

