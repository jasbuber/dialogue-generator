export interface DialogueTree {
    id: string
    dialogue: string
    response: string
    actions: Array<string>
    conditions: Array<string>
    subdialogues: Array<DialogueTree>
}