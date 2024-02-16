import React from "react";
import styled from "styled-components";
import { calender1, car, comment, credit, gym, health, home, life,  peso, piggy,  sub, trash, util,   } from "../../utils/Icons";
import Button from "../Button/Button";
import { dateFormat } from "../../utils/dateFormat";

function DueItem({
    id,
    title,
    amount,
    date,
    category,
    description,
    deleteItem,
    indicatorColor,
    type
}) {
    const currentDate = new Date();
    const dueDate = new Date(date);
    const daysRemaining = Math.ceil((dueDate - currentDate) / (1000 * 60 * 60 * 24));

    const DuesIcon = () =>{
        switch(category) {
            case 'car':
                return car;
            case 'home':
                return home;
            case 'gym':
                return gym;
            case 'credit':
                return credit;
            case 'health':
                return health;
            case 'life':
                return life;
            case 'util':
                return util;
            case 'sub':
                return sub;
            case 'other':
                return piggy;
            default:
                return ''
        }
    }

    return (
        <IncomeItemStyled indicator={indicatorColor}>
            <div className="icon">
                {DuesIcon()}
            </div>
            <div className="content">
                <h5>{title}</h5>
                <div className="inner-content">
                    <div className="text">
                        <p>{peso} {amount}</p> 
                        <p>{calender1} {dateFormat(date)}</p>
                        <p>
                            {daysRemaining <= 0 ? (
                                <span className="expired">Past Due</span>
                            ) : (
                                <span className="pending">{daysRemaining} Days</span>
                            )}
                        </p>
                        <p>
                            {comment}
                            {description}
                        </p>
                    </div>
                    <div className="btn-con">
                        <Button
                            icon={trash}
                            bPad={'1rem'}
                            bRad={'50%'}
                            bg={'#236DF6'}
                            color={'#fff'}
                            iColor={'#fff'}
                            hColor={'#747474'}
                            onClick={() => deleteItem(id)}
                        />
                    </div>
                </div>
            </div>
        </IncomeItemStyled>
    )
}

const IncomeItemStyled = styled.div`
    background: #FFFFFF;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    color: #FFFFFF;
    .icon{
        width: 80px;
        height: 80px;
        border-radius: 20px;
        background: #747474;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #FFFFFF;
        i{
            font-size: 2.6rem;
        }
    }
    .content{
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: .2rem;

        h5{
            font-size: 1.3rem;
            padding-left: 2rem;
            position: relative;
            &::before{
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: .8rem;
                height: .8rem;
                border-radius: 50%;
                background: ${props => props.indicator};
            }
        }
        .inner-content{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .text{
                display: flex;
                align-items: center;
                gap: 1.5rem;
                p{
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: #747474;
                    opacity: 0.8;
                }
                .pending{
                    color: orange;
                }
                .expired{
                    color: red;
                }
            }
        }
    }
    .text p {
        margin-right: 1rem; 
        color: #747474;
        opacity: 0.8;
    }
`;

export default DueItem;
