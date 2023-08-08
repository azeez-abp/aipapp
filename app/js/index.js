import SketchPad from "./sketchPad.js";
import User from "./userData.js";

window.SKT  = {
        SketchPad 
}

window.addEventListener('load', function(){

const sketchPadObject  = new SketchPad(document.querySelector(".content"),400,400)
const userobj  = new User(sketchPadObject)
userobj.getDrawDiagram()


})