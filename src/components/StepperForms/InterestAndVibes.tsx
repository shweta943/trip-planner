import {
  Box,
  Typography,
  Paper,
  Chip
} from "@mui/material";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { updatePreferences } from "../../redux/stepperFormSlice";

const interestsList = [
  "Adventure",
  "Food",
  "Nature",
  "Culture",
  "Shopping",
  "Nightlife",
  "Spiritual",
  "Beach"
];

const vibeList = ["Relaxed", "Adventurous", "Luxury"];

const InterestAndVibes = ({ errors }: any) => {
  const dispatch = useDispatch();

  const data = useSelector(
    (state: RootState) => state.stepperFormData.preferences
  );

  /* =======================
     INTEREST TOGGLE
  ======================= */
  const toggleInterest = (item: string) => {
    const lower = item.toLowerCase();

    const updated = data.interests.includes(lower)
      ? data.interests.filter((i) => i !== lower)
      : [...data.interests, lower];

    dispatch(updatePreferences({ interests: updated }));
  };

  /* =======================
     VIBE SELECT
  ======================= */
  const selectVibe = (vibe: string) => {
    dispatch(updatePreferences({ vibe: vibe.toLowerCase() }));
  };

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
            Your Travel Style 🎯
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Tell us what kind of experience you’re looking for
          </Typography>
        </Box>

        {/* =======================
            INTERESTS
        ======================= */}
        <Box mb={4}>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>
            What interests you?
          </Typography>

          <Box display="flex" flexWrap="wrap" gap={1}>
            {interestsList.map((item) => {
              const lower = item.toLowerCase();
              const isSelected = data.interests.includes(lower);

              return (
                <motion.div
                  key={item}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Chip
                    label={item}
                    onClick={() => toggleInterest(item)}
                    sx={{
                      borderRadius: "10px",
                      fontWeight: 500,
                      cursor: "pointer",

                      background: isSelected
                        ? "#FF7A00"
                        : "#fff",

                      color: isSelected ? "#fff" : "#333",

                      border: isSelected
                        ? "none"
                        : "1px solid #ddd",

                      "&:hover": {
                        boxShadow:
                          "0 6px 16px rgba(255,122,0,0.3)"
                      }
                    }}
                  />
                </motion.div>
              );
            })}
          </Box>

          {errors?.interests && (
            <Typography color="error" mt={1} fontSize={13}>
              {errors.interests._errors[0]}
            </Typography>
          )}
        </Box>

        {/* =======================
            VIBE
        ======================= */}
        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>
            Choose your vibe
          </Typography>

          <Box display="flex" gap={2} flexWrap="wrap">
            {vibeList.map((item) => {
              const lower = item.toLowerCase();
              const isSelected = data.vibe === lower;

              return (
                <motion.div
                  key={item}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Chip
                    label={item}
                    onClick={() => selectVibe(item)}
                    sx={{
                      px: 2,
                      borderRadius: "12px",
                      fontWeight: 600,

                      background: isSelected
                        ? "linear-gradient(135deg, #FF7A00, #FFB266)"
                        : "#fff",

                      color: isSelected ? "#fff" : "#333",

                      border: isSelected
                        ? "none"
                        : "1px solid #ddd",

                      "&:hover": {
                        boxShadow:
                          "0 6px 16px rgba(255,122,0,0.3)"
                      }
                    }}
                  />
                </motion.div>
              );
            })}
          </Box>

          {errors?.vibe && (
            <Typography color="error" mt={1} fontSize={13}>
              {errors.vibe._errors[0]}
            </Typography>
          )}
        </Box>
      </Paper>
    </motion.div>
  );
};

export default InterestAndVibes;