const Notification = ({ displayMsg, isSuccess }) => {
    if (displayMsg === null) {
        return null
    } 
    return (
        <div className={`displayMsg ${isSuccess ? 'success': 'error'}`}>
            {displayMsg}
        </div>
    )
}

export default Notification
