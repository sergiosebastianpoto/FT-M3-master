const fs = require("fs");
const request = require("request");

module.exports = {
  pwd: function (arg, done) {
    done(process.cwd());
  },
  date: function (arg, done) {
    done(Date());
  },
  ls: function (arg, done) {
    fs.readdir(".", function (err, files) {
      if (err) throw err;
      let out = "";
      files.forEach(function (file) {
        //process.stdout.write(file.toString() + "\n");
        out = out + file + "\n";
      });
      //process.stdout.write("prompt > ");
      done(out);
    });
  },
  echo: function (arg, done) {
    done(arg.join(" "));
  },
  cat: function (file, done) {
    fs.readFile(file[0], "utf8", function (err, data) {
      if (err) throw err;
      // process.stdout.write(data)
      // process.stdout.write('\nprompt > ')
      done(data);
    });
  },
  head: function (file, done) {
    fs.readFile(file[0], "utf8", function (err, data) {
      if (err) throw err;
      var lines = data.split("\n").slice(0, 9).join("\n");
      // process.stdout.write(lines)
      // process.stdout.write('\nprompt > ')
      done(lines);
    });
  },
  tail: function (file, done) {
    fs.readFile(file[0], "utf8", function (err, data) {
      if (err) throw err;
      var lines = data.split("\n").slice(-10).join("\n");
      // process.stdout.write(lines)
      // process.stdout.write('\nprompt > ')
      done(lines);
    });
  },
  curl: function (url, done) {
    request(url[0], function (err, response, body) {
      if (err) throw err;
      // process.stdout.write(body)
      // process.stdout.write('\nprompt > ')
      done(body);
    });
  },
};
//cat, head, y tail
