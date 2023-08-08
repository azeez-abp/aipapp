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
                        points:[path2dArry.length, tot ],
                        label : Object.keys((paths))[index],
                        id:  samples[sample].id
                }

                allFeatureFromSamples.push(featuresObj )

              //  console.log( count,path2dArry )
                
        })

       
}
featureObject  = {
        "FeatureName":[
                "path count",
                "point count",
               
        ],
        "sample" :allFeatureFromSamples

}
fs.writeFileSync(constansts.FEATURE,JSON.stringify (featureObject ) )
//console.log(allFeatureFromSamples)