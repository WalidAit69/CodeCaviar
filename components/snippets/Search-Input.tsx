import React from "react";
import { PlaceholdersAndVanishInput } from "../ui/SearchInput";

const placeholders = [
  "Responsive Menu",
  "Button",
  "Input",
  "Carousel",
  "Side bar",
];

interface Props {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

function SearchInput({ setSearch }: Props) {
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
