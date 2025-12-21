import { useState, useEffect, useCallback } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';
import { updateBasicDetails } from '../../redux/formDataSlice';

interface GeoapifyPlace {
    label: string;
    value: {
        city?: string;
        country?: string;
        country_code?: string;
        state?: string;
        [key: string]: unknown;
    };
}

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#A0AAB4',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#B2BAC2',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#E0E3E7',
        },
        '&:hover fieldset': {
            borderColor: '#B2BAC2',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#6F7E8C',
        },
    },
});

interface AutocompleteDropdownProps {
    onPlaceSelect?: (place: GeoapifyPlace) => void;
}

export default function AutocompleteDropdown({ onPlaceSelect }: AutocompleteDropdownProps) {

    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<GeoapifyPlace[]>([]);
    const [input, setInput] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedValue, setSelectedValue] = useState<GeoapifyPlace | null>(null);

    const GEOAPIFY_API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY as string;

    const dispatch = useDispatch();
    // const selectedDestination = useSelector((state) => state?.stepperFormData?.formData?.basicDetails?.destination);

    const handleClose = () => {
        setOpen(false);
        setOptions([]);
    };

    const fetchPlaces = useCallback(async (text: string) => {
        setOpen(true);
        setLoading(true);
        try {
            const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(text)}&apiKey=${GEOAPIFY_API_KEY}&limit=5&lang=en&filter=countrycode:in`;
            const response = await fetch(url);

            if (response.ok) {
                const data = await response.json();
                console.log('data: ', data);

                const places = data?.features?.map((item: any) => ({
                    label: item?.properties?.city,
                    value: item?.properties,
                }));
                setOptions(places);
            } else {
                console.error('Bad response from Geoapify');
                setOptions([]);
            }
            setLoading(false);

        } catch (err) {
            console.error('Error fetching places:', err);
            setOptions([]);
        } finally {
            setLoading(false);
        }
    }, [GEOAPIFY_API_KEY]);

    const debouncedFetch = useCallback(
        debounce((text: string) => {
            if (text) fetchPlaces(text);
        }, 400),
        [fetchPlaces]
    );
    useEffect(() => {
        debouncedFetch(input);
        return () => debouncedFetch.cancel();
    }, [input, debouncedFetch]);

    return (
        <Autocomplete
            sx={{ width: '100%' }}
            open={open}
            onClose={handleClose}
            options={options}
            getOptionLabel={(option) => option.label || ''}

            // Controlled props
            value={selectedValue}
            onChange={(event, newValue) => {
                setSelectedValue(newValue);
                if (newValue) {
                    setInput(newValue.label);
                    onPlaceSelect(newValue);       // Notify parent
                    dispatch(updateBasicDetails({ destination: newValue.label }))
                } else {
                    setInput('');
                    dispatch(updateBasicDetails({ destination: '' }));
                }
            }}
            onInputChange={(event, newInputValue, reason) => {
                if (reason === 'input') {
                    setInput(newInputValue);
                }
            }}

            isOptionEqualToValue={(option, value) => option.label === value?.label}

            loading={loading}
            renderInput={(params) => (
                <CssTextField
                    {...params}
                    label="Search place in India"
                    required
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress color="inherit" size={15} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
        />

    );
}