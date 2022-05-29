import { useEffect, useState } from "react";
import axios from "axios";
import Persons from "./components/Persons";
import PhoneBook from "./services/PhoneBook";
import Filter from "./components/Filter";
import Input from "./components/Input";
import Submit from "./components/Submit";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    PhoneBook.getAll().then((contacts) => {
      setPersons(contacts);
    });
  }, []);

  const filterPerson = () => {
    return persons.filter((person) =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <div>
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
        />
      </form>
      <h2>Numbers</h2>
      <Persons persons={filterPerson()} setPersons={setPersons} />
    </div>
  );
};

export default App;
