const Error = ({ message }) => {
  const messageStyle = {
    color: "red",
    fontSize: 20,
    background: "lightgrey",
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  return <div style={messageStyle}>{message}</div>;
};

export default Error;
