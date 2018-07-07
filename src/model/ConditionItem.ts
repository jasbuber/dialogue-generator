export class ConditionItem {

    private conditionElement: HTMLDivElement;

    private nameElement: HTMLSpanElement;

    private removeAction: HTMLButtonElement;

    private condition: string;

    constructor(condition: string) {
        this.condition = condition;

        this.nameElement = document.createElement("span");
        this.nameElement.innerText = condition;
        this.removeAction = document.createElement("button");
        this.removeAction.innerText = "remove";

        this.conditionElement = document.createElement("div");
        this.conditionElement.classList.add("condition-row");
        this.conditionElement.appendChild(this.nameElement);
        this.conditionElement.appendChild(this.removeAction);
    }

    public getRemoveAction(): HTMLButtonElement{
        return this.removeAction;
    }

    public getConditionElement(): HTMLDivElement{
        return this.conditionElement;
    }

}