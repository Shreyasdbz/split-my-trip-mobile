/** @format */

export const colorPalette = [
  {
    id: 1,
    sortOrder: 1,
    colorName: "pomegranate",
    base: "#FF6F6F",
    secondary: "#D16FFF",
  },
  {
    id: 2,
    sortOrder: 2,
    colorName: "peach",
    base: "#ff946f",
    secondary: "#D16FFF",
  },
  // {
  //   id: 3,
  //   sortOrder: 3,
  //   colorName: "mango",
  //   base: "#ffc06f",
  //   secondary: "#D16FFF",
  // },
  {
    id: 4,
    sortOrder: 4,
    colorName: "lemon",
    base: "#ffda56",
    secondary: "#ff9f00",
  },
  // {
  //   id: 5,
  //   sortOrder: 5,
  //   colorName: "kiwi",
  //   base: "#6fff7c",
  //   secondary: "#ff6f9f",
  // },
  {
    id: 6,
    sortOrder: 6,
    colorName: "avocado",
    base: "#35ee84",
    secondary: "#6FDCFF",
  },
  // {
  //   id: 7,
  //   sortOrder: 7,
  //   colorName: "sky",
  //   base: "#6FCBFF",
  //   secondary: "#FFF96F",
  // },
  {
    id: 17,
    sortOrder: 17,
    colorName: "water",
    base: "#09C6F9",
    secondary: "#045DE9",
  },
  {
    id: 8,
    sortOrder: 8,
    colorName: "berry",
    base: "#6f9aff",
    secondary: "#ff6f9f",
  },
  {
    id: 9,
    sortOrder: 9,
    colorName: "eggplant",
    base: "#9e6fff",
    secondary: "#ff6f9f",
  },
  {
    id: 10,
    sortOrder: 10,
    colorName: "eggplant",
    base: "#D387AB",
    secondary: "#E899DC",
  },
  {
    id: 11,
    sortOrder: 11,
    colorName: "test",
    base: "#ff6fab",
    secondary: "#6fd6ff",
  },
];

// ------------------------------------------------------------------------
// Get the color object by ID
// ------------------------------------------------------------------------
export function getColorByID(colorID) {
  var rtnColor = {
    id: 0,
    colorName: "default",
    base: "#FF6F6F",
    secondary: "#D16FFF",
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

// ------------------------------------------------------------------------
// Get the color Base by ID
// ------------------------------------------------------------------------
export function getColorBase(colorID) {
  var base = "#FF6F6F";

  for (let i = 0; i < colorPalette.length; i++) {
    if (colorPalette[i].id === colorID) {
      base = colorPalette[i].base;
    }
  }
  return base;
}

// ------------------------------------------------------------------------
// Get the color Base by ID
// ------------------------------------------------------------------------
export function getColorSecondary(colorID) {
  var secondary = "#D16FFF";

  for (let i = 0; i < colorPalette.length; i++) {
    if (colorPalette[i].id === colorID) {
      secondary = colorPalette[i].secondary;
    }
  }
  return secondary;
}

// ------------------------------------------------------------------------
// Get a random ID from the colorPalette
// ------------------------------------------------------------------------
export function getRandomColorID() {
  var randColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
  return randColor.id;
}
