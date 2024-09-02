import { useState, createContext } from "react";
const stateContext = createContext();

function StateProvider({ children }) {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('india');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(false);

  return (
    <stateContext.Provider value={{ query, setQuery, input, setInput, loading, setLoading, errors, setErrors, data, setData }}>
      {children}
    </stateContext.Provider>
  );
}

export { stateContext, StateProvider };