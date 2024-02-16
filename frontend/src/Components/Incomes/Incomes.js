import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';
import { peso } from '../../utils/Icons';

function Income() {
    const {incomes, getIncomes, deleteIncome, totalIncome} = useGlobalContext()

    useEffect(() =>{
        getIncomes()
    }, [])
    return (
        <IncomeStyled>
            <InnerLayout>
                <h1>Incomes</h1>
                <h2 className="total-income">Total Income: <span>{peso} {totalIncome().toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span></h2>
                <div className="income-content">
                    <div className="form-container">
                        <Form />
                    </div>
                    <div className="incomes">
                        {incomes.map((income) => {
                            const {_id, title, amount, date, category, description, type} = income;
                            return <IncomeItem
                                key={_id}
                                id={_id} 
                                title={title} 
                                description={description} 
                                amount={amount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                date={date} 
                                type={type}
                                category={category} 
                                indicatorColor="#2CD733"
                                deleteItem={deleteIncome}
                            />
                        })}
                    </div>
                </div>
            </InnerLayout>
        </IncomeStyled>
    )
}
//css
const IncomeStyled = styled.div`
    display: flex;
    overflow: auto;
    h1{
        color: #236DF6
    }
    h2{
        color: #FFFFFF
        
    }
    .total-income{
        display: flex;
        justify-content: center;
        align-items: center;
        background: #236DF6;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;
        h2{
            color: #63FF69;
        }
        span{
            font-size: 2.5rem;
            font-weight: 800;
            color: #63FF69;
        }
    }
    .income-content{
        display: flex;
        gap: 2rem;
        .incomes{
            flex: 1;
        }
    }
`;

export default Income