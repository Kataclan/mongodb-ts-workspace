// [ from global ]
import * as express from "express";
import * as bodyParser from "body-parser";

// [ from local ]
import routes from "./routing/routes";
import G from './globals/G';
import { DB } from "./db/DB";
import { DBManager } from "./db/DBManager";

/////////////////////////////////////////////
//  
//    INITIALIZATIONS
//
//////////////////////////////////////////////

DB.init(G.Config.mongodbUrl);

//////////////////////////////////////////////
//  
//    EXPRESS
//
//////////////////////////////////////////////
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
};
app.use(allowCrossDomain);


app.use('/', routes);
app.use('/web', express.static(G.WwwRoot));

app.listen(G.Config.listenPort, () => {
  console.log(G.Config.startMessage);
});






