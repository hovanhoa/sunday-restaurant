const Helper = require('./Helper');
const db = require('../config/db/DBconnection');
const bcrypt = require('bcrypt');

exports.showLogin = (req, res, next) => {
    res.render('login');
}

exports.showRegister = (req, res, next) => {
    res.render('register');
}

exports.login = (req, res, next) => {
    const userInput = {
        email: req.body.userName,
        password: req.body.password
    }
    
    let sql = 'SELECT * FROM accounts, restaurant_user WHERE email = ? AND accounts.restaurant_user_id = restaurant_user.id';
   
    db.query(sql, userInput.email, (err, result) => {
        if (err) throw err;
        if (result.length >= 1) {
            // console.log(result[0]);
            if (bcrypt.compareSync(userInput.password, result[0].password)) {
                req.session.user = result[0];
                if (result[0].role == 'A') {
                    res.redirect('/admin');
                }
                else {
                    res.redirect('/');
                }
            }
            else {
                res.render('login', { message: "Password is wrong" });
            }
        }
        else {
            res.render('login', { message: "This email is not existed" });
        }
    });

}
exports.register = (req, res, next) => {
    const userInput = {
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        image: 'avatar-default.jpg',
        role: 'C'
    }

    // Find if at least one user stored in database
    
    let sql = 'SELECT * FROM accounts, restaurant_user WHERE email = ? AND accounts.restaurant_user_id = restaurant_user.id';
    db.query(sql, userInput.email, (err, result) => {
        if (err) throw err;
        // One or more user are found
        if (result.length > 0) {
            res.render('register', { message: "This email has already used" });
        }

        else if (userInput.password !== userInput.confirmPassword) {
            res.render('register', { message: "Password is not matched" });
        }

        else {
            let pwd = userInput.password;
            userInput.password = bcrypt.hashSync(pwd, 10);

            const fullName = `${userInput.lastName} ${userInput.firstName}`;
            let sql = 'INSERT INTO restaurant_user SET name = ?, email = ?, role = ?';
            db.query(sql, [fullName, userInput.email, userInput.role], (err, result) => {
                if (err) throw err;
                else {
                    let sql = 'SELECT id FROM restaurant_user WHERE email = ?';
                    db.query(sql, [userInput.email], (err, result) => {
                        if (err) throw err;
                        if (result) {
                            const today = new Date();
                            let day = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
                            sql = 'SET FOREIGN_KEY_CHECKS=0; INSERT INTO accounts (password, create_date, profile_picture, restaurant_user_id) VALUES (?, ?, ?, ?); SET FOREIGN_KEY_CHECKS=1;';
                            db.query(sql, [userInput.password, day, userInput.image, result[0].id], (err, result) => {
                                if (err) throw err;
                                res.render('login', { message: "Registerd successfully" });
                            })
                        }   
                    })
                    
                }
            });
        }

    });
}

exports.loggout = (req, res, next) => {
    if (req.session.user) {
        req.session.destroy(() => {
            res.redirect('/');
        });
    }
}