import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';

// function sleep(duration) {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve();
//         }, duration);
//     });
// }
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
export default function AutocompleteDropdown({ onPlaceSelect }) {

    AutocompleteDropdown.propTypes = {
        onPlaceSelect: PropTypes.func.isRequired,
    };

    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const GEOAPIFY_API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

    // const handleOpen = () => {

    //     (async () => {

    //         await sleep(1e3); // For demo purposes.
    //         setLoading(false);

    //         // setOptions([...topFilms]);
    //     })();
    // };

    const handleClose = () => {
        setOpen(false);
        setOptions([]);
    };

    const fetchPlaces = async (text) => {
        setOpen(true);
        setLoading(true);
        try {
            const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(text)}&apiKey=${GEOAPIFY_API_KEY}&limit=5&lang=en&filter=countrycode:in`;
            const response = await fetch(url);

            if (response.ok) {
                const data = await response.json();
                console.log('data: ', data);

                const places = data?.features?.map((item) => ({
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
    };
    const debouncedFetch = debounce((text) => {
        if (text) fetchPlaces(text);
    }, 400);

    useEffect(() => {
        debouncedFetch(input);
        return () => debouncedFetch.cancel();
    }, [input]);

    // useEffect(() => {
    //     if (!options.length) {

    //     }
    // }, [options]);

    return (
        <Autocomplete
            sx={{ width: '100%' }}
            open={open}
            // onOpen={handleOpen}
            onClose={handleClose}
            isOptionEqualToValue={(option, value) => option.label === value.label}
            getOptionLabel={(option) => option.label}
            options={options}
            loading={loading}
            onChange={(e, val) => {
                if (val) {
                    setInput(val.label); // ✅ Updates input value on selection
                    onPlaceSelect(val);  // ✅ Passes selected place back to parent
                }
            }}
            renderInput={(params) => (
                <CssTextField
                    {...params}
                    label="Search place in India"
                    mb={2}
                    onChange={(e) => setInput(e.target.value)}
                    slotProps={{
                        input: {
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {loading ? <CircularProgress color="inherit" size={15} /> : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        },
                    }}
                />
            )}
        />
    );
}

// Top films as rated by IMDb users. http://www.imdb.com/chart/top
// const topFilms = [
//     { title: 'The Shawshank Redemption', year: 1994 },
//     { title: 'The Godfather', year: 1972 },
//     { title: 'The Godfather: Part II', year: 1974 },
//     { title: 'The Dark Knight', year: 2008 },
//     { title: '12 Angry Men', year: 1957 },
//     { title: "Schindler's List", year: 1993 },
//     { title: 'Pulp Fiction', year: 1994 },
//     {
//         title: 'The Lord of the Rings: The Return of the King',
//         year: 2003,
//     },
//     { title: 'The Good, the Bad and the Ugly', year: 1966 },
//     { title: 'Fight Club', year: 1999 },
//     {
//         title: 'The Lord of the Rings: The Fellowship of the Ring',
//         year: 2001,
//     },
//     {
//         title: 'Star Wars: Episode V - The Empire Strikes Back',
//         year: 1980,
//     },
//     { title: 'Forrest Gump', year: 1994 },
//     { title: 'Inception', year: 2010 },
//     {
//         title: 'The Lord of the Rings: The Two Towers',
//         year: 2002,
//     },
//     { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
//     { title: 'Goodfellas', year: 1990 },
//     { title: 'The Matrix', year: 1999 },
//     { title: 'Seven Samurai', year: 1954 },
//     {
//         title: 'Star Wars: Episode IV - A New Hope',
//         year: 1977,
//     },
//     { title: 'City of God', year: 2002 },
//     { title: 'Se7en', year: 1995 },
//     { title: 'The Silence of the Lambs', year: 1991 },
//     { title: "It's a Wonderful Life", year: 1946 },
//     { title: 'Life Is Beautiful', year: 1997 },
//     { title: 'The Usual Suspects', year: 1995 },
//     { title: 'Léon: The Professional', year: 1994 },
//     { title: 'Spirited Away', year: 2001 },
//     { title: 'Saving Private Ryan', year: 1998 },
//     { title: 'Once Upon a Time in the West', year: 1968 },
//     { title: 'American History X', year: 1998 },
//     { title: 'Interstellar', year: 2014 },
// ];
