const SearchBar = ({ search, setSearch, countries }) => {
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  return (
    <div>
      find countries: <input value={search} onChange={handleSearchChange} />
    </div>
  );
};

export default SearchBar;
