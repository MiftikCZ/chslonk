import { runline,functions } from "../chslang.js"

const def = {
    "colored-print": (cont,conf={}) => {
        cont.join(" ").split("--color=").forEach(e => {
            e = e.split(" ")
            let classes = e.shift()
            document.querySelector("[chslonkoutput]").innerHTML += `<span class="${classes.split("+").join(" ")}">${e.join(" ")}</span>`
        })
        
    },
    "neofetch":((cont, conf = {}) => {
        runline("print","<br><br>")

        let logo = 
`00YYY000000
00Y000Y0Y00
00YYY0YYY00
Y00000Y0Y0Y
YYY0000000Y`.split("\n")


        let data = Object.entries({
            "OS": "chsLonk Testing",
            "Host":window.location.host,
            "Technology": "chslang.js, HTML/CSS, javascript",
            "Terminal": "chsLonk",
            "Commands": Object.keys(functions).length,
            "Variables": Object.keys(conf).length,
            "Origin": "miftikcz.github.io/chslonk",
            "User": conf["user::name"]
        })
        let w = logo[0].length
        for(let i=0;i<logo.length;i++) {
            let oj = data[i]
            runline("print", " ")
            runline("colored-print", "b5 "+logo[i].split("").map(e=>{
                if(e == "Y") return "--color="+conf["neofetch::Y"]
                else return "--color="+conf["neofetch::0"]
            }).join(""))
            runline("colored-print", "c4   "+oj[0]+": --color=c1 "+oj[1])
            runline("print","<br>")
        }


        for(let i=logo.length;i<data.length;i++) {
            let oj = data[i]
            runline("print", "         ")
            runline("colored-print", "c4      "+oj[0]+": --color=c1 "+oj[1])
            runline("print","<br>")
        }

        // next
    })
}
export default def