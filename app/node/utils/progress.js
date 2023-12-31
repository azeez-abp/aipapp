const utils = {};

utils.formatPercent   = (val)=>
{  
     return (val*100).toFixed(2)+'%';  
}

utils.printProgress = (count, max) =>
{
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        const percent  = utils.formatPercent(count/max);
        process.stdout.write(count+"/"+max+ "(" + percent+")");
}
 

module.exports  = utils