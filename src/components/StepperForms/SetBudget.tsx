import {
  Box,
  Typography,
  Paper,
  Slider,
  Button
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { updateBasicDetails } from "../../redux/stepperFormSlice";
import { useState } from "react";

const SetBudget = () => {
  const dispatch = useDispatch();

  const budget = useSelector(
    (state: RootState) => state.stepperFormData.basicDetails.budget
  );

  const [loading, setLoading] = useState(false);

  /* =======================
     SLIDER CHANGE
  ======================= */
  const handleSliderChange = (_: any, value: number | number[]) => {
    dispatch(updateBasicDetails({ budget: value as number }));
  };

  /* =======================
     AI BUDGET (PLACEHOLDER)
  ======================= */
  const handleSmartBudget = async () => {
    setLoading(true);

    try {
      // TODO: replace with backend call
      await new Promise((res) => setTimeout(res, 1000));

      const suggestedBudget = 30000;

      dispatch(updateBasicDetails({ budget: suggestedBudget }));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
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
            Set Your Budget 💰
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Choose your budget or let AI suggest one for you
          </Typography>
        </Box>

        {/* VALUE DISPLAY */}
        <Box textAlign="center" mb={3}>
          <Typography
            variant="h3"
            fontWeight={700}
            sx={{
              color: "#FF7A00"
            }}
          >
            ₹ {budget || 0}
          </Typography>
        </Box>

        {/* SLIDER */}
        <Box px={2} mb={4}>
          <Slider
            value={budget || 0}
            onChange={handleSliderChange}
            min={1000}
            max={100000}
            step={1000}
            sx={{
              color: "#FF7A00",

              "& .MuiSlider-thumb": {
                boxShadow: "0 4px 12px rgba(255,122,0,0.4)"
              },

              "& .MuiSlider-track": {
                background:
                  "linear-gradient(90deg, #FF7A00, #FFB266)"
              }
            }}
          />
        </Box>

        {/* AI BUTTON */}
        <Box textAlign="center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="contained"
              onClick={handleSmartBudget}
              disabled={loading}
              startIcon={<AutoAwesomeIcon />}
              sx={{
                background:
                  "linear-gradient(90deg, #FF7A00, #FF9A3C)",
                borderRadius: "12px",
                px: 4,
                py: 1.2,
                fontWeight: 600,
                boxShadow:
                  "0 6px 18px rgba(255,122,0,0.3)",

                "&:hover": {
                  background:
                    "linear-gradient(90deg, #e66a00, #ff8c1a)"
                }
              }}
            >
              {loading ? "Calculating..." : "Suggest Smart Budget"}
            </Button>
          </motion.div>
        </Box>
      </Paper>
    </motion.div>
  );
};

export default SetBudget;