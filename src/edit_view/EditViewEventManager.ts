import { DialogueItem } from "../tree/DialogueItem";
import { DialogueTree } from "../tree/DialogueTree";
import { EditDialogueView } from "./EditDialogueView";
import { TreeEventManager } from "../tree/TreeEventManager";

export class EditViewEventManager {

    private editView: EditDialogueView;

    private treeEventManager: TreeEventManager;

    constructor(editView: EditDialogueView) {
        this.editView = editView;
        this.addNewSubdialogueListener();
        this.addRemoveListener();
        this.addChangedListener();
        this.treeEventManager = new TreeEventManager(this.editView);
    }

    private addRemoveListener(): void {

        /*let removeAction: HTMLSpanElement = this.editView.getRemoveElement();

        removeAction.addEventListener("click", () => {
            let dialogueItem = this.editView.getDialogueItem();
            dialogueItem.remove();
        }, false);*/
    }

    private addNewSubdialogueListener(): void {
/*
        let addSubdialogueAction: HTMLSpanElement = this.editView.getAddElement();

        addSubdialogueAction.addEventListener("click", () => {
            let dialogueItem = this.editView.getDialogueItem();
            let parentId: string = dialogueItem.getId();
            let childId = parentId + "-" + (dialogueItem.getSubdialogues().length + 1);
            let newDialogueTree: DialogueTree = {
                id: childId,
                dialogue: "new-dialogue",
                response: "",
                subdialogues: new Array<DialogueTree>(),
                actions: new Array<string>(),
                conditions: new Array<string>()
            }

            let newItem = new DialogueItem(newDialogueTree, false);
            dialogueItem.addSubdialogue(newItem);

            this.treeEventManager.addListeners(newItem);
        }, false);*/
    }

    private addChangedListener() {/*
        this.editView.getOptionElement().addEventListener("change", () => this.editView.updateItem(), false);
        this.editView.getIdElement().addEventListener("change", () => this.editView.updateItem(), false);
        this.editView.getResponseElement().addEventListener("change", () => this.editView.updateItem(), false);*/
    }

}