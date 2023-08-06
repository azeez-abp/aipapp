class SketchPad
{    
     /**
      * constructor - class initiator
      * @container:html element
      * @size: int size of the item in container 
      */   
     constructor(container,width = 400, height = 400)
     {
        this.canvas  = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style  = `background-color: white;
                                box-shadow: 0px 0px 10px 2px #333;
                                `
        container.appendChild(this.canvas);

        this.undoBtn   = document.createElement("button");
        this.undoBtn.setAttribute('class','undo')
        this.undoBtn.setAttribute('disabled','true')
        this.undoBtn.innerText = "Erase"
        container.appendChild(this.undoBtn)

        this.reset   = document.createElement("button");
        this.reset.setAttribute('class','reset')
        this.reset.setAttribute('disabled','true')
        this.reset.innerText = "Reset"
        container.appendChild(this.reset)
    
        this.cxt = this.canvas.getContext('2d')
        this.path  = [];
        this.isDrwaing  = false;
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
          {     
                const objectRectangle  = this.canvas.getBoundingClientRect()
                const mouse  = {
                        x : Math.round(evt.clientX - objectRectangle.x),
                        y : Math.round(evt.clientY - objectRectangle.y)
                }

                this.path  = [mouse];
                this.isDrwaing = true;  
              
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
  
                  this.path.push(mouse);
                //  this.#redraw();
                  this.#draw(this.path)

                  if (this.undoBtn.hasAttribute("disabled"))
                  {
                        this.undoBtn.removeAttribute("disabled")  
                  }

                  if (this.reset.hasAttribute("disabled"))
                  {
                        this.reset.removeAttribute("disabled")  
                  }
              
            }
          }

          this.canvas.onmouseup  = (evt) => {
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

          this.canvas.ontouchend = (evt) => 
          {
            this.isDrwaing  = false
          }
          this.undoBtn.onclick  = (evt)=>
          {       

            let rect   =  this.undoBtn.getBoundingClientRect()
      
                  if (this.path.length <= 1 ) 

                  {     this.reset.setAttribute("disabled","true");
                        return this.undoBtn.setAttribute("disabled","true");
                  }
                 
                        this.path.pop();
                        this.#redraw();
                        this.#draw(this.path);
         
          }

           this.reset.onclick  = ()=>
           {
                  this.#reset()
                  this.reset.setAttribute("disabled","true");
                  this.undoBtn.setAttribute("disabled","true");
           }
     }

     /**
      * redraw - method to clear the content of the canvas
     */
    #redraw(x1 = 0 ,y1 = 0, x2 = this.canvas.width, y2 = this.canvas.height )
    {
          this.cxt.clearRect(x1, y1, x2, y2);
    }

    #draw(path,color = "black")
    {
          this.cxt.strokeStyle  = color;
          this.cxt.lineWidth = 3;
          this.cxt.beginPath();
          this.cxt.moveTo(path[0]['x'],path[0]['y']);
      
          for (let i  = 1; i < path.length; i++)
          {
                  this.cxt.lineTo(path[i]['x'], path[i]['y']);
          }
          this.cxt.lineCap  = "round" 
          this.cxt.lineJoin  = "round"
          this.cxt.stroke();

    }

    #reset()
    {       
            this.path  = [];
            this.isDrwaing = false
            this.#redraw()
    }

    download()
    {
            
    }

}

export default SketchPad