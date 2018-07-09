import { DialogueItem } from "../model/DialogueItem";
import { EditDialogueView } from "../model/EditDialogueView";

export class EditViewEventManager {

    private editView: EditDialogueView;

    constructor(editView: EditDialogueView) {
        this.editView = editView;
        this.addSaveListener();
    }

    private addSaveListener(): void {

        let saveAction: HTMLSpanElement = this.editView.getSaveElement();

        saveAction.addEventListener("click", () => {
            this.editView.updateItem();
        }, false);
    }

}