import React, {useState, useMemo} from "react";
import {useBudget} from "../hooks/useBudget.ts";

export function BudgetForm() {

    const [budget, setBudget] = useState(0);
    const {dispatch} = useBudget();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.valueAsNumber);
    }

    const isValid = useMemo(() => {
        return isNaN(budget) || budget <= 0;
    }, [budget]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({type: "add-budget", payload: {budget}});
        console.log("Presupuesto definido");
    }


    return (
        <form className=" space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-5">
                <label htmlFor={"budget"}
                       className="text-4xl font-bold text-blue-600 text-center">
                    Ingresa tu presupuesto
                </label>

                <input
                    type="number"
                    id={"budget"}
                    placeholder={"Define tu presupuesto"}
                    className="p-2 border border-gray-300 rounded-lg"
                    name={"budget"}
                    value={budget}
                    onChange={handleChange}
                />


            </div>

            <input
                type="submit"
                value="Definir presupuesto"
                className="bg-blue-600 text-white font-bold text-2xl p-2 rounded-lg w-full disabled:opacity-25"
                disabled={isValid}
            />


        </form>

    );
}

