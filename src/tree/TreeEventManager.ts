import { DialogueItem } from "./DialogueItem";
import { ConnectionManager } from "./ConnectionManager";
import { DialogueInfo } from "./dialogue_document_element/DialogueInfo";

export class TreeEventManager {

    private createSubdialogue: (dialogueItem: DialogueItem) => DialogueItem;

    private connectionManager: ConnectionManager;

    public constructor(){
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

            let subdialoguesDiv = item.getDocumentItem().getSubdialoguesElement();

            if (!item.isSubdialoguesVisible()) {
                if (subdialoguesDiv.children.length == 0) {
                    item.getSubdialogues().forEach((s) => {
                        this.addListeners(s, this.createSubdialogue);
                        subdialoguesDiv.appendChild(s.getDocumentItem().getDocumentElement());
                    });
                }
                expandSpan.classList.remove("icon-list2");
                expandSpan.classList.add("icon-shrink2");
                subdialoguesDiv.classList.remove("hidden");
                item.setSubdialoguesVisible(true);
                this.connectionManager.drawConnections(item);
            } else {
                subdialoguesDiv.classList.add("hidden");
                expandSpan.classList.add("icon-list2");
                expandSpan.classList.remove("icon-shrink2");
                item.setSubdialoguesVisible(false);
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
            let newSubdialogue: DialogueItem = this.createSubdialogue(item);
            item.addSubdialogue(newSubdialogue);
            this.connectionManager.redraw();
        }, false);
    }

}