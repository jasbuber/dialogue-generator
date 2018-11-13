import { DialogueItem } from "../DialogueItem";
import { DialogueInfo } from "./DialogueInfo";

export class SlimDialogueInfo extends DialogueInfo {

    constructor(dialogueItem: DialogueItem) {

        super(dialogueItem);

        let name = dialogueItem.getId();
        if (!dialogueItem.isRoot()) {
            name = dialogueItem.getOption().slice(0, 30);
        }

        this.nameElement = this.buildSpan("dialogue-name", name);

        this.dialogueInfo = this.buildDiv(["dialogue-info"]);
        this.dialogueInfo.appendChild(this.nameElement);
    }

    public setName(name: string) {
        this.nameElement.innerText = name.slice(0, 30);
    }

}