import React, {useEffect, useState} from "react";
import {categories} from "../data/categories.ts";
import DatePicker from 'react-date-picker'
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import {DraftExpense, Value} from "../types";
import {ErrorMessage} from "./ErrorMessage.tsx";
import {useBudget} from "../hooks/useBudget.ts";

export function ExpenseForm() {

    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: "",
        category: "",
        date: new Date()
    })

    const [error, setError] = useState<string | null>(null);
    const  [previousAmount, setPreviousAmount] = useState<number>(0);
    const {dispatch, state, remainingBudget} = useBudget();

    useEffect(() => {
        if(state.editingId){
            const editingExpense = state.expenses.filter( currentExpense => currentExpense.id === state.editingId)[0];
            setExpense(editingExpense);
            setPreviousAmount(editingExpense.amount);
        }
    }, [state.editingId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        const isAmount = ["amount"].includes(name);

        setExpense({
            ...expense,
             [name] : isAmount ? Number(value) : value
        })
    }

    const handleChangeDate = (date: Value) => {
        setExpense({
            ...expense,
            date: date
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(expense);

        if(Object.values(expense).some((value) => value === "")) {
            setError("Todos los campos son obligatorios");
            return;
        }

        if(remainingBudget < (expense.amount - previousAmount)){
            setError("No puedes sobrepasar el presupuesto");
            return;
        }

        if(state.editingId){
            dispatch({type: "update-expense", payload: {expense: {id: state.editingId, ...expense}}});
        }
        else {
            dispatch({type: "add-expense", payload: {expense}});
        }

        setExpense({
            amount: 0,
            expenseName: "",
            category: "",
            date: new Date(),
        })
        setPreviousAmount(0);
    }

    return (
        <form className={"space-y-5"} onSubmit={handleSubmit}>
            <legend className={"uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2"}>
                {state.editingId ? "Guardar cambios" : "Nuevo gasto"}
            </legend>

            {error && <ErrorMessage>{error} </ErrorMessage>}

            <div className={"flex flex-col gap-2"}>
                <label htmlFor="concepto"
                       className={"text-xl"}>
                    Gasto:
                </label>
                <input
                    type="text"
                    id="expenseName"
                    name="expenseName"
                    placeholder={"Añade el nombre del gasto"}
                    className={"bg-slate-100 p-2"}
                    value={expense.expenseName}
                    onChange={handleChange}
                />

            </div>

            <div className={"flex flex-col gap-2"}>
                <label htmlFor="amount"
                       className={"text-xl"}>
                    Gasto:
                </label>
                <input
                    type="number"
                    id="amount"
                    name="amount"
                    placeholder={"Añade la cantidad del gasto. Ejemplo: 100"}
                    className={"bg-slate-100 p-2"}
                    value={expense.amount}
                    onChange={handleChange}
                />
            </div>

            <div className={"flex flex-col gap-2"}>
                <label htmlFor="category"
                       className={"text-xl"}>
                    Categoria:
                </label>
                <select
                    id="category"
                    name="category"
                    className={"bg-slate-100 p-2"}
                    value={expense.category}
                    onChange={handleChange}
                >
                    <option value={""}>
                        -- Selecciona una categoria--
                    </option>
                    {categories.map((category) => (
                        <option
                            key={category.id}
                            value={category.id}>
                            {category.name}

                        </option>
                    ))}
                </select>
            </div>


            <div className={"flex flex-col gap-2"}>
                <label htmlFor="amount"
                       className={"text-xl"}>
                    Fecha gasto:
                </label>
                <DatePicker
                    onChange={handleChangeDate}
                    className={"bg-slate-100 p-2 border-0"}
                    value={expense.date}
                />
            </div>

            <input
                type="submit"
                value={state.editingId ? "Actualizar gasto" : "Añadir gasto"}
                className={"bg-blue-600 w-full cursor-pointer text-white p-2 rounded-md hover:bg-blue"}
            />
        </form>
    );
}