export class ErrorDisplayManager {

    public static INPUT_EMPTY_ERROR = "This input cannot be empty.";
    public static INPUT_ID_EXIST_ERROR = "Dialogue with this id already exist.";
    public static FINAL_ITEM_ERROR = "Dialogues with final actions can't have subdialogues.";
    public static ITEM_HAS_CHILDREN_ERROR = "Dialogues with subdialogues can't be marked as final.";

    public static displayError(element: HTMLElement, message: string, millis: number = 0) {
        element.classList.add("is-danger");
        let errorMessage = document.createElement("p");
        errorMessage.classList.add("help");
        errorMessage.classList.add("is-danger");
        errorMessage.innerText = message;
        element.after(errorMessage);

        if (millis != 0) {
            this.scheduleClearErrors(element, millis)
        }
    }

    public static clearErrors(element: HTMLElement) {
        element.classList.remove("is-danger");
        if (element.nextElementSibling != null && element.nextElementSibling.classList.contains("help")) {
            element.nextElementSibling.remove();
        }
    }

    private static scheduleClearErrors(element: HTMLElement, millis: number) {
        setTimeout(() => {
            ErrorDisplayManager.clearErrors(element);
        }, millis);
    }

    public static displayInnerError(element: HTMLElement, message: string, millis: number = 0) {

        let errorMessage = document.createElement("p");
        errorMessage.classList.add("help");
        errorMessage.classList.add("is-danger");
        errorMessage.classList.add("bottom-error");
        errorMessage.innerText = message;

        element.appendChild(errorMessage);

        if (millis != 0) {
            this.scheduleClearInnerErrors(element, millis)
        }
    }

    public static clearInnerErrors(element: HTMLElement) {
        element.querySelectorAll(".help").forEach(h => h.remove());
    }

    private static scheduleClearInnerErrors(element: HTMLElement, millis: number) {
        setTimeout(() => {
            ErrorDisplayManager.clearInnerErrors(element);
        }, millis);
    }

}