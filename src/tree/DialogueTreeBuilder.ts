import { DialogueTree } from "./DialogueTree";
import { DialogueItem } from "./DialogueItem";
import { TreeEventManager } from "./TreeEventManager";
import { EditViewEventManager } from "../edit_view/EditViewEventManager";
import { EditDialogueView } from "../edit_view/EditDialogueView";
import { FileService } from "../io/FileService";

export class DialogueTreeBuilder {

    private treeEventManager: TreeEventManager;

    private editViewEventManager: EditViewEventManager;

    private rootDialogueItems = new Array<DialogueItem>();

    constructor(editView: EditDialogueView) {
        this.treeEventManager = new TreeEventManager(editView);
        this.editViewEventManager = new EditViewEventManager(editView);
        this.addExportListener();
        this.addCreateListener();
    }

    public getShallowTree(dialogueObject: Array<DialogueTree>): Array<HTMLDivElement> {
        let result: Array<HTMLDivElement> = [];
        this.rootDialogueItems = new Array<DialogueItem>();
        for (var i = 0; i < dialogueObject.length; i++) {
            let dialogueItem = new DialogueItem(dialogueObject[i], true);
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

    private addCreateListener() {
        let createAction = <HTMLInputElement>document.getElementsByClassName("create-dialogue-action")[0];
        createAction.addEventListener("click", () => {
            let newDialogueTree: DialogueTree = {
                id: "new-dialogue-id",
                dialogue: "new-dialogue",
                response: "",
                subdialogues: new Array<DialogueTree>(),
                actions: new Array<string>(),
                conditions: new Array<string>()
            }
            let dialogueItem = new DialogueItem(newDialogueTree, true);
            this.rootDialogueItems.push(dialogueItem);
            this.treeEventManager.addListeners(dialogueItem);

            let dialogueTree = <HTMLDivElement>document.getElementsByClassName("dialogue-tree")[0];
            dialogueTree.appendChild(dialogueItem.getDocumentItem());
        }, false);
    }

}