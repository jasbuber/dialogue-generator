import { DialogueItem } from "../tree/DialogueItem";

export class DialogueItemSelect{

    private selectElement: HTMLSelectElement;

    private placeholder: HTMLOptionElement;

    constructor(id: string, onChange: (selectedDialogue: string) => void){
        this.selectElement = <HTMLSelectElement>document.getElementsByClassName(id)[0];
        this.selectElement.addEventListener("change", () => onChange(this.selectElement.value), false);
    }

    public addPlaceholder(text: string){
        this.placeholder = <HTMLOptionElement>document.createElement("option");
        this.placeholder.text = text;
        this.placeholder.selected = true;
        this.placeholder.disabled = true;
        
        this.selectElement.add(this.placeholder);
    }

    public addOption(dialogueItem: DialogueItem) {
        let dialogueOption = <HTMLOptionElement>document.createElement("option");

        if(dialogueItem.isRoot()){
            dialogueOption.text = dialogueItem.getId();
        }else{
            dialogueOption.text = dialogueItem.getNameElement().innerText;
        }
        dialogueOption.value =  dialogueItem.getId();
        this.selectElement.add(dialogueOption);
    }

    public addAllOptions(dialogueItem: Array<DialogueItem>) {
        this.clear();
        dialogueItem.forEach(d => this.addOption(d));
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
        if(this.placeholder != null){
            this.selectElement.add(this.placeholder);
        }
        this.selectElement.selectedIndex = 0;
    }

}