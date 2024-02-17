import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { Pie } from "react-chartjs-2";

function ExpenseAnalysis() {
    const { transactionHistoryAll } = useGlobalContext();
    const [expensesData, setExpensesData] = useState(null);
    const [categoryTotals, setCategoryTotals] = useState({});
    const [currentMonthTotal, setCurrentMonthTotal] = useState(0);
    const [lastMonthTotal, setLastMonthTotal] = useState(0);
    const [percentageDifference, setPercentageDifference] = useState(0);
    const [currentMonthName, setCurrentMonthName] = useState("");
    const [comparisonTitle, setComparisonTitle] = useState("");

    useEffect(() => {
        const history = transactionHistoryAll();
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();

        setCurrentMonthName(new Intl.DateTimeFormat('en-US', { month: 'long' }).format(currentDate));

        const currentMonthExpenses = history.filter(
            item => new Date(item.date).getMonth() === currentMonth && item.type === 'expense'
        );

        const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;

        const lastMonthExpenses = history.filter(
            item => new Date(item.date).getMonth() === lastMonth && item.type === 'expense'
        );

        const expenseAmountsByCategory = {};

        currentMonthExpenses.forEach(item => {
            const { category, amount } = item;
            if (expenseAmountsByCategory[category]) {
                expenseAmountsByCategory[category] += amount;
            } else {
                expenseAmountsByCategory[category] = amount;
            }
        });

        setCategoryTotals(expenseAmountsByCategory);

        const currentMonthTotal = currentMonthExpenses.reduce((acc, curr) => acc + curr.amount, 0);
        setCurrentMonthTotal(currentMonthTotal);

        const lastMonthTotal = lastMonthExpenses.reduce((acc, curr) => acc + curr.amount, 0);
        setLastMonthTotal(lastMonthTotal);

        const percentageDifference = ((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100;
        setPercentageDifference(percentageDifference);

        setExpensesData({
            labels: Object.keys(expenseAmountsByCategory),
            datasets: [
                {
                    data: Object.values(expenseAmountsByCategory),
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#8A2BE2',
                        '#FF7F50',
                        '#20B2AA',
                        '#FFD700'
                    ],
                    hoverBackgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#8A2BE2',
                        '#FF7F50',
                        '#20B2AA',
                        '#FFD700'
                    ]
                }
            ]
        });

        setComparisonTitle(`Comparison vs. Last Month`);
    }, [transactionHistoryAll]);

    return (
        <ExpenseAnalysisStyled>
            <h2>Expense Analysis</h2>
            <h1 className="total">Total Expenses: ₱ {currentMonthTotal}</h1>
            <div className="content">
                {expensesData ? (
                    <div className="chart-container">
                        <Pie
                            data={expensesData}
                            options={{
                                tooltips: {
                                    callbacks: {
                                        label: function(tooltipItem, data) {
                                            var dataset = data.datasets[tooltipItem.datasetIndex];
                                            var total = dataset.data.reduce((previousValue, currentValue) => previousValue + currentValue);
                                            var currentValue = dataset.data[tooltipItem.index];
                                            var percentage = Math.round((currentValue / total) * 100);
                                            return `${data.labels[tooltipItem.index]}: ₱${currentValue} (${percentage}%)`;
                                        }
                                    }
                                }
                            }}
                        />
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
                <div className="summary">
                    <h3>Summary for Month {currentMonthName}</h3>
                    <div className="summary-scroll">
                        {Object.keys(categoryTotals).map(category => (
                            <p key={category}>Total {category}: ₱ {categoryTotals[category]}</p>
                        ))}
                        
                    </div>
                </div>
                <div className="comparison">
                    <h3>{comparisonTitle}</h3>
                    <p>Last Month Total: ₱ {lastMonthTotal}</p>
                    <p>Current Month Total: ₱ {currentMonthTotal}</p>
                    <p>Percentage Difference: {percentageDifference.toFixed(2)}%</p>
                </div>
            </div>
        </ExpenseAnalysisStyled>
    );
}

const ExpenseAnalysisStyled = styled.div`
    height: 100%;
    overflow: auto;
    margin-top: 4rem;
    display: flex;
    flex-direction: column;
    

    h2 {
        font-size: 3rem;
        text-align: center;
        color: #236DF6;
        margin-bottom: 1rem;
    }

    .content {
        flex: 1;
        display: flex;
        justify-content: space-around;
        padding: 2rem;
        overflow: hidden;
        
    }
    
    h1{
        m
    }
    .total{
        color: red;
        text-align: center;
        display: flex-center;
        justify-content: center;
        align-items: center;
        background: black;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;
    }

    .chart-container {
        width: 50%;
        margin-bottom: 6rem;
        auto-resize: false;
    }

    .summary {
        padding: 1rem;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-bottom: 3rem; 
        height: 70%;
        width: 50%;
        text-align: left;
        background: #F2F2F2;
        border: 2px solid #FFFFFF; 
    }
    
    .comparison {
        padding: 1rem;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-bottom: 6rem;
        height: 70%;
        width: 50%;
        text-align: left;
        background: #F2F2F2;
        border: 2px solid #FFFFFF;
    }
    

    .summary-scroll {
        max-height: 300px;
        overflow-y: auto;
    }

    p {
        font-size: 1.3rem;
        text-align: left;
        margin-bottom: 0.5rem;
    }

    h3 {
        font-size: 1.5rem;
        text-align: center;
        margin-bottom: 1rem;
        color: #333;
    }
`;
export default ExpenseAnalysis;
