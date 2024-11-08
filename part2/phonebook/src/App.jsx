import { useState, useEffect } from 'react'
import axios from 'axios'

import Display from './components/Display'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import noteService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('000-0000000')
  const [filterTerm, setSearchText] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  })
  
  const addPerson = event => {
    event.preventDefault()

    const isNamePresent = persons.some(person => person.name == newName)

    if (isNamePresent){
      window.alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('000-000-0000')
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      noteService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewNumber('000-000-0000')
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

  const handleDelete = id => {
    const person = persons.find(person => person.id === id)
    
    if (window.confirm(`Delete ${person.name}?`)) {
      noteService 
      .deletePerson(person)
      .then(setPersons(persons.filter(person => person.id !== id)))
    }
  }

  return (
    <>
      <Display heading="Phonebook" />

      <Filter filterTerm={filterTerm} handleFilter={handleFilter}/>

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
