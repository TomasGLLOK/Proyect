const Form = ({ addNewUser, newName, newPhone, setNewName, setNewPhone }) => {
    return (
      <form onSubmit={addNewUser}>
      <div>
        <label>name: </label>
        <input 
          type='text' 
          value={newName} 
          onChange={() => setNewName(event.target.value)}
        />
      </div>
      <div>
        <label>Phone: </label>
        <input 
          type='text'
          value={newPhone}
          onChange={() => setNewPhone(event.target.value)}
        />
      </div>
  
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    )
}

export default Form