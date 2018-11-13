import { DialogueItem } from "../DialogueItem";
import { DialogueElement } from "./DialogueElement";
import { SlimDialogueInfo } from "./SlimDialogueInfo";
import { DialogueInfo } from "./DialogueInfo";

export class DialogueDocumentElement extends DialogueElement {

    private documentElement: HTMLDivElement;

    private addSubdialogueElement: HTMLDivElement;

    private expandTreeElement: HTMLDivElement;

    private dialogueInfo: DialogueInfo;

    private subdialoguesElement: HTMLSpanElement;

    constructor(dialogueItem: DialogueItem) {
        super();

        this.dialogueInfo = new SlimDialogueInfo(dialogueItem);
        let actionsElement = this.buildActionsDiv(dialogueItem);
        let dialogueInfoWrapper = this.buildDiv(["dialogue-info-wrapper"]);
        dialogueInfoWrapper.appendChild(this.dialogueInfo.getDocumentElement());
        dialogueInfoWrapper.appendChild(actionsElement);

        this.subdialoguesElement = this.buildDiv(["subdialogues"]);

        this.documentElement = this.buildDiv(["dialogue-item"]);
        this.documentElement.appendChild(dialogueInfoWrapper);
        this.documentElement.appendChild(this.subdialoguesElement);
    }

    protected buildActionsDiv(dialogueItem: DialogueItem): HTMLDivElement {
        let actionsDiv: HTMLDivElement = this.buildDiv(["item-actions"]);
        this.expandTreeElement = this.buildDiv(["expand-tree"]);
        this.addSubdialogueElement = this.buildDiv(["icon-plus", "add-subdialogue"]);

        if (dialogueItem.getSubdialogues().length > 0) {
            this.expandTreeElement.classList.add("icon-list2");
        } else {
            this.expandTreeElement.classList.add("hidden");
        }

        actionsDiv.appendChild(this.addSubdialogueElement);
        actionsDiv.appendChild(this.expandTreeElement);
        return actionsDiv;
    }

    public addSubdialogue(subdialogueElement: DialogueDocumentElement) {

        if (this.expandTreeElement.classList.contains("icon-list2")) {
            this.expandTreeElement.click();
        } else if (this.expandTreeElement.classList.contains("hidden")) {
            this.expandTreeElement.classList.add("icon-shrink2");
        }
        this.subdialoguesElement.appendChild(subdialogueElement.getDocumentElement());
    }

    public setName(name: string) {
        this.dialogueInfo.setName(name);
    }

    public getExpandElement(): HTMLSpanElement {
        return this.expandTreeElement
    }

    public getNameElement(): HTMLSpanElement {
        return this.dialogueInfo.getNameElement();
    }

    public getSubdialoguesElement(): HTMLSpanElement {
        return this.subdialoguesElement;
    }

    public getName(): string {
        return this.dialogueInfo.getName();
    }

    public getAddSubdialogueElement(): HTMLDivElement {
        return this.addSubdialogueElement;
    }

    public remove() {
        this.documentElement.remove();
    }

    public getDocumentElement() {
        return this.documentElement;
    }

}