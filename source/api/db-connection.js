const { Connection, Request, TYPES } = require("tedious");
require("dotenv").config({ path: __dirname + "/.env" });
// TODO - Authenticate using NTLM
// const os = require("os");

var config = {
  server: process.env.SQL_SERVER,
  options: {
    instanceName: "SQLEXPRESS",
    database: process.env.SQL_DB,
    rowCollectionOnDone: true,
    useColumnNames: true,
    trustServerCertificate: true
  },
  authentication: {
    type: "default",
    options: {
      userName: process.env.SQL_UNAME,
      password: process.env.SQL_PSWD
      // domain: process.env.SQL_DOMAIN,
      // domain: os.hostname(),
    }
  }
};

var connection = new Connection(config);
connection.on("connect", function (err) {
  if (err) console.log(err);
  else {
    console.log("Connected");
  }
});

connection.on("end", () => {
  console.log("Connection closed");
});

connection.on("error", (err) => {
  console.error("ERROR", err);
});
connection.connect();

/**
 * Exectutes a query in the SQL Server database
 * @param {String} statementType - SELECT, INSERT, UPDATE, DELETE
 * @param {String} query - Pass the query string
 * @param {String} queryParameters - Object containing columns to be inserted / updated [{columnName: "String", dataType="String", value="String"}]
 * @returns Promise<Array<T>>
 */
function executeQuery(statementType, query, queryParameters) {
  if (statementType === "SELECT") {
    return new Promise((resolve, reject) => {
      try {
        var request = new Request(query, function (err) {
          if (err) {
            console.log(err, "here1");
          }
        });
        var resultSet = [];
        request.on("row", function (columns) {
          if (columns) {
            console.log(columns);
            resultSet.push(columns);
          }
        });

        request.on("done", function (rowCount, more) {
          console.log(rowCount + " rows returned");
        });

        request.on("requestCompleted", function (rowCount, more) {
          console.log("Request completed.");
          resolve(resultSet);
          // return resultSet;
        });

        connection.execSql(request);
      } catch (error) {
        reject(error);
      }
    });
  } else if (statementType === "INSERT") {
    return new Promise((resolve, reject) => {
      try {
        var request = new Request(query, function (err) {
          if (err) {
            console.log(err);
          }
        });
        queryParameters.forEach((parameter) => {
          request.addParameter(
            parameter.columnName,
            TYPES[parameter.dataType],
            parameter.value
          );
        });
        request.on("row", function (columns) {
          columns.forEach(function (column) {
            if (column.value === null) {
              console.log("NULL");
            } else {
              console.log("Inserted item is " + column.value);
            }
          });
        });

        request.on("requestCompleted", function (rowCount, more) {
          resolve(true);
          console.log("Request completed.");
        });
        connection.execSql(request);
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = executeQuery;
