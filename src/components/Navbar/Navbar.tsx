import LeftNavbar from './LeftNavbar';
import RightNavbar from './RightNavbar';
import { AppBar, Toolbar } from "@mui/material";

interface NavbarProps {
    showSnackbar: (message: string, severity: 'success' | 'error' | 'info' | 'warning') => void;
}

const Navbar = ({ showSnackbar }: NavbarProps) => {
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
