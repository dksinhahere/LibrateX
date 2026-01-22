
import { App } from "./src/index.js"

let app = new App({
    id: "app", 
    style:"bg-yellow-700 py-2 text-white text-2xl pl-5", 
    title:"Terminal"
})

app.add_form({
    context:"__FORM__",
    id:"terminal",
    button: "RUN-COMMAND",
    buttonStyle:"bg-green-600 text-white p-1 w-full",
    onsubmit: "__listen_run__",
    children: [
        {
            context: "__INPUT__",
            id: "prompt",
            labelStyle: "bg-red-500 text-white block w-full",
            placeholder: "Enter command",
            style: "w-100 border-5 border-solid border-blue-800 w-full h-155 bg-black text-white",
            type:"textarea",
            onchange: "__listen__user__"
        }
    ]
})

function msg_show(output, _title_)
{
    app.add_alert({
        context: "__ALERT__",
        type: _title_,
        title: "Success!",
        message: output,
        duration: 8000,
        position: "center"
    });
}

app.add_listener("__listen_run__", (e)=> {
    e.preventDefault();
    const fd = new FormData(e.target);
    let command = Object.fromEntries(fd.entries()).prompt
    
    let buf = command.split(" ")
    let output = ""

    switch(buf[0]) {
        case "echo" : {
            output = buf.slice(1, buf.length)
            msg_show(output.join(" "), "success")
            break
        }

        default: {
            console.log("DEFAULT")
            msg_show("command failed", "error")
            break
        }
    }

    e.target.reset()
})