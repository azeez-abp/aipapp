import SketchPad from "./sketchPad.js";
import User from "./userData.js";


window.addEventListener('load', function(){

const sketchPadObject  = new SketchPad(document.querySelector(".content"),400,400)
const userobj  = new User(sketchPadObject)



})