import { DialogueItem } from "../tree/DialogueItem";
import { DialogueTree } from "../tree/DialogueTree";
import { DialogueTreeBuilder } from "../tree/DialogueTreeBuilder";
import { FileService } from "../io/FileService"
import { EditDialogueView } from "../edit_view/EditDialogueView";

export class DialogueManager {

    private dialogueSelectElement: HTMLSelectElement = <HTMLSelectElement>document.getElementsByClassName("npcs-list")[0];

    private npcIdInput = <HTMLInputElement>document.getElementsByClassName("npc-id")[0];

    private npcGreetingInput = <HTMLInputElement>document.getElementsByClassName("npc-greeting")[0];

    private dialogues = new Array<DialogueItem>();

    private dialogueTreeBuilder: DialogueTreeBuilder = new DialogueTreeBuilder(new EditDialogueView());

    private deleteConfirmationModal: HTMLDivElement = <HTMLDivElement>document.getElementsByClassName("delete-dialogue-confirmation")[0];

    private selectedDialogue: DialogueItem;

    constructor() {
        this.addExportListener();
        this.addCreateDialogueListener();
        this.addIdChangedListener();
        this.addGreetingChangedListener();
        this.addDeleteDialogueListener();
    }

    public initialize(dialogueTrees: Array<DialogueTree>): void {

        this.clear();

        this.dialogueSelectElement.add(this.getPlaceholder());
        this.fillDialogueList(dialogueTrees);

        this.dialogueSelectElement.addEventListener("change", () => {
            this.selectedDialogue = this.dialogues.find(dialogue => dialogue.getId() == this.dialogueSelectElement.value);
            this.selectDialogue(this.selectedDialogue);
        }, false);

    }

    private selectDialogue(dialogue: DialogueItem){
        this.npcIdInput.value = dialogue.getId();
        this.npcGreetingInput.value = dialogue.getResponse();
        this.dialogueTreeBuilder.buildShallowTree(dialogue);
    }

    private fillDialogueList(dialogueTrees: Array<DialogueTree>) {
        for (var i = 0; i < dialogueTrees.length; i++) {
            let dialogueItem = new DialogueItem(dialogueTrees[i], true);
            this.dialogues.push(dialogueItem);
            this.addDialogueOption(dialogueItem);
        }
    }

    private getPlaceholder(): HTMLOptionElement {
        let placeholder = <HTMLOptionElement>document.createElement("option");
        placeholder.text = "Choose Npc"
        placeholder.selected = true;
        placeholder.disabled = true;
        return placeholder;
    }

    private addDialogueOption(dialogueItem: DialogueItem) {
        let dialogueOption = <HTMLOptionElement>document.createElement("option");

        dialogueOption.text = dialogueItem.getId();
        this.dialogueSelectElement.add(dialogueOption);
    }

    private addExportListener() {
        let exportAction = <HTMLInputElement>document.getElementsByClassName("export-action")[0];
        exportAction.addEventListener("click", () => new FileService().saveJson(this.dialogues), false);
    }

    public addCreateDialogueListener() {
        let createAction = <HTMLInputElement>document.getElementsByClassName("create-new-dialogue")[0];
        createAction.addEventListener("click", () => {
            let newDialogue = this.dialogueTreeBuilder.createDialogueItem();
            this.dialogues.push(newDialogue);
            this.addDialogueOption(newDialogue);
            this.selectDialogue(newDialogue);
            this.dialogueSelectElement.selectedIndex = this.dialogueSelectElement.options.length - 1;
        }, false);
    }

    public addDeleteDialogueListener() {

        let showModalAction = <HTMLInputElement>document.getElementsByClassName("show-delete-modal")[0];
        let deleteAction = <HTMLInputElement>document.getElementsByClassName("delete-dialogue")[0];
        let cancelAction = <HTMLInputElement>document.getElementsByClassName("close-modal")[0];

        showModalAction.addEventListener("click", () => {
            if(this.selectedDialogue != null){
            this.deleteConfirmationModal.classList.add("is-active");
            }
        }, false);

        deleteAction.addEventListener("click", () => {
            this.dialogues = this.dialogues.filter(d => d != this.selectedDialogue);
            this.clearSelectedDialogue();
            this.dialogueSelectElement.remove(this.dialogueSelectElement.selectedIndex);
            this.dialogueSelectElement.selectedIndex = 0;
            this.deleteConfirmationModal.classList.remove("is-active");
        }, false);

        cancelAction.addEventListener("click", () => {
            this.deleteConfirmationModal.classList.remove("is-active");
        }, false);
        
    }

    private clear() {
        while (this.dialogueSelectElement.firstChild) {
            this.dialogueSelectElement.removeChild(this.dialogueSelectElement.firstChild);
        }
        this.dialogues = new Array<DialogueItem>();
        this.clearSelectedDialogue();
    }

    private clearSelectedDialogue(){
        this.dialogueTreeBuilder.clear();
        this.selectedDialogue = null;
        this.npcIdInput.value = "";
        this.npcGreetingInput.value = "";
    }

    public addIdChangedListener() {
        this.npcIdInput.addEventListener("change", (e) => {
            let updatedId = (<HTMLInputElement>e.target).value;
            let selectedIndex = this.dialogueSelectElement.selectedIndex;
            this.dialogueSelectElement.options[selectedIndex].text = updatedId;
            this.selectedDialogue.setId(updatedId);
        }, false);
    }

    public addGreetingChangedListener() {
        this.npcGreetingInput.addEventListener("change", (e) => {
            let updatedGreeting = (<HTMLInputElement>e.target).value;
            this.selectedDialogue.setResponse(updatedGreeting);
        }, false);
    }



}