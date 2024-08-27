import {useMemo, useEffect} from "react";
import {BudgetForm} from "./Components/BudgetForm.tsx";
import {useBudget} from "./hooks/useBudget.ts";
import {BudgetTracker} from "./Components/BudgetTracker.tsx";
import ExpenseModal from "./Components/ExpenseModal.tsx";
import ExpenseList from "./Components/ExpenseList.tsx";
import FilterByCategory from "./Components/FilterByCategory.tsx";

function App() {

    const {state} = useBudget();
    console.log(state.budget);

    const isValidBudget = useMemo(() => state.budget > 0, [state.budget]);

    useEffect(() => {
        localStorage.setItem("budget", state.budget.toString());
        localStorage.setItem("expenses", JSON.stringify(state.expenses));
    }, [state]);

    return (
        <>
            <header className="bg-gray-600 py-8 max-h-72">
                <h1 className="uppercase text-center font-black text-5xl text-white">
                    Control de gastos
                </h1>
            </header>

            <div className="max-w-3xl mx-auto bg-gray-100 shadow-lg rounded-lg mt-10 p-10">
                <p className="text-center text-3xl font-bold">
                    {isValidBudget ? <BudgetTracker/> : <BudgetForm/>}
                </p>
            </div>
            {isValidBudget &&(
                <main className={"max-w-3xl mx-auto py-10"}>

                    <FilterByCategory>

                    </FilterByCategory>
                    <ExpenseList/>

                    <ExpenseModal/>
                </main>
                )}

        </>
    )
}

export default App
