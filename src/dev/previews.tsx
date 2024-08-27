import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import {BudgetForm} from "../Components/BudgetForm.tsx";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/BudgetForm">
                <BudgetForm/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;