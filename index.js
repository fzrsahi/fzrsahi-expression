import express from "express";
import mysql from "mysql";
import session, { Session } from "express-session";
import bcrypt from "hash";

// const asd = bcrypt();
// console.log(asd)

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "expression",
});

connection.connect((err) => {
  if (err) {
    console.log("Database Connection Failed !!!", err);
  } else {
    console.log("connected to Database");
  }
});

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "my_secret_key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use((req, res, next) => {
  if (req.session.userId === undefined) {
    res.locals.username = "Guest";
    res.locals.isLoggedIn = false;
  } else {
    res.locals.isLoggedIn = true;
    res.locals.username = req.session.username;
    // res.locals.emailIsExist = '';
    // res.locals.passwordSalah = '';
  }
  next();
});

app.get("/", (req, res) => {
  connection.query(
    " select quotes.id ,users.username, quotes.title,quotes.words from quotes join users on quotes.users_id = users.id",
    (e, result) => {
      const data = JSON.stringify(result);
      e ? console.log(e) : console.log(result);
      res.render("index.ejs", { result: [] });
    }
  );
});

app.post(
  "/login",
  (req, res, next) => {
    const { email } = req.body;
    const errors = [];
    connection.query(
      "select * from users where email = ?",
      [email],
      (e, results) => {
        if (!results.length > 0) {
          res.render("index.ejs");
        } else {
          next();
        }
      }
    );
  },
  (req, res) => {
    const { email, password } = req.body;
    connection.query(
      "select * from users where email = ?",
      [email],
      (e, result) => {
        if (result.length > 0) {
          if (password === result[0].password) {
            req.session.userId = result[0].id;
            req.session.username = result[0].username;
            // res.locals.userId = result[0].id;
            console.log(req.session.username);
            console.log(result[0].id);
            res.redirect("/");
          } else {
            // const passwordSalah = true;
            res.locals.passwordSalah = true;
            console.log("pass salah");
            connection.query(
              " select users.username, quotes.title,quotes.words from quotes join users on quotes.users_id = users.id",
              (e, result) => {
                const data = JSON.stringify(result);
                e ? console.log(e) : console.log(data);
                res.render("index.ejs", { result: result });
              }
            );
          }
        }
      }
    );
  }
);

app.post(
  "/regis",
  (req, res, next) => {
    const email = req.body.email;
    connection.query(
      "select * from users where email = ?",
      [email],
      (e, results) => {
        if (results.length > 0) {
          // const emailIsExist = true;
          res.locals.emailIsExist = true;
          connection.query(
            " select users.username, quotes.title,quotes.words from quotes join users on quotes.users_id = users.id",
            (e, result) => {
              const data = JSON.stringify(result);
              e ? console.log(e) : console.log(data);
              res.render("index.ejs", { result: result });
            }
          );
          // res.render('index.ejs');
          console.log("email so terdaftar");
        } else {
          next();
        }
      }
    );
  },
  (req, res) => {
    const { username, email, password } = req.body;
    connection.query(
      "insert into users(username,email,password) values(?,?,?)",
      [username, email, password],
      (e, result) => {
        req.session.userId = result.insertId;
        req.session.username = username;
        connection.query(
          "select users.username, quotes.title,quotes.words from quotes join users on quotes.users_id = users.id"
        ),
          (e, result) => {
            res.redirect("/");
            console.log(result);
          };
      }
    );
  }
);

app.post(
  "/quotes",
  (req, res, next) => {
    if (!res.locals.isLoggedIn) {
      connection.query(
        " select users.username, quotes.title,quotes.words from quotes join users on quotes.users_id = users.id",
        (e, result) => {
          const data = JSON.stringify(result);
          e ? console.log(e) : console.log(data);
          res.render("index.ejs", { result: result });
        }
      );
      console.log("mohon login dulu banh");
    } else {
      next();
    }
  },
  (req, res) => {
    const username = req.session.username;
    const { title, quotes } = req.body;
    connection.query(
      "select * from users where username = ?",
      [username],
      (e, result) => {
        connection.query(
          "insert into quotes(users_id,title,words) values(?,?,?) ",
          [result[0].id, title, quotes],
          (e, result) => {
            e ? console.log(e) : console.log(result);
            connection.query(
              " select users.username, quotes.title,quotes.words from quotes join users on quotes.users_id = users.id",
              (e, result) => {
                const data = JSON.stringify(result);
                e ? console.log(e) : console.log(data);
                res.render("index.ejs", { result: result });
              }
            );
          }
        );
      }
    );
  }
);
// app.get('/:id',(req,res)=>{
//   console.log(req.params.id);
// })

app.get("/detail/:id", (req, res) => {
  connection.query(
    "select users.username, quotes.title,quotes.words from quotes join users on quotes.users_id = users.id where quotes.id = ?",
    [req.params.id],
    (error, results) => {
      console.log(req.params.id);
      const data = JSON.stringify(results);
      console.log(results);
      res.render("detail.ejs", { result: results });
    }
  );
});

// app.get('/:id', (req, res) => {
//   connection.query(
//     'SELECT * FROM items WHERE id = ?',
//     [req.params.id],
//     (error, results) => {
//       res.render('edit.ejs', {item: results[0]});
//     }
//   );
// });

app.get("/logout", (req, res) => {
  req.session.destroy((e) => {
    res.redirect("/");
  });
});

app.listen(PORT, () => console.log(`server berjalan di port ${PORT}`));
