import { ConditionItem } from "./ConditionItem";
import { EditDialogueView } from "../edit_view/EditDialogueView";
import conditions from "./resources/conditions.json";

export class DialogueConditionService {

    private conditionsElement: HTMLDivElement;

    private newConditionName: HTMLSelectElement;

    private newConditionOperand: HTMLSelectElement;

    private newConditionValue: HTMLInputElement;

    private newConditionAction: HTMLButtonElement;

    private conditionsListElement: HTMLDivElement;

    private editDialogueView: EditDialogueView;

    constructor(editDialogueView: EditDialogueView) {
        this.editDialogueView = editDialogueView;
        this.conditionsElement = <HTMLDivElement>document.getElementsByClassName("conditions-wrapper")[0];
        this.newConditionName = <HTMLSelectElement>this.conditionsElement.getElementsByClassName("new-condition-name")[0];
        this.newConditionOperand = <HTMLSelectElement>this.conditionsElement.getElementsByClassName("new-condition-operand")[0];
        this.newConditionValue = <HTMLInputElement>this.conditionsElement.getElementsByClassName("new-condition-value")[0];
        this.newConditionAction = <HTMLButtonElement>this.conditionsElement.getElementsByClassName("add-condition-action")[0];
        this.conditionsListElement = <HTMLDivElement>this.conditionsElement.getElementsByClassName("conditions-list")[0];

        this.newConditionAction.addEventListener("click", () => {
            let conditionName = this.newConditionName.selectedOptions[0].value;
            let conditionOperand = this.newConditionOperand.selectedOptions[0].value;
            let conditionValue = this.newConditionValue.value;

            let condition = conditionName.concat(" ").concat(conditionOperand).concat(" ").concat(conditionValue);
            this.addCondition(condition);
            this.editDialogueView.updateItem();
        }, false);

        conditions.values.forEach((condition) => {
            let option = <HTMLOptionElement>document.createElement("option");
            option.text = condition;
            this.newConditionName.add(option);
        });
    }

    public setConditions(conditions: Array<string>) {
        this.clearConditions();
        conditions.forEach((condition) => this.addCondition(condition));
    }

    public getConditions(): Array<string> {

        let conditionValues = new Array<string>();
        let conditions = this.conditionsListElement.children;

        for(let i = 0; i < conditions.length; i++){
            let conditionName = <HTMLSpanElement> conditions[i].firstChild;
            conditionValues.push( conditionName.innerText );
        }

        return conditionValues;
    }

    private addCondition(condition: string) {

        let newCondition = new ConditionItem(condition);

        newCondition.getRemoveAction().addEventListener("click", () => { 
            newCondition.getConditionElement().remove();
            this.editDialogueView.updateItem();
        }, false);

        this.conditionsListElement.appendChild(newCondition.getConditionElement());
    }

    private clearConditions() {
        while(this.conditionsListElement.firstChild){
            this.conditionsListElement.removeChild(this.conditionsListElement.firstChild);
        }
    }

}