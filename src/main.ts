import { FileService } from "./io/FileService";
import { EditDialogueView } from "./edit_view/EditDialogueView";
import { DialogueTreeBuilder } from "./tree/DialogueTreeBuilder";

var fileService: FileService = new FileService();

var dialogueTreeBuilder: DialogueTreeBuilder;

export function loadDialogueJson(e: any) {

    let files: FileList = e.target.files;

    if (files.length == 0) {
        return;
    }

    (<HTMLSpanElement>document.getElementsByClassName("file-name")[0]).innerText = files[0].name;

    fileService.readJson(files[0], dialogueTreeBuilder);
}

window.onload = function () {
    var input = <HTMLInputElement>document.querySelector("input[type=file]");
    input.addEventListener("change", loadDialogueJson, false);

    dialogueTreeBuilder = new DialogueTreeBuilder(new EditDialogueView());
}

