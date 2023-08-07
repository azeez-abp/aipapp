class SketchPad
{    
     /**
      * constructor - class initiator
      * @container:html element
      * @size: int size of the item in container 
      */   
     #path
     #wholeObjectPath
     constructor(container,width = 400, height = 400)
     {
        this.#path  = []
        this.#wholeObjectPath  = []
        this.canvas  = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;
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
                
                  console.log(this.#path, this.#wholeObjectPath)

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
           this.#path.length > 0 ? this.#wholeObjectPath.push(this.#path):undefined
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
     */
    #redraw(x1 = 0 ,y1 = 0, x2 = this.canvas.width, y2 = this.canvas.height )
    {
          this.cxt.clearRect(x1, y1, x2, y2);
    }

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

    }
    static drawImageFromPath(paths,cxt)
    {
            this.#draw(paths,cxt)
    }
    #reset()
    {       
            this.#path  = [];
            this.#wholeObjectPath = [];
            this.isDrwaing = false
            this.#redraw()
            this.reset.setAttribute("disabled","true");
            this.undoBtn.setAttribute("disabled","true");
            this.next.setAttribute("disabled","true");
    }
    reset2()
    {
      this.#reset()
    }

    #undo()
    {
      if (this.#path.length <= 1 ) 
      {    
            this.reset.setAttribute("disabled","true");
            this.undoBtn.setAttribute("disabled","true");
            this.next.setAttribute("disabled","true");
            return
      }
     
            this.#path.pop();
            this.#redraw();
            this.#draw(this.#path);
    }
    
    getPath()
    {
            return this.#wholeObjectPath
    }
    setPath(path)
    {
      this.#path  = path
      this.#redraw()
    }
   

}

// if(typeof module !== 'undefined')
// {
//       module.exports = {SketchPad}
// }
           
// window.SketchPad  = SketchPad
export default SketchPad
// export const draw  =SketchPad.drawImageFromPath