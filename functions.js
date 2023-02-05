import { runline,functions } from "./chslang.js"
import runapp_app from "./apps/runapp.js"
import neofetch_app from "./apps/neofetch.js"
let CONT = document.createElement("div")
function checkargs(list = [], accept = "all") {
    let args = {}
    let text = []
    list.forEach(l=>{
        if(l.startsWith("--") && (accept.includes(l.slice(2)) || accept == "all")) {
            let le = l.slice(2).split("=")
            args[le[0]] = le[1]

        } else {
            text.push(l)
        }
    })

    return {
        args,
        text: text.join(" ")
    }
}

const Functions = {    
    ...neofetch_app,
    "history": (cont,conf={})=> {
            conf["bash::history"].split(";").forEach(e => {
                runline("print",e + " --color=c6+b1") 
                runline("print", "; --color=c4")
                //runline("print", "<br>")
            })
    },
    "list": (cont,conf) => { // list [var|cmd]
        let arg1 = cont.shift()
        if(arg1 == "var") {
            runline("print", "<br>")
            Object.entries(conf).forEach(e => {
                runline("print",e[0] + " --color=c6+b1") 
                runline("print", " ")
                runline("print",e[1] + "") 
                runline("print", "<br>")
            })            
        }

        if(arg1 == "cmd") {
            runline("print", "<br>")
            let rows = 3
            let i = 0
            let wid = (window.innerWidth / 18) / rows
            
            Object.keys(functions).forEach(e => {
                i++
                let e2 = (()=>{
                    let t = ""
                    for(let i = 0;i<wid - e.length;i++) {
                       t+= " "
                    }
                    return t
                })()
                runline("print", ` ${e}  --color=c6+b1`) 
                runline("print", e2)
                if(!(i % rows)) {

                    runline("print", "<br>")
                }
            })            
        }
    },
    
    "print": (cont, conf) => {
        let ca = checkargs(cont)
        let classes = (ca.args["color"] || "").split("+").join(" ")
        let text = ca.text
        document.querySelector("[chslonkoutput]").innerHTML += `<span class="${classes}">${text}</span>`
        return conf
    },
    "clear": (cont, conf) => {
        document.querySelector("[chslonkoutput]").innerHTML = ""
    },
    "help": () => {
        runline("print","<br><br>")
        runline("print", "["+Object.entries(functions).length+"] Here is a list of commands you can use  --color=c7+b7")
        runline("list","cmd")
    },
    "define": (cont, conf) => {
        let ind = cont.shift()
        runline("js", `functions['${ind}']= (cont,conf) => {${cont.join(" ")}}`)
        runline("print", `Done! [${ind}]`)
    },
}

export default Functions