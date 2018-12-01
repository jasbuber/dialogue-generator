import { DialogueItem } from "../tree/DialogueItem";
import { DialogueManager } from "../dialogue_management/DialogueManager";

export class FileService {

    public readJson(blob: Blob, dialogueManager: DialogueManager) {
        var reader = new FileReader();
        reader.addEventListener("load", () => {

            let json = JSON.parse(reader.result.toString());
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