import { FaSearch } from "react-icons/fa";

export const SearchInput = () => {
  return (
    <div className="hidden w-1/3 items-center rounded-full border border-black px-3 md:flex">
      <FaSearch />
      <input type="text" className="mx-2 my-2 flex-grow outline-none" />
      <button className="rounded-full bg-black p-2">
        <FaSearch fill="white" />
      </button>
    </div>
  );
};
