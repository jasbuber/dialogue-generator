import { DialogueTree } from "./DialogueTree";
import { DialogueItem } from "./DialogueItem";
import { TreeEventManager } from "./TreeEventManager";

export class DialogueTreeBuilder {

    private treeEventManager: TreeEventManager;

    private dialogueTree = <HTMLDivElement>document.getElementsByClassName("dialogue-tree")[0];

    constructor() {
        this.treeEventManager = new TreeEventManager();
    }

    public initializeTree(dialogue: DialogueItem) {
        this.clear();
        this.appendTree(dialogue);
    }

    public createDialogueItem(): DialogueItem {
        let newDialogueTree: DialogueTree = {
            id: "new-dialogue-id",
            dialogue: "",
            response: "Generic greeting",
            subdialogues: new Array<DialogueTree>(),
            actions: new Array<string>(),
            conditions: new Array<string>()
        }

        let dialogueItem = new DialogueItem(newDialogueTree, true);
        return dialogueItem;
    }

    private createSubdialogueItem(dialogueItem: DialogueItem): DialogueItem {

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

        return new DialogueItem(newDialogueTree, false);
    }

    private appendTree(dialogueItem: DialogueItem): void {
        this.dialogueTree.appendChild(dialogueItem.getDocumentItem().getDocumentElement());

        if (!dialogueItem.hasListeners()) {
            this.treeEventManager.addListeners(dialogueItem, this.createSubdialogueItem);
            dialogueItem.setHasListeners(true);
        }
    }

    public clear() {
        while (this.dialogueTree.firstChild) {
            this.dialogueTree.removeChild(this.dialogueTree.firstChild);
        }
    }

}