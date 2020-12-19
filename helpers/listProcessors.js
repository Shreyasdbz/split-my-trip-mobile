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

export const build_peopleList_editActivity = (
  current_peopleList,
  activity_pickerList
) => {
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

export const build_participantList_from_pickerList = (tripID, pickerList) => {};
