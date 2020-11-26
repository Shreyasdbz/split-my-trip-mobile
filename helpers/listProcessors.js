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
      isParticipating: false,
    };
    list.push(item);
  }
  return list;
};
