const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');
const {addDue, getDues, deleteDue} = require('../controllers/due')

const router = require('express').Router();

router.post('/add-income', addIncome)
    .get('/get-incomes', getIncomes)
    .delete('/delete-income/:id', deleteIncome)
    .post('/add-expense', addExpense)
    .get('/get-expenses', getExpense)
    .delete('/delete-expense/:id', deleteExpense)
    .post('/add-due', addDue)
    .get('/get-dues', getDues)
    .delete('/delete-due/:id', deleteDue)
    

module.exports = router