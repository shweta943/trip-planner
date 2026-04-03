import {
  Grid,
  TextField,
  MenuItem,
  Typography,
  Paper,
  Box,
  Chip,
  Tooltip,
  Autocomplete,
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { updateBasicDetails } from "../../redux/stepperFormSlice";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../config/backendAPI/apiClient";
import { useDestinationAutocomplete } from "../../hooks/useDestinationAutocomplete";
import { useDebounce } from "../../hooks/useDebounce";

const BasicDetails = ({ errors }: any) => {
  const dispatch = useDispatch();

  const data = useSelector(
    (state: RootState) => state.stepperFormData.basicDetails,
  );

  const handleChange = (field: string, value: any) => {
    dispatch(updateBasicDetails({ [field]: value }));
  };

  /* =======================
     GEOAPIFY AUTOCOMPLETE
  ======================= */
  const { options, fetchSuggestions, loading } = useDestinationAutocomplete();

  const debouncedDestination = useDebounce(data.destination);

  useEffect(() => {
    if (debouncedDestination) {
      fetchSuggestions(debouncedDestination);
    }
  }, [debouncedDestination]);

  /* =======================
     AI POPULAR DESTINATIONS
  ======================= */
  const { data: destinations = [] } = useQuery({
    queryKey: ["popular-destinations"],
    queryFn: () => apiClient("/api/ai/popular-destinations"),
    staleTime: 1000 * 60 * 60 * 24, // 24h
  });

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
          border: "1px solid rgba(255,122,0,0.1)",
        }}
      >
        {/* Heading */}
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" fontWeight={700}>
            Plan Your Trip ✈️
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Tell us your travel basics to get started
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* DESTINATION */}
          <Grid item xs={12}>
            <Autocomplete
              freeSolo
              options={options}
              loading={loading}
              value={data.destination}
              onInputChange={(e, value) => handleChange("destination", value)}
              onChange={(e, value) => handleChange("destination", value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Destination"
                  placeholder="Search destinations..."
                  error={!!errors?.destination}
                  helperText={errors?.destination?._errors?.[0]}
                  sx={inputStyle}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <>
                        <LocationOnIcon sx={{ mr: 1, color: "#FF7A00" }} />
                        {params.InputProps.startAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
          </Grid>

          {/* AI BADGES */}
          <Grid item xs={12}>
            <Box>
              <Box display="flex" alignItems="center" mb={1}>
                <Typography variant="body2" fontWeight={500}>
                  Popular Picks
                </Typography>

                <Tooltip title="AI generated suggestions">
                  <AutoAwesomeIcon
                    sx={{
                      ml: 1,
                      fontSize: 16,
                      color: "#FF7A00",
                    }}
                  />
                </Tooltip>
              </Box>

              <Box display="flex" flexWrap="wrap" gap={1}>
                {destinations?.destinations?.map((place: string) => (
                  <motion.div
                    key={place}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Chip
                      label={place}
                      onClick={() => handleChange("destination", place)}
                      sx={{
                        borderRadius: "10px",
                        background:
                          data.destination === place
                            ? "#FF7A00"
                            : "linear-gradient(135deg, #FF7A00, #FFB266)",
                        color: "#fff",
                        fontWeight: 500,

                        "&:hover": {
                          boxShadow: "0 6px 16px rgba(255,122,0,0.4)",
                        },
                      }}
                    />
                  </motion.div>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* DATES */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="date"
              label="Start Date"
              InputLabelProps={{ shrink: true }}
              value={data.startDate}
              onChange={(e) => handleChange("startDate", e.target.value)}
              error={!!errors?.startDate}
              helperText={errors?.startDate?._errors?.[0]}
              sx={inputStyle}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="date"
              label="End Date"
              InputLabelProps={{ shrink: true }}
              value={data.endDate}
              onChange={(e) => handleChange("endDate", e.target.value)}
              error={!!errors?.endDate}
              helperText={errors?.endDate?._errors?.[0]}
              sx={inputStyle}
            />
          </Grid>

          {/* TRAVELERS */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="number"
              label="Travelers"
              value={data.travelers}
              onChange={(e) =>
                handleChange("travelers", Number(e.target.value))
              }
              sx={inputStyle}
            />
          </Grid>

          {/* TRIP TYPE */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              label="Trip Type"
              value={data.tripType}
              onChange={(e) => handleChange("tripType", e.target.value)}
              sx={inputStyle}
            >
              <MenuItem value="solo">Solo</MenuItem>
              <MenuItem value="couple">Couple</MenuItem>
              <MenuItem value="family">Family</MenuItem>
              <MenuItem value="group">Group</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Paper>
    </motion.div>
  );
};

/* 🎨 INPUT STYLING */
const inputStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "#fff",
    transition: "all 0.25s ease",

    "&:hover": {
      boxShadow: "0 4px 14px rgba(255,122,0,0.2)",
    },

    "&.Mui-focused": {
      boxShadow: "0 6px 18px rgba(255,122,0,0.3)",
      transform: "scale(1.01)",
    },
  },

  "& .MuiInputLabel-root.Mui-focused": {
    color: "#FF7A00",
  },
};

export default BasicDetails;
