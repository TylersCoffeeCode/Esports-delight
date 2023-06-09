import { useEffect, useState } from "react"
import axios from 'axios'
import { Link } from "react-router-dom"
import LoginComponent from "../components/LoginComponent"
import RegisterComponent from "../components/RegisterComponent"
import Client from "../services/api"


const Account = ({setUser}) => {
    
    const initialState = {
        userName: '',
        email: '',
        password: '',
    }

    const [formValues, setFormValues] = useState(initialState)

    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }
    const [isSignUp, setIsSignUp] = useState(true)

    const toggleSignUp = () => {
        setIsSignUp(!isSignUp)
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            let userData = formValues
            let response = await Client.post('http://localhost:3001/api/users/login', { userData })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
        {isSignUp ? <LoginComponent toggleSignUp={toggleSignUp} setUser={setUser}/> : <RegisterComponent toggleSignUp={toggleSignUp} setUser={setUser}/> }
        </>
    )
}
export default Account