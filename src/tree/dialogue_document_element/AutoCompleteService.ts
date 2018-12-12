export class AutoCompleteService {

    public autocomplete(element: HTMLInputElement, values: Array<string>) {
        element.addEventListener("keydown", (event: KeyboardEvent) => {

            element.classList.remove("is-danger");

            if (event.key.length > 1) {
                return;
            }

            let regex = /\w|\d|[><=\s]/i.exec(event.key);

            event.preventDefault();

            if (regex == null) {
                return;
            }

            let acceptableValues = values.filter(condition => {
                let predictedValue = element.value + event.key;
                return condition.length > element.value.length && condition.substring(0, predictedValue.length) == predictedValue
            });

            if (acceptableValues.length == 1) {
                element.value = acceptableValues[0];
            } else {
                element.value += event.key;
            }
        });
    }

}