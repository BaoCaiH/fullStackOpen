import { useEffect, useState } from "react";
import Persons from "./components/Persons";
import PhoneBook from "./services/PhoneBook";
import Filter from "./components/Filter";
import Input from "./components/Input";
import Submit from "./components/Submit";
import Message from "./components/Message";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState("app messages here");
  const [messageType, setMessageType] = useState("info");

  useEffect(() => {
    PhoneBook.getAll().then((contacts) => {
      setPersons(contacts);
    });

    setTimeout(() => {
      setMessage("");
    }, 5000);
  }, []);

  const filterPerson = () => {
    return persons.filter((person) =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <div>
      <Message message={message} type={messageType} />
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h3>add a new</h3>
      <form>
        <Input
          name={newName}
          number={newNumber}
          setNewName={setNewName}
          setNewNumber={setNewNumber}
        />
        <Submit
          persons={persons}
          newName={newName}
          newNumber={newNumber}
          setPersons={setPersons}
          setNewName={setNewName}
          setNewNumber={setNewNumber}
          setMessage={setMessage}
          setMessageType={setMessageType}
        />
      </form>
      <h2>Numbers</h2>
      <Persons
        persons={filterPerson()}
        setPersons={setPersons}
        setMessage={setMessage}
        setMessageType={setMessageType}
      />
    </div>
  );
};

export default App;
