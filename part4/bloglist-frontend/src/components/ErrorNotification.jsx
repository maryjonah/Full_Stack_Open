const ErrorNotification = ({ errorMsg }) => {
    if (errorMsg === null) {
        return null
    } 
    return (
        <div className='errorMsg'>
            {errorMsg}
        </div>
    )
}

export default ErrorNotification
