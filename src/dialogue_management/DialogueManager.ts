import { DialogueItem } from "../tree/DialogueItem";
import { DialogueTree } from "../tree/DialogueTree";
import { DialogueTreeBuilder } from "../tree/DialogueTreeBuilder";
import { FileService } from "../io/FileService"
import { EditDialogueView } from "../edit_view/EditDialogueView";
import { DialogueItemSelect } from "./DialogueItemSelect";

export class DialogueManager {

    private npcSelectElement: DialogueItemSelect;

    private dialogueSelectElement: DialogueItemSelect;

    private npcIdInput = <HTMLInputElement>document.getElementsByClassName("npc-id")[0];

    private npcGreetingInput = <HTMLInputElement>document.getElementsByClassName("npc-greeting")[0];

    private dialogues = new Array<DialogueItem>();

    private dialogueTreeBuilder: DialogueTreeBuilder = new DialogueTreeBuilder();

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

        this.npcSelectElement = new DialogueItemSelect("npcs-list", (dialogueId) => { 
            let npcDialogue = this.dialogues.find(dialogue => dialogue.getId() == dialogueId);
            this.selectDialogue(npcDialogue); 
        });

        this.dialogueSelectElement = new DialogueItemSelect("dialogue-list", (dialogueId) => { 
            let dialogue = this.selectedDialogue.getSubdialogues().find(dialogue => dialogue.getId() == dialogueId);
            this.dialogueTreeBuilder.initializeTree(dialogue);
        });

        this.clear();

        this.npcSelectElement.addPlaceholder("Choose npc:");
        this.dialogueSelectElement.addPlaceholder("Choose dialogue:");
        this.fillDialogueList(dialogueTrees);
    }

    private selectDialogue(dialogue: DialogueItem){
        this.selectedDialogue = dialogue;
        this.npcIdInput.value = dialogue.getId();
        this.npcGreetingInput.value = dialogue.getResponse();
        this.dialogueSelectElement.addAllOptions(dialogue.getSubdialogues());
        this.selectedDialogue = dialogue;
        this.dialogueTreeBuilder.clear();
    }

    private fillDialogueList(dialogueTrees: Array<DialogueTree>) {
        for (var i = 0; i < dialogueTrees.length; i++) {
            let dialogueItem = new DialogueItem(dialogueTrees[i], true);
            this.dialogues.push(dialogueItem);
            this.npcSelectElement.addOption(dialogueItem);
        }
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
            this.npcSelectElement.addOption(newDialogue);
            this.selectDialogue(newDialogue);
            this.npcSelectElement.selectOption(newDialogue);
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
            this.npcSelectElement.removeSelectedOption();
            this.deleteConfirmationModal.classList.remove("is-active");
        }, false);

        cancelAction.addEventListener("click", () => {
            this.deleteConfirmationModal.classList.remove("is-active");
        }, false);
        
    }

    private clear() {
        this.npcSelectElement.clear();
        this.dialogueSelectElement.clear();
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
            this.npcSelectElement.updateSelectedOption(updatedId);
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