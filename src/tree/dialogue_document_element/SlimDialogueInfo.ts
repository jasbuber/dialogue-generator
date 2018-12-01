import { DialogueItem } from "../DialogueItem";
import { DialogueInfo } from "./DialogueInfo";

export class SlimDialogueInfo extends DialogueInfo {

    constructor(dialogueItem: DialogueItem) {

        super(dialogueItem);

        let name = dialogueItem.getFormattedName();
        this.nameElement = this.buildSpan("dialogue-name", name);

        this.dialogueInfo = this.buildDiv(["dialogue-info"]);
        this.dialogueInfo.appendChild(this.nameElement);
        this.dialogueInfo.appendChild(this.buildIndicators(dialogueItem));
    }

    public setName(name: string) {
        this.nameElement.innerText = name.slice(0, 70);
    }

    private buildIndicators(dialogueItem: DialogueItem): HTMLSpanElement {
        let indicatorsDiv = this.buildDiv(["dialogue-item-indicators"]);

        indicatorsDiv.appendChild(this.buildMinorIndicators(dialogueItem));
        indicatorsDiv.appendChild(this.buildMajorIndicators(dialogueItem));

        return indicatorsDiv;
    }

    private buildMajorIndicators(dialogueItem: DialogueItem): HTMLDivElement {

        let indicatorsDiv = this.buildDiv(["minor-indicators"]);

        if (dialogueItem.getActions().includes("end_conversation")) {
            indicatorsDiv.appendChild(this.buildElement(["icon-exit", "icon"], "span"));
        }

        if (dialogueItem.getActions().includes("trade")) {
            indicatorsDiv.appendChild(this.buildElement(["icon-coin-dollar", "icon"], "span"));
        }

        if (dialogueItem.getActions().includes("go_back")) {
            indicatorsDiv.appendChild(this.buildElement(["icon-arrow-left", "icon"], "span"));
        }

        if (dialogueItem.getActions().includes("crossroads")) {
            indicatorsDiv.appendChild(this.buildElement(["icon-share2", "icon"], "span"));
        }

        return indicatorsDiv;
    }

    private buildMinorIndicators(dialogueItem: DialogueItem): HTMLDivElement {

        let indicatorsDiv = this.buildDiv(["minor-indicators"]);

        if (dialogueItem.getConditions().length > 0) {
            indicatorsDiv.appendChild(this.buildElement(["icon-lock", "icon"], "span"));
        }

        return indicatorsDiv;
    }



}