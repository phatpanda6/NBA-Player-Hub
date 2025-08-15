import { useState } from "react";

export default function SearchBar({ onSearch, isLoading }) {
  const [inputValue, setInputValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(inputValue);
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search player..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? (
          <div className="button-spinner"></div>
        ) : (
          "Search"
        )}
      </button>
    </form>
  );
}
