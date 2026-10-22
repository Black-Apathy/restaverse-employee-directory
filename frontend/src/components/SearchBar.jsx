import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onSearch(value);
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search by name or department..."
        aria-label="Search employees by name or department"
      />
      <button type="submit">Search</button>
    </form>
  );
}
