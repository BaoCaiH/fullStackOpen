import PhoneBook from "../../services/PhoneBook";

const Submit = ({
  persons,
  newName,
  newNumber,
  setPersons,
  setNewName,
  setNewNumber,
}) => {
  const handleAddName = (event) => {
    event.preventDefault();
    const findIndex = persons.map((person) => person.name).indexOf(newName);
    const contactIndex =
      findIndex !== -1 ? persons[findIndex].id : persons.length + 1;

    const nameObject = {
      name: newName,
      number: newNumber,
      id: contactIndex,
    };
    if (findIndex !== -1) {
      window.confirm(
        `${newName} is already added to phonebook, replace old number with a new one?`
      ) &&
        PhoneBook.update(contactIndex, nameObject).then((updatedContact) =>
          setPersons(
            persons.map((person) =>
              person.id !== contactIndex ? person : updatedContact
            )
          )
        );
    } else {
      PhoneBook.create(nameObject).then((newContact) =>
        setPersons(persons.concat(newContact))
      );
    }
    setNewName("");
    setNewNumber("");
  };
  return (
    <div>
      <button type="submit" onClick={handleAddName}>
        add
      </button>
    </div>
  );
};

export default Submit;
