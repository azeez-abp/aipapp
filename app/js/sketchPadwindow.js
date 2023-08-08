class SketchPad
{    
     /**
      * constructor - class initiator
      * @container html element
      * @width int width of the item in container 
      * @height height of the canvas
      * @onUpdate function to update the path drawn called at the end of #clearCtx function
      */   

     #path
     #wholeObjectPath

     constructor(container,width = 400, height = 400, onUpdate=null)
     {
        this.#path  = []
        this.#wholeObjectPath  = []
        this.canvas  = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;
        this.onUpdate  = onUpdate
        this.canvas.style  = `background-color: white;
                                box-shadow: 0px 0px 10px 2px #333;
                                `
        container.appendChild(this.canvas);
        
        let btnContainer  = `<div class="button-container">
               <button class="undo" disabled="true"  >Undo</button>
               <button class="reset" disabled="true" >Reset</button>
               <button class="next" disabled="true" >→</button>
              
          </div>`
      
        container.insertAdjacentHTML('beforeEnd', btnContainer)
        this.cxt = this.canvas.getContext('2d')
    
        this.isDrwaing  = false;
        this.undoBtn  = document.querySelector("button.undo")
        this.reset  = document.querySelector("button.reset")
        this.next  = document.querySelector("button.next")
      
       
        this.#addEventListers();
       
      

     }  
     /**
      * addEventListners - private method adding event to an element
      *     the method conatain event that listen for 
      *     mousedown; mousemove; mouseup
      * 
     */
     #addEventListers()
     {
          this.canvas.onmousedown = (evt) =>
          {     this.isDrwaing = true; 
                const objectRectangle  = this.canvas.getBoundingClientRect()
                const mouse  = {
                        x : Math.round(evt.clientX - objectRectangle.x),
                        y : Math.round(evt.clientY - objectRectangle.y)
                }

              this.#path  = [mouse];
           
               
              
          }

          this.canvas.onmousemove  = (evt)=>
          {
            if (this.isDrwaing)
            {
                  const objectRectangle  = this.canvas.getBoundingClientRect()
                  const mouse  = {
                          x : Math.round(evt.clientX - objectRectangle.x),
                          y : Math.round(evt.clientY - objectRectangle.y)
                  }
  
                  this.#path.push(mouse);
                  this.#draw(this.#path)
                
               //   console.log(this.#path, this.#wholeObjectPath)

                  if (this.undoBtn.hasAttribute("disabled"))
                  {
                        this.undoBtn.removeAttribute("disabled")  
                  }

                  if (this.reset.hasAttribute("disabled"))
                  {
                        this.reset.removeAttribute("disabled")  
                  }

                  if (this.next.hasAttribute("disabled"))
                  {
                        this.next.removeAttribute("disabled")  
                  }
              
            }
          }

          document.onmouseup  = (evt) => {

           // this.#wholeObjectPath  = [...this.#wholeObjectPath,...this.#path]
           console.log(evt.target.className)
           if(evt.target.className === 'undo'){
                this.#wholeObjectPath[this.#wholeObjectPath.length -1]  = this.#path
           }else{
                this.#path.length > 0 ? this.#wholeObjectPath.push(this.#path):undefined
           }
          
            this.isDrwaing  = false
           

          }

          /**
           * touch event respont to mobile view
           * Non-Passive Event Listener: An event listener is considered "
           * non-passive" if it calls event.preventDefault() or returns a 
           * value other than undefined from the
           *  event handler. These listeners can block scrolling during 
           * the event handling.
           * we use { passive: true } to prevent that scrolling
          */
          this.canvas.addEventListener('touchstart', (evt) =>
           {
            const loc = evt.touches[0];
            this.canvas.onmousedown(loc);
          }, { passive: true }
          );


         this.canvas.addEventListener('touchmove', (evt) => 
          {
                  const loc    = evt.touches[0];
                  this.canvas.onmousemove(loc)
          },{ passive: true })

          document.ontouchend = (evt) => 
          {
            this.isDrwaing  = false
          }

          this.undoBtn.onclick  = ()=>this.#undo()
          this.reset.onclick  = ()=>this.#reset()
      
     }

     /**
      * redraw - method to clear the content of the canvas
      * @x1 initial position on x-axis
      * @y1 initial position on y-axis
      * @x2 final axis on x-axis
      * @y2 fianl axis y-axis
     */
    #clearCtx(x1 = 0 ,y1 = 0, x2 = this.canvas.width, y2 = this.canvas.height )
    {
          this.cxt.clearRect(x1, y1, x2, y2);

         
    }
    
    /**
     * draw -private methos to catch all the points drawn for a single path
     *        single path is drwan when mouse is up
     */
    #draw(path, cxt =this.cxt ,color = "black")
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

            if(this.onUpdate){
                this.onUpdate(this.getPath() )
                return
              }
           


    }
    /**
     * drawImageFromPath - static method to draw the path on canvas
     * @path all points of the path to be drawn
    */
    static drawImageFromPath(paths,cxt)
    {
            this.#draw(paths,cxt)
    }

    /**
     * reset private methos that clear all path from canvas
    */
    #reset()
    {       
            this.#path  = [];
            this.#wholeObjectPath = [];
            this.isDrwaing = false
            this.#clearCtx()
            this.reset.setAttribute("disabled","true");
            this.undoBtn.setAttribute("disabled","true");
            this.next.setAttribute("disabled","true");
    }
    reset2()
    {
      this.#reset()
    }
    /**
     * undo - methos to delete singple pint from paht
    */
    #undo()
    {        
            if(this.#wholeObjectPath.length === 1  && this.#path.length === 0)
            {     this.reset.setAttribute("disabled","true");
                  this.undoBtn.setAttribute("disabled","true");
                  this.next.setAttribute("disabled","true");
                  return  this.#wholeObjectPath.pop()
            }
      
      
          console.log(this.#path,this.#wholeObjectPath, "ALL")
          if(this.#path.length ===0)
          {   
         
            if (this.#wholeObjectPath.length > 0)
            { 
                 
                   let last   = this.#wholeObjectPath[this.#wholeObjectPath.length - 1];
                   if(last.length === 0 )this.#wholeObjectPath.pop()
                 this.#path  = this.#wholeObjectPath[this.#wholeObjectPath.length - 1]
            }
               
            console.log(this.#path  , " NEW PATH", this.#wholeObjectPath)
           
          }
        
           this.#clearCtx()
           if(this.#wholeObjectPath.length >0){
            this.#wholeObjectPath.forEach((path , index)=>{
              if (index !== this.#wholeObjectPath.length-1){
                    this.#draw(path)
              }
            })
           }
          if(this.#path && this.#wholeObjectPath.length >0 )
          {
            this.#path.pop()

          if(this.#path <= 1) return this.#path.pop()
          this.#draw(this.#path)
          }else{
            this.#wholeObjectPath  = []
          }
         
 
    }
    /**
     * getPath - method that retun all the path drawn
    */
    getPath()
    {      
            
            return this.#wholeObjectPath

    }
     /**
     * setPath - method that give path to the canvas
    */
    setPath(path)
    {
      this.#path  = path
      this.#clearCtx()
    }
   

}

