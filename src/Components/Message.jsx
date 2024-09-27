const Notification = ( message ) => {
    return (
        <div className="alert">
            {message.message}
        </div>
    )
}

export default Notification