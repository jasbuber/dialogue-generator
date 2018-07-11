import { DialogueItem } from "../model/DialogueItem";
import { DialogueTree } from "./DialogueTree";
import { EditDialogueView } from "../model/EditDialogueView";
import { TreeEventManager } from "./TreeEventManager";

export class EditViewEventManager {

    private editView: EditDialogueView;

    private treeEventManager: TreeEventManager;

    constructor(editView: EditDialogueView) {
        this.editView = editView;
        this.addSaveListener();
        this.addNewSubdialogueListener();
        this.addRemoveListener();
        this.treeEventManager = new TreeEventManager(this.editView);
    }

    private addSaveListener(): void {

        let saveAction: HTMLSpanElement = this.editView.getSaveElement();

        saveAction.addEventListener("click", () => {
            this.editView.updateItem();
        }, false);
    }

    private addRemoveListener(): void {

        let saveAction: HTMLSpanElement = this.editView.getRemoveElement();

        saveAction.addEventListener("click", () => {
            let dialogueItem = this.editView.getDialogueItem();
            dialogueItem.remove();
        }, false);
    }

    private addNewSubdialogueListener(): void {

        let addSubdialogueAction: HTMLSpanElement = this.editView.getAddElement();

        addSubdialogueAction.addEventListener("click", () => {
            let dialogueItem = this.editView.getDialogueItem();
            let newDialogueTree: DialogueTree = {
                id: "new-id",
                dialogue: "new-dialogue",
                response: "",
                subdialogues: new Array<DialogueTree>(),
                actions: new Array<string>(),
                conditions: new Array<string>()
            }

            let newItem = new DialogueItem(newDialogueTree, false);
            dialogueItem.addSubdialogue(newItem);

            this.treeEventManager.addListeners(newItem);
        }, false);
    }

}