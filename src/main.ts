import { DialogueTreeBuilder } from "./services/DialogueTreeBuilder";
import { EditDialogueView } from "./model/EditDialogueView";
import { DialogueActionService } from "./services/DialogueActionService";
import { DialogueConditionService } from "./services/DialogueConditionService";

export function loadDialogueJson(e: any) {

    let files: FileList = e.target.files;

    if (files.length == 0) {
        return;
    }

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

    reader.readAsText(files[0]);
}

window.onload = function () {
    var input = <HTMLInputElement>document.querySelector("input[type=file]");
    input.addEventListener("change", loadDialogueJson, false);
}

