import { DialogueTree } from "./DialogueTree";
import { DialogueItem } from "../model/DialogueItem";
import { TreeEventManager } from "./TreeEventManager";
import { EditDialogueView } from "../model/EditDialogueView";

export class DialogueTreeBuilder {

    private dialogueObject: Array<DialogueTree>;

    private treeEventManager: TreeEventManager;

    constructor(json: Array<DialogueTree>, editView: EditDialogueView) {
        this.dialogueObject = json;
        this.treeEventManager = new TreeEventManager(editView);
    }

    public getShallowTree(): Array<HTMLDivElement> {
        let result: Array<HTMLDivElement> = [];
        for (var i = 0; i < this.dialogueObject.length; i++) {
            let dialogueItem = new DialogueItem(this.dialogueObject[i]);
            this.treeEventManager.addListeners(dialogueItem);
            result.push(dialogueItem.getDocumentItem());
        }

        return result;
    }

}