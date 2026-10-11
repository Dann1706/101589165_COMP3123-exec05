const express = require('express')
const routerUser = express.Router()
const router = routerUser

/*
- Return all details from user.json file to client as JSON format
*/


const fs = require('fs')
const path = require('path')




router.get('/profile', (req, res) => {
    const filePath = path.join(__dirname, '../user.json');
    res.sendFile(filePath);
});

/*
- Modify /login router to accept username and password as JSON body parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/

router.post('/login', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    const filePath = path.join(__dirname, '../user.json');

    fs.readFile(filePath, 'utf8', (err, data) => {

        if (err) {
            return res.status(500).send('Server Error');
        }

        let user;

        try {
            user = JSON.parse(data);
        } catch (error) {
            return res.status(500).send('Server Error');
        }

        if (username !== user.username) {
            return res.json({
                status: false,
                message: "User Name is invalid"
            });
        }

        if (password !== user.password) {
            return res.json({
                status: false,
                message: "Password is invalid"
            });
        }

        return res.json({
            status: true,
            message: "User Is valid"
        });

    });

});
/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout/:username', (req, res) => {

    const username = req.params.username;

    res.send(`<b>${username} successfully logged out.</b>`);

});


module.exports = routerUser;