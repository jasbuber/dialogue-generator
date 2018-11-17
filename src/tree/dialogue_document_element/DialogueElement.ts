export class DialogueElement {

    protected buildSpan(className: string, text: string): HTMLSpanElement {
        let span: HTMLSpanElement = document.createElement('span');
        span.classList.add(className);
        span.innerText = text;

        return span;
    }

    protected buildDiv(classes: Array<string>): HTMLDivElement {
        let div: HTMLDivElement = document.createElement('div');
        classes.forEach(c => div.classList.add(c));

        return div;
    }

    protected buildElement(classes: Array<string>, name: string): HTMLElement {
        let element: HTMLElement = document.createElement(name);
        classes.forEach(c => element.classList.add(c));

        return element;
    }


}