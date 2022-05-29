import Delete from "../Delete";

const Person = ({ person, setPersons }) => {
  return (
    <>
      <li>
        {person.name} {person.number}{" "}
        {<Delete id={person.id} name={person.name} setPersons={setPersons} />}
      </li>
    </>
  );
};

export default Person;
