import { App } from "./src/index.js"

function main()
{
    let app = new App({id:"app", title:"", style:"flex flex-row", container:"group1"})

    app.add_label({
        context: "__H__",
        value: 1,
        style:"text-4xl flex flex-row font-bold bg-gradient-to-r from-blue-800 to-gray-800 py-2 pl-2 text-white",
        content: "TextUtils",
        container: "group1"
    })

    app.add_listener("__listen__home__", () => console.log("Home clicked"));
    app.add_listener("__listen__about__", () => console.log("About clicked"));
    app.add_listener("__listen__contact__", () => console.log("Contact clicked"));

    app.add_list({
        context: "__LIST__",
        type:"ul",
        style:"flex gap-5 relative top-0 left-0 border-5 w-60 py-2 px-2 border-blue-800 bg-gray-800 text-white",
        itemStyle: "cursor-pointer",
        items: [
            { text: "Home", onclick: "__listen__home__" },
            { text: "About", onclick: "__listen__about__" },
            { text: "Contact", onclick: "__listen__contact__" }
        ],
        container: "group2"
    })

    app.add_listener("__listen__submit__", (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        console.log("FORM SUBMIT:", Object.fromEntries(fd.entries()));
    });

    app.add_form({
        context: "__FORM__",
        id: "login-form",
        button: "Submit",
        buttonStyle: "mt-4 px-6 py-2 bg-red-600 text-white rounded hover:bg-blue-700",
        style: "flex flex-col relative justify-center items-center",
        onsubmit: "__listen__submit__",


        children: [{
            context: "__INPUT__",
            id: "username",
            label: "Username",
            placeholder: "Enter username",
            style: "w-100 border-5 border-solid border-blue-800",
            type:"text",
            onchange: "__listen__user__"
        },{
            context:"__INPUT__",
            id:"password",
            label: "Password",
            placeholder:"Enter Password",
            style:"w-100 border-5 border-solid border-blue-800",
            type:"password",
            onchange:"__listen__pass__"
        },{
            context:"__INPUT__",
            id:"dob",
            label: "Date Of Birth",
            placeholder:"DOB",
            style:"w-100 border-5 border-solid border-blue-800",
            type:"date",
            onchange:"__listen__pass__"
        }]
    });
}

main()