import Person from "../Person";

const Persons = ({ persons, setPersons, setMessage, setMessageType }) => {
  return (
    <ul>
      {persons.map((person) => (
        <Person
          key={person.name}
          person={person}
          setPersons={setPersons}
          setMessage={setMessage}
          setMessageType={setMessageType}
        />
      ))}
    </ul>
  );
};

export default Persons;
