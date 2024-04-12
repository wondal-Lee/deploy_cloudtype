// ngrok-v3-stable-windows-amd64.zip 파일을 c://windows밑에 압축을 풀면 언디듣 사용가능함
// ngrok config add-authtoken 2dwEBSPRtwUXqkPm6kRxBnASGpo_5btKJiWunak1efJKCi7x8
// ngrok http http://localhost:8080        // 외부 터미날에 연결
// Forwarding   https://f4f5-175-214-28-198.ngrok-free.app -> http://localhost:8080
//                    위항목 클릭 (url 은 그때그때 바뀜)
//  ngrok http http://localhost:8000 동작 실행

/* 
https://playcode.tistory.com/64
netstat -a -o

taskkill /f /pid 8080
 */
//////////////////////////////////////////////////////////////////////////////////
//  http로 전달하도록 ngrok를 지정    ~~ https://stackoverflow.com/questions/72744384/how-do-you-force-ngrok-to-forward-to-http-and-not-https
// ngrok http --scheme=http 4545 --host-header=localhost:4545   //
// ngrok http --scheme=http 8000 --host-header=localhost:8000   //
// ngrok http --scheme=http 8000 --host-header=localhost:8000  upgrade-insecure-requests' //
//////////////////////////////////////////////////////////////////////////////////////
// ngrok http 8080 --response-header-add='Content-Security-Policy: upgrade-insecure-requests'
// ngrok http --scheme=http 8000 --host-header=http://localhost:8000


// nodemon app           // NodeJS 실행     npm install -g nodemon
// nodemon 1nodejs.js           // NodeJS 실행     npm install -g nodemon

// npm init -y
// npm install express
// npm install -g nodemon
//  npm install mongodb@5
//  npm install ejs

//  powershall에서   npm install -g ngrok ( powershall에서 )
// 터미날에서 ngrok config add-authtoken 2dwEBSPRtwUXqkPm6kRxBnASGpo_5btKJiWunak1efJKCi7x8


////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////
// public ->  env.js -> NGROK_URL를 새로 작성 후 test
//////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////
// public ->  env.js -> NGROK_URL를 새로 작성 후 test
//////////////////////////////////////////////////////////////////////

// const dotenv = require('dotenv');
// dotenv.config();

const express = require('express');



const path = require('path');
const app = express() ;
const fs = require('fs').promises;
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors') ;
const port = 3000 ;







// ejs : 7.웹페이지에 DB데이터 꽂기 (EJS, 서버사이드 렌더링) 
//  views/list.ejs 
app.set('view engine', 'ejs')  ;  //  npm install ejs
//app.set('PORT', process.env.PORT || 3000);

app.use(morgan('dev'));  // 로그인 정보 알려줌 : dev(개발시) combined(배포시), common, short, tiny 
app.use(express.json())      ;     // npm install express  // req.body로 쉽게 꺼내쓸 수 있게 도와주는 코드
app.use(express.urlencoded({extended:true})) ;  // req.body로 쉽게 꺼내쓸 수 있게 도와주는 코드
app.use(express.static(__dirname + '/public'))  ;// main.css 여러파일(staticfile) 찹조
// app.use('/',express.static(__dirname + '/public'))  ; // 경로별 공유 지정
// app.use('요청경로',express.static('실제경로'))  ;

app.use(cors()) ;


app.listen(port, () => {
// app.listen(PORT, () => {;
  console.log(`http://localhost:${port} 에서 서버 실행중`)
  })

process.on('uncaughtException', (err) => {
console.error('예기치 못한 에러  ', err);
});

////////////////////////////////////////////////////////////////////////


let user_data =  {                    
                    "apikey": "",     // TEST-API-KEY-URL (x) -> TEST-API-KEY-TALK( 0 )   
                    "member": "",
                    "merchant": "",
                    "bill": {
                        "bill_id":""    ,   // 꼭 20 자리 !!!
                        "hash": ""    , 
                        "product_nm":""    , 
                        "message":""    , 
                        "member_nm":""    , 
                        "phone":""    , 
                        "price":""    , 
                        "expire_dt":""    , 
                        "callbackURL": ""     
                     }        
                };
// 
///////////////////////////////////////////////////////////////

app.get('/', (req, res) => {     
  // req.session.name = 'dal' ;
  res.render('paymint_user.ejs')  
}) 


///////////////////// paymint ////////////////////////////////////////


app.get('/paymint_user', (req, res) =>{  
  // console.log(` ------------- 1. /paymint_user get -------------`)
  // console.log(`req.params : ${req.params}`)
  console.log(`\n------ http get /-----   ${new Date().toLocaleString()}`);
  res.render('paymint_user.ejs')  
})  

app.post('/paymint_user', (req, res) =>{  
  // console.log(` ------------- 1. /paymint_user get -------------`)
  console.log(`\n------ http get /-----   ${new Date().toLocaleString()}`);
  console.log(`\n\n paymint_user post : `, req.body)

  
})  


app.get('/paymint_localhost', (req, res) =>{    
  // console.log(` ------------- 3. /paymint_localhost get   -------------`)  
  console.log(`\n------ http get /-----   ${new Date().toLocaleString()}`);
  try {
    // console.log(`\n user_data : `, JSON.stringify(user_data) )
    console.log(`\n user_data : `, user_data )    
    // res.sendFile(__dirname + '/paymint_1.html')
    res.render('paymint_localhost.ejs',{ user_data : user_data})  
    //  TODO :  user_data : _id걸든, mogodb에 저장하든
  } catch(error) {
    console.log('paymint_localhost get error',error)
  } 
})  


app.post('/paymint_localhost', async (req, res) =>{
    // console.log(` ------------- 2. /paymint_1 post ---------------`)
    console.log(`\n------ http get /-----   ${new Date().toLocaleString()}`);
  
  var today = new Date();       
  var year = ('0' + (today.getFullYear())).slice(-2);
  var month = ('0' + (today.getMonth() + 1)).slice(-2);
  var day = ('0' + today.getDate()).slice(-2);
  var hour = ('0' + today.getHours()).slice(-2);
  var minutes = ('0' + today.getMinutes()).slice(-2);
  var seconds = ('0' + today.getSeconds()).slice(-2);  
  var Milliseconds =('000' + today.getMilliseconds()).slice(-3);  
  
  var _bill_id = "T1_"+year + month + day+"_"+hour+minutes+seconds+"_"+Milliseconds;
  var _phone = req.body.bill.phone;
  var _price = req.body.bill.price;
  var _member_nm = req.body.bill.member_nm ;
  var _product_nm = req.body.bill.product_nm ;
  var _message = req.body.bill.message 
  var _callbackURL = req.body.bill.callbackURL
  
  var dateString = year + '-' + month  + '-' + day+' '+hour+':'+minutes+':'+seconds;
  
 
  /////////////////   sha256   //////////////////////////////
  const crypto = require('crypto');
  // const pw = '20240319123456789004,01032677435,20001';
  const pw = _bill_id+","+_phone+","+_price ;
  let _hash = crypto.createHash('sha256').update(pw).digest('hex');
 
  console.log(`\npw : ${pw} \nsha256_hex : ${_hash}\n`);
   
  //////////////////////////////////////////////////////////
  user_data =         
            {
               "apikey": req.body.apikey   ,     // TEST-API-KEY-URL (x) -> TEST-API-KEY-TALK( 0 )   
                "member": req.body.member  ,
                "merchant": req.body.merchant ,
                "bill": {
                    "bill_id":_bill_id,
                    "hash":_hash,
                    "member_nm":_member_nm,
                    "phone":_phone,
                    "price":_price,
                    "product_nm":_product_nm,
                    "message":_message,                    
                    "expire_dt":"2024-12-31",
                    // "callbackURL": ""
                    "callbackURL":_callbackURL 
                }
            };
    
    
    console.log('paymint_localhost post -> user_data : ',user_data)

    let haha= { 
        "haha":"paymint_localhost post",
      "code":"0000",
      "message": "전송이 완료되었습니다"
    }

    res.send(haha)
    console.log(`\n\n console.log ` , haha)
    // res.render('./paymint_localhost.ejs',{user_data: user_data})

    
    
})
