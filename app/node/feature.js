const features  = {}

features.pathCount  = (pahts)=>
{
        return pahts.length;
}

features.pointCount = (paths) =>
{
        const points  = paths.flat();
        return points.length;
}

module.exports = features;
// node C:\Users\BONJOUREX\Desktop\Code-project\aipapp\app\node\dataset_generator.js
//node C:\Users\BONJOUREX\Desktop\Code-project\aipapp\app\node\feature_extractor.js
