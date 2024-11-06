import { useState } from 'react'
import Display from './components/Display'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('000-0000000')
  const [filterTerm, setSearchText] = useState('')

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
