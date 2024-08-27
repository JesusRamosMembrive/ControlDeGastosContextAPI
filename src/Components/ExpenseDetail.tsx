import {Expense} from "../types";
import {formatDate} from "../helpers";
import {AmountDisplay} from "./AmountDisplay.tsx";
import {categories} from "../data/categories.ts";
import {useMemo} from "react";
import {LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import {useBudget} from "../hooks/useBudget.ts";

type ExpenseDetailProps = {
    expense: Expense;
}


export function ExpenseDetail({expense}: ExpenseDetailProps) {

    const {dispatch} = useBudget();
    const categoryInfo = useMemo(() => categories.filter(cat => cat.id === expense.category)[0], [expense]);

    const leadingActions = ()=> (
        <LeadingActions>
            <SwipeAction onClick={()=>{dispatch({type: "get-expense-by-id", payload:{id:expense['id']}})}}>
                Actualizar
            </SwipeAction>
        </LeadingActions>
    );

    const trailingActions = ()=> (
        <TrailingActions>
            <SwipeAction onClick={()=>{dispatch({type: "remove-expense", payload: {id: expense.id}})}}
                         destructive={true}>
                Eliminar
            </SwipeAction>
        </TrailingActions>
    );

    return (
        <SwipeableList>
            <SwipeableListItem
                maxSwipe={1}
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >

                <div className={"bg-white shadow-lg p-5 w-full border-b border-gray-200 flex gap- items-center space-x-5"}>

                    <div className={"space-x-5"}>
                        <img
                            src={`/icono_${categoryInfo.icon}.svg`}
                            alt={categoryInfo.name}
                            className={"w-12 h-12"}/>

                    </div>

                    <div className={"flex-1 space-y-2 space-x-0"}>
                        <p className={"text-sm font-bold uppercase text-slate-500"}> {categoryInfo.name} </p>
                        <p> {expense.expenseName} </p>
                        <p className={"text-slate-600 text-sm"}>{formatDate(expense.date!.toString())}</p>
                    </div>

                    <AmountDisplay amount={expense.amount}/>

                </div>
            </SwipeableListItem>
        </SwipeableList>
    );
}
