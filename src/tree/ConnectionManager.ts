import { DialogueItem } from "./DialogueItem";

export class ConnectionManager {

    private canvas: any;

    private lines: Map<DialogueItem, Array<SVGLineElement>> = new Map<DialogueItem, Array<SVGLineElement>>();

    public drawConnections(dialogueItem: DialogueItem) {
        this.clear(dialogueItem);
        this.lines.set(dialogueItem, []);
        this.redraw();
    }

    public eraseConnections(dialogueItem: DialogueItem) {
        this.redraw();
        this.clear(dialogueItem);
    }

    private initialize() {
        if (this.canvas == null) {
            var SVG = require("svg.js");
            this.canvas = SVG("dialogue-tree").size('100%', '100%');
            this.canvas.x = 0;
        }
    }

    private drawLinesForDialogue(dialogueItem: DialogueItem): Array<SVGLineElement> {

        let documentElement = dialogueItem.getDocumentItem().getDocumentElement();
        let closestHiddenSubdialogues = documentElement.closest(".subdialogues.hidden");
        let parent = documentElement.parentElement;
        if (parent.classList.contains("hidden") || closestHiddenSubdialogues != null) {
            return;
        }
        let dialogueInfoWrapper = dialogueItem.getDocumentItem().getDialogueInfoWrapper();
        let dialogueInfoRect = dialogueInfoWrapper.getBoundingClientRect();

        this.initialize();
        let x = dialogueInfoWrapper.offsetLeft + dialogueInfoRect.width - 25;
        let y = dialogueInfoWrapper.offsetTop + dialogueInfoRect.height / 2;

        let line = this.drawLine(x, y, x + 25, y);

        let lines = new Array<SVGLineElement>();
        lines.push(line);

        this.drawSubdialogueLines(dialogueItem).forEach(l => lines.push(l));

        return lines;
    }

    private clear(dialogueItem: DialogueItem) {

        let dialogueLines = this.lines.get(dialogueItem);

        if (dialogueLines == null) {
            dialogueLines = new Array<SVGLineElement>();
        } else {
            dialogueLines.forEach(l => l.remove());
            this.lines.delete(dialogueItem);
        }
    }

    public redraw() {
        let newLines = new Map<DialogueItem, Array<SVGLineElement>>();
        this.lines.forEach((value, key, map) => {
            this.clear(key);
            value = this.drawLinesForDialogue(key);
            newLines.set(key, value);
        });

        this.lines = newLines;
    }

    private drawLine(x1: number, y1: number, x2: number, y2: number) {
        return this.canvas.line(x1, y1, x2, y2).stroke({ width: 1, color: "#AAA" });
    }

    private drawSubdialogueLines(dialogueItem: DialogueItem): Array<SVGLineElement> {
        let subdialoguElements = dialogueItem.getSubdialogues();
        let lines = Array<SVGLineElement>();
        let startY = 0;
        let endY = 0;
        let commonX = 0;

        subdialoguElements.forEach(sub => {
            let dialogueInfoWrapper = sub.getDocumentItem().getDialogueInfoWrapper();
            let dialogueInfoRect = dialogueInfoWrapper.getBoundingClientRect();

            let x = dialogueInfoWrapper.offsetLeft;
            let y = dialogueInfoWrapper.offsetTop + dialogueInfoRect.height / 2;

            let line = this.drawLine(x, y, x + 25, y);

            lines.push(line);

            commonX = x;

            if(y > endY){
                endY = y;
            }
            if(y < startY || startY == 0){
                startY = y;
            }
        });

        let line = this.drawLine(commonX, startY, commonX, endY);
        lines.push(line);
        return lines;
    }

    public clearCanvas() {
        this.canvas = null;
    }

}