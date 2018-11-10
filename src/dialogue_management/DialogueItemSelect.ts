import { DialogueItem } from "../tree/DialogueItem";

export class DialogueItemSelect{

    private selectElement: HTMLSelectElement;

    constructor(id: string, onChange: (selectedDialogue: string) => void){
        this.selectElement = <HTMLSelectElement>document.getElementsByClassName(id)[0];
        this.selectElement.addEventListener("change", () => onChange(this.selectElement.value), false);
    }

    public addPlaceholder(text: string){
        let placeholder = <HTMLOptionElement>document.createElement("option");
        placeholder.text = text;
        placeholder.selected = true;
        placeholder.disabled = true;
        
        this.selectElement.add(placeholder);
    }

    public addOption(dialogueItem: DialogueItem) {
        let dialogueOption = <HTMLOptionElement>document.createElement("option");

        dialogueOption.text = dialogueItem.getId();
        this.selectElement.add(dialogueOption);
    }

    public selectOption(dialogueItem: DialogueItem){

        for(let i: number = 0; i < this.selectElement.options.length; i++){
            if(this.selectElement.options[i].value == dialogueItem.getId()){
                this.selectElement.selectedIndex = i;
                return;
            }
        }
    }

    public removeSelectedOption(){
        this.selectElement.remove(this.selectElement.selectedIndex);
        this.selectElement.selectedIndex = 0;
    }

    public updateSelectedOption(newValue: string){
        let selectedIndex = this.selectElement.selectedIndex;
            this.selectElement.options[selectedIndex].text = newValue;
    }

    public clear(){
        while (this.selectElement.firstChild) {
            this.selectElement.removeChild(this.selectElement.firstChild);
        }
    }

}