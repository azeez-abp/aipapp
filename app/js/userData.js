import { randomStr } from "./ramdomStr.js"

export default class User 
{       
        #allData   = {
                personalInfo : null,
                objectDrawn :  []
        }
        #label  = ['car','bicycle', 'clock', 'tree'];
        #index  = 0;
        constructor(sketchBoard)
        {     
              
                    this.user  = {}
                    this.validation  = []
                    this.sketchBoard  = sketchBoard
                    
          
                 
                document.querySelector("button.save").addEventListener('click' , ()=>{
                        this.user.name  = document.querySelector(`input.user`).value
                        this.user.session   = randomStr(30,false,false,false) ;
                        
                        if (!this.user.name)
                        {
                          return alert("User name is require")
                        }
                        document.querySelector(".content").classList.remove("hidden")
                        document.querySelector(".form").classList.add("hidden")
                        document.querySelector(".label").innerText  = `Draw ${this.#label[this.#index]}`
                         this.#allData.personalInfo  = this.user
                       
                        console.log(sketchBoard,this.user)

                })
           
        }

        getDrawDiagram()
        {
                document.querySelector(".content").onclick  = (evt)=>
                { 
                         if (evt.target.className === 'next') 
                         {     
                                this.#allData.objectDrawn.push( {[this.#label[this.#index]] :this.sketchBoard.getPath()} );
                                 console.log(this.#allData.objectDrawn)
                                this.sketchBoard.setPath([])
                                this.sketchBoard.reset2()

                                if (this.#index < this.#label.length-1) 
                                {
                                 
                                   
                                        this.#index++;
                                        document.querySelector(".label").innerText  = `Draw ${this.#label[this.#index]}`
                               
                                }else{
                                        document.querySelector(".content").classList.add("hidden")
                                        document.querySelector(".save-form").classList.remove("hidden") 
                                        this.#save()
                                }
                               
                              
                         } 
                          
                }
        }

        #save()
        {
                document.querySelector(".save-form").onclick  = (evt)=>
                { 
                         if (evt.target.className === 'save') 
                         {     let refValue  = `data:text/plain;charset=utf-8,${encodeURIComponent(JSON.stringify(this.#allData))}`;
                                let a  =  document.querySelector('a');

                               a.setAttribute("href", refValue)
                               let filename  = this.#allData.personalInfo.session+".json";
                               a.setAttribute("download", filename )
                               console.log(a)
                               a.click()
                               

                         }   
               }
        }
}
