import React from "react";
import { PlaceholdersAndVanishInput } from "../ui/SearchInput";

interface Props {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  placeholders: string[];
}

function SearchInput({ setSearch, placeholders }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch("");
  };

  return (
    <PlaceholdersAndVanishInput
      placeholders={placeholders}
      onChange={handleChange}
      onSubmit={onSubmit}
    />
  );
}
export default SearchInput;
