import { ErrorDisplayManager } from "../ErrorDisplayManager";
import { DialogueItem } from "../tree/DialogueItem";

export class TreeValidator {

    public validateTree(dialogues: Array<DialogueItem>): Array<string> {
        let errors = new Array<string>();

        dialogues.forEach(d => errors.push(...this.validateDialogue(d)));

        return errors;
    }

    private validateDialogue(dialogueItem: DialogueItem): Array<string> {
        let errors = new Array<string>();

        if (dialogueItem.getSubdialogues().length == 0 && !dialogueItem.isFinal()) {
            errors.push(this.formatError(dialogueItem, ErrorDisplayManager.ITEM_DEAD_END_ERROR));
        } else if (dialogueItem.getActions().includes("go_back") && this.findNearestCrossroads(dialogueItem) == null) {
            errors.push(this.formatError(dialogueItem, ErrorDisplayManager.NO_CROSSROADS_ERROR));
        }

        dialogueItem.getSubdialogues().forEach(s => errors.push(...this.validateDialogue(s)));

        return errors;
    }

    private findNearestCrossroads(dialogueItem: DialogueItem): DialogueItem {
        let parent = dialogueItem.getParent();
        while (parent != null) {
            if (parent.getActions().includes("crossroads")) {
                return parent;
            }
            parent = parent.getParent();
        }

        return null;
    }

    private formatError(dialogueItem: DialogueItem, message: string) {
        let npc = this.findParentNpc(dialogueItem);
        return "Error: npc id: " + npc.getId() + ", dialogue: " + dialogueItem.getOption().substring(0, 30) + ", cause: " + message;
    }

    private findParentNpc(dialogueItem: DialogueItem): DialogueItem {
        let parent = dialogueItem.getParent();

        while (parent.getParent() != null) {
            parent = parent.getParent();
        }

        return parent;
    }

}