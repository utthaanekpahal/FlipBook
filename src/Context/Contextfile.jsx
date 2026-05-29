import React, {
  createContext,
  useEffect,
  useState
} from 'react'

export const mycontext = createContext()

const Contextfile = ({ children }) => {

  // =========================
  // Load data from localStorage
  // =========================
  const [globaldata, setglobaldata] = useState(() => {

    const storedData =
      localStorage.getItem("globalReplies")

    return storedData
      ? JSON.parse(storedData)
      : []

  })

  // =========================
  // Save data in localStorage
  // =========================
  useEffect(() => {

    localStorage.setItem(
      "globalReplies",
      JSON.stringify(globaldata)
    )

  }, [globaldata])

  // =========================
  // Sync data between tabs/windows
  // =========================
  useEffect(() => {

    const handleStorageChange = () => {

      const updatedData =
        localStorage.getItem("globalReplies")

      setglobaldata(
        updatedData
          ? JSON.parse(updatedData)
          : []
      )
    }
    window.addEventListener(
      "storage",
      handleStorageChange
    )
    return () => {
      window.removeEventListener(
        "storage",
        handleStorageChange
      )

    }

  }, [])
  return (
    <mycontext.Provider
      value={{
        globaldata,
        setglobaldata
      }}
    >
      {children}
    </mycontext.Provider>
  )
}

export default Contextfile