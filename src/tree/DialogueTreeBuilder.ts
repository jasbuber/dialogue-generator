import { DialogueTree } from "./DialogueTree";
import { DialogueItem } from "./DialogueItem";
import { TreeEventManager } from "./TreeEventManager";

export class DialogueTreeBuilder {

    private treeEventManager: TreeEventManager;

    private dialogueTree = <HTMLDivElement>document.getElementsByClassName("dialogue-tree")[0];

    constructor() {
        this.treeEventManager = new TreeEventManager();

        this.addScrollListener();
    }

    public initializeTree(dialogue: DialogueItem) {
        this.clear();
        dialogue.getDocumentItem().hideSubdialogue();
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

        let dialogueItem = new DialogueItem(newDialogueTree);
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

        return new DialogueItem(newDialogueTree, dialogueItem);
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
        this.treeEventManager.clear();
    }

    public addScrollListener() {

        let isScrolling = false;
        let isInTree = false;
        let mousePositionX = 0;
        let mousePositionY = 0;

        this.dialogueTree.addEventListener('mousemove', (e) => {
            if (isScrolling) {
                let newMousePositionX = e.clientX;
                let newMousePositionY = e.clientY;

                let differenceX = newMousePositionX - mousePositionX;
                let differenceY = newMousePositionY - mousePositionY;

                document.body.scrollTop = document.body.scrollTop - differenceY;
                this.dialogueTree.scrollLeft = this.dialogueTree.scrollLeft - differenceX;

                mousePositionX = newMousePositionX;
                mousePositionY = newMousePositionY;
            }
        });

        this.dialogueTree.addEventListener('mousedown', (e) => {
            if (e.button == 0 && isInTree) {
                window.getSelection().removeAllRanges();
                isScrolling = true;
                mousePositionX = e.clientX;
                mousePositionY = e.clientY;
                this.dialogueTree.style.cursor = "grabbing";
            } else {
                isScrolling = false;
            }
        });
        document.body.addEventListener('mouseup', () => {
            isScrolling = false;
            this.dialogueTree.style.cursor = "grab";
        });

        this.dialogueTree.addEventListener('mouseleave', function (e) {
            isInTree = false;
        });

        this.dialogueTree.addEventListener('mouseenter', function (e) {
            isInTree = true;
        });
    }

}