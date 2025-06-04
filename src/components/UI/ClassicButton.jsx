import PropTypes from 'prop-types'

const ClassicButton = ({ onClick, disabled = false, text }) => {

  ClassicButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }
  return (
    <button
      onClick={onClick}
      className={`px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 rounded-lg shadow-lg transition duration-300 ${disabled
        ? "opacity-50 cursor-not-allowed"
        : "hover:shadow-orange-500/50"
        }`}>
      {text}
    </button>
  )
}

ClassicButton.propTypes = {

}

export default ClassicButton
