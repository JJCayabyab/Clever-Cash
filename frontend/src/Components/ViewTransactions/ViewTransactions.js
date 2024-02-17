import React, { useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { Select } from 'antd';

const { Option } = Select;

function ViewTransactions() {
    const { transactionHistoryAll } = useGlobalContext();
    const [...history] = transactionHistoryAll();
    const [sortBy, setSortBy] = useState('date'); // Default sort by date

    // Sort history based on selected sort by
    const sortedHistory = history.sort((a, b) => {
        if (sortBy === 'income') {
            return a.type === 'income' ? 1 : -1;
        } else if (sortBy === 'expense') {
            return a.type === 'expense' ? 1 : -1;
        } else if (sortBy === 'date') {
            return new Date(b.createdAt) - new Date(a.createdAt);
        } else {
            return a.type === 'expense' ? b.amount - a.amount : a.amount - b.amount;
        }
    });

    return (
        <ViewTransactionsStyled>
            <h2>Recent Transactions</h2>
            <div className="sort-by">
                <label>Sort by: </label>
                <Select value={sortBy} onChange={(value) => setSortBy(value)} className="custom-select">
                    <Option value="date">Date</Option>
                    <Option value="income">Expense</Option>
                    <Option value="expense">Income</Option>
                </Select>
            </div>
            {sortedHistory.length === 0 ? (
                <p>No recent transactions</p>
            ) : (
                sortedHistory.map((item, index) => {
                    const { _id, title, amount, type } = item;
                    return (
                        <div key={_id} className="history-item" style={{ marginBottom: index === sortedHistory.length - 1 ? 0 : '1rem' }}>
                            <div className="history-text">
                                <p style={{
                                    color: type === 'expense' ? '#C54A4A' : '#45BB90'
                                }}>
                                    {title}
                                </p>
                                <p style={{
                                    color: type === 'expense' ? '#C54A4A' : '#45BB90'
                                }}>
                                    {type === 'expense' ? `- ₱ ${(isFinite(amount) ? Math.max(0, amount) : 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : `+ ₱ ${(isFinite(amount) ? Math.max(0, amount) : 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                                </p>
                            </div>
                        </div>
                    );
                })
            )}
        </ViewTransactionsStyled>
    );
}

const ViewTransactionsStyled = styled.div`
    height: 900px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;

    p {
        font-size: 2.1rem;
        text-align: center;
    }

    h2 {
        font-size: 3rem;
        text-align: center;
        color: #236DF6;
    }

    .history-item {
        background: #F2F2F2;
        border: 2px solid #FFFFFF;
        padding: 2rem;
        overflow: hidden;
        border-radius: 20px;
        max-width: 90%;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    }

    .history-text {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .sort-by {
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        label {
            margin-right: 1rem;
            font-size: 1.2rem;
        }
        .custom-select {
            width: 200px;
            font-size: 1.2rem;
        }
    }

    @media screen and (min-width: 768px) {
        .history-item {
            max-width: 80%;
            width: 100%;
            margin: auto;
        }
    }
`;

export default ViewTransactions;