import { useState } from "react";
import Country from "../Country";

const CountryHidden = ({ country }) => {
  const [show, setShow] = useState("show");
  const [content, setContent] = useState(null);
  const handleShow = (event) => {
    event.preventDefault();
    setShow(show === "show" ? "hide" : "show");
    setContent(show === "show" ? <Country country={country} /> : null);
  };
  return (
    <div>
      <div>
        {country.name.common} <button onClick={handleShow}>{show}</button>
      </div>
      <div>{content}</div>
    </div>
  );
};

export default CountryHidden;
