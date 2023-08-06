import { randomStr } from "./ramdomStr.js"

export default class User 
{
        constructor(sketchBoard)
        {     

                    this.user  = {}
                    this.validation  = []
          
                 
                document.querySelector("button.save").addEventListener('click' , ()=>{
                        this.user.name  = document.querySelector(`input.user`).value
                        this.user.session   = randomStr(30,false,false,false) ;
                        
                        if (!this.user.name)
                        {
                          return alert("User name is require")
                        }
                        document.querySelector(".content").classList.remove("hidden")
                        document.querySelector(".form").classList.add("hidden")
                        console.log(sketchBoard,this.user)

                })
           
        }
}
