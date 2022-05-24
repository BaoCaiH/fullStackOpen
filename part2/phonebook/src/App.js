import { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Input from './components/Input'
import Submit from './components/Submit'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const filterPerson = () => {
    return persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h3>add a new</h3>
      <form>
        <Input name={newName} number={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} />
        <Submit persons={persons} newName={newName} newNumber={newNumber} setPersons={setPersons} setNewName={setNewName} setNewNumber={setNewNumber} />
      </form>
      <h2>Numbers</h2>
      <Persons persons={filterPerson()}/>
    </div>
  )
}

export default App