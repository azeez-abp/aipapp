
const draw =  (path, cxt ,color = "black") =>
{    
        cxt.strokeStyle  = color;
        cxt.lineWidth = 3;
        cxt.beginPath();
        cxt.moveTo(path[0]['x'],path[0]['y']);
          
        for (let i  = 1; i < path.length; i++)
        {    

              cxt.lineTo(path[i]['x'], path[i]['y']);
        }
      
        cxt.lineCap  = "round" 
      //this.cxt.lineJoin  = "round"
        cxt.stroke();

}

module.exports= draw