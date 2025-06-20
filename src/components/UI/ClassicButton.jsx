import PropTypes from 'prop-types';
import { CircularProgress } from '@mui/material';

const ClassicButton = ({ onClick, isDisabled = false, text }) => {


  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 rounded-lg shadow-lg transition duration-300 ${isDisabled
        ? "opacity-50 cursor-not-allowed"
        : "hover:shadow-orange-500/50"
        }`}>
      {isDisabled ? (
        <span className="flex items-center gap-2 justify-center">
          <CircularProgress size={20} color="inherit" />
          Loading...
        </span>
      ) : (
        text
      )}
    </button>
  )
}
ClassicButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}
export default ClassicButton
