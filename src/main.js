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

        // box

        this.box = document.createElement("div")

        this.box.id = "icon"
        this.box.style.display = "flex"
    }

    attributeChangedCallback(attr, old, value)
    {
        switch(attr)
        {
            case "name": {
                this.changeIcon(value)
                break
            }

            case "color": {
                this.changeColor(value)
                break
            }

            case "size": {
                this.changeIcon(this.getAttribute("name"), value)
                break
            }
        }
    }

    changeIcon(name = "feather", size = 20)
    {
        const icon = feather.icons[name] || feather.icons["feather"]

        const options = {
            "width": size,
            "height": size,
            "stroke-width": 1.6
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
