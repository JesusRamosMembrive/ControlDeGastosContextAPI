import React, { PropsWithChildren }  from "react";

type errorMessageProps = {
    children: React.ReactNode;
}

export function ErrorMessage({children} : PropsWithChildren<errorMessageProps>) {
    return (
        <p className={"bg-red-600 p-2 text-white font-bold text-sm text-center"}>
            {children}
        </p>
    );
}