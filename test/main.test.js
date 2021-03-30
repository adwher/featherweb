const { describe, test, expect } = require("@jest/globals")

require("../dist/featherweb.js")

describe("DOM", function () {
    test("Custom element are defined", function () {
        expect(customElements.get("feather-icon")).toBeDefined()
    })
})