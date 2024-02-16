import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import DuesItem from '../IncomeItem/DuesItem';
import DuesForm from './DuesForm';

function Dues() {
    const { due, getDues, deleteDue } = useGlobalContext();

    useEffect(() => {
        getDues();
    }, []);

      // Sort dues by closest due date
        const sortedDues = [...due].sort((a, b) => {
        // Convert due dates to Date objects
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        // Check if the due dates are past due or pending
        const isPastDueA = dateA < new Date();
        const isPastDueB = dateB < new Date();

        // If both are past due or both are pending, sort by due date
        if (isPastDueA === isPastDueB) {
            return dateA - dateB;
        }

        // If one is past due and the other is pending, prioritize past due first
        return isPastDueA ? -1 : 1;
    });

    // Group dues into past due and pending categories
    const pastDueDues = sortedDues.filter(due => new Date(due.date) < new Date());
    const pendingDues = sortedDues.filter(due => new Date(due.date) >= new Date());

    return (
        <DuesStyled>
            <InnerLayout>
                <h1>Dues</h1>
                <div className="income-content">
                    <div className="form-container">
                        <DuesForm />
                    </div>
                    <div className="incomes">
                    {pastDueDues.length > 0 && (
                            <>
                                <h2 className='past'>Past Due</h2>
                                {pastDueDues.map((income) => {
                                    const { _id, title, amount, date, category, description, type } = income;
                                    return (
                                        <DuesItem
                                            key={_id}
                                            id={_id}
                                            title={title}
                                            description={description}
                                            amount={amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            date={date}
                                            type={type}
                                            category={category}
                                            indicatorColor="red"
                                            deleteItem={deleteDue}
                                        />
                                    );
                                })}
                            </>
                        )}
                        {pendingDues.length > 0 && (
                            <>
                                <h2 className='pending'>Pending</h2>
                                {pendingDues.map((income) => {
                                    const { _id, title, amount, date, category, description, type } = income;
                                    return (
                                        <DuesItem
                                            key={_id}
                                            id={_id}
                                            title={title}
                                            description={description}
                                            amount={amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            date={date}
                                            type={type}
                                            category={category}
                                            indicatorColor="orange"
                                            deleteItem={deleteDue}
                                        />
                                    );
                                })}
                            </>
                        )}
                    </div>
                </div>
            </InnerLayout>
        </DuesStyled>
    );
}

const DuesStyled = styled.div`
    display: flex;
    overflow: auto;
    h1 {
        color: #236df6;
    }
    .past {
        margin-top: 2rem;
        color: red; 
    }
    .pending{
        margin-top: 2rem;
        color: orange 
    }
    .income-content {
        display: flex;
        gap: 2rem;
        .incomes {
            flex: 1;
        }
    }
    .h2 .past{
        color: red;
    }
`;

export default Dues;
