// demo
import { App } from "./src/index.js"

function main()
{
    let app = new App({id: "app", title:"First Header"})
    app.add_label(
        {
            context: "__H__",
            value: 3,
            style: "bg-red-500 text-3xl",
            content: "Hello, checkout PolarBear"
        }
    )

    app.add_label(
        {
            context:"__P__",
            value:null,
            style: "bg-blue-600 text-white",
            content: "Ok polar"
        }
    )

    app.add_listener("__listen__change__", (e) => {
        console.log("Username changed:", e.target.value);
    });

    app.add_listener("__listen__click__", () => {
        alert("Button clicked!");
    });

    app.add_input({
        context: "__INPUT__",
        id: "username",
        label: "Username",
        placeholder: "Enter username",
        style: "w-100",
        type:"text",
        onchange: "__listen__change__"
    })
    
    app.add_button({
        context: "__BUTTON__",
        text: "Submit",
        style: "mt-4 px-6 py-2 bg-blue-600 text-white rounded",
        onclick: "__listen__click__"
    });

    app.add_listener("__listen__home__", () => console.log("Home clicked"));
    app.add_listener("__listen__about__", () => console.log("About clicked"));
    app.add_listener("__listen__contact__", () => console.log("Contact clicked"));

    app.add_list({
        context: "__LIST__",
        type: "ul",
        style: "list-disc pl-6",
        itemStyle: "cursor-pointer text-lg",
        items: [
            { text: "Home", onclick: "__listen__home__" },
            { text: "About", onclick: "__listen__about__" },
            { text: "Contact", onclick: "__listen__contact__" }
        ]
    });
}


main()