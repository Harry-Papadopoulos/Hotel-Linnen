// let arrival = new Date(2021, 6, 25);
// let departure = new Date(2021, 6, 8);

import Swal from "sweetalert2";

//Calculate the length of the stay in days
function stayLength(arrival, departure) {
  let stay = (departure - arrival) / (1000 * 60 * 60 * 24);
  return stay;
}

// Adds the change interval to the date, date= the date we want to add to
// and days= how many days we want to add.
function addDays(date, days) {
  const copy = new Date(Number(date));
  copy.setDate(date.getDate() + days);
  return copy.toDateString();
}

// Calculate which days the sheets need to be changed, arrival= arrival date
// days= how long the stay is
function changeSheets(arrival, days) {
  let dates = [];
  if (days <= 4) {
    dates.push("No sheet change needed.");
  } else if (days >= 5 && days <= 6) {
    dates.push(addDays(arrival, 3));
  } else if (days >= 7 && days <= 8) {
    dates.push(addDays(arrival, 4));
  } else if (days === 9) {
    dates.push(addDays(arrival, 3));
    dates.push(addDays(arrival, 6));
  } else if (days === 10) {
    dates.push(addDays(arrival, 4));
    dates.push(addDays(arrival, 7));
  } else if (days >= 11 && days <= 12) {
    dates.push(addDays(arrival, 4));
    dates.push(addDays(arrival, 8));
  } else if (days === 13) {
    dates.push(addDays(arrival, 4));
    dates.push(addDays(arrival, 7));
    dates.push(addDays(arrival, 10));
  } else if (days === 14) {
    dates.push(addDays(arrival, 4));
    dates.push(addDays(arrival, 8));
    dates.push(addDays(arrival, 11));
  } else {
    for (let i = 4; i < days.length; i = i + 4) {
      dates.push(addDays(arrival, i));
    }
  }
  return dates;
}

// } else if (days % 3 === 1) {
//   if (days - 4 === 0) {
//     dates.push(addDays(arrival, 2));
//   } else {
//     let firstDays = days - 4;
//     for (let i = 3; i <= firstDays; i = i + 3) {
//       dates.push(addDays(arrival, i));
//     }
//     dates.push(addDays(arrival, days - 2));
//   }
// } else {
//   for (let i = 3; i < days; i = i + 3) {
//     dates.push(addDays(arrival, i));
//   }
// }

// Calculate which days the towels need to be changed
// arrival = the arrival date, days = how long the stay is
function changeTowels(arrival, days) {
  let dates = [];
  if (days <= 2) {
    dates.push("No towel change needed.");
  } else {
    for (let i = 2; i < days; i = i + 2) {
      dates.push(addDays(arrival, i));
    }
  }
  return dates;
}

// Return the list key from the room number chosen
function roomKey(roomNumber) {
  return "R" + roomNumber;
}

// make the changes object for each room
function changes(sheets, towels) {
  return { sheets: sheets, towels: towels };
}

// Calculate the next days sheet changes.
function nextDaysSheetChanges(roomsList) {
  let tomorrow = addDays(new Date(), 1);
  let roomsForSheetChange = [];
  for (let room in roomsList) {
    for (let i = 0; i < roomsList[room].sheets.length; i++) {
      if (tomorrow === roomsList[room].sheets[i]) {
        roomsForSheetChange.push(room);
        continue;
      }
    }
  }
  return roomsForSheetChange.sort().join(", ");
}

// Calculate the next days towel changes.
function nextDaysTowelChanges(roomsList) {
  let tomorrow = addDays(new Date(), 1);
  let roomsForTowelChange = [];
  for (let room in roomsList) {
    for (let i = 0; i < roomsList[room].towels.length; i++) {
      if (tomorrow === roomsList[room].towels[i]) {
        roomsForTowelChange.push(room);
        continue;
      }
    }
  }
  return roomsForTowelChange.sort().join(", ");
}

// Sort rooms in order for them to be displayed in the status screen
function sortRooms(rooms) {
  return Object.keys(rooms)
    .sort()
    .reduce(function (result, key) {
      result[key] = rooms[key];
      return result;
    }, {});
}

//Turn the sheet and towel dates into strings
function makeDatestoString(theArray) {
  return theArray.join(", ");
}

function makeStatusStrings(rooms) {
  let roomsObject = sortRooms(rooms);
  let displayArray = [];
  for (let room in roomsObject) {
    let sheetsString = makeDatestoString(roomsObject[room].sheets);
    let towelsString = makeDatestoString(roomsObject[room].towels);
    displayArray.push(
      `${room}: SHEETS - ${sheetsString} / TOWELS - ${towelsString}`
    );
  }
  return displayArray;
}

// // Calculate which changes are to be made the next day.
// function tomorrowsChanges(rooms) {
//   let tomorrow = addDays(new Date(), 1);
//   let sheets = [];
//   let towels = [];
//   let roomsArray = Object.entries(rooms);

//   for (let room = 0; room < roomsArray.length; room++) {
//     for (let i = 0; i < roomsArray[room][1][0].length; i++) {
//       if (tomorrow === roomsArray[room][1][0][i]) {
//         sheets.push(roomsArray[room][0]);
//       }
//     }
//     for (let j = 0; j < roomsArray[room][1][1].length; j++) {
//       if (tomorrow === roomsArray[room][1][1][j]) {
//         towels.push(roomsArray[room][0]);
//       }
//     }
//   }
//   return [sheets, towels];
// }

// make the string for tommorow's changes
function tomorrowString(rooms) {
  let sheetsString = "SHEETS: ";
  let towelsString = "TOWELS: ";
  if (Array.isArray(rooms[0])) {
    for (let i = 0; i < rooms[0].length; i++) {
      sheetsString = sheetsString + rooms[0][i] + ", ";
    }
  }
  if (Array.isArray(rooms[1])) {
    for (let i = 0; i < rooms[1].length; i++) {
      towelsString = towelsString + rooms[1][i] + ", ";
    }
  }
  return [sheetsString, towelsString];
}

export {
  stayLength,
  changeSheets,
  changeTowels,
  roomKey,
  changes,
  tomorrowString,
  nextDaysSheetChanges,
  nextDaysTowelChanges,
  makeStatusStrings,
};
