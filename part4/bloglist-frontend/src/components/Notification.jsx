import PropTypes from 'prop-types'

const Notification = ({ displayMsg, isSuccess }) => {
  if (displayMsg === null) {
    return <div className="none"></div>
  }
  return (
    <div className={`displayMsg ${isSuccess ? 'success': 'error'}`}>
      {displayMsg}
    </div>
  )
}

Notification.propTypes = {
  isSuccess: PropTypes.bool.isRequired
}

export default Notification
