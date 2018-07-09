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

    private dialogueItem: DialogueItem;

    constructor() {

        this.editView = <HTMLDivElement>document.getElementsByClassName("edit-dialogue-div")[0];

        this.saveElement = <HTMLInputElement>this.editView.getElementsByClassName("save-dialogue")[0];

        this.addElement = <HTMLInputElement>this.editView.getElementsByClassName("add-subdialogue")[0];

        this.idElement = <HTMLInputElement>this.editView.getElementsByClassName("dialogue-id")[0];

        this.optionElement = <HTMLTextAreaElement>this.editView.getElementsByClassName("dialogue-option")[0];

        this.responseElement = <HTMLTextAreaElement>this.editView.getElementsByClassName("dialogue-response")[0];
    }

    public getId() {
        return this.idElement.value;
    }

    public getOption() {
        console.log(this.optionElement.value);
        return this.optionElement.value;
    }

    public getResponse() {
        return this.responseElement.value;
    }

    private setId(id: string) {
        this.idElement.value = id;
    }

    private setOption(option: string) {
        this.optionElement.value = option;
    }

    private setResponse(response: string) {
        this.responseElement.value = response;
    }

    public getSaveElement(): HTMLInputElement {
        return this.saveElement;
    }

    public getAddElement(): HTMLInputElement {
        return this.addElement;
    }

    public setDialogueItem(dialogueItem: DialogueItem) {

        this.dialogueItem = dialogueItem;
        this.setId(dialogueItem.getId());
        this.setOption(dialogueItem.getOption());
        this.setResponse(dialogueItem.getResponse());
        this.dialogueConditionService.setConditions(dialogueItem.getConditions());
        this.dialogueActionService.setActions(dialogueItem.getActions());
    }

    public getDialogueItem() {
        return this.dialogueItem;
    }

    private getActions(): Array<string> {
        return this.dialogueActionService.getActions();
    }

    private getConditions(): Array<string> {
        return this.dialogueConditionService.getConditions();
    }

    public updateItem(){
        this.dialogueItem.setId(this.getId());
        this.dialogueItem.setDialogue(this.getOption());
        this.dialogueItem.setResponse(this.getResponse());
        this.dialogueItem.setConditions(this.getConditions());
        this.dialogueItem.setActions(this.getActions());
    }

}