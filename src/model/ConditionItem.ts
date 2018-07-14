export class ConditionItem {

    private conditionElement: HTMLDivElement;

    private nameElement: HTMLSpanElement;

    private removeAction: HTMLAnchorElement;

    private condition: string;

    constructor(condition: string) {
        this.condition = condition;

        this.nameElement = document.createElement("span");
        this.nameElement.innerText = condition;
        this.nameElement.classList.add("label");
        this.removeAction = document.createElement("a");
        this.removeAction.classList.add("delete");
        this.removeAction.classList.add("is-medium");

        this.conditionElement = document.createElement("div");
        this.conditionElement.classList.add("condition-row");
        this.conditionElement.appendChild(this.nameElement);
        this.conditionElement.appendChild(this.removeAction);
    }

    public getRemoveAction(): HTMLAnchorElement{
        return this.removeAction;
    }

    public getConditionElement(): HTMLDivElement{
        return this.conditionElement;
    }

}