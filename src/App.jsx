import { useEffect, useState } from 'react'
import Filter from './Components/Filter'
import Form from './Components/Form'
import Numbers from './Components/Numbers'
import Text from './Components/Text'
import phones from './services/phones'
import Notification from './Components/Message'

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('Add new user')
  const [newPhone, setNewPhone] = useState('Add phone')
  const [filter, setFilter] = useState(persons)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    phones
      .getAll()
      .then(initialPhones => {
        setFilter(initialPhones)
        setPersons(initialPhones)
      })
  }, [])

  const addNewUser = ( event ) => {
    event.preventDefault()
    const users = persons.map(person => person.name)

    if (users.includes(newName)) {
      const validatePhone = persons.filter(person => person.name === newName)

      if (newPhone === validatePhone[0].phone) {
        setMessage(`The user ${newName} already exists with the phone ${newPhone}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        return;
      }

      if (window.confirm(`User ${newName} is already registered with the number ${validatePhone[0].phone}, ¿you want to update the number to: ${newPhone}?`)) {
        const user = filter.find(u => u.name === newName)
        const changedUser = {...user, phone: newPhone}

        phones
          .updateUSer( changedUser.id, changedUser)
          .then(response => {
            setFilter(filter.map(person => person.id === changedUser.id ? changedUser : person))
          })

        setMessage(`The user ${newName} successfully update the phone to: ${newPhone}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        
      }
      return;
    }
    const newUser = {
      name: newName,
      phone: newPhone
    }

    phones
      .createUser( newUser )
      .then(returnedUser => {
        setPersons(persons.concat(returnedUser))
        setFilter(filter.concat(returnedUser))
      })
    setNewName('Add new user')
    setNewPhone('Add phone')

    setMessage(`The user ${newName} with phone ${newPhone} was successfully registered`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)

  }

  const filterName = ( event ) => {
    const filtered = persons.filter(person => 
      person.name.toLowerCase().includes(event.target.value.toLowerCase()))
    setFilter(filtered)
  }

  const deleteUsers = ( id ) => {
    const user = persons.filter(person => person.id === id)
    if (window.confirm(`¿Delete user ${user[0].name}?`)) {
      phones
        .deleteUser(user[0].id)
        .then(deletedUser => {
            setFilter(filter.filter(user => user.id !== deletedUser.id))
            setPersons(persons.filter(person => person.id !== deletedUser.id))
          }
        )
        .catch(error => {
          setMessage(`The user ${user[0].name} not exists or was deleted`)
          phones
          .getAll()
          .then(initialPhones => {
            setFilter(initialPhones)
            setPersons(initialPhones)
          })
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        return;
    }

  }

  return (
    <div>
      <Text text='Phonebook'/>
      <Filter filterName={filterName}/>
      <Text text='Add a new user' />
      <Notification message={message}/>
      <Form 
        addNewUser={addNewUser} 
        newName={newName} 
        newPhone={newPhone}
        setNewName={setNewName}
        setNewPhone={setNewPhone}
      />
      <Text text={'Users'}/>
      <Numbers filter={filter} deleteUsers={deleteUsers} />
    </div>
  )
}

export default App
