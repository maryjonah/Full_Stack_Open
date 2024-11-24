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

export default Notification
