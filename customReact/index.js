function customRender(reactElement, container) {
    const domElement = document.createElement(reactElement.type)
    domElement.textContent = reactElement.children
    // domElement.setAttribute("href", reactElement.props.href)
    // domElement.setAttribute("target", reactElement.props.target)
    for (const prop in reactElement.props) {
        if (prop === "children") continue
        domElement.setAttribute(prop, reactElement.props[prop])
    }

    container.appendChild(domElement)
}


const reactElement = {
    type: "a",
    props: {
        href: "https://google.com",
        target: "_blank"
    },
    children: "Click me to visit Google"
}

const mainContainer = document.getElementById("root")

customRender(reactElement, mainContainer)