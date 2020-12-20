/** @format */

export const build_peopleList_newActivity = (peopleList) => {
  var list = [];
  for (var i = 0; i < peopleList.length; i++) {
    var p = peopleList[i];
    var item = {
      id: p.id,
      name: p.name,
      value: p.id,
      label: p.name,
      isParticipating: true,
    };
    list.push(item);
  }
  return list;
};

function alreadyExists(inputID, pickerList) {
  var exists = false;
  for (let i = 0; i < pickerList.length; i++) {
    if (inputID === pickerList[i].id) {
      exists = true;
    }
  }
  return exists;
}

export const build_peopleList_editActivity = (
  current_peopleList,
  activity_pickerList
) => {
  // add in new people that aren't in current_peopleList
  for (let i = 0; i < current_peopleList.length; i++) {
    // if found, update
    if (alreadyExists(current_peopleList[i].id, activity_pickerList)) {
      // update
      for (let a = 0; a < activity_pickerList.length; a++) {
        if (current_peopleList[i].id === activity_pickerList[a].id) {
          activity_pickerList[a].name = current_peopleList[i].name;
          activity_pickerList[a].value = current_peopleList[i].id;
          activity_pickerList[a].label = current_peopleList[i].name;
        }
      }
    }
    // else: if doesn't exist: new
    else {
      var item = {
        id: current_peopleList[i].id,
        name: current_peopleList[i].name,
        value: current_peopleList[i].id,
        label: current_peopleList[i].name,
        isParticipating: true,
      };
      activity_pickerList.push(item);
    }
  }
  return activity_pickerList;
};

export const build_participantList_from_pickerList = (tripID, pickerList) => {};
