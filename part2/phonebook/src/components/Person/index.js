import Delete from "../Delete";

const Person = ({ person, setPersons, setMessage, setMessageType }) => {
  return (
    <>
      <li>
        {person.name} {person.number}{" "}
        {
          <Delete
            id={person.id}
            name={person.name}
            setPersons={setPersons}
            setMessage={setMessage}
            setMessageType={setMessageType}
          />
        }
      </li>
    </>
  );
};

export default Person;
