import { FileService } from "./io/FileService";
import { DialogueManager } from "./dialogue_management/DialogueManager";

var fileService: FileService;

var dialogueManager: DialogueManager;

export function loadDialogueJson(e: any) {

    let files: FileList = e.target.files;

    if (files.length == 0) {
        return;
    }

    (<HTMLSpanElement>document.getElementsByClassName("file-name")[0]).innerText = files[0].name;

    fileService.readJson(files[0], dialogueManager);
}

window.onload = function () {
    var input = <HTMLInputElement>document.querySelector("input[type=file]");
    input.addEventListener("change", loadDialogueJson, false);

    fileService = new FileService();
    dialogueManager = new DialogueManager();
}

