const gradientValue = document.getElementById("gradientValue");
const gradientCode = document.getElementById("gradientCode");
const toggleCodeButton = document.getElementById("toggleCodeButton");
const colorInputs = document.getElementById("colorInputs");
const addColorButton = document.getElementById("addColorButton");
const removeColorButton = document.getElementById("removeColorButton");
const colorRelation = document.getElementById("colorRelation");
const body = document.getElementById("gradient");
const randomButton = document.getElementById("randomButton");
const colorNames = document.getElementById("colorNames");

document.querySelectorAll(".color").forEach((input) => {
  input.addEventListener("input", setGradient);
});
addColorButton.addEventListener("click", addColor);
removeColorButton.addEventListener("click", removeColor);
colorRelation.addEventListener("change", applyColorRelationship);
randomButton.addEventListener("click", setRandomColors);
toggleCodeButton.addEventListener("click", toggleGradientCode);

init();

function init() {
  setGradient();
  updateColorRelationOptions();
}

function setGradient() {
  const colors = Array.from(document.querySelectorAll(".color")).map(
    (input) => input.value
  );
  body.style.background = `linear-gradient(to right, ${colors.join(", ")})`;
  updateGradientValue(colors);
  updateGradientCode(colors);
  updateMarkers(colors);
  updateColorNames(colors);
}

function addColor() {
  const newColorInput = document.createElement("input");
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
  const colorCount = colorInputs.children.length;
  const options = {
    complementary: colorCount === 2,
    analogous: colorCount >= 2,
    triadic: colorCount === 3,
    tetradic: colorCount === 4,
    square: colorCount === 4,
  };
  for (const option in options) {
    const optionElement = colorRelation.querySelector(
      `option[value="${option}"]`
    );
    optionElement.style.display = options[option] ? "block" : "none";
  }
}

function setRandomColors() {
  document.querySelectorAll(".color").forEach((input) => {
    input.value = getRandomColor();
  });
  setGradient();
}

function updateGradientValue(colors) {
  gradientValue.innerHTML = `
    HEX: ${colors.join(", ")}
    <br>
    RGB: ${colors.map(hexToRgbString).join(", ")}
    <br>
    HSL: ${colors.map(hexToHslString).join(", ")}
  `;
}

function updateGradientCode(colors) {
  const gradient = `linear-gradient(to right, ${colors.join(", ")})`;
  gradientCode.innerHTML = `
    <pre><code>background: ${gradient};</code></pre>
  `;
}

function toggleGradientCode() {
  gradientCode.classList.toggle("hidden");
}

async function updateMarkers(colors) {
  const markers = document.getElementById("markers");
  markers.innerHTML = "";

  if (colors.length == 2) {
    // Place markers at 25%, 50%, and 75%
    const positions = [25, 50, 75];
    for (const pos of positions) {
      const color = getIntermediaryColor(colors[0], colors[1], pos / 100);
      const colorName = await getColorName(color);
      const marker = createMarker(pos, colorName, color);
      markers.appendChild(marker);
    }
  } else if (colors.length == 3) {
    // Place marker at 50%
    const color2Name = await getColorName(colors[1]);
    const marker = createMarker(50, color2Name, colors[1]);
    markers.appendChild(marker);
  } else {
    // Place markers at the starting point of each color
    for (let i = 0; i < colors.length; i++) {
      const colorName = await getColorName(colors[i]);
      const marker = createMarker(
        (i / (colors.length - 1)) * 100,
        colorName,
        colors[i]
      );
      markers.appendChild(marker);
    }
  }
}

function getIntermediaryColor(color1, color2, ratio) {
  const [r1, g1, b1] = hexToRgb(color1);
  const [r2, g2, b2] = hexToRgb(color2);
  const r = Math.round(r1 + ratio * (r2 - r1));
  const g = Math.round(g1 + ratio * (g2 - g1));
  const b = Math.round(b1 + ratio * (b2 - b1));
  return rgbToHex(r, g, b);
}

function createMarker(position, colorName, color) {
  const marker = document.createElement("div");
  marker.className = "marker";
  marker.style.left = `${position}%`;
  const markerLabel = document.createElement("span");
  markerLabel.className = "markerLabel";
  markerLabel.textContent = colorName;
  markerLabel.style.color = getTextColor(color);
  marker.appendChild(markerLabel);
  return marker;
}

function applyColorRelationship() {
  let colors = Array.from(document.querySelectorAll(".color")).map(
    (input) => input.value
  );
  const relation = colorRelation.value;

  switch (relation) {
    case "complementary":
      if (colors.length === 2) colors[1] = getComplementaryColor(colors[0]);
      break;
    case "analogous":
      if (colors.length >= 2)
        colors = getAnalogousColors(colors[0], colors.length);
      break;
    case "triadic":
      if (colors.length === 3) colors = getTriadicColors(colors[0]);
      break;
    case "tetradic":
      if (colors.length === 4) colors = getTetradicColors(colors[0]);
      break;
    case "square":
      if (colors.length === 4) colors = getSquareColors(colors[0]);
      break;
  }

  document.querySelectorAll(".color").forEach((input, index) => {
    if (colors[index]) input.value = colors[index];
  });

  setGradient();
}

function getComplementaryColor(hex) {
  const [r, g, b] = hexToRgb(hex);
  return rgbToHex(255 - r, 255 - g, 255 - b);
}

function getAnalogousColors(hex, count) {
  const [r, g, b] = hexToRgb(hex);
  const hsl = rgbToHsl(r, g, b);
  const colors = [];
  const angle = 30 / 360;
  for (let i = 0; i < count; i++) {
    const newHsl = [(hsl[0] + i * angle) % 1, hsl[1], hsl[2]];
    const [nr, ng, nb] = hslToRgb(newHsl[0], newHsl[1], newHsl[2]);
    colors.push(rgbToHex(nr, ng, nb));
  }
  return colors;
}

function getTriadicColors(hex) {
  return getEquallySpacedColors(hex, 3, 1 / 3);
}

function getTetradicColors(hex) {
  return getEquallySpacedColors(hex, 4, 1 / 4);
}

function getSquareColors(hex) {
  return getEquallySpacedColors(hex, 4, 1 / 4);
}

function getEquallySpacedColors(hex, count, interval) {
  const [r, g, b] = hexToRgb(hex);
  const hsl = rgbToHsl(r, g, b);
  const colors = [];
  for (let i = 0; i < count; i++) {
    const newHsl = [(hsl[0] + i * interval) % 1, hsl[1], hsl[2]];
    const [nr, ng, nb] = hslToRgb(newHsl[0], newHsl[1], newHsl[2]);
    colors.push(rgbToHex(nr, ng, nb));
  }
  return colors;
}

async function updateColorNames(colors) {
  colorNames.innerHTML = "";
  for (const color of colors) {
    const colorName = await getColorName(color);
    const colorNameElem = document.createElement("p");
    colorNameElem.textContent = `${color}: ${colorName}`;
    colorNames.appendChild(colorNameElem);
  }
}

async function getColorName(hex) {
  const response = await fetch(
    `https://www.thecolorapi.com/id?hex=${hex.slice(1)}`
  );
  const data = await response.json();
  return data.name.value;
}

function getRandomColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;
}

function hexToRgbString(hex) {
  const [r, g, b] = hexToRgb(hex);
  return `rgb(${r}, ${g}, ${b})`;
}

function hexToHslString(hex) {
  const [r, g, b] = hexToRgb(hex);
  const [h, s, l] = rgbToHsl(r, g, b);
  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(
    l * 100
  )}%)`;
}

function getBrightness(hex) {
  const [r, g, b] = hexToRgb(hex);
  return (r * 299 + g * 587 + b * 114) / 1000;
}

function getTextColor(backgroundColor) {
  return getBrightness(backgroundColor) > 128 ? "black" : "white";
}

function hexToRgb(hex) {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

function rgbToHex(r, g, b) {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

function rgbToHsl(r, g, b) {
  (r /= 255), (g /= 255), (b /= 255);
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
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
  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
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
