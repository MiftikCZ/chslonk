

const def = {
    "html":((cont, conf = {}) => {
        if(cont.shift() == "add") {
            document.querySelector("[chslonkoutput]").innerHTML+=cont.join(" ")
        }
    })
}
export default def