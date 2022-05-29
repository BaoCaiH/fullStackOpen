import Error from "./error";
import Info from "./info";

const Message = ({ message, type = "" }) => {
  return message === "" ? (
    <></>
  ) : type === "error" ? (
    <Error message={message} />
  ) : (
    <Info message={message} />
  );
};

export default Message;
