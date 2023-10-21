 import { useState,useContext,createContext} from 'react'


const authContext = createContext();

const authProvider=({children})=>{
    const [auth,setAuth]=useState({
        user:null,
        token:""
    });
    return (
        <authProvider.Provider value={[auth,setAuth]}>
            {children}
        </authProvider.Provider>
    )
    }

const useAuth = useContext(authContext)

export {
    useAuth,
    authProvider
}