import { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { useDestinationAutocomplete } from "../../hooks/useDestinationAutocomplete";
import { useDebounce } from "../../hooks/useDebounce";

interface AutocompleteDropdownProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  startAdornment?: React.ReactNode;
  sx?: any;
}

export default function AutocompleteDropdown({
  value,
  onChange,
  label = "Destination",
  placeholder = "Search...",
  error = false,
  helperText = "",
  startAdornment,
  sx,
}: AutocompleteDropdownProps) {
  const { options, fetchSuggestions, loading } = useDestinationAutocomplete();

  // Debounce the typed input value to avoid calling API on every keystroke
  const debouncedValue = useDebounce(value, 400);

  useEffect(() => {
    if (debouncedValue && debouncedValue.length >= 2) {
      fetchSuggestions(debouncedValue);
    }
  }, [debouncedValue]);

  return (
    <Autocomplete
      freeSolo
      options={options}
      loading={loading}
      value={value}
      onInputChange={(_, newInputValue, reason) => {
        if (reason === "input") {
          onChange(newInputValue);
        }
      }}
      onChange={(_, newValue) => {
        onChange(newValue || "");
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          error={error}
          helperText={helperText}
          sx={sx}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <>
                {startAdornment}
                {params.InputProps.startAdornment}
              </>
            ),
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
