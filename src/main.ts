import { FileService } from "./services/FileService";
import actions from "./resources/actions.json";
import conditions from "./resources/conditions.json";

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

    let newActionName = <HTMLSelectElement>document.getElementsByClassName("new-action-name")[0];
    let newConditionName = <HTMLSelectElement>document.getElementsByClassName("new-condition-name")[0];

    actions.values.forEach((action) => {
        let option = <HTMLOptionElement>document.createElement("option");
        option.text = action;
        newActionName.add(option);
    });

    conditions.values.forEach((condition) => {
        let option = <HTMLOptionElement>document.createElement("option");
        option.text = condition;
        newConditionName.add(option);
    });
    
}

