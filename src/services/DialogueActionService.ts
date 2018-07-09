import { ActionItem } from "../model/ActionItem";

export class DialogueActionService {

    private actionsElement: HTMLDivElement;

    private newActionName: HTMLSelectElement;

    private newActionAction: HTMLButtonElement;

    private actionsListElement: HTMLDivElement;

    private actionsElements: Array<HTMLDivElement> = new Array<HTMLDivElement>();

    constructor() {
        this.actionsElement = <HTMLDivElement>document.getElementsByClassName("actions-wrapper")[0];
        this.newActionName = <HTMLSelectElement>this.actionsElement.getElementsByClassName("new-action-name")[0];
        this.newActionAction = <HTMLButtonElement>this.actionsElement.getElementsByClassName("add-new-action")[0];
        this.actionsListElement = <HTMLDivElement>this.actionsElement.getElementsByClassName("actions-list")[0];

        this.newActionAction.addEventListener("click", () => {
            let actionValue = this.newActionName.selectedOptions[0].value;
            this.addAction(actionValue);
        }, false);
    }

    public setActions(actions: Array<string>) {
        this.clearActions();
        actions.forEach((action) => this.addAction(action));
    }

    private addAction(action: string) {

        let newAction = new ActionItem(action);

        newAction.getRemoveAction().addEventListener("click", () => newAction.getActionElement().remove(), false);

        this.actionsListElement.appendChild(newAction.getActionElement());

        this.actionsElements.push(newAction.getActionElement());
    }

    private clearActions() {
        this.actionsElements.forEach((action) => action.remove());
        this.actionsElements = new Array<HTMLDivElement>();
    }

    public getActions(): Array<string> {
        let actions = new Array<string>();
        this.actionsElements.forEach((action) => { 
            let actionName = <HTMLSpanElement> action.firstChild;
            actions.push( actionName.innerText ); }
        );

        return actions;
    }

}