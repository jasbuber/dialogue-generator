import { DialogueTree } from "./DialogueTree";
import { DialogueItem } from "./DialogueItem";
import { TreeEventManager } from "./TreeEventManager";

export class DialogueTreeBuilder {

    private treeEventManager: TreeEventManager;

    private dialogueTree = <HTMLDivElement>document.getElementsByClassName("dialogue-tree")[0];

    private dialoguesCreated: number = 1;

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
            id: "new-dialogue-id-" + this.dialoguesCreated++,
            dialogue: "",
            response: "Generic greeting",
            subdialogues: new Array<DialogueTree>(),
            actions: new Array<string>(),
            conditions: new Array<string>()
        }

        let dialogueItem = new DialogueItem(newDialogueTree);
        return dialogueItem;
    }

    public createSubdialogueItem(dialogueItem: DialogueItem): DialogueItem {

        let newDialogueTree: DialogueTree = {
            id: DialogueTreeBuilder.getValidId(dialogueItem),
            dialogue: DialogueTreeBuilder.getValidOption(dialogueItem),
            response: "",
            subdialogues: new Array<DialogueTree>(),
            actions: new Array<string>(),
            conditions: new Array<string>()
        }

        return new DialogueItem(newDialogueTree, dialogueItem);
    }

    public static getValidId(dialogueItem: DialogueItem): string {
        let parentId: string = dialogueItem.getId();
        let childNr = dialogueItem.getSubdialogues().length + 1;
        let childId = parentId + "-" + childNr;

        while (dialogueItem.getSubdialogues().find(s => s.getId() == childId) != undefined) {
            childId = parentId + "-" + ++childNr;
        }
        return childId;
    }

    public static getValidOption(dialogueItem: DialogueItem): string {
        let childNr = 1;
        let childId = "new-dialogue-" + childNr;

        while (dialogueItem.getSubdialogues().find(s => s.getOption() == childId) != undefined) {
            childId = "new-dialogue-" + ++childNr;
        }
        return childId;
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

        let mouseMoveListener = (e: MouseEvent) => {
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
        }

        let mouseUpListener = () => {
            isScrolling = false;
            this.dialogueTree.style.cursor = "grab";

            this.dialogueTree.removeEventListener('mousemove', mouseMoveListener);
            document.body.removeEventListener('mouseup', mouseUpListener);
        }

        this.dialogueTree.addEventListener('mousedown', (e) => {
            if (e.button == 0 && isInTree && e.srcElement.closest(".dialogue-info") == null && !e.srcElement.classList.contains("subdialogue-id")) {
                window.getSelection().removeAllRanges();
                isScrolling = true;
                mousePositionX = e.clientX;
                mousePositionY = e.clientY;
                this.dialogueTree.style.cursor = "grabbing";

                this.dialogueTree.addEventListener('mousemove', mouseMoveListener);
                document.body.addEventListener('mouseup', mouseUpListener);
            } else {
                isScrolling = false;
            }
        });

        this.dialogueTree.addEventListener('mouseleave', () => isInTree = false);
        this.dialogueTree.addEventListener('mouseenter', () => isInTree = true);
    }

}