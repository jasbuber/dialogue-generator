export class ValidationErrorElement {

    private documentElement: HTMLDivElement = document.querySelector(".tree-validation-errors");

    public clear() {
        while (this.documentElement.firstChild != null) {
            this.documentElement.firstChild.remove();
        }
    }

    public displayErrors(errors: Array<string>) {
        this.clear();
        errors.forEach(e => this.documentElement.appendChild(this.buildErrorElement(e)));
    }

    public show() {
        this.documentElement.classList.remove("hidden");
    }

    public hide() {
        this.documentElement.classList.add("hidden");
    }

    private buildErrorElement(error: string): HTMLDivElement {

        let message = document.createElement("span");
        message.innerText = error;
        let errorElement = document.createElement("div");
        errorElement.appendChild(message);

        return errorElement;
    }

    public isVisible() {
        return !this.documentElement.classList.contains("hidden");
    }

}