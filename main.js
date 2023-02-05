import { chslang, runline, functions } from "./chslang.js";


var config = chslang(`
set ROOT to document.getElementById("root")
set BR to <span class="br"></span>

set neofetch::Y to c4+b4 :
set neofetch::0 to c1 .

set user::name to root

set bash::PS0 to neofetch
set bash::PS1 to  %IND  --color=c2+b2+cspecial1
set bash::history to

set theme::font::size to 20px
set theme::font::family to monospace

set theme::input::font::size to 25px
set theme::input::font::color to #bebebf
set theme::input::padding to 0.25em
set theme::input::background to hsl(270,10%,8%)

set theme::output::font::size to 25px
set theme::output::font::color to #bebebf
set theme::output::padding to 0.25em
set theme::output::background to hsl(270,10%,10%)

function onload
  print  System chsLonk loaded !  --color=c7+b7+wmax+r1+ac
  print <br>

js window.addEventListener("load", ()=>{runline("onload")})
`, {})





// << << << CODE >> >> >> //
/**@type {HTMLElement} */
const root = new Function("return " + config["ROOT"])()
root.style.margin = 0
root.style.display = "flex"
root.style.width = "100%"
root.style.height = "100%"
root.style.flexDirection = "column"
root.style.fontSize = config["theme::font::size"]
root.style.fontFamily = config["theme::font::family"]
root.style.overflowY = "hidden"
root.style.wordBreak = "break-all"
root.style.wordWrap = "break-word"
root.style.overflowX = "hidden"

const input = document.createElement("input")
input.setAttribute("chslonkinput","yes")
input.value = config["bash::PS0"]
input.style.color = "#bebebf"
input.style.fontSize = config["theme::input::font::size"]
input.style.padding = config["theme::input::padding"]
input.style.width = "100%"
input.style.color = config["theme::input::font::color"]
input.style.background = config["theme::input::background"]
input.style.border = "none"
input.style.wordBreak = "break-all"
input.style.wordWrap = "break-word"
input.style.margin = "0"
input.style.fontFamily = config["theme::font::family"]

export const output = document.createElement("div")
output.setAttribute("chslonkoutput","yes")
output.style.width = "100%"
output.style.height = "100%"
output.style.fontSize = config["theme::output::font::size"]
output.style.background = config["theme::output::background"]
output.style.color = config["theme::output::font::color"]
output.style.padding = config["theme::output::padding"]
output.style.border = "none"
output.style.margin = "0"
output.style.wordBreak = "break-all"
output.style.wordWrap = "break-word"
output.style.whiteSpace = "pre"
output.style.whiteSpace = "pre-wrap"
output.style.overflowY = "auto"


input.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
        let val = input.value.split(" ")
        let ind = val.shift()
        if(ind.endsWith(":raw")) {
            ind=ind.slice(0,-4)
            return runline(ind, val.join(" "), config)
        }

        runline("print", config["bash::PS1"]
            .split("%IND").join(ind)
        )
        runline("print", " ", config)
        runline(ind, val.join(" "), config)
        runline("print", "<br>", config)

        input.value = ""

        config["bash::history"] += ind+";"
    }
})

root.appendChild(input)
root.appendChild(output)
