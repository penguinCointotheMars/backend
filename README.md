# Backend service API Description

url = http://prototypeserver.net:3000/


## 1. Home 


GET : / : show server connection

        {
          "message": "😉server is connected!! 너와.나으.연결.고리"
        }






## 2. User Join and Login




GET : /users
    : show all users (limit 100 users)
    
    
    
    
    
        
        < RESULT >
    
        {
                 "success": true,
                "user": [
                    {
                      "email": "penguin6@easygoing.com",
                      "name": "name",
                      "user_id": "71xv2_bltLjMmCUAEEZYM"
                    }, 
        }
        
        
        
        
        
        
POST : users/join 
     : local sign up (not SNS login)
     
     
     
     
     
        < INPUT (BODY) >
     
        {
                "email" : "penguin12@gmail.com",
                "password" : "1111eeee1",
                    "name" : "MrPeng",
                    "birthDate" : "2021-04-01",
                    "address" : "Lexington Avenue",
                    "phoneNumber" : "1111111111",
                    "userType" : "tenant",
                    "description" : "I'm a Penguin from North Land"
        }
        
        
        
        < RESULT > 
        
        
        {
                    "success": true,
                    "message": "You are successfully registered",
                    "user": {
                        "email": "penguin13@gmail.com",
                        "user_id": "yRJ38T8vA5l556NT4tFp5"
                    }
        }
        
     
     
     
     
     
POST : users/login
     : local login
     
     
     
     



        < INPUT (BODY) >
        
        
        {
                    "email": "penguin12@gmail.com",
                    "password" : "1111eeee1"
        }


        < RESULT > 
      
      
        {
                    "success": true,
                    "user": {
                        "email": "penguin12@gmail.com",
                        "user_id": "qEdXkEphava4CxfeDi4_n"
                    },
                    "message": "Login success"
        }
        
        
        
        
 
 
 POST : users/edit-profile
     : edit profile. user can upload their avata image file.







        < INPUT (BODY) >
        
        
        {
                    "avatar" : file
                    "email" : "penguin12@gmail.com",
                    "address" : "Lexington Avenue",
                    "phoneNumber" : "1111111111",
                    "userType" : "tenant",
                    "description" : "I'm a Penguin from North Land",
                    "user_id": "qEdXkEphava4CxfeDi4_n"
                    
                    
        }
        
        ** file : image file


        < RESULT > 
      
      
        {
                        "success": true,
                        "user": {
                        "address": "moving iceverg",
                        "phone_number": "11111111",
                        "user_type": "landord",
                        "description": "Penguin",
                        "profile_url": "https://easygoing.s3.amazonaws.com/avatar/428d657f92bbcd69f316b7e66bd354ae"
                    },
                        "message": "😉 user profile update is completed!"
        }
     
