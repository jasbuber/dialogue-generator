export class ActionItem {

    private actionElement: HTMLDivElement;

    private nameElement: HTMLSpanElement;

    private removeAction: HTMLAnchorElement;

    private action: string;

    constructor(action: string) {
        this.action = action;

        this.nameElement = document.createElement("span");
        this.nameElement.innerText = action;
        this.nameElement.classList.add("label");
        this.removeAction = document.createElement("a");
        this.removeAction.classList.add("delete");
        this.removeAction.classList.add("is-medium");

        this.actionElement = document.createElement("div");
        this.actionElement.classList.add("action-row");
        this.actionElement.appendChild(this.nameElement);
        this.actionElement.appendChild(this.removeAction);
    }

    public getRemoveAction(): HTMLAnchorElement{
        return this.removeAction;
    }

    public getActionElement(): HTMLDivElement{
        return this.actionElement;
    }

}