import feather from 'feather-icons'

class FeatherIcon extends HTMLElement
{
    static get observedAttributes()
    {
        return ["name", "size", "color", "thin"]
    }

    constructor()
    {
        super()
        this.attachShadow({ mode: "open" })

        // box

        this.box = document.createElement("div")

        this.box.id = "icon"
        this.box.style.display = "flex"
    }

    attributeChangedCallback(attr, _, value)
    {
        switch(attr)
        {
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

    updateIcon()
    {
        const name = this.getAttribute("name") || "feather"
        const size = this.getAttribute("size") || "20"
        const thin = this.getAttribute("thin") || "1.5"

        this.changeIcon(name, size, thin)
    }

    changeIcon(name = "feather", size, thin)
    {
        const icon = feather.icons[name] || feather.icons["feather"]

        const options = {
            "width": size,
            "height": size,
            "stroke-width": thin
        }

        this.box.innerHTML = icon.toSvg(options)
    }

    changeColor(color)
    {
        this.box.style.color = color
    }

    connectedCallback()
    {
        this.shadowRoot.appendChild(this.box)
    }
}

customElements.define("feather-icon", FeatherIcon)
