const fs = require("fs");

module.exports = {
  saveData: (data) => {
    fs.writeFile("./linnenChanges.txt", data, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("All ok");
      }
    });
  },
  loadData: () => {
    fs.readFile("./linnenChanges.txt", "utf8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        let rooms = JSON.parse(data);
        return rooms;
      }
    });
  },
};
