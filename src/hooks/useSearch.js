import { useState } from "react";
import { searchInObject } from "../lib/dataUtils";

export const useSearch = (data, defaultField = "") => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState(defaultField);

  const filteredData = data.filter(item => {
    if (!searchQuery || !searchField) return true;
    return searchInObject(item[searchField], searchQuery);
  });

  return {
    searchQuery,
    setSearchQuery,
    searchField,
    setSearchField,
    filteredData,
  };
};
