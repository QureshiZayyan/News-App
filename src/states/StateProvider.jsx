import { useState, createContext } from "react";
const StateContext = createContext();

function StateProvider({ children }) {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('india');
  const [heading, setHeading] = useState(null);
  const [input, setInput] = useState('');
  const [errors, setErrors] = useState('');

  return (
    <StateContext.Provider value={{ input, setInput, data, setData, setErrors, errors, query, setQuery, heading, setHeading }}>
      {children}
    </StateContext.Provider>
  );
}

export { StateContext, StateProvider };