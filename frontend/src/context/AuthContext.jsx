import {createContext, useContext, useState} from 'react'
import {auth} from '../firebase/firebaseConfig.js'
import {createUserWithEmailAndPassword} from 'firebase/auth'

const AuthContext = createContext()

export const useAuth = () => {
    const user = useContext(AuthContext);

    // if (user === undefined) {
    //     throw new Error("useAuthContext must be used with a authContext.")
    // }
    return user;
}

export const AuthProvider = ({ children}) => {
    const [currentUser , setCurrentUser] = useState(null)
    const [isLoading , setIsLoading] = useState(true)

    const registerUser = async (email,password) => {
        return await createUserWithEmailAndPassword(auth , email, password)
    }

    const value = {
        currentUser,
        registerUser,
    }
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}