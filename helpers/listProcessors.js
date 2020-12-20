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

function idDoesntExistInPickerList(inputID, pickerList) {
  var found = false;
  for (let i = 0; i < pickerList.length; i++) {
    if (inputID === pickerList[i].id) {
      found = true;
    }
  }
  if (found === false) {
    return true;
  } else {
    return false;
  }
}

export const build_peopleList_editActivity = (
  current_peopleList,
  activity_pickerList
) => {
  var list = activity_pickerList;
  // add in new people that aren't in current_peopleList
  for (let i = 0; i < current_peopleList; i++) {
    // see if doesn't exists in activity picker list
    if (
      idDoesntExistInPickerList(current_peopleList[i].id, activity_pickerList)
    ) {
      // add to activity_pickerList
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
  return list;
};

export const build_participantList_from_pickerList = (tripID, pickerList) => {};
