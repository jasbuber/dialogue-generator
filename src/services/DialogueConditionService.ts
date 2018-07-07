import { ConditionItem } from "../model/ConditionItem";

export class DialogueConditionService {

    private conditionsElement: HTMLDivElement;

    private newConditionName: HTMLSelectElement;

    private newConditionOperand: HTMLSelectElement;

    private newConditionValue: HTMLInputElement;

    private newConditionAction: HTMLButtonElement;

    private conditionsListElement: HTMLDivElement;

    private conditions: Array<HTMLDivElement> = new Array<HTMLDivElement>();

    constructor() {
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
        }, false);
    }

    public setConditions(conditions: Array<string>) {
        this.clearConditions();
        conditions.forEach((condition) => this.addCondition(condition));
    }

    private addCondition(condition: string) {

        let newCondition = new ConditionItem(condition);

        newCondition.getRemoveAction().addEventListener("click", () => newCondition.getConditionElement().remove(), false);

        this.conditionsListElement.appendChild(newCondition.getConditionElement());

        this.conditions.push(newCondition.getConditionElement());
    }

    private clearConditions() {
        this.conditions.forEach((condition) => condition.remove());
        this.conditions = new Array<HTMLDivElement>();
    }

}