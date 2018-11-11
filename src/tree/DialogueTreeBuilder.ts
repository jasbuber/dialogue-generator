import { DialogueTree } from "./DialogueTree";
import { DialogueItem } from "./DialogueItem";
import { TreeEventManager } from "./TreeEventManager";
import { EditDialogueView } from "../edit_view/EditDialogueView";

export class DialogueTreeBuilder {

    private treeEventManager: TreeEventManager;

    private dialogueTree = <HTMLDivElement>document.getElementsByClassName("dialogue-tree")[0];

    constructor(editView: EditDialogueView) {
        this.treeEventManager = new TreeEventManager(editView);
    }

    public initializeTree(dialogue: DialogueItem){
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

    private appendTree(dialogueItem: DialogueItem): void {
        this.dialogueTree.appendChild(dialogueItem.getDocumentItem());

        if(!dialogueItem.hasListeners()){
            this.treeEventManager.addListeners(dialogueItem);
            dialogueItem.setHasListeners(true);
        }
    }

    public clear() {
        while (this.dialogueTree.firstChild) {
            this.dialogueTree.removeChild(this.dialogueTree.firstChild);
        }
    }

}