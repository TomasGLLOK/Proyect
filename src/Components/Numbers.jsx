const Numbers = ({ filter, deleteUsers }) => {

filter.map(person => console.log(person))

    return (
      <div>
        {filter.map(person => 
          <p key={person.name}>
            {person.name} {person.number} 
            <button onClick={() => deleteUsers(person.id)}>
              Delete User
            </button>
          </p>
        )}
      </div>
    )
}

export default Numbers
