import { DialogueTree } from "./DialogueTree";
import { DialogueDocumentElement } from "./dialogue_document_element/DialogueDocumentElement";

export class DialogueItem {

    private jsonItem: DialogueTree;

    private documentItem: DialogueDocumentElement;

    private subdialogues: Array<DialogueItem> = new Array<DialogueItem>();

    private removed: boolean = false;

    private isDialogueRoot: boolean;

    private listenersAttached: boolean;

    constructor(jsonItem: DialogueTree, isRoot: boolean) {
        this.isDialogueRoot = isRoot;
        this.jsonItem = jsonItem;
        this.jsonItem.subdialogues.forEach((sub) => this.subdialogues.push(new DialogueItem(sub, false)));

        this.documentItem = new DialogueDocumentElement(this);
    }

    public getSubdialogues(): Array<DialogueItem> {
        return this.subdialogues;
    }

    public addSubdialogue(item: DialogueItem) {
        this.subdialogues.push(item);
        this.documentItem.addSubdialogue(item.getDocumentItem());
    }

    public getDocumentItem(): DialogueDocumentElement {
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
            this.documentItem.setName(id);
        }
    }

    public setDialogue(dialogue: string) {
        this.jsonItem.dialogue = dialogue;

        if (!this.isDialogueRoot) {
            this.documentItem.setName(dialogue);
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

    public isRoot(): boolean {
        return this.isDialogueRoot;
    }

    public setHasListeners(listenersAttached: boolean) {
        this.listenersAttached = listenersAttached;
    }

    public hasListeners(): boolean {
        return this.listenersAttached;
    }

}