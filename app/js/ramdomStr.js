export const randomStr =  (length,include_spacial_char=false,random_lenght=false,number_only=false)=> {
        /**
         * Math.random()*length+length generate random str minimum value is +legth max is lenght+length
         * @return string
        */
        length  = random_lenght? Math.floor(Math.random()*length+length) :length;
         let result           = ''
         let spacials  = '@$&#*!%'
         let characters       =number_only? (`0123456789`): (`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789${include_spacial_char?spacials:''}`);
         let charactersLength = characters.length;
         for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
            
        }
        return result;
     }
     
     