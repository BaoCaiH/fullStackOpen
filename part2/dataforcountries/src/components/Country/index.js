const Country = ({ country }) => {
  const { name, capital, area, languages, flags } = country;
  return (
    <>
      <h2>{name.common}</h2>
      <div>capital {capital[0]}</div>
      <div>area {area}</div>
      <h3>languages:</h3>
      <ul>
        {Object.keys(languages).map((key) => (
          <li key={languages[key]}>{languages[key]}</li>
        ))}
      </ul>
      <img src={flags.png} />
    </>
  );
};

export default Country;
