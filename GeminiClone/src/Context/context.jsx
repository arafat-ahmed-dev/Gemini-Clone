import React, { createContext, useEffect, useState } from "react";
import response from "../config/config";

export const AppContext = createContext();

const ContextProvider = (props) => {
  const [isStart, setIsStart] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [input, setInput] = useState("");
  const [previousInput, setPreviousInput] = useState([]);
  const [previousPrompt, setpreviousPrompt] = useState([]);
  const [loading , setLoading ] = useState(false)

  const onSent = async (input) => {
    try {
      if (input.length != 0) {
        const data = await response(input).then((res) => res.response.text())
        setPrompt(data);
        console.log(data)
        setLoading(false)
      }
    } catch (error) {
      console.error(error)
    }
  };
  useEffect(()=>{
    onSent(input) 
  },[input])
  
  
  

  const contextValue = {
    onSent,
    isStart,
    setIsStart,
    prompt,
    setPrompt,
    input,
    setInput,
    setPreviousInput,
    previousInput,
    setpreviousPrompt,
    previousPrompt,
    loading,
    setLoading,

  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
