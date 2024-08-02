var gradientValue = document.getElementById("gradientValue");
var colorInputs = document.getElementById("colorInputs");
var addColorButton = document.getElementById("addColorButton");
var removeColorButton = document.getElementById("removeColorButton");
var colorRelation = document.getElementById("colorRelation");
var body = document.getElementById("gradient");
var randomButton = document.getElementById("randomButton");
var colorNames = document.getElementById("colorNames");

function setGradient() {
  var colors = Array.from(document.querySelectorAll(".color")).map(
    (input) => input.value
  );
  var gradientColors = colors.join(", ");
  body.style.background = "linear-gradient(to right, " + gradientColors + ")";
  updateGradientValue(colors);
  updateMarkers();
  updateColorNames(colors);
}

function hexToRgb(hex) {
  var r = parseInt(hex.slice(1, 3), 16);
  var g = parseInt(hex.slice(3, 5), 16);
  var b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

function rgbToHex(r, g, b) {
  return (
    "#" +
    r.toString(16).padStart(2, "0") +
    g.toString(16).padStart(2, "0") +
    b.toString(16).padStart(2, "0")
  );
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h,
    s,
    l = (max + min) / 2;
  if (max == min) {
    h = s = 0;
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return [h, s, l];
}

function hslToRgb(h, s, l) {
  var r, g, b;
  if (s == 0) {
    r = g = b = l;
  } else {
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hueToRgb(p, q, h + 1 / 3);
    g = hueToRgb(p, q, h);
    b = hueToRgb(p, q, h - 1 / 3);
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function hueToRgb(p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

function addColor() {
  var newColorInput = document.createElement("input");
  newColorInput.type = "color";
  newColorInput.className = "color";
  newColorInput.value = getRandomColor();
  colorInputs.appendChild(newColorInput);
  newColorInput.addEventListener("input", setGradient);
  updateColorRelationOptions();
  setGradient();
}

function removeColor() {
  if (colorInputs.children.length > 2) {
    colorInputs.removeChild(colorInputs.lastChild);
    updateColorRelationOptions();
    setGradient();
  }
}

function updateColorRelationOptions() {
  var colorCount = colorInputs.children.length;
  var options = {
    complementary: colorCount === 2,
    analogous: colorCount >= 2,
    triadic: colorCount === 3,
    tetradic: colorCount === 4,
    square: colorCount === 4,
  };
  for (var option in options) {
    var optionElement = colorRelation.querySelector(
      `option[value="${option}"]`
    );
    optionElement.style.display = options[option] ? "block" : "none";
  }
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function setRandomColors() {
  Array.from(document.querySelectorAll(".color")).forEach((input) => {
    input.value = getRandomColor();
  });
  setGradient();
}

function updateGradientValue(colors) {
  gradientValue.innerHTML = `
    <div class="gradientValueLine"><strong>HEX:</strong> linear-gradient(to right, ${colors.join(
      ", "
    )})</div>
    <div class="gradientValueLine"><strong>RGB:</strong> linear-gradient(to right, ${colors
      .map(hexToRgbString)
      .join(", ")})</div>
    <div class="gradientValueLine"><strong>HSL:</strong> linear-gradient(to right, ${colors
      .map(hexToHslString)
      .join(", ")})</div>
  `;
}

function hexToRgbString(hex) {
  var [r, g, b] = hexToRgb(hex);
  return `rgb(${r}, ${g}, ${b})`;
}

function hexToHslString(hex) {
  var [r, g, b] = hexToRgb(hex);
  var [h, s, l] = rgbToHsl(r, g, b);
  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(
    l * 100
  )}%)`;
}

function updateMarkers() {
  var markers = document.getElementById("markers");
  markers.innerHTML = "";
  var colors = Array.from(document.querySelectorAll(".color")).map(
    (input) => input.value
  );
  colors.forEach((color, index) => {
    var marker = document.createElement("div");
    marker.className = "marker";
    marker.style.left = `${(index / (colors.length - 1)) * 100}%`;
    var markerLabel = document.createElement("span");
    markerLabel.className = "markerLabel";
    markerLabel.textContent = color;
    markerLabel.style.color = getTextColor(color);
    marker.appendChild(markerLabel);
    markers.appendChild(marker);
  });
}

function getBrightness(hex) {
  var [r, g, b] = hexToRgb(hex);
  return (r * 299 + g * 587 + b * 114) / 1000;
}

function getTextColor(backgroundColor) {
  return getBrightness(backgroundColor) > 128 ? "black" : "white";
}

async function getColorName(hex) {
  const response = await fetch(
    `https://www.thecolorapi.com/id?hex=${hex.slice(1)}`
  );
  const data = await response.json();
  return data.name.value;
}

async function updateColorNames(colors) {
  colorNames.innerHTML = "";
  for (let color of colors) {
    const colorName = await getColorName(color);
    const colorNameElem = document.createElement("p");
    colorNameElem.textContent = `${color}: ${colorName}`;
    colorNames.appendChild(colorNameElem);
  }
}

function applyColorRelationship() {
  var colors = Array.from(document.querySelectorAll(".color")).map(
    (input) => input.value
  );
  var relation = colorRelation.value;

  switch (relation) {
    case "complementary":
      if (colors.length == 2) {
        colors[1] = getComplementaryColor(colors[0]);
      }
      break;
    case "analogous":
      if (colors.length >= 2) {
        colors = getAnalogousColors(colors[0], colors.length);
      }
      break;
    case "triadic":
      if (colors.length == 3) {
        colors = getTriadicColors(colors[0]);
      }
      break;
    case "tetradic":
      if (colors.length == 4) {
        colors = getTetradicColors(colors[0]);
      }
      break;
    case "square":
      if (colors.length == 4) {
        colors = getSquareColors(colors[0]);
      }
      break;
  }

  Array.from(document.querySelectorAll(".color")).forEach((input, index) => {
    if (colors[index]) {
      input.value = colors[index];
    }
  });

  setGradient();
}

function getComplementaryColor(hex) {
  var [r, g, b] = hexToRgb(hex);
  return rgbToHex(255 - r, 255 - g, 255 - b);
}

function getAnalogousColors(hex, count) {
  var [r, g, b] = hexToRgb(hex);
  var hsl = rgbToHsl(r, g, b);
  var colors = [];
  var angle = 30 / 360;
  for (let i = 0; i < count; i++) {
    var newHsl = [(hsl[0] + i * angle) % 1, hsl[1], hsl[2]];
    var rgb = hslToRgb(newHsl[0], newHsl[1], newHsl[2]);
    colors.push(rgbToHex(rgb[0], rgb[1], rgb[2]));
  }
  return colors;
}

function getTriadicColors(hex) {
  var [r, g, b] = hexToRgb(hex);
  var hsl = rgbToHsl(r, g, b);
  var colors = [];
  for (let i = 0; i < 3; i++) {
    var newHsl = [(hsl[0] + i * (1 / 3)) % 1, hsl[1], hsl[2]];
    var rgb = hslToRgb(newHsl[0], newHsl[1], newHsl[2]);
    colors.push(rgbToHex(rgb[0], rgb[1], rgb[2]));
  }
  return colors;
}

function getTetradicColors(hex) {
  var [r, g, b] = hexToRgb(hex);
  var hsl = rgbToHsl(r, g, b);
  var colors = [];
  for (let i = 0; i < 4; i++) {
    var newHsl = [(hsl[0] + i * (1 / 4)) % 1, hsl[1], hsl[2]];
    var rgb = hslToRgb(newHsl[0], newHsl[1], newHsl[2]);
    colors.push(rgbToHex(rgb[0], rgb[1], rgb[2]));
  }
  return colors;
}

function getSquareColors(hex) {
  var [r, g, b] = hexToRgb(hex);
  var hsl = rgbToHsl(r, g, b);
  var colors = [];
  for (let i = 0; i < 4; i++) {
    var newHsl = [(hsl[0] + i * (1 / 4)) % 1, hsl[1], hsl[2]];
    var rgb = hslToRgb(newHsl[0], newHsl[1], newHsl[2]);
    colors.push(rgbToHex(rgb[0], rgb[1], rgb[2]));
  }
  return colors;
}

// Initialize gradient and event listeners
setGradient();
updateColorRelationOptions();

document.querySelectorAll(".color").forEach((input) => {
  input.addEventListener("input", setGradient);
});

addColorButton.addEventListener("click", addColor);
removeColorButton.addEventListener("click", removeColor);
colorRelation.addEventListener("change", applyColorRelationship);
randomButton.addEventListener("click", setRandomColors);
