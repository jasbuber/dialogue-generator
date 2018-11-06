import { DialogueTreeBuilder } from "../tree/DialogueTreeBuilder";
import { DialogueItem } from "../tree/DialogueItem";
import { DialogueManager } from "../dialogue_management/DialogueManager";
import { DialogueTree } from "../tree/DialogueTree";

export class FileService {

    public readJson(blob: Blob, dialogueManager: DialogueManager) {
        var reader = new FileReader();
        reader.addEventListener("load", () => {

            let json = JSON.parse(reader.result);
            dialogueManager.initialize(json);

        }, false);

        reader.readAsText(blob);
    }

    public saveJson(dialogueItems: Array<DialogueItem>) {
        var file = new Blob([JSON.stringify(dialogueItems)]);

        var link = document.createElement('a');
        link.download = "dialogues.json";
        link.href = URL.createObjectURL(file);
        link.click();
    }

}