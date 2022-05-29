import PhoneBook from "../../services/PhoneBook";

const Delete = ({ id, name, setPersons }) => {
  const handleDelete = (event) => {
    event.preventDefault();
    window.confirm(`Delete ${name}?`);
    PhoneBook.deleteContact(id).then(() =>
      PhoneBook.getAll().then((contacts) => setPersons(contacts))
    );
  };
  return <button onClick={handleDelete}>delete</button>;
};

export default Delete;
