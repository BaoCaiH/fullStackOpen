import PhoneBook from "../../services/PhoneBook";

const Submit = ({
  persons,
  newName,
  newNumber,
  setPersons,
  setNewName,
  setNewNumber,
  setMessage,
  setMessageType,
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
        PhoneBook.update(contactIndex, nameObject)
          .then((updatedContact) => {
            setPersons(
              persons.map((person) =>
                person.id !== contactIndex ? person : updatedContact
              )
            );
            setMessage(`Updated ${updatedContact.name}`);
            setMessageType("info");
            setTimeout(() => {
              setMessage("");
            }, 5000);
          })
          .catch((error) => {
            PhoneBook.getAll().then((contacts) => setPersons(contacts));
            setMessage(`${nameObject.name} was already deleted from server`);
            console.log(error);
            setMessageType("error");
            setTimeout(() => {
              setMessage("");
            }, 5000);
          });
    } else {
      PhoneBook.create(nameObject).then((newContact) => {
        setPersons(persons.concat(newContact));
        setMessage(`Added ${newContact.name}`);
        setMessageType("info");
        setTimeout(() => {
          setMessage("");
        }, 5000);
      });
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
