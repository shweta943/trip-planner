import LeftNavbar from '../../components/Navbar/LeftNavbar';
import RightNavbar from '../../components/Navbar/RightNavbar';
import { AppBar, Toolbar } from "@mui/material";
import PropTypes from 'prop-types';

const Navbar = ({ showSnackbar }) => {
    Navbar.propTypes = {
        showSnackbar: PropTypes.func.isRequired
    };
    return (
        <div>
            <AppBar position="fixed" elevation={3} sx={{ backgroundColor: "white", color: "black" }}>
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    {/* Logo */}
                    <LeftNavbar />

                    <RightNavbar showSnackbar={showSnackbar} />
                </Toolbar>
            </AppBar>

        </div>
    )
}

export default Navbar;
