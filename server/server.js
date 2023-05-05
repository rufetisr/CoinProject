// const { urlencoded } = require('express');
let exp = require('express');
let fs = require('fs');
let app = exp();
let connection = require('./db');
let cors = require('cors');
const { log } = require('console');
// const { log } = require('console');

app.use(cors());
app.use(exp.json());
app.use(exp.urlencoded({ extended: true }));

app.listen(400, () => {
    console.log('Server on port 400');
})
// imgFr, imgBk src url-i deyisdirmek Database-de
// fs.readFile('./server/coinTypes.json', (err, data) => {
//     if (!err) {
//         let coinTypes = JSON.parse(data);
//         let urls = [];
//         coinTypes.forEach(item => {
//             item.coins.forEach((coin) => {
//                 urls.push(coin.imgFr);
//             })
//         });
//         console.log(urls);

//         for (let i = 0; i < urls.length; i++) {
//             connection.query(`update Coin
//         set ImgFr = '${urls[i]}'
//         where CoinId = ${i+1}`, (err, res) => {
//                 if (!err) {
//                     console.log(res);
//                 }
//                 else{
//                     console.error(err);
//                 }
//             })
//         }
//     }
//     else {
//         console.error(err);
//     }
// })

app.post('/addcointype', (req, res)=>{
    let {typeName, img} = req.body;
    console.log(typeName.toLowerCase() + "\n" + img);
    if (typeName.toLowerCase().search('coin')) {
        console.log(true);
    //    let index = typeName.toLowerCase().search('coins');
       typeName = typeName.split("coin")[0].toLowerCase().trim();
    }
    // console.log(typeName + "f");

    connection.query(`insert into CoinType (TypeName, Img, Path) values
    ('${typeName}', '${img}', '/${typeName}');`, (err, result)=>{
        if (!err) {
            console.log(result);
            res.status(200).send('Succes');
        }
        else {
            try {
                throw res.status(500).send(err);
            } catch (error) {
                console.log('Added coin type found another field!');
            }
        }
    })
})

app.post('/signup', (req, res) => {
    console.log('apply api');
    console.log(req.body);
    let { email, username, password, createAccTime, imgUrl } = req.body.user;

    connection.query(`insert into Users (email, username, password, SignUpTime, Picture) values
    ('${email}', '${username}', '${password}', '${createAccTime}', '${imgUrl}');`, (err, result) => {
        if (!err) {
            console.log(result);
            res.status(200).send('Success')
        }
        else {
            try {
                throw res.status(500).send(err);
            } catch (error) {
                console.log(error);
            }
        }
    })
    // res.status(200).send('Success Sign up');
    // res.send('Api running');
})


app.post('/loginTime', (req, res)=>{
    let {name, email, logTime} = req.body;
    console.log(logTime + "," + name + ',' + email);
    // console.log(user);
    connection.query(`update Users
    set LogTime = "${logTime}"
    where Username = '${name}'`, (err, data)=>{
        if (!err) {
            res.status(200).send('Log time changed');
        }
        else{
            res.status(500).send();
        }
    })
})

app.post('/login', (req, res) => {
    let { name, password} = req.body;

    connection.query(`select * from
    users;`, (err, data) => {
        if (!err) {
            // console.log(data);
            // res.send(data);
            let user = data.find((item) => {
                return (item.Email == name || item.Username == name) && item.Password == password;
            })

            //    else{
            //     console.log("Not found!!!!");            
            //    }
            // user-in id-sini change edib gonderdik
            if (user != undefined) {
                user = {
                    ...user,
                    UserId: 45444 + user.UserId
                }

                res.status(200).send(user);
            }
            else {
                try {
                    throw res.status(404).send(`Not Found this user!`);
                } catch (error) {
                    console.log("Not found user");
                }
            }


        }
        else {
            res.status(500).send();
        }
    })
})

app.post('/isAdmin', (req, res)=>{
    let {name, password} = req.body;
    connection.query(`select * 
    from Admin;`, (err, data)=>{
        if (!err) {
           let admin = data.find((item)=>{
               return (item.Email == name || item.AdminName == name) && item.Password == password;
            })

            if (admin != undefined) {
                res.status(200).send(admin);
            }
            else{
                try {
                    throw res.status(404).send(`Not Found this user!`);
                } catch (error) {
                    console.log("Not found admin");
                }
            }
        }
    })

})

app.get('/cointypes', (req, res) => {
    console.log('cointypes');
    connection.query(`select *
    from CoinType;`, (err, data) => {
        if (!err) {
            res.json(data);
        }
        else {
            console.error(err);
        }
    })
})

// get coins list for this type
app.get('/:type', (req, res) => {
    let { type } = req.params;

    connection.query(`select C.*
    from Coin C inner join CoinType CT
    On C.TypeId = CT.TypeId
    where CT.TypeName = '${type}';`, (err, data) => {
        if (!err) {
            // console.log(data);
            return res.status(200).json(data);
        }
        return res.status(500).send('Not found');
    })
})
// app.get('/bullion', (req, res) => {
//     connection.query(`select C.*
//     from Coin C inner join CoinType CT
//     On C.TypeId = CT.TypeId
//     where CT.TypeName = 'Bullion';`, (err, data) => {
//         if (!err) {
//             console.log(data);
//             return res.status(200).json(data);
//         }
//         return res.status(500).send();
//     })
// })
// app.get('/exclusive', (req, res) => {
//     connection.query(`select C.*
//     from Coin C inner join CoinType CT
//     On C.TypeId = CT.TypeId
//     where CT.TypeName = 'Exclusive';`, (err, data) => {
//         if (!err) {
//             return res.status(200).json(data);
//         }
//         return res.status(500).send();
//     })
// })

// let coinTypes = [];
let coins = [];

//select coins when server is running
//burda 2 table-i birlesdiririk, eyni column-lardan sonuncunu goturecek, mes 
//2 table-da da Name adli column var, ona gore COinType table-in Name -ni goturecek.
connection.query(`select *
    from Coin C inner join CoinType CT
    On C.TypeId = CT.TypeId;`, (err, data) => {
    // console.log('get coins');
    if (!err) {
        coins = data;
        // console.log(coins);
        // res.send(coins);
    }
    else {
        console.error(err);
    }
});

//app -de route-lar ucun /bullion/4, /bullion/5, ...
app.get('/', (req, res) => {
    res.send(coins);
})
// connection.query(`select *
//     from Coin;`, (err, data) => {
//     if (!err) {
//         coins = data;
//     }
//     else {
//         console.error(err);
//     }
// });

// get coin details that gives type & id
app.get(`/:type/:id`, (req, res) => {
    // console.log(coins);
    let { type, id } = req.params;
    id = parseInt(id);
    // console.log(typeof id);
    // console.log(type);
    // console.log(parseInt(id));
    // res.send(type);

    // let isFind = coinTypes.find((item) => {
    //     return item.Name == type;
    // })

    // // isFind != undefined ? res.status(200).send(isFind) : res.status(404).send("Not found coin on this coin type");

    // let coin = coins.find((item)=>{
    //     return item.CoinId == id && isFind != undefined;
    // })

    // coin != undefined ? res.status(200).send(coin) : res.status(404).send('Not found coin on this id');

    let isFind = coins.find((item) => {
        return item.TypeName == type && item.CoinId == id;
    })

    isFind != undefined ? res.status(200).send(isFind) : res.status(404).send("Not found coin on this coin type and id");

})

app.get('/api', (req, res) => {
    res.send('Api running');
})


// app.post('/user', (req, res) => {
//     let { email, pass, username } = req.body;
//     connection.query(`
//     insert into Users (email, login, password) values
//     ('${email}', '${username}', '${pass}')`, (err, data) => {
//         if (!err) {
//             console.log(data);
//             res.status(200).send('Successfully registration');
//         }
//         else {
//             console.error(err);
//             res.status(500).send();
//         }
//     })
// })




// app.get('/coins', (req, res) => {
//     console.log('get req');
//     fs.readFile('./coinTypes.json', (err, data) => {
//         if (!err) {
//             let coinTypes = JSON.parse(data);
            // let str = '';
            // coinTypes.forEach(item => {
            //      str += `<p>${item.coins.name}</p>`;
            //      str += `<p>${item.name}</p>`;
            //      str += `<p>${item.name}</p>`;
            //      str += `<p>${item.name}</p>`;

            // });

            //             coinTypes.forEach(i => {

            //                 connection.query(`insert into CoinType (Name, Img, Path) values
            //  ('${i.name}', '${i.img}', '${i.path}');`, (err, res) => {
            //                     if (!err) {
            //                         console.log(res);
            //                     }
            //                     else {
            //                         console.error(err);
            //                     }
            //                 })
            //             });

//             let comme = coinTypes[2].coins;
//             res.send(comme);
//             comme.forEach(i => {
//                 connection.query(`insert into Coin (Name, ShortDesc, LongDesc, ImgFr, ImgBk, Country, Composition, Quality, Denomination, Year, Weight, Price, TypeId) values
//                 ("${i.name}",
//                 '${i.shortDesc}'
//                 ,'${i.longDesc}','${i.imgFr}',
//                 '${i.imgBk}', '${i.country}',
//                  '${i.composition}', '${i.quality}', '${i.denomination}', ${i.Year}, ${i.Weight}, ${i.Price}, ${i.typeId});`, (err, res) => {
//                     if (!err) {
//                         console.log(res);
//                     }
//                     else {
//                         console.error(err);
//                     }
//                 })
//             });

//         }
//         else {
//             console.error(err);
//         }
//     })
// })