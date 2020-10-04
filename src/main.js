import feather from 'feather-icons'

class FeatherIcon extends HTMLElement
{
    static get observedAttributes()
    {
        return ["name", "size", "color"]
    }

    constructor()
    {
        super()
        this.attachShadow({ mode: "open" })
    }

    connectedCallback()
    {
        // box

        const box = document.createElement("div")
        box.id = "icon"

        // style

        box.style.display = "flex"

        if (this.hasAttribute("color"))
        {
            box.style.color = this.getAttribute("color")
        }

        // icon

        const name = this.getAttribute("name") || "feather"
        const icon = feather.icons[name] || feather.icons["feather"]

        const size = this.getAttribute("size") || "20"

        const options = {
            "width": size,
            "height": size,
            "stroke-width": 1.8
        }

        box.innerHTML = icon.toSvg(options)
        this.shadowRoot.appendChild(box)
    }
}

customElements.define("feather-icon", FeatherIcon)