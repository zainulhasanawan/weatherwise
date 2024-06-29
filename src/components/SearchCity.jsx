function SearchCity({ value, onChange, onKeyDown }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search for a city"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}

export default SearchCity;
