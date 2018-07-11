import { DialogueTree } from "../services/DialogueTree"

export class DialogueItem {

    private jsonItem: DialogueTree;

    private subdialoguesVisible = false;

    private documentItem: HTMLDivElement;

    private expandElement: HTMLSpanElement;

    private nameElement: HTMLSpanElement;

    private subdialoguesElement: HTMLSpanElement;

    private subdialogues: Array<DialogueItem> = new Array<DialogueItem>();

    constructor(jsonItem: DialogueTree) {
        this.jsonItem = jsonItem;
        this.buildShallow();
    }

    private buildShallow(): HTMLDivElement {
        this.expandElement = this.buildExpandSpan();
        this.nameElement = this.buildSpan("dialogue-name", this.jsonItem.id);

        let dialogueInfo: HTMLDivElement = document.createElement("div");
        dialogueInfo.classList.add("dialogue-info");
        dialogueInfo.appendChild(this.expandElement);
        dialogueInfo.appendChild(this.nameElement);

        let dialogueItem: HTMLDivElement = document.createElement("div");
        dialogueItem.classList.add("dialogue-item");
        dialogueItem.appendChild(dialogueInfo);

        this.subdialoguesElement = document.createElement("div");
        this.subdialoguesElement.classList.add("subdialogues");

        dialogueItem.appendChild(dialogueInfo);
        dialogueItem.appendChild(this.subdialoguesElement);

        this.documentItem = dialogueItem;

        this.jsonItem.subdialogues.forEach((sub) => this.subdialogues.push(new DialogueItem(sub)));

        return this.documentItem;
    }

    private buildExpandSpan(): HTMLSpanElement {

        let className = "expand-tree";
        let expandSpan = this.buildSpan(className, "");

        if (this.jsonItem.subdialogues.length > 0) {
            expandSpan.innerText = "+";
        }

        return expandSpan;
    }

    private buildSpan(className: string, text: string): HTMLSpanElement {
        let span: HTMLSpanElement = document.createElement('span');
        span.classList.add(className);
        span.innerText = text;

        return span;
    }

    public getExpandElement(): HTMLSpanElement {
        return this.expandElement;
    }

    public getNameElement(): HTMLSpanElement {
        return this.nameElement;
    }

    public getSubdialoguesElement(): HTMLSpanElement {
        return this.subdialoguesElement;
    }

    public getSubdialogues(): Array<DialogueItem> {
        return this.subdialogues;
    }

    public addSubdialogue(item: DialogueItem) {
        this.subdialogues.push(item);

        if (this.expandElement.innerText == "+") {
            this.expandElement.click();
        } else if (this.expandElement.innerText == "") {
            this.expandElement.innerText = "-";
        }
        this.subdialoguesElement.appendChild(item.getDocumentItem());
    }

    public isSubdialoguesVisible(): boolean {
        return this.subdialoguesVisible;
    }

    public setSubdialoguesVisible(isVisible: boolean) {
        this.subdialoguesVisible = isVisible;
    }

    public getDocumentItem(): HTMLDivElement {
        return this.documentItem;
    }

    public getId(): string {
        return this.jsonItem.id;
    }

    public getOption(): string {
        return this.jsonItem.dialogue;
    }

    public getResponse(): string {
        return this.jsonItem.response;
    }

    public getActions(): Array<string> {
        return this.jsonItem.actions;
    }

    public getConditions(): Array<string> {
        return this.jsonItem.conditions;
    }

    public setActions(actions: Array<string>) {
        this.jsonItem.actions = actions;
    }

    public setConditions(conditions: Array<string>) {
        this.jsonItem.conditions = conditions;
    }

    public setId(id: string) {
        this.jsonItem.id = id;
    }

    public setDialogue(dialogue: string) {
        this.jsonItem.dialogue = dialogue;
    }

    public setResponse(response: string) {
        this.jsonItem.response = response;
    }

    public toJson(): DialogueTree {
        let children = new Array<DialogueTree>();
        this.subdialogues.forEach((sub) => children.push(sub.toJson()));
        return {
            id: this.jsonItem.id,
            dialogue: this.jsonItem.dialogue,
            response: this.jsonItem.response,
            subdialogues: children,
            actions: this.jsonItem.actions,
            conditions: this.jsonItem.conditions
        }
    }

}