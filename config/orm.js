var connection = require("./connection.js");
//function to generate question marks for query string
function generateQuestionMarks(num) {
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push("?").toString();
  }
  return arr;
}
//function to change burger object into sql
function objectToSql(ob) {
  var arr = [];
  for (var key in ob) {
    var value = ob[key];
    if (Object.hasOwnProperty.call(ob, key)) {
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      arr.push(key + "=" + value).toString();
    }
  }
  return arr;
}

var orm = {
  //select all method to select all burger data
  selectAll: function (tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  // function to insert one burger into sql
  insertOne: function (table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;
    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += generateQuestionMarks(vals.length);
    queryString += ") ";
    connection.query(queryString, vals, function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  // function to update one burger
  updateOne: function (table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;
    queryString += " SET ";
    queryString += objectToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;
    connection.query(queryString, function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  //function to delete burger
  delete: function (table, condition, cb) {
    var queryString = "DELETE FROM " + table;
    queryString += " WHERE ";
    queryString += condition;
    connection.query(queryString, function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  //function to delete all burgers
  deleteAll: function (table, cb) {
    var queryString = "DELETE FROM " + table;
    connection.query(queryString, function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },
};
module.exports = orm;
