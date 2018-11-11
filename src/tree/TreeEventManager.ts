import { DialogueItem } from "./DialogueItem";

export class TreeEventManager {

    private createSubdialogue: (dialogueItem: DialogueItem) => DialogueItem;

    public addListeners(item: DialogueItem, createSubdialogue: (dialogueItem: DialogueItem) => DialogueItem): void {
        this.createSubdialogue = createSubdialogue;
        this.addExpandListener(item);
        this.addEditListener(item);
        this.addCreateListener(item);
    }

    private addExpandListener(item: DialogueItem): void {

        let expandSpan: HTMLSpanElement = item.getExpandElement();

        expandSpan.addEventListener("click", (e) => {

            let subdialoguesDiv = item.getSubdialoguesElement();

            if (!item.isSubdialoguesVisible()) {
                if (subdialoguesDiv.children.length == 0) {
                    item.getSubdialogues().forEach((s) => {
                        this.addListeners(s, this.createSubdialogue);
                        subdialoguesDiv.appendChild(s.getDocumentItem());
                    });
                }
                expandSpan.classList.remove("icon-list2");
                expandSpan.classList.add("icon-shrink2");
                subdialoguesDiv.classList.remove("hidden")
                item.setSubdialoguesVisible(true);
            } else {
                subdialoguesDiv.classList.add("hidden");
                expandSpan.classList.add("icon-list2");
                expandSpan.classList.remove("icon-shrink2");
                item.setSubdialoguesVisible(false);
            }

        }, false);
    }

    private addEditListener(item: DialogueItem): void {
/*
        let nameSpan: HTMLSpanElement = item.getNameElement();

        nameSpan.addEventListener("click", (e) => {

            let dialogueItem = this.editView.getDialogueItem();
            if (dialogueItem != null) {
                let dialogueInfo = dialogueItem.getDocumentItem().getElementsByClassName("dialogue-info")[0];
                dialogueInfo.classList.remove("is-primary");
                dialogueInfo.classList.remove("button");
            }
            this.editView.setDialogueItem(item);
            item.getDocumentItem().getElementsByClassName("dialogue-info")[0].classList.add("is-primary");
            item.getDocumentItem().getElementsByClassName("dialogue-info")[0].classList.add("button");

        }, false);*/
    }

    private addCreateListener(item: DialogueItem): void {

        let createElement: HTMLDivElement = item.getAddSubdialogueElement();

        createElement.addEventListener("click", (e) => {
            let newSubdialogue: DialogueItem = this.createSubdialogue(item);
            item.addSubdialogue(newSubdialogue);
            this.addListeners(newSubdialogue, this.createSubdialogue);
        }, false);
    }

}