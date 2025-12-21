import { CircularProgress } from '@mui/material';

interface ClassicButtonProps {
  onClick: () => void;
  isDisabled?: boolean;
  text: string;
}

const ClassicButton = ({ onClick, isDisabled = false, text }: ClassicButtonProps) => {
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
};
export default ClassicButton;
