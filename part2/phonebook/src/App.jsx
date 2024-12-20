import { useState, useEffect } from 'react'

import Display from './components/Display'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('000-0000000')
  const [filterTerm, setSearchText] = useState('')
  const [notifyMsg, setNotifyMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    personService 
    .getAll()
    .then(intialPersons => {
      setPersons(intialPersons)
    })
  }, [])
  
  
  const addPerson = event => {
    event.preventDefault()

    const repeatedPerson = persons.find(person => person.name == newName)

    if (repeatedPerson){
      const updatePerson = {...repeatedPerson, number: newNumber}

      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update2(updatePerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.name === newName ? returnedPerson : person))
            setNewName('')
            setNewNumber('000-000-0000')
            setNotifyMsg(`Contact number updated to ${newNumber}`)
            setTimeout(() => { setNotifyMsg(null)}, 7000)
          })
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewNumber('000-000-0000')
          setNotifyMsg(`${newName} details added to phonebook`)
          setTimeout(() => { setNotifyMsg(null)}, 7000)
        })
        .catch(error => {
          setErrorMsg(error.response.data.error)
          setTimeout(() => { setErrorMsg(null)}, 5000)
        })
    }
  }

  const handleDelete = id => {
    const person = persons.find(person => person.id === id)
    
    if (window.confirm(`Delete ${person.name}?`)) {
      personService 
      .deletePerson(person)
      .then(setPersons(persons.filter(person => person.id !== id)))
      .catch(error => {
        setErrorMsg(`Information of ${person.name} has already been removed from server.`)
        setTimeout(() => {setErrorMsg(null)}, 5000)
      })
    }
  }


  const handleNameChange = event => {
    setNewName(event.target.value)
  }


  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }


  const filteredPeople = persons.filter(person => person.name.toLowerCase().includes(filterTerm.toLowerCase()))


  const handleFilter = event => {
    setSearchText(event.target.value)
  }


  return (
    <>
      <Display heading="Phonebook" />

      <Filter filterTerm={filterTerm} handleFilter={handleFilter}/>

      <Notification message={notifyMsg} />
      <ErrorNotification errorMsg={errorMsg} />

      <Display heading="add a new" />
      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        newNumber={newNumber} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} />

      <Display text="Numbers" />
      <Persons filteredPeople={filteredPeople} btnDelete={handleDelete} />
    </>
  )
}

export default App
