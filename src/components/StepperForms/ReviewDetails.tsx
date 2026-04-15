import {
  Box,
  Typography,
  Paper,
  Divider,
  Chip,
  Grid
} from "@mui/material";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const ReviewDetails = () => {
  const { basicDetails, preferences } = useSelector(
    (state: RootState) => state.stepperFormData
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 5,
          maxWidth: 720,
          mx: "auto",
          borderRadius: "20px",
          background: "linear-gradient(145deg, #fffaf5, #ffffff)",
          boxShadow: "0 12px 40px rgba(255,122,0,0.12)",
          border: "1px solid rgba(255,122,0,0.1)"
        }}
      >
        {/* Heading */}
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" fontWeight={700}>
            Review Your Trip 🧾
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Make sure everything looks good before generating your itinerary
          </Typography>
        </Box>

        {/* =======================
            BASIC DETAILS
        ======================= */}
        <Box mb={3}>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>
            Basic Details
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <LabelValue label="Destination" value={basicDetails.destination} highlight />
            </Grid>

            <Grid item xs={6}>
              <LabelValue
                label="Dates"
                value={`${basicDetails.startDate} → ${basicDetails.endDate}`}
              />
            </Grid>

            <Grid item xs={6}>
              <LabelValue
                label="Travelers"
                value={basicDetails.travelers}
              />
            </Grid>

            <Grid item xs={6}>
              <LabelValue
                label="Trip Type"
                value={basicDetails.tripType}
              />
            </Grid>

            <Grid item xs={12}>
              <LabelValue
                label="Budget"
                value={`₹ ${basicDetails.budget || 0}`}
                highlight
              />
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* =======================
            PREFERENCES
        ======================= */}
        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>
            Preferences
          </Typography>

          {/* Interests */}
          <Box mb={2}>
            <Typography variant="body2" color="text.secondary" mb={1}>
              Interests
            </Typography>

            <Box display="flex" flexWrap="wrap" gap={1}>
              {preferences.interests.map((item: string) => (
                <Chip
                  key={item}
                  label={item}
                  sx={{
                    borderRadius: "10px",
                    background: "#FF7A00",
                    color: "#fff",
                    fontWeight: 500
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Vibe */}
          <Box>
            <Typography variant="body2" color="text.secondary" mb={1}>
              Vibe
            </Typography>

            <Chip
              label={preferences.vibe}
              sx={{
                px: 2,
                borderRadius: "12px",
                background:
                  "linear-gradient(135deg, #FF7A00, #FFB266)",
                color: "#fff",
                fontWeight: 600
              }}
            />
          </Box>
        </Box>
      </Paper>
    </motion.div>
  );
};

/* =======================
   SMALL REUSABLE COMPONENT
======================= */

const LabelValue = ({ label, value, highlight = false }: any) => (
  <Box>
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>

    <Typography
      variant="body1"
      fontWeight={600}
      sx={{
        color: highlight ? "#FF7A00" : "#333"
      }}
    >
      {value || "-"}
    </Typography>
  </Box>
);

export default ReviewDetails;