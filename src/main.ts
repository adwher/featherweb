import { icons } from "feather-icons"

class FeatherIcon extends HTMLElement {
    box: HTMLDivElement

    static get observedAttributes() {
        return ["name", "size", "color", "thin", "rotate"]
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

            case "rotate": {
                this.rotateIcon(value)
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
        const nameValue = this.getAttribute("name") || "feather"
        const sizeValue = this.getAttribute("size") || "16"
        const thinValue = this.getAttribute("thin") || "1.5"

        this.changeIcon(nameValue, sizeValue, thinValue)
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

    rotateIcon(value: string) {
        this.box.style.transform = `rotate(${value})`
    }

    changeColor(color: string) {
        this.box.style.color = color
    }

    connectedCallback() {
        this.shadowRoot.appendChild(this.box)
    }
}

customElements.define("feather-icon", FeatherIcon)