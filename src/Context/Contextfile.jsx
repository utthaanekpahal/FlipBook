import React, { createContext, useState } from 'react'

  export const mycontext=createContext()
const Contextfile = ({children}) => {
const [globaldata, setglobaldata] = useState([])
  return (
    <mycontext.Provider value={{globaldata,setglobaldata}}>
        {children}
    </mycontext.Provider>
  )
}

export default Contextfile