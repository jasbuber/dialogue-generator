import { DialogueItem } from "./DialogueItem";

export class DialogueDocumentElement {

    private documentElement: HTMLDivElement;

    private actionsElement: HTMLDivElement;

    private nameElement: HTMLSpanElement;

    private addSubdialogueElement: HTMLDivElement;

    private expandTreeElement: HTMLDivElement;

    private subdialoguesElement: HTMLSpanElement;

    constructor(dialogueItem: DialogueItem) {
        this.documentElement = document.createElement("div");
        this.actionsElement = this.buildActionsDiv(dialogueItem);

        let name = dialogueItem.getId();
        if (!dialogueItem.isRoot()) {
            name = dialogueItem.getOption().slice(0, 30);
        }
        this.nameElement = this.buildSpan("dialogue-name", name);

        let dialogueInfo: HTMLDivElement = document.createElement("div");
        dialogueInfo.classList.add("dialogue-info");
        dialogueInfo.appendChild(this.actionsElement);
        dialogueInfo.appendChild(this.nameElement);

        this.documentElement.classList.add("dialogue-item");

        this.subdialoguesElement = document.createElement("div");
        this.subdialoguesElement.classList.add("subdialogues");

        this.documentElement.appendChild(dialogueInfo);
        this.documentElement.appendChild(this.subdialoguesElement);
    }

    private buildActionsDiv(dialogueItem: DialogueItem): HTMLDivElement {
        let actionsDiv: HTMLDivElement = document.createElement("div");
        this.expandTreeElement = document.createElement("div");
        this.addSubdialogueElement = document.createElement("div");
        actionsDiv.classList.add("item-actions");
        this.expandTreeElement.classList.add("expand-tree");
        this.addSubdialogueElement.classList.add("icon-plus");
        this.addSubdialogueElement.classList.add("add-subdialogue");

        if (dialogueItem.getSubdialogues().length > 0) {
            this.expandTreeElement.classList.add("icon-list2");
        } else {
            this.expandTreeElement.classList.add("hidden");
        }

        actionsDiv.appendChild(this.addSubdialogueElement);
        actionsDiv.appendChild(this.expandTreeElement);
        return actionsDiv;
    }

    private buildSpan(className: string, text: string): HTMLSpanElement {
        let span: HTMLSpanElement = document.createElement('span');
        span.classList.add(className);
        span.innerText = text;

        return span;
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
        this.nameElement.innerText = name.slice(0, 30);
    }

    public getExpandElement(): HTMLSpanElement {
        return this.expandTreeElement
    }

    public getNameElement(): HTMLSpanElement {
        return this.nameElement;
    }

    public getSubdialoguesElement(): HTMLSpanElement {
        return this.subdialoguesElement;
    }

    public getName(): string {
        return this.nameElement.innerText;
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