// demo
import { App } from "./src/index.js"

function main()
{
    let app = new App({id: "app", style:"bg-yellow-700 text-white", title:"First Header"})
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

    app.add_listener("__listen__submit__", (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        console.log("FORM SUBMIT:", Object.fromEntries(fd.entries()));
        alert(JSON.stringify(Object.fromEntries(fd.entries())));
    });

    // Add the missing URL listener
    app.add_listener("__listen__url__", (e) => {
        console.log("URL changed:", e.target.value);
    });

    app.add_form({
        context: "__FORM__",
        id: "login-form",
        button: "Submit",
        buttonStyle:"w-40 bg-blue-500 text-white",
        style: "flex flex-col",
        onsubmit: "__listen__submit__",
        children: [{
            context: "__INPUT__",
            id: "username",
            label: "Username",
            labelStyle: "bg-red-500 text-white block w-30",
            placeholder: "Enter username",
            style: "w-100 border-5 border-solid border-blue-800",
            type:"text",
            onchange: "__listen__user__"
        },{
            context:"__INPUT__",
            id:"password",
            label: "Password",
            labelStyle: "bg-red-500 text-white block w-30",
            placeholder:"Enter Password",
            style:"w-100 border-5 border-solid border-blue-800",
            type:"password",
            onchange:"__listen__pass__"
        },{
            context: "__INPUT__",
            id: "date",
            label: "UserDate",
            labelStyle: "bg-red-500 text-white block w-30",
            style: "w-100 border-5 border-solid border-blue-800",
            type: "date", 
            onchange: "__listen__user__"
        },{
            context: "__INPUT__",
            id: "website",
            type: "url",
            label: "Website URL",
            labelStyle: "bg-red-500 text-white block w-30",
            style: "w-100 border-5 border-solid border-blue-800",
            placeholder: "https://example.com",
            required: true,
            onchange: "__listen__url__"
        }]
    });

}


main()