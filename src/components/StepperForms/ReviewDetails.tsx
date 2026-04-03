import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const ReviewDetails = () => {
  const { basicDetails, preferences } = useSelector(
    (state: RootState) => state.stepperFormData
  );

  return (
    <div>
      <h2>Review Your Trip</h2>

      <p>Destination: {basicDetails.destination}</p>
      <p>Dates: {basicDetails.startDate} → {basicDetails.endDate}</p>
      <p>Travelers: {basicDetails.travelers}</p>
      <p>Trip Type: {basicDetails.tripType}</p>
      <p>Budget: ₹{basicDetails.budget}</p>

      <p>Interests: {preferences.interests.join(", ")}</p>
      <p>Vibe: {preferences.vibe}</p>
    </div>
  );
};

export default ReviewDetails;