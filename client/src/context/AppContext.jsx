import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";

export const AppContext = createContext()


export const AppContextProvider = ({ children }) => {
    const navigate = useNavigate()
    const [user,setUser] = useState(null)
    const [isSeller,setIsSeller] = useState(false)

    const value = {navigate,user,setIsSeller,setUser,isSeller}
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}


export const useAppContext = () => {
    return useContext(AppContext)
}