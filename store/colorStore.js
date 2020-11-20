/** @format */

export const colorPalette = [
  {
    id: 1,
    colorName: "red-pink",
    base: "#FF6F6F",
    secondary: "#D16FFF",
  },
  {
    id: 2,
    colorName: "green-blue",
    base: "#6FFFCB",
    secondary: "#6FDCFF",
  },
  {
    id: 3,
    colorName: "blue-yellow",
    base: "#6FCBFF",
    secondary: "#FFF96F",
  },
  {
    id: 4,
    colorName: "orange-pink",
    base: "#F2AF70",
    secondary: "#EC8EC6",
  },
  {
    id: 5,
    colorName: "blue-skyBlue",
    base: "#6FA0FF",
    secondary: "#6FFFF6",
  },
  {
    id: 6,
    colorName: "orange-EC8EC6",
    base: "#F2AF70",
    secondary: "#D16FFF",
  },
  {
    id: 7,
    colorName: "orange-EC8EC6",
    base: "#F2AF70",
    secondary: "#D16FFF",
  },
];

export function getColorByID(colorID) {
  var rtnColor = {
    id: 0,
    colorName: "default",
    base: "#FF6F6F",
    secondary: "#FF6F6F",
  };

  for (let i = 0; i < colorPalette.length; i++) {
    if (colorPalette[i].id === colorID) {
      rtnColor = {
        id: colorID,
        colorName: colorPalette[i].colorName,
        base: colorPalette[i].base,
        secondary: colorPalette[i].secondary,
      };
    }
  }
  return rtnColor;
}
