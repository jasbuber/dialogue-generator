import { DialogueItem } from "./DialogueItem";
import { ConnectionManager } from "./ConnectionManager";
import { DialogueDocumentElement } from "./dialogue_document_element/DialogueDocumentElement";
import { EditDialogueInfo } from "./dialogue_document_element/dialogue_info/EditDialogueInfo"
import { ErrorDisplayManager } from "../ErrorDisplayManager";

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
                item.getSubdialogues().forEach(s => {
                    s.getDocumentItem().hideSubdialogue();
                    this.connectionManager.eraseConnections(s);
                });
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

            if (item.isFinal()) {
                let dialogue = item.getDocumentItem().getDialogueContent();
                ErrorDisplayManager.displayInnerError(dialogue, ErrorDisplayManager.FINAL_ITEM_ERROR, 4000);
                return;
            }

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
        this.connectionManager.clear();
    }

    private addSlimListeners(dialogueItem: DialogueItem) {
        this.addShowEditViewListener(dialogueItem.getDocumentItem());
    }

    private addShowEditViewListener(dialogueElement: DialogueDocumentElement): void {

        let dialogueInfo: HTMLDivElement = dialogueElement.getDialogueInfo().getDocumentElement();

        dialogueInfo.addEventListener("click", () => {
            dialogueElement.showEditView();
            this.addCloseListener(dialogueElement);
            this.addDeleteSubdialogueListener(dialogueElement);
            this.addOptionChangedListener(dialogueElement);
            this.addResponseChangedListener(dialogueElement);
            this.addActionsListener(dialogueElement);
            this.addConditionsListener(dialogueElement);
            this.connectionManager.redraw();
        });
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

    public addOptionChangedListener(dialogueElement: DialogueDocumentElement) {

        let editDialogueInfo = <EditDialogueInfo>dialogueElement.getDialogueInfo();

        editDialogueInfo.getNameElement().addEventListener("change", (e) => {
            let updatedOption = (<HTMLTextAreaElement>e.target).value;

            if (updatedOption.trim().length == 0) {
                ErrorDisplayManager.displayError(editDialogueInfo.getNameElement(), ErrorDisplayManager.INPUT_EMPTY_ERROR);
                return;
            }
            ErrorDisplayManager.clearErrors(editDialogueInfo.getNameElement());
            dialogueElement.getDialogueItem().setDialogue(updatedOption);

            if (dialogueElement.getDialogueItem().getParent().getParent() == null) {
                let dialogueSelect = <HTMLSelectElement>document.querySelector(".dialogue-list");
                let selectedIndex = dialogueSelect.selectedIndex;
                dialogueSelect.options[selectedIndex].text = dialogueElement.getDialogueItem().getFormattedName();
                dialogueSelect.options[selectedIndex].value = dialogueElement.getDialogueItem().getId();
            }

        }, false);
    }

    public addResponseChangedListener(dialogueElement: DialogueDocumentElement) {

        let editDialogueInfo = <EditDialogueInfo>dialogueElement.getDialogueInfo();

        editDialogueInfo.getResponseElement().addEventListener("change", (e) => {
            let updatedResponse = (<HTMLTextAreaElement>e.target).value;
            dialogueElement.getDialogueItem().setResponse(updatedResponse);
        }, false);
    }

    public addActionsListener(dialogueElement: DialogueDocumentElement) {

        let editDialogueInfo = <EditDialogueInfo>dialogueElement.getDialogueInfo();

        editDialogueInfo.getActions().forEach(action => {
            action.addEventListener("click", () => {
                if (editDialogueInfo.isActionSelected(action)) {
                    this.removeAction(dialogueElement, action);
                } else {
                    if (dialogueElement.getDialogueItem().getSubdialogues().length != 0 && editDialogueInfo.isActionFinal(action)) {
                        let dialogue = dialogueElement.getDialogueContent();
                        ErrorDisplayManager.displayInnerError(dialogue, ErrorDisplayManager.ITEM_HAS_CHILDREN_ERROR, 4000);
                        return;
                    }
                    ErrorDisplayManager.clearErrors(editDialogueInfo.getConditionsElement());

                    if (editDialogueInfo.isActionFinal(action)) {
                        editDialogueInfo.getActions().forEach(a => {
                            this.removeAction(dialogueElement, a);
                        });
                    } else {
                        editDialogueInfo.getActions().filter(a => editDialogueInfo.isActionFinal(a)).forEach(a => {
                            this.removeAction(dialogueElement, a);
                        });
                    }
                    this.addAction(dialogueElement, action);
                }
            }, false);
        });
    }

    private removeAction(dialogueElement: DialogueDocumentElement, action: HTMLSpanElement) {
        dialogueElement.getDialogueItem().removeAction(action.getAttribute("action-name"));
        (<EditDialogueInfo>dialogueElement.getDialogueInfo()).deselectAction(action);
    }

    private addAction(dialogueElement: DialogueDocumentElement, action: HTMLSpanElement) {
        dialogueElement.getDialogueItem().addAction(action.getAttribute("action-name"));
        (<EditDialogueInfo>dialogueElement.getDialogueInfo()).selectAction(action);
    }

    public addConditionsListener(dialogueElement: DialogueDocumentElement) {
        let editDialogueInfo = <EditDialogueInfo>dialogueElement.getDialogueInfo();

        let config = { attributes: true, childList: true, subtree: true };
        let callback = () => this.connectionManager.redraw();
        var observer = new MutationObserver(callback);

        observer.observe(editDialogueInfo.getConditionsElement(), config);
    }

}