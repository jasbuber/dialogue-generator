import { DialogueTreeBuilder } from "./DialogueTreeBuilder";
import { EditDialogueView } from "../model/EditDialogueView";
import { DialogueItem } from "../model/DialogueItem";

export class FileService {

    public readJson(blob: Blob) {
        var reader = new FileReader();
        reader.addEventListener("load", function () {
            let json = JSON.parse(reader.result);

            let editView: EditDialogueView = new EditDialogueView();

            let dialogueTreeBuilder = new DialogueTreeBuilder(json, editView);

            let dialogueTree = <HTMLDivElement>document.getElementsByClassName("dialogue-tree")[0];

            dialogueTreeBuilder.getShallowTree().forEach(dialogue => {
                dialogueTree.appendChild(dialogue);
            });
        }, false);

        reader.readAsText(blob);
    }

    public saveJson(dialogueItems: Array<DialogueItem>) {
        let jsonParts = new Array<string>();

        dialogueItems.forEach((item) => jsonParts.push(JSON.stringify(item.toJson())));
        var file = new Blob(jsonParts);

        var link = document.createElement('a');
        link.download = "dialogues.json";
        link.href = URL.createObjectURL(file);
        link.click();
    }

}