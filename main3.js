
import { App } from "./src/index.js"

let app = new App({
    id: "app", 
    style:"bg-yellow-700 py-2 text-white text-2xl pl-5", 
    title:"Terminal"
})

app.add_media_audio({
    context: "__AUDIO__",
    controls: true,
    autoplay:true,
    loop:true,
    muted:false,
    style:"border-5 border-solid border-red-700 flex relative left-140 top-50",
    source: "./jhol.mp3",
    type:"audio/mpeg",
    message: "Audio Not Supported By Your Browser"
})

// app.add_media_media({
//     context: "__AUDIO__",
//     controls: true,
//     autoplay:false,
//     loop:false,
//     muted:false,
//     playsinline: true,
//     style:"",
//     source: "",
//     type:""
// })