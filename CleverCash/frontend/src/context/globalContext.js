import React, { useContext, useState } from "react"
import axios from 'axios'

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext()
// send something to the database
export const GlobalProvider = ({children}) => {
    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    // post income
    const addIncome = async (income) => {
        const response = await axios.post(`${BASE_URL}add-income`, income)
        .catch((err) => {
            setError(err.response.data.message)
        })

        getIncomes()
    }
    // get income
    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-incomes`)
        setIncomes(response.data)
        console.log(response.data)
    }   
    // delete income
const deleteIncome = async (id) => {
    const response = await axios.delete(`${BASE_URL}delete-income/${id}`)
    getIncomes()
}
    // compute total income
    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) => {
            totalIncome += income.amount
        })
        return totalIncome;
    }
    console.log(totalIncome());

        // post expense
        const addExpense= async (income) => {
            const response = await axios.post(`${BASE_URL}add-expense`, income)
            .catch((err) => {
                setError(err.response.data.message)
            })
    
            getExpenses()
        }
        // get expenses
        const getExpenses = async () => {
            const response = await axios.get(`${BASE_URL}get-expenses`)
            setExpenses(response.data)
            console.log(response.data)
        }   
        // delete expense
    const deleteExpense = async (id) => {
        const response = await axios.delete(`${BASE_URL}delete-expense/${id}`)
        getExpenses()
    }
        // compute total expenses
        const totalExpenses = () => {
            let totalIncome = 0;
            expenses.forEach((income) => {
                totalIncome += income.amount
            })
            return totalIncome;
        }

    return(
        <GlobalContext.Provider value = {{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            totalIncome,
            expenses,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}