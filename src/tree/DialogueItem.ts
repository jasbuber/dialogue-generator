import { DialogueTree } from "./DialogueTree"

export class DialogueItem {

    private jsonItem: DialogueTree;

    private subdialoguesVisible = false;

    private documentItem: HTMLDivElement;

    private actionsElement: HTMLDivElement;

    private nameElement: HTMLSpanElement;

    private addSubdialogueElement: HTMLDivElement;

    private expandTreeElement: HTMLDivElement;

    private subdialoguesElement: HTMLSpanElement;

    private subdialogues: Array<DialogueItem> = new Array<DialogueItem>();

    private removed: boolean = false;

    private isDialogueRoot: boolean;

    private listenersAttached: boolean;

    constructor(jsonItem: DialogueTree, isRoot: boolean) {
        this.isDialogueRoot = isRoot;
        this.jsonItem = jsonItem;
        this.buildShallow(isRoot);
    }

    private buildShallow(isRoot: boolean): HTMLDivElement {
        this.actionsElement = this.buildActionsDiv();

        let name = this.jsonItem.dialogue.slice(0, 30);
        if (isRoot) {
            name = this.jsonItem.id;
        }
        this.nameElement = this.buildSpan("dialogue-name", name);

        let dialogueInfo: HTMLDivElement = document.createElement("div");
        dialogueInfo.classList.add("dialogue-info");
        dialogueInfo.appendChild(this.actionsElement);
        dialogueInfo.appendChild(this.nameElement);

        let dialogueItem: HTMLDivElement = document.createElement("div");
        dialogueItem.classList.add("dialogue-item");
        dialogueItem.appendChild(dialogueInfo);

        this.subdialoguesElement = document.createElement("div");
        this.subdialoguesElement.classList.add("subdialogues");

        dialogueItem.appendChild(dialogueInfo);
        dialogueItem.appendChild(this.subdialoguesElement);

        this.documentItem = dialogueItem;

        this.jsonItem.subdialogues.forEach((sub) => this.subdialogues.push(new DialogueItem(sub, false)));

        return this.documentItem;
    }

    private buildActionsDiv(): HTMLDivElement {
        let actionsDiv: HTMLDivElement = document.createElement("div");
        this.expandTreeElement = document.createElement("div");
        this.addSubdialogueElement = document.createElement("div");
        actionsDiv.classList.add("item-actions");
        this.expandTreeElement.classList.add("expand-tree");
        this.addSubdialogueElement.classList.add("icon-plus");
        this.addSubdialogueElement.classList.add("add-subdialogue");

        if (this.jsonItem.subdialogues.length > 0) {
            this.expandTreeElement.classList.add("icon-list2");
        }else{
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

    public getExpandElement(): HTMLSpanElement {
        return this.expandTreeElement
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

        if (this.expandTreeElement.classList.contains("icon-list2")) {
            this.expandTreeElement.click();
        } else if (this.expandTreeElement.classList.contains("hidden")) {
            this.expandTreeElement.classList.add("icon-shrink2")
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

        if (this.isDialogueRoot) {
            this.nameElement.innerText = id;
        }
    }

    public setDialogue(dialogue: string) {
        this.jsonItem.dialogue = dialogue;

        if (!this.isDialogueRoot) {
            this.nameElement.innerText = dialogue.slice(0, 30);
        }
    }

    public setResponse(response: string) {
        this.jsonItem.response = response;
    }

    public toJSON(key: any) {
        let children = new Array<DialogueItem>();
        this.subdialogues.filter((item) => !item.isRemoved()).forEach((sub) => children.push(sub));
        return {
            id: this.jsonItem.id,
            dialogue: this.jsonItem.dialogue,
            response: this.jsonItem.response,
            subdialogues: children,
            actions: this.jsonItem.actions,
            conditions: this.jsonItem.conditions
        }
    }

    public remove() {
        this.removed = true;
        this.getDocumentItem().remove();
    }

    public isRemoved(): boolean {
        return this.removed;
    }

    public isRoot(): boolean{
        return this.isDialogueRoot;
    }

    public setHasListeners(listenersAttached: boolean){
        this.listenersAttached = listenersAttached;
    }

    public hasListeners(): boolean{
        return this.listenersAttached;
    }

    public getAddSubdialogueElement(): HTMLDivElement{
        return this.addSubdialogueElement;
    }

}