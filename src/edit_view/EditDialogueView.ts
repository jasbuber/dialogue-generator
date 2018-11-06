import { DialogueItem } from "../tree/DialogueItem";
import { DialogueActionService } from "../actions/DialogueActionService";
import { DialogueConditionService } from "../conditions/DialogueConditionService";

export class EditDialogueView {

    private editView: HTMLDivElement;

    private removeElement: HTMLInputElement;

    private addElement: HTMLInputElement;

    private idElement: HTMLInputElement;

    private optionElement: HTMLTextAreaElement;

    private responseElement: HTMLTextAreaElement;

    private dialogueActionService = new DialogueActionService(this);

    private dialogueConditionService = new DialogueConditionService(this);

    private dialogueItem: DialogueItem;

    constructor() {

        /*
        this.editView = <HTMLDivElement>document.getElementsByClassName("edit-dialogue-div")[0];

        this.removeElement = <HTMLInputElement>this.editView.getElementsByClassName("remove-dialogue")[0];

        this.addElement = <HTMLInputElement>this.editView.getElementsByClassName("add-subdialogue")[0];

        this.idElement = <HTMLInputElement>this.editView.getElementsByClassName("dialogue-id")[0];

        this.optionElement = <HTMLTextAreaElement>this.editView.getElementsByClassName("dialogue-option")[0];

        this.responseElement = <HTMLTextAreaElement>this.editView.getElementsByClassName("dialogue-response")[0];*/
    }

    /*
    public getId() {
        return this.idElement.value;
    }

    public getOption() {
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

    public getAddElement(): HTMLInputElement {
        return this.addElement;
    }

    public getRemoveElement(): HTMLInputElement {
        return this.removeElement;
    }

    public getOptionElement(): HTMLTextAreaElement {
        return this.optionElement;
    }

    public getIdElement(): HTMLInputElement {
        return this.idElement;
    }

    public getResponseElement(): HTMLTextAreaElement {
        return this.responseElement;
    }
*/
    public setDialogueItem(dialogueItem: DialogueItem) {

        this.dialogueItem = dialogueItem;
        //this.setId(dialogueItem.getId());
        //this.setOption(dialogueItem.getOption());
        //this.setResponse(dialogueItem.getResponse());
        //this.dialogueConditionService.setConditions(dialogueItem.getConditions());
        //this.dialogueActionService.setActions(dialogueItem.getActions());
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

    public updateItem() {
        //this.dialogueItem.setId(this.getId());
        //this.dialogueItem.setDialogue(this.getOption());
        //this.dialogueItem.setResponse(this.getResponse());
        //this.dialogueItem.setConditions(this.getConditions());
        //this.dialogueItem.setActions(this.getActions());
    }

}