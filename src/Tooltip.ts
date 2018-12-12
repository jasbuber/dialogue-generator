export class Tooltip {

    public tooltip(element: HTMLElement, tooltip: string) {

        element.classList.add("tooltip");

        let tooltipDelay: NodeJS.Timer;

        element.addEventListener("mouseenter", () => {

            tooltipDelay = setTimeout(() => {
                let tooltipText = <HTMLSpanElement>document.createElement("span");
                tooltipText.innerText = tooltip.replace(/[-_/]{1,}/i, ' ');
                tooltipText.classList.add("tooltip-text");

                element.appendChild(tooltipText);

                tooltipText.style.marginLeft = (-tooltipText.offsetWidth / 2).toString();
            }, 250);

        });

        element.addEventListener("mouseleave", () => {
            let tooltipText = element.querySelector(".tooltip-text");
            if (tooltipText != null) {
                element.querySelector(".tooltip-text").remove();
            }
            clearTimeout(tooltipDelay);
        });
    }
}