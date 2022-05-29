const Info = ({ message }) => {
  const messageStyle = {
    color: "green",
    fontSize: 20,
    background: "lightgrey",
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  return <div style={messageStyle}>{message}</div>;
};

export default Info;
