import { DialogueItem } from "../DialogueItem";
import { DialogueElement } from "./DialogueElement";
import { SlimDialogueInfo } from "./dialogue_info/SlimDialogueInfo";
import { EditDialogueInfo } from "./dialogue_info/EditDialogueInfo";
import { DialogueInfo } from "./dialogue_info/DialogueInfo";

export class DialogueDocumentElement extends DialogueElement {

    private documentElement: HTMLDivElement;

    private addSubdialogueElement: HTMLDivElement;

    private expandTreeElement: HTMLDivElement;

    private dialogueInfo: DialogueInfo;

    private dialogueInfoWrapper: HTMLDivElement;

    private subdialoguesElement: HTMLSpanElement;

    private dialogueItem: DialogueItem;

    private subdialoguesVisible = false;

    constructor(dialogueItem: DialogueItem) {
        super();

        this.dialogueItem = dialogueItem;
        this.dialogueInfo = new SlimDialogueInfo(dialogueItem);
        let actionsElement = this.buildActionsDiv(dialogueItem);
        this.dialogueInfoWrapper = this.buildDiv(["dialogue-info-wrapper"]);
        this.dialogueInfoWrapper.appendChild(this.dialogueInfo.getDocumentElement());
        this.dialogueInfoWrapper.appendChild(actionsElement);

        this.subdialoguesElement = this.buildDiv(["subdialogues"]);

        this.documentElement = this.buildDiv(["dialogue-item"]);
        this.documentElement.appendChild(this.dialogueInfoWrapper);
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

        if (!this.subdialoguesVisible) {
            this.showSubdialogues();
        }
        this.subdialoguesElement.appendChild(subdialogueElement.getDocumentElement());
    }

    public showSubdialogues() {
        this.expandTreeElement.classList.remove("icon-list2");
        this.expandTreeElement.classList.add("icon-shrink2");
        this.expandTreeElement.classList.remove("hidden");
        this.subdialoguesElement.classList.remove("hidden");
        this.subdialoguesVisible = true;
    }

    public hideSubdialogue() {
        this.expandTreeElement.classList.add("icon-list2");
        this.expandTreeElement.classList.remove("icon-shrink2");
        this.subdialoguesElement.classList.add("hidden");
        this.subdialoguesVisible = false;
    }

    public isSubdialoguesVisible(): boolean {
        return this.subdialoguesVisible;
    }

    public setName(name: string) {
        this.dialogueInfo.setName(name);
    }

    public getExpandElement(): HTMLSpanElement {
        return this.expandTreeElement
    }

    public getSubdialoguesElement(): HTMLSpanElement {
        return this.subdialoguesElement;
    }

    public getAddSubdialogueElement(): HTMLDivElement {
        return this.addSubdialogueElement;
    }

    public remove() {
        this.documentElement.remove();
        this.dialogueItem.getParent().removeSubdialogue(this.dialogueItem);
    }

    public getDocumentElement() {
        return this.documentElement;
    }

    public getDialogueInfo(): DialogueInfo {
        return this.dialogueInfo;
    }

    public getDialogueInfoWrapper(): HTMLDivElement {
        return this.dialogueInfoWrapper;
    }

    public showSlimView() {
        let newDialogueInfo = new SlimDialogueInfo(this.dialogueItem);
        this.replaceDialogueInfo(newDialogueInfo);
    }

    public showEditView() {
        let newDialogueInfo = new EditDialogueInfo(this.dialogueItem);
        this.replaceDialogueInfo(newDialogueInfo);
    }

    private replaceDialogueInfo(dialogueInfo: DialogueInfo) {

        let infoElement = this.dialogueInfo.getDocumentElement();
        infoElement.replaceWith(dialogueInfo.getDocumentElement());

        this.dialogueInfo = dialogueInfo;
    }

    public getDialogueItem(): DialogueItem {
        return this.dialogueItem;
    }

}