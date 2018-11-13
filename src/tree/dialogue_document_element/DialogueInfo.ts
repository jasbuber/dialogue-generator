import { DialogueItem } from "../DialogueItem";
import { DialogueElement } from "./DialogueElement";

export abstract class DialogueInfo extends DialogueElement {

    protected dialogueInfo: HTMLDivElement;

    protected nameElement: HTMLSpanElement;

    public constructor(dialogueItem: DialogueItem) {
        super();

        this.dialogueInfo = this.buildDiv(["dialogue-info"]);
    }

    public getDocumentElement(): HTMLDivElement {
        return this.dialogueInfo;
    }

    public abstract setName(name: string): void;

    public getNameElement(): HTMLSpanElement {
        return this.nameElement;
    }

    public getName(): string {
        return this.nameElement.innerText;
    }

}