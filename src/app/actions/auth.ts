"use server"

import { redirect } from "next/navigation"
import { axiosInstance } from "../utils/axiosInstance"

export const signUp = async (formdata:FormData) => {
    const data = Object.fromEntries(formdata.entries()) 
    data.role = 'vendor'
    console.log(data)  
    try {
        const signin = await axiosInstance.post('/auth/sign-up', data)  
        console.log(signin)
    } catch (error) {
        console.log(error)
    }
   
    redirect('/verify')
}

export const verify = async (formdata: FormData) => {
    const data = {
        otp: formdata.get('otp')
    }
    console.log(data)
    try {
        const res = await axiosInstance.post('/auth/otp-verification', data)
        console.log(res)
    } catch (error) {
        console.log(error)
    }
    redirect('/login')
}
export const login = async (formdata: FormData) => {
    const data = Object.fromEntries(formdata.entries())
    try {
        const res = await axiosInstance.post('/auth/login', data)
        console.log(res.data)
    } catch (error) {
        console.log(error)
    }
    redirect('/dashboard')
}