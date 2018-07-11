import { DialogueItem } from "../model/DialogueItem";
import { EditDialogueView } from "../model/EditDialogueView";

export class TreeEventManager {

    private editView: EditDialogueView;

    constructor(editView: EditDialogueView) {
        this.editView = editView;
    }

    public addListeners(item: DialogueItem): void {
        this.addExpandListener(item);
        this.addEditListener(item);
    }

    private addExpandListener(item: DialogueItem): void {

        let expandSpan: HTMLSpanElement = item.getExpandElement();

        expandSpan.addEventListener("click", (e) => {

            let subdialoguesDiv = item.getSubdialoguesElement();

            if (!item.isSubdialoguesVisible()) {
                if (subdialoguesDiv.children.length == 0) {
                    item.getSubdialogues().forEach((s) => {
                        this.addExpandListener(s);
                        this.addEditListener(s);
                        subdialoguesDiv.appendChild(s.getDocumentItem());
                    });
                }
                expandSpan.innerText = "-";
                subdialoguesDiv.classList.remove("hidden")
                item.setSubdialoguesVisible(true);
            } else {
                subdialoguesDiv.classList.add("hidden");
                expandSpan.innerText = "+";
                item.setSubdialoguesVisible(false);
            }

        }, false);
    }

    private addEditListener(item: DialogueItem): void {

        let nameSpan: HTMLSpanElement = item.getNameElement();

        nameSpan.addEventListener("click", (e) => {

            this.editView.setDialogueItem(item);

        }, false);
    }

}