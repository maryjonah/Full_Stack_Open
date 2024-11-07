import { useState, useEffect } from 'react'
import axios from 'axios'

import Display from './components/Display'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'


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
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(newPerson))
    }

    setNewNumber('000-000-0000')
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

      <Display heading="add a new" />
      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        newNumber={newNumber} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} />

      <Display text="Numbers" />
      <Persons filteredPeople={filteredPeople} />
    </>
  )
}

export default App
