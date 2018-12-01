import { DialogueItem } from "./DialogueItem";
import { ConnectionManager } from "./ConnectionManager";

export class TreeEventManager {

    private createSubdialogue: (dialogueItem: DialogueItem) => DialogueItem;

    private connectionManager: ConnectionManager;

    public constructor() {
        this.connectionManager = new ConnectionManager();
    }

    public addListeners(item: DialogueItem, createSubdialogue: (dialogueItem: DialogueItem) => DialogueItem): void {
        this.createSubdialogue = createSubdialogue;
        this.addExpandListener(item);
        this.addEditListener(item);
        this.addCreateListener(item);
    }

    private addExpandListener(item: DialogueItem): void {

        let expandSpan: HTMLSpanElement = item.getDocumentItem().getExpandElement();

        expandSpan.addEventListener("click", (e) => {

            let documentItem = item.getDocumentItem();

            if (!documentItem.isSubdialoguesVisible()) {
                this.initializeSubdialogues(item);
                documentItem.showSubdialogues();
                this.connectionManager.drawConnections(item);
            } else {
                documentItem.hideSubdialogue();
                this.connectionManager.eraseConnections(item);
            }

        }, false);
    }

    private addEditListener(item: DialogueItem): void {

        let dialogueInfo: HTMLDivElement = item.getDocumentItem().getDialogueInfo();

        dialogueInfo.addEventListener("click", () => {
            item.getDocumentItem().toggle();
        });
    }

    private addCreateListener(item: DialogueItem): void {

        let createElement: HTMLDivElement = item.getDocumentItem().getAddSubdialogueElement();

        createElement.addEventListener("click", (e) => {
            this.initializeSubdialogues(item);
            let newSubdialogue: DialogueItem = this.createSubdialogue(item);
            item.addSubdialogue(newSubdialogue);
            this.addListeners(newSubdialogue, this.createSubdialogue);
            this.connectionManager.drawConnections(item);
        }, false);
    }

    private initializeSubdialogues(item: DialogueItem) {
        let subdialoguesDiv = item.getDocumentItem().getSubdialoguesElement();

        if (subdialoguesDiv.children.length == 0) {
            item.getSubdialogues().forEach((s) => {
                this.addListeners(s, this.createSubdialogue);
                subdialoguesDiv.appendChild(s.getDocumentItem().getDocumentElement());
            });
        }
    }

    public clear() {
        this.connectionManager.clearCanvas();
    }

}