// import { useState } from "react";

// export default function SearchSelect() {
//   const [search, setSearch] = useState("");
//   const fruits = ["Apple", "Banana", "Cherry", "Mango", "Watermelon"];
//   const [showOptions, setShowOptions] = useState(false);

//   const filtered = fruits.filter((fruit) =>
//     fruit.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="p-4">
//       <input
//         type="text"
//         value={search}
//         onChange={(e) => {
//           setSearch(e.target.value);
//           setShowOptions(true);
//         }}
//         onFocus={() => setShowOptions(true)}
//         onBlur={() => setShowOptions(false)}
//         placeholder="Search fruit..."
//         className="border p-2 rounded mb-2 w-full"
//       />

//       {showOptions && (
//         <ul className="border p-2 rounded">
//           {filtered.map((fruit) => (
//             <li
//               onMouseDown={() => {
//                 setSearch(fruit);
//                 setShowOptions(false);
//               }}
//               key={fruit}
//               className="p-2 cursor-pointer hover:bg-gray-200"
//             >
//               {fruit}
//             </li>
//           ))}
//           {filtered.length === 0 && (
//             <div>
//               <p>No results found.</p>
//             </div>
//           )}
//         </ul>
//       )}
//     </div>
//   );
// }

import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function SearchSelect() {
  const fruits = ["Apple", "Banana", "Cherry", "Mango", "Watermelon"];
  const [value, setValue] = React.useState(null);

  return (
    <div style={{ width: 300, margin: "2rem auto" }}>
      <Autocomplete
        options={fruits}
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        renderInput={(params) => (
          <TextField {...params} label="Search fruit..." variant="outlined" />
        )}
        clearOnEscape
      />
    </div>
  );
}
