import { icons } from "feather-icons"

class FeatherIcon extends HTMLElement {
    box: HTMLDivElement

    static get observedAttributes() {
        return ["name", "size", "color", "thin"]
    }

    constructor() {
        super()
        this.attachShadow({ mode: "open" })

        // box

        this.box = document.createElement("div")

        this.box.id = "icon"
        this.box.style.display = "flex"
    }

    attributeChangedCallback(attr: string, _: any, value: any) {
        switch(attr) {
            case "color": {
                this.changeColor(value)
                break
            }
            
            case "name":
            case "size":
            case "thin": {
                this.updateIcon()
                break
            }
        }
    }

    updateIcon() {
        const name = this.getAttribute("name") || "feather"
        const size = this.getAttribute("size") || "18"
        const thin = this.getAttribute("thin") || "1.5"

        this.changeIcon(name, size, thin)
    }

    changeIcon(name = "feather", size: string, thin: string) {
        const icon = icons[name] || icons["feather"]

        const options = {
            "width": size,
            "height": size,
            "stroke-width": thin
        }

        this.box.innerHTML = icon.toSvg(options)
    }

    changeColor(color: string) {
        this.box.style.color = color
    }

    connectedCallback() {
        this.shadowRoot.appendChild(this.box)
    }
}

customElements.define("feather-icon", FeatherIcon)