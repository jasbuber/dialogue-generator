export class ActionItem {

    private actionElement: HTMLDivElement;

    private nameElement: HTMLSpanElement;

    private removeAction: HTMLButtonElement;

    private action: string;

    constructor(action: string) {
        this.action = action;

        this.nameElement = document.createElement("span");
        this.nameElement.innerText = action;
        this.removeAction = document.createElement("button");
        this.removeAction.innerText = "remove";

        this.actionElement = document.createElement("div");
        this.actionElement.classList.add("action-row");
        this.actionElement.appendChild(this.nameElement);
        this.actionElement.appendChild(this.removeAction);
    }

    public getRemoveAction(): HTMLButtonElement{
        return this.removeAction;
    }

    public getActionElement(): HTMLDivElement{
        return this.actionElement;
    }

}