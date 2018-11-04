import { DialogueTreeBuilder } from "../tree/DialogueTreeBuilder";
import { DialogueItem } from "../tree/DialogueItem";

export class FileService {

    public readJson(blob: Blob, dialogueTreeBuilder: DialogueTreeBuilder) {
        var reader = new FileReader();
        reader.addEventListener("load", () => {
            let json = JSON.parse(reader.result);

            let dialogueTree = <HTMLDivElement>document.getElementsByClassName("dialogue-tree")[0];

            while (dialogueTree.firstChild) {
                dialogueTree.removeChild(dialogueTree.firstChild);
            }
            dialogueTreeBuilder.getShallowTree(json).forEach(dialogue => {
                dialogueTree.appendChild(dialogue);
            });
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