import { DialogueTree } from "./DialogueTree";
import { DialogueItem } from "../model/DialogueItem";
import { TreeEventManager } from "./TreeEventManager";
import { EditViewEventManager } from "./EditViewEventManager";
import { EditDialogueView } from "../model/EditDialogueView";
import { FileService } from "./FileService";

export class DialogueTreeBuilder {

    private dialogueObject: Array<DialogueTree>;

    private treeEventManager: TreeEventManager;

    private editViewEventManager: EditViewEventManager;

    private rootDialogueItems = new Array<DialogueItem>();

    constructor(json: Array<DialogueTree>, editView: EditDialogueView) {
        this.dialogueObject = json;
        this.treeEventManager = new TreeEventManager(editView);
        this.editViewEventManager = new EditViewEventManager(editView);
        this.addExportListener();
    }

    public getShallowTree(): Array<HTMLDivElement> {
        let result: Array<HTMLDivElement> = [];
        for (var i = 0; i < this.dialogueObject.length; i++) {
            let dialogueItem = new DialogueItem(this.dialogueObject[i]);
            this.rootDialogueItems.push(dialogueItem);
            this.treeEventManager.addListeners(dialogueItem);
            result.push(dialogueItem.getDocumentItem());
        }

        return result;
    }

    private addExportListener() {
        let exportAction = <HTMLInputElement>document.getElementsByClassName("export-action")[0];
        exportAction.addEventListener("click", () => new FileService().saveJson(this.rootDialogueItems), false);
    }

}