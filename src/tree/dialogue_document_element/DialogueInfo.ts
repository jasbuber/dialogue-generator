import { DialogueItem } from "../DialogueItem";
import { DialogueElement } from "./DialogueElement";

export abstract class DialogueInfo extends DialogueElement {

    protected dialogueInfo: HTMLDivElement;

    protected nameElement: HTMLElement;

    public constructor(dialogueItem: DialogueItem) {
        super();
    }

    public getDocumentElement(): HTMLDivElement {
        return this.dialogueInfo;
    }

    public abstract setName(name: string): void;

    public getName(): string {
        return this.nameElement.innerText;
    }

    public getDialogueInfo(): HTMLDivElement {
        return this.dialogueInfo;
    }

}