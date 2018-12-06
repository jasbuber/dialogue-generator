import { DialogueInfo } from "./DialogueInfo";
import { DialogueItem } from "../../DialogueItem";

export class EditDialogueInfo extends DialogueInfo {

    private responseElement: HTMLTextAreaElement;

    private deleteElement: HTMLSpanElement;

    private closeElement: HTMLSpanElement;

    private actionElements: Array<HTMLSpanElement> = new Array<HTMLSpanElement>();

    constructor(dialogueItem: DialogueItem) {

        super(dialogueItem);

        let topActions = this.buildDiv(["top-actions"]);
        this.closeElement = <HTMLSpanElement>this.buildElement(["icon", "icon-cross"], "span");
        this.deleteElement = <HTMLSpanElement>this.buildElement(["icon", "icon-bin", "is-danger"], "span");
        topActions.appendChild(this.deleteElement);
        topActions.appendChild(this.closeElement);

        let optionLabel = this.buildSpan("label", "Dialogue option:");
        this.nameElement = this.buildTextArea(["dialogue-option", "textarea"]);
        (<HTMLTextAreaElement>this.nameElement).value = dialogueItem.getOption();
        let responseLabel = this.buildSpan("label", "Dialogue response:");
        this.responseElement = this.buildTextArea(["dialogue-response", "textarea"]);
        this.responseElement.value = dialogueItem.getResponse();

        this.dialogueInfo = this.buildDiv(["dialogue-info", "edit-dialogue-info"]);
        this.dialogueInfo.appendChild(topActions);
        this.dialogueInfo.appendChild(optionLabel);
        this.dialogueInfo.appendChild(this.nameElement);
        this.dialogueInfo.appendChild(responseLabel);
        this.dialogueInfo.appendChild(this.responseElement);

        this.dialogueInfo.appendChild(this.buildActionsDiv(dialogueItem));
    }

    public setName(name: string) {
        this.nameElement.innerText = name;
    }

    private buildTextArea(classes: Array<string>): HTMLTextAreaElement {
        let textArea = <HTMLTextAreaElement>this.buildElement(classes, "textarea");
        textArea.rows = 3;
        return textArea;
    }

    private buildActionsDiv(dialogueItem: DialogueItem): HTMLDivElement {

        let dialogueActions = this.buildDiv(["dialogue-actions"]);

        this.actionElements.push(this.buildAction(dialogueItem, "end_conversation", "icon-exit", true));
        this.actionElements.push(this.buildAction(dialogueItem, "trade", "icon-coin-dollar", true));
        this.actionElements.push(this.buildAction(dialogueItem, "go_back", "icon-arrow-left", false));
        this.actionElements.push(this.buildAction(dialogueItem, "crossroads", "icon-share2", false));

        let conditionsElement = this.buildElement(["icon-lock", "icon"], "span");

        if (dialogueItem.getConditions.length == 0) {
            conditionsElement.classList.add("deselected");
        }

        dialogueActions.appendChild(conditionsElement);
        this.actionElements.forEach(a => dialogueActions.appendChild(a));

        return dialogueActions;
    }

    private buildAction(dialogueItem: DialogueItem, actionName: string, iconName: string, isFinal: boolean): HTMLSpanElement {
        let actionElement = this.buildElement([iconName, "icon", "deselected"], "span");
        actionElement.setAttribute("action-name", actionName);

        if (isFinal) {
            actionElement.classList.add("final-action");
        }
        if (dialogueItem.getActions().includes(actionName)) {
            actionElement.classList.remove("deselected");
        }

        return actionElement;
    }

    public getCloseElement(): HTMLSpanElement {
        return this.closeElement;
    }

    public getDeleteElement(): HTMLSpanElement {
        return this.deleteElement;
    }

    public getNameElement(): HTMLTextAreaElement {
        return <HTMLTextAreaElement>this.nameElement;
    }

    public getResponseElement(): HTMLTextAreaElement {
        return this.responseElement;
    }

    public getActions(): Array<HTMLSpanElement> {
        return this.actionElements;
    }

    public deselectAction(action: HTMLSpanElement) {
        action.classList.add("deselected");
    }

    public selectAction(action: HTMLSpanElement) {
        action.classList.remove("deselected");
    }

    public isActionSelected(actionElement: HTMLSpanElement): boolean {
        return !actionElement.classList.contains("deselected");
    }

    public isActionFinal(actionElement: HTMLSpanElement): boolean {
        return actionElement.classList.contains("final-action");
    }

}