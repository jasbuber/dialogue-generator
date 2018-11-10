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

    public buildShallowTree(dialogue: DialogueItem): void {

        this.clear();

        dialogue.getSubdialogues().forEach(item => {
            this.appendTree(item);
        })
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
        this.treeEventManager.addListeners(dialogueItem);
    }

    public clear() {
        while (this.dialogueTree.firstChild) {
            this.dialogueTree.removeChild(this.dialogueTree.firstChild);
        }
    }

}