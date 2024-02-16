import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";

function ViewTransactions() {
    const { transactionHistoryAll } = useGlobalContext();

    const [...history] = transactionHistoryAll();

    return (
        <ViewTransactionsStyled>
            <h2>Recent Transactions</h2>
            {history.length === 0 ? (
                <p>No recent transactions</p>
            ) : (
                history.map((item, index) => {
                    const { _id, title, amount, type } = item;
                    return (
                        <div key={_id} className="history-item" style={{ marginBottom: index === history.length - 1 ? 0 : '1rem' }}>
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
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 90%;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
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
