const Numbers = ({ filter, deleteUsers }) => {

    return (
      <div>
        {filter.map(person => 
          <p key={person.name}>
            {person.name} {person.phone} 
            <button onClick={() => deleteUsers(person.id)}>
              Delete User
            </button>
          </p>
        )}
      </div>
    )
}

export default Numbers
