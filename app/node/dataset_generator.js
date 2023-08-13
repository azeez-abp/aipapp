const constants  ={};
const path_  = require("path");
//console.log(__dirname, "dir")
constants.DATA_DIR  =  path_.join(__dirname, "../data");

constants.RAW_DIR  = constants.DATA_DIR+"/raw";
constants.DATASET_DIR  = constants.DATA_DIR+"/dataset";
constants.JSON_DIR  = constants.DATASET_DIR +"/json";
constants.IMG_DIR  = constants.DATASET_DIR +"/img";
constants.SAMPLE  = constants.DATASET_DIR +"/sample.json";
constants.FEATURE  = constants.DATASET_DIR +"/feature.json";
constants.FEATURE_RANGE  = constants.DATASET_DIR +"/feature_range.json";

const fs  = require("fs");
const {createCanvas}   = require('canvas');
const draw = require("./draw");
const utils = require("./utils/progress");
const path = require("path");
const width  = 400;
const heigth = 400;
const canvas  = createCanvas(width, heigth);
const ctx  = canvas.getContext('2d');
//const SketchPad= require("../js/sketchPad.js").SketchPad;

 const fileName  = fs.readdirSync(constants.RAW_DIR)
const sample  = [];
let id  = 1;
fileName.forEach(fn=>{

        const content  = fs.readFileSync(constants.RAW_DIR+"/"+fn);
      // console.log(JSON.parse(content))
        const {personalInfo, objectDrawn}  = JSON.parse(content);
           console.log(objectDrawn.length, "LENGTH")
        for (let label in objectDrawn)
        {
                sample.push({
                        id,
                        label:Object.keys(objectDrawn[label])[0],
                        student_name: personalInfo.name,
                        student_id:personalInfo.session
                })
                let objectPaths  = objectDrawn[label][Object.keys(objectDrawn[label])[0]] ;
                fs.writeFileSync(constants.JSON_DIR+"/"+id+".json",JSON.stringify(objectDrawn[label]) )
                
                generateImageFile(constants.IMG_DIR+"/"+id+".png", objectPaths);  
                 utils.printProgress(id, fileName.length*objectDrawn.length);
                id++
        }
})

fs.writeFileSync(constants.SAMPLE,JSON.stringify(sample));


function generateImageFile(outputFile,paths)  
{    
        ctx.clearRect(0, 0, canvas.width,canvas.height) 

        for (let index = 0; index < paths.length; index++) {
               draw(paths[index],ctx)
        }
       
        const buffer  = canvas.toBuffer("image/png");
        fs.writeFileSync(outputFile,buffer);
}

module.exports = {constants}