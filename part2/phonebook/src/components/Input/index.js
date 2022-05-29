const Input = ({name, number, setNewName, setNewNumber}) => {
    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }
    return (
        <>
            <div>
            name: <input value={name} onChange={handleNameChange} />
            </div>
            <div>
            number: <input value={number} onChange={handleNumberChange} />
            </div>
        </>
    )
}

export default Input
