const features  = {}
//paths paths is the path of each object drawn
features.pathCount  = (paths)=>
{
        return paths.length;
}

features.pointCount = (paths) =>
{
        const points  = paths.flat();
        return points.length;
}

features.getRange  = (paths)=>{
        const min  = Math.min(...paths)
        const max  = Math.max(...paths)
       return  max - min
     }

module.exports = features;
// node C:\Users\BONJOUREX\Desktop\Code-project\aipapp\app\node\dataset_generator.js
//node C:\Users\BONJOUREX\Desktop\Code-project\aipapp\app\node\feature_extractor.js
