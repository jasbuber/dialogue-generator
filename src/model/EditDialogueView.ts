import { DialogueItem } from "../model/DialogueItem";
import { DialogueActionService } from "../services/DialogueActionService";
import { DialogueConditionService } from "../services/DialogueConditionService";

export class EditDialogueView {

    private editView: HTMLDivElement;

    private saveElement: HTMLInputElement;

    private addElement: HTMLInputElement;

    private idElement: HTMLInputElement;

    private optionElement: HTMLTextAreaElement;

    private responseElement: HTMLTextAreaElement;

    private dialogueActionService = new DialogueActionService();

    private dialogueConditionService = new DialogueConditionService();

    constructor() {

        this.editView = <HTMLDivElement>document.getElementsByClassName("edit-dialogue-div")[0];

        this.saveElement = <HTMLInputElement>this.editView.getElementsByClassName("save-dialogue")[0];

        this.addElement = <HTMLInputElement>this.editView.getElementsByClassName("add-subdialogue")[0];

        this.idElement = <HTMLInputElement>this.editView.getElementsByClassName("dialogue-id")[0];

        this.optionElement = <HTMLTextAreaElement>this.editView.getElementsByClassName("dialogue-option")[0];

        this.responseElement = <HTMLTextAreaElement>this.editView.getElementsByClassName("dialogue-response")[0];
    }

    public getId() {
        return this.idElement.innerText;
    }

    public getOption() {
        return this.optionElement.innerText;
    }

    public getResponse() {
        return this.responseElement.innerText;
    }

    private setId(id: string) {
        this.idElement.value = id;
    }

    private setOption(option: string) {
        this.optionElement.innerText = option;
    }

    private setResponse(response: string) {
        this.responseElement.innerText = response;
    }

    public getSaveElement(): HTMLInputElement {
        return this.saveElement;
    }

    public getAddElement(): HTMLInputElement {
        return this.addElement;
    }

    public setDialogueItem(dialogueItem: DialogueItem) {
        this.setId(dialogueItem.getId());
        this.setOption(dialogueItem.getOption());
        this.setResponse(dialogueItem.getResponse());
        this.dialogueConditionService.setConditions(dialogueItem.getConditions());
        this.dialogueActionService.setActions(dialogueItem.getActions());
    }

}