/* eslint-disable react/prop-types */
import { motion, useScroll, useTransform } from "framer-motion";
import { Filter, Search, Trash } from "lucide-react";
import { useState } from "react";

export default function Navbar({
  onSearch,
  onFilterChange,
  source,
  refetch,
  setRefetch,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const { scrollY } = useScroll();
  console.log(scrollY);
  const opacity = useTransform(
    scrollY,
    [0, 0],
    [0, 1]
  );

  return (
    <motion.nav
      style={{
        opacity,
        backgroundColor: "transparent",
        backdropFilter: "blur(10px)",
        "-webkit-backdrop-filter": "blur(10px)",
        backgroundImage: "linear-gradient(1deg, white, transparent)",
        S: "30px",
      }}
      className="sticky top-0 bg-white shadow-md py-4 z-50"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 max-w-xl w-full">
            <input
              type="text"
              placeholder="Search news..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onInput={(e) => {
                setSearchTerm(e.target.value);
                onSearch(e.target.value);
              }}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            <button
              className="bg-transparent p-0 m-0 text-gray-400 hover:text-red-500"
              onClick={() => {
                setSearchTerm("");
                setRefetch(!refetch);
              }}
            >
              <Trash className="absolute right-3 top-2.5 text-gray-400 w-5 h-5 hover:transform hover:scale-110 hover:text-red-500" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="text-gray-600 w-5 h-5" />
            <select
              onChange={(e) => onFilterChange(e.target.value)}
              className="py-2 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option key="All Sources" value="All Sources">
                All Sources
              </option>
              {source?.map((src) => (
                <option key={src} value={src}>
                  {src.charAt(0).toUpperCase() + src.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
