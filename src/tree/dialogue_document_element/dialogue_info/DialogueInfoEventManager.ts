import { EditDialogueInfo } from "./EditDialogueInfo";
import { DialogueItem } from "../../DialogueItem";
import { DialogueDocumentElement } from "../DialogueDocumentElement";

export class DialogueInfoEventManager {

    public addSlimListeners(dialogueElement: DialogueDocumentElement) {
        this.addShowEditViewListener(dialogueElement);
    }

    private addShowEditViewListener(dialogueElement: DialogueDocumentElement): void {

        let dialogueInfo: HTMLDivElement = dialogueElement.getDialogueInfo().getDocumentElement();

        dialogueInfo.addEventListener("click", () => {
            dialogueElement.showEditView();
        });
    }

    public addEditListeners(dialogueElement: DialogueDocumentElement) {
        this.addCloseListener(dialogueElement);
        this.addDeleteSubdialogueListener(dialogueElement);
    }

    private addCloseListener(dialogueElement: DialogueDocumentElement) {
        let editDialogueInfo = <EditDialogueInfo>dialogueElement.getDialogueInfo();
        editDialogueInfo.getCloseElement().addEventListener("click", () => {
            dialogueElement.showSlimView();
        });
    }

    public addDeleteSubdialogueListener(dialogueElement: DialogueDocumentElement) {

        let editDialogueInfo = <EditDialogueInfo>dialogueElement.getDialogueInfo();
        let showModalAction = editDialogueInfo.getDeleteElement();
        let deleteModal = document.querySelector(".modal.delete-sudbialogue-confirmation");
        let deleteAction = <HTMLInputElement>deleteModal.querySelector(".delete-subdialogue");
        let cancelAction = <HTMLInputElement>deleteModal.querySelector(".close-modal");

        showModalAction.addEventListener("click", () => {
            deleteModal.classList.add("is-active");
        }, false);

        deleteAction.addEventListener("click", () => {
            dialogueElement.remove();
            deleteModal.classList.remove("is-active");

            if (dialogueElement.getDialogueItem().getParent().getParent() == null) {
                let dialogueSelect = <HTMLSelectElement>document.querySelector("select.dialogue-list");
                dialogueSelect.remove(dialogueSelect.selectedIndex);
                dialogueSelect.selectedIndex = 0;
            }

            if (dialogueElement.getSubdialoguesElement().children.length == 0) {
                dialogueElement.getDialogueItem().getParent().getDocumentItem().getExpandElement().classList.add("hidden");
            }
        }, false);

        cancelAction.addEventListener("click", () => {
            deleteModal.classList.remove("is-active");
        }, false);

    }


}