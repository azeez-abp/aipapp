const constansts = require('./dataset_generator').constants
const feature = require("./feature")
const fs   = require("fs")

const samples  = JSON.parse(fs.readFileSync(constansts.SAMPLE))


let allFeatureFromSamples  = []


for (sample in samples)
{     
       
        const paths  = JSON.parse(
                fs.readFileSync(
                constansts.JSON_DIR+"/"+samples[sample].id+".json"
                )
        )
        
        Object.values (paths).forEach( (path2dArry,index)=>{
                   
                  let count = [];
                  let tot =0;
                for (let index = 0; index < path2dArry.length; index++) {
                        const paths = path2dArry[index];
                        tot+=paths.length
                      
                        
                }
                count.push(tot)
                path2dArry.points =[ tot, path2dArry.length];
                path2dArry.label  =  [ tot, path2dArry.length]
                let featuresObj  = {
                        points:[path2dArry.length, tot ],//analsing data by using total path and pints in 
                        // the onject drawn
                        label : Object.keys((paths))[index],
                        id:  samples[sample].id
                }

                allFeatureFromSamples.push(featuresObj )

              //  console.log( count,path2dArry )
                
        })

       
}


featureObject  = {
        "featureNames":[
                "path count",
                "point count",
               
        ],
        "samples" :allFeatureFromSamples

}
fs.writeFileSync(constansts.FEATURE,JSON.stringify (featureObject ) )

/**
 * prepare based on range forclustering
*/
let allObject  =  [];
for (sample in samples)
{     
       
        const eachOjectDrawn = JSON.parse(
                fs.readFileSync(
                constansts.JSON_DIR+"/"+samples[sample].id+".json"
                )
        )
        
        let first_x =  Object.values(eachOjectDrawn)[0][0][0].x;
        let  first_y =  Object.values(eachOjectDrawn)[0][0][0].y; 
        let x_min = first_x;
        let y_min = first_y;
        let x_max = first_x;
        let y_max = first_y;

     Object.values(eachOjectDrawn)[0].forEach( (pathsInObject,position)=>{
        // console.log(pathsInObject, "PathToArray")
            for (let index = 0; index < pathsInObject.length; index++) {//points
                 let x  =  pathsInObject[index].x;
                 let y  =  pathsInObject[index].y;

                 if(x_min > x) x_min  = x;
                 if(y_min > y) y_min  = y;
                 if(x > x_max) x_max = x;
                 if(y > y_max) y_max = y;
            } 
            
          
  })


    let xRange  = x_max  - x_min;
        let yRange  = y_max - y_min;
        const dataRange  = [xRange, yRange]
        allObject.push({point:dataRange, label :Object.keys(eachOjectDrawn)[0], id:  samples[sample].id })
    
    


}

let allFeatureBasedOnRange = {featureNames:["width","heigth"], samples:allObject}
//console.log(allFeatureFromSamples)
//console.log(JSON.stringify( allFeatureBasedOnRange) )

fs.writeFileSync(constansts.FEATURE_RANGE,JSON.stringify( allFeatureBasedOnRange) )