import LeftNavbar from '../../components/Navbar/LeftNavbar';
import RightNavbar from '../../components/Navbar/RightNavbar';
import { AppBar, Toolbar } from "@mui/material";

const Navbar = () => {
    return (
        <div>


            <AppBar position="fixed" elevation={3} sx={{ backgroundColor: "white", color: "black" }}>
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    {/* Logo */}
                    <LeftNavbar />

                    <RightNavbar />
                </Toolbar>
            </AppBar>

        </div>
    )
}

export default Navbar;
