import { ActionItem } from "../model/ActionItem";
import { EditDialogueView } from "../model/EditDialogueView";

export class DialogueActionService {

    private actionsElement: HTMLDivElement;

    private newActionName: HTMLSelectElement;

    private newActionAction: HTMLButtonElement;

    private actionsListElement: HTMLDivElement;

    private editDialogueView: EditDialogueView;

    constructor(editDialogueView: EditDialogueView) {
        this.editDialogueView = editDialogueView;
        this.actionsElement = <HTMLDivElement>document.getElementsByClassName("actions-wrapper")[0];
        this.newActionName = <HTMLSelectElement>this.actionsElement.getElementsByClassName("new-action-name")[0];
        this.newActionAction = <HTMLButtonElement>this.actionsElement.getElementsByClassName("add-new-action")[0];
        this.actionsListElement = <HTMLDivElement>this.actionsElement.getElementsByClassName("actions-list")[0];

        this.newActionAction.addEventListener("click", () => {
            let actionValue = this.newActionName.selectedOptions[0].value;
            this.addAction(actionValue);
            this.editDialogueView.updateItem();
        }, false);
    }

    public setActions(actions: Array<string>) {
        this.clearActions();
        actions.forEach((action) => this.addAction(action));
    }

    private addAction(action: string) {

        let newAction = new ActionItem(action);

        newAction.getRemoveAction().addEventListener("click", () => { 
            newAction.getActionElement().remove();
            this.editDialogueView.updateItem();
        }, false);

        this.actionsListElement.appendChild(newAction.getActionElement());
    }

    private clearActions() {
        while(this.actionsListElement.firstChild){
            this.actionsListElement.removeChild(this.actionsListElement.firstChild);
        }
    }

    public getActions(): Array<string> {
        let actions = new Array<string>();

        let actionElements = this.actionsListElement.children;

        for(let i = 0; i < actionElements.length; i++){
            let actionName = <HTMLSpanElement> actionElements[i].firstChild;
            actions.push( actionName.innerText );
        }

        return actions;
    }

}