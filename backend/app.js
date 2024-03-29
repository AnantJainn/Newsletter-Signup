const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")
const app = express()
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html")
});
app.post("/", function(req,res){
    const  firstName = req.body.fname;
    const  lastName = req.body.lname;
    const  email = req.body.email; 
    const  data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                } 
            }
            
        ]
    }

    // console.log(firstName, lastName, email);


    console.log(data);
    const jsonData = JSON.stringify(data)
    const url = "https://us18.api.mailchimp.com/3.0/lists/5e6a5fa871";
    const options = {
        method: "POST",
        auth: "Anant:057a00ecc484b7b4bff9ed8ad11c4c8a-us18"
    }
    const request = https.request(url, options, function(response){

        if(response.statusCode ==200){
            res.sendFile(__dirname + "/success.html")
        } else {
            res.sendFile(__dirname + "/failure.html")
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })

    })
    request.write(jsonData)
    request.end()
})

app.post("/failure", function(req,res){
    res.redirect("/")

})
app.listen(process.env.PORT || 9999, function() {
    console.log("Server is running on port 9999");
})


// API Key
// 057a00ecc484b7b4bff9ed8ad11c4c8a-us18

// List ID
// 5e6a5fa871