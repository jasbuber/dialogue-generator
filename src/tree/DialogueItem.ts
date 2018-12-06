import { DialogueTree } from "./DialogueTree";
import { DialogueDocumentElement } from "./dialogue_document_element/DialogueDocumentElement";

export class DialogueItem {

    private jsonItem: DialogueTree;

    private documentItem: DialogueDocumentElement;

    private subdialogues: Array<DialogueItem> = new Array<DialogueItem>();

    private listenersAttached: boolean;

    private parent: DialogueItem = null;

    constructor(jsonItem: DialogueTree, parent: DialogueItem = null) {
        this.jsonItem = jsonItem;
        this.jsonItem.subdialogues.forEach((sub) => this.subdialogues.push(new DialogueItem(sub, this)));

        this.parent = parent;
        this.documentItem = new DialogueDocumentElement(this);
    }

    public getSubdialogues(): Array<DialogueItem> {
        return this.subdialogues;
    }

    public addSubdialogue(item: DialogueItem) {
        this.subdialogues.push(item);
        this.documentItem.addSubdialogue(item.getDocumentItem());
    }

    public removeSubdialogue(item: DialogueItem) {
        this.subdialogues = this.subdialogues.filter(s => s != item);
    }

    public getDocumentItem(): DialogueDocumentElement {
        return this.documentItem;
    }

    public getFormattedName() {
        let name = this.getId();
        if (!this.isRoot()) {
            name = this.getOption().slice(0, 60);
        }
        return name;
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

        if (this.isRoot()) {
            this.documentItem.setName(id);
        }
    }

    public setDialogue(dialogue: string) {
        this.jsonItem.dialogue = dialogue;

        if (!this.isRoot()) {
            this.documentItem.setName(dialogue);
        }
    }

    public setResponse(response: string) {
        this.jsonItem.response = response;
    }

    public toJSON(key: any) {
        let children = new Array<DialogueItem>();
        this.subdialogues.forEach((sub) => children.push(sub));
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
        if (this.parent != null) {
            this.parent.removeSubdialogue(this);
        }
    }

    public isRoot(): boolean {
        return this.parent == null;
    }

    public setHasListeners(listenersAttached: boolean) {
        this.listenersAttached = listenersAttached;
    }

    public hasListeners(): boolean {
        return this.listenersAttached;
    }

    public getParent(): DialogueItem {
        return this.parent;
    }

    public removeAction(action: string) {
        this.jsonItem.actions = this.jsonItem.actions.filter(a => a != action);
    }

    public addAction(action: string) {
        this.jsonItem.actions.push(action);
    }

    public addCondition(condition: string) {
        this.jsonItem.conditions.push(condition);
    }

}