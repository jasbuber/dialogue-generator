import { DialogueItem } from "./DialogueItem";
import { ConnectionManager } from "./ConnectionManager";
import { DialogueDocumentElement } from "./dialogue_document_element/DialogueDocumentElement";
import { EditDialogueInfo } from "./dialogue_document_element/dialogue_info/EditDialogueInfo"

export class TreeEventManager {

    private createSubdialogue: (dialogueItem: DialogueItem) => DialogueItem;

    private connectionManager: ConnectionManager;

    private selectedDialogue: DialogueDocumentElement;

    public constructor() {
        this.connectionManager = new ConnectionManager();
    }

    public addListeners(item: DialogueItem, createSubdialogue: (dialogueItem: DialogueItem) => DialogueItem): void {
        this.createSubdialogue = createSubdialogue;
        this.addExpandListener(item);
        this.addCreateListener(item);
        this.addSlimListeners(item);
    }

    private addExpandListener(item: DialogueItem): void {

        let expandSpan: HTMLSpanElement = item.getDocumentItem().getExpandElement();

        expandSpan.addEventListener("click", (e) => {

            let documentItem = item.getDocumentItem();

            if (!documentItem.isSubdialoguesVisible()) {
                this.initializeSubdialogues(item);
                documentItem.showSubdialogues();
                this.connectionManager.drawConnections(item);
                this.connectionManager.validateCanvasSize();
            } else {
                documentItem.hideSubdialogue();
                this.connectionManager.eraseConnections(item);
            }

        }, false);
    }

    private addCreateListener(item: DialogueItem): void {

        let createElement: HTMLDivElement = item.getDocumentItem().getAddSubdialogueElement();

        createElement.addEventListener("click", (e) => {
            this.initializeSubdialogues(item);
            let newSubdialogue: DialogueItem = this.createSubdialogue(item);
            item.addSubdialogue(newSubdialogue);
            this.addListeners(newSubdialogue, this.createSubdialogue);
            this.connectionManager.drawConnections(item);
            this.connectionManager.validateCanvasSize();
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
        item.getDocumentItem().showSubdialogues();
    }

    public clear() {
        this.connectionManager.clearCanvas();
    }

    private addSlimListeners(dialogueItem: DialogueItem) {
        this.addShowEditViewListener(dialogueItem.getDocumentItem());
    }

    private addShowEditViewListener(dialogueElement: DialogueDocumentElement): void {

        let dialogueInfo: HTMLDivElement = dialogueElement.getDialogueInfo().getDocumentElement();

        dialogueInfo.addEventListener("click", () => {
            dialogueElement.showEditView();
            this.addEditListeners(dialogueElement);
            this.connectionManager.redraw();
        });
    }

    private addEditListeners(dialogueElement: DialogueDocumentElement) {
        this.addCloseListener(dialogueElement);
        this.addDeleteSubdialogueListener(dialogueElement);
    }

    private addCloseListener(dialogueElement: DialogueDocumentElement) {
        let editDialogueInfo = <EditDialogueInfo>dialogueElement.getDialogueInfo();
        editDialogueInfo.getCloseElement().addEventListener("click", () => {
            dialogueElement.showSlimView();
            this.addSlimListeners(dialogueElement.getDialogueItem());
            this.connectionManager.redraw();
        });
    }

    private addDeleteSubdialogueListener(dialogueElement: DialogueDocumentElement) {

        let editDialogueInfo = <EditDialogueInfo>dialogueElement.getDialogueInfo();
        let showModalAction = editDialogueInfo.getDeleteElement();
        let deleteModal = document.querySelector(".modal.delete-sudbialogue-confirmation");
        let deleteAction = <HTMLInputElement>deleteModal.querySelector(".delete-subdialogue");
        let cancelAction = <HTMLInputElement>deleteModal.querySelector(".close-modal");

        showModalAction.addEventListener("click", () => {
            deleteModal.classList.add("is-active");
            this.selectedDialogue = dialogueElement;
        }, false);

        deleteAction.addEventListener("click", () => {

            this.selectedDialogue.remove();
            deleteModal.classList.remove("is-active");

            if (this.selectedDialogue.getDialogueItem().getParent().getParent() == null) {
                let dialogueSelect = <HTMLSelectElement>document.querySelector("select.dialogue-list");
                dialogueSelect.remove(dialogueSelect.selectedIndex);
                dialogueSelect.selectedIndex = 0;
            }

            if (this.selectedDialogue.getSubdialoguesElement().children.length == 0) {
                this.selectedDialogue.getDialogueItem().getParent().getDocumentItem().getExpandElement().classList.add("hidden");
            }
            this.connectionManager.redraw();
        }, false);

        cancelAction.addEventListener("click", () => {
            deleteModal.classList.remove("is-active");
        }, false);

    }

}