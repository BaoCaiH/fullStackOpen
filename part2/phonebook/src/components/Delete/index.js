import PhoneBook from "../../services/PhoneBook";

const Delete = ({ id, name, setPersons, setMessage, setMessageType }) => {
  const handleDelete = (event) => {
    event.preventDefault();
    window.confirm(`Delete ${name}?`);
    PhoneBook.deleteContact(id)
      .then(() => {
        PhoneBook.getAll().then((contacts) => setPersons(contacts));
        setMessage(`Deleted ${name}`);
        setMessageType("info");
        setTimeout(() => {
          setMessage("");
        }, 5000);
      })
      .catch((error) => {
        PhoneBook.getAll().then((contacts) => setPersons(contacts));
        setMessage(`${name} was already deleted from server`);
        console.log(error);
        setMessageType("error");
        setTimeout(() => {
          setMessage("");
        }, 5000);
      });
  };
  return <button onClick={handleDelete}>delete</button>;
};

export default Delete;
