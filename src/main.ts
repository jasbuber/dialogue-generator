import { FileService } from "./services/FileService";

var fileService: FileService = new FileService();

export function loadDialogueJson(e: any) {

    let files: FileList = e.target.files;

    if (files.length == 0) {
        return;
    }

    fileService.readJson(files[0]);
}

window.onload = function () {
    var input = <HTMLInputElement>document.querySelector("input[type=file]");
    input.addEventListener("change", loadDialogueJson, false);
}

