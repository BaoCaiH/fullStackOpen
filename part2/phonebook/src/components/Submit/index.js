const Submit = ({persons, newName, newNumber, setPersons, setNewName, setNewNumber}) => {
    const handleAddName = (event) => {
        event.preventDefault()
        if (persons.map(person => person.name).indexOf(newName) !== -1) {
        alert(`${newName} is already added to phonebook`)
        } else {
        const nameObject = {
            name: newName,
            number: newNumber,
            id: persons.length + 1
        }
        setPersons(persons.concat(nameObject))
        }
        setNewName('')
        setNewNumber('')
    }
    return (
        <div>
            <button type="submit" onClick={handleAddName}>add</button>
        </div>
    )
}

export default Submit
