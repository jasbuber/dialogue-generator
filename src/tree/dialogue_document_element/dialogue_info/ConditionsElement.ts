import { DialogueItem } from "../../DialogueItem";
import { DialogueElement } from "../DialogueElement";
import { EditDialogueInfo } from "./EditDialogueInfo";

export class ConditionsElement extends DialogueElement {

    private conditionsElement: HTMLDivElement;

    private addConditionTag: HTMLButtonElement;

    constructor(dialogueItem: DialogueItem) {
        super();

        this.conditionsElement = this.buildDiv(["dialogue-conditions", "tags", "hidden"]);
        this.addConditionTag = <HTMLButtonElement>this.buildElement(["icon-plus", "tag", "new-condition-action"], "span");
        this.fillConditions(dialogueItem);
        this.conditionsElement.appendChild(this.addConditionTag);

        this.addNewTagListener(dialogueItem);
    }

    public getConditionsElement(): HTMLSpanElement {
        return this.conditionsElement;
    }

    private fillConditions(dialogueItem: DialogueItem) {

        dialogueItem.getConditions().forEach(condition => {
            this.conditionsElement.appendChild(this.buildConditionTag(dialogueItem, condition));
        });
    }

    private buildConditionTag(dialogueItem: DialogueItem, condition: string): HTMLSpanElement {
        let conditionTag = <HTMLSpanElement>this.buildElement(["tag"], "span");
        let conditionName = <HTMLSpanElement>this.buildElement([], "span");
        let conditionDelete = <HTMLButtonElement>this.buildElement(["is-small", "delete"], "button");
        conditionName.innerText = condition;

        conditionTag.appendChild(conditionName);
        conditionTag.appendChild(conditionDelete);

        this.addRemoveTagListener(dialogueItem, conditionDelete);
        return conditionTag;
    }

    private addNewTagListener(dialogueItem: DialogueItem) {
        this.addConditionTag.addEventListener("click", () => {
            this.createConditionTag(dialogueItem);
        });
    }

    private addRemoveTagListener(dialogueItem: DialogueItem, removeElement: HTMLButtonElement) {
        removeElement.addEventListener("click", () => {

            let condition = (<HTMLSpanElement>removeElement.previousSibling).innerText;
            dialogueItem.removeCondition(condition);
            removeElement.parentElement.remove();
            let editDialogueInfo = <EditDialogueInfo>dialogueItem.getDocumentItem().getDialogueInfo();
            editDialogueInfo.updateConditionsState(dialogueItem);
        });
    }

    private createConditionTag(dialogueItem: DialogueItem) {

        let newConditionTag = <HTMLInputElement>this.buildElement(["new-condition-value", "tag"], "input");
        newConditionTag.type = "text";
        newConditionTag.placeholder = "eg. charisma > 5";
        this.conditionsElement.insertBefore(newConditionTag, this.addConditionTag);

        newConditionTag.focus();

        newConditionTag.addEventListener("blur", () => {

            let newConditionValue = newConditionTag.value.trim();
            if (newConditionValue.length == 0) {
                newConditionTag.remove();
            } else {
                dialogueItem.addCondition(newConditionValue);
                let editDialogueInfo = <EditDialogueInfo>dialogueItem.getDocumentItem().getDialogueInfo();
                editDialogueInfo.updateConditionsState(dialogueItem);
                newConditionTag.replaceWith(this.buildConditionTag(dialogueItem, newConditionValue));
            }
        });
    }

    public toggle() {
        if (this.conditionsElement.classList.contains("hidden")) {
            this.conditionsElement.classList.remove("hidden");
        } else {
            this.conditionsElement.classList.add("hidden");
        }
    }


}