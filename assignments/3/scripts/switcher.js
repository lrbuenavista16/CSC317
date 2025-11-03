// These are global variables, so be careful with it
const documentStylesheet = document.getElementById("document-style");

/**
 * @type {string}
 */
let activeStylesheet;
const defaultStylesheet = "styles.css";

/**
 * A map from stylesheet name to associated its theme button
 *
 * This is so that we have a more direct access to the DOM Theme Buttons
 * @type {Map<string, Element>}
 */
const styleSheetMap = new Map();

document.addEventListener("DOMContentLoaded", function () {
  // Each button has a stylesheet or theme associated with it
  const themeButtons = document.querySelectorAll(".theme-button");

  // Retrieves any saved themes from past browser sessions
  const savedStylesheet =
    localStorage.getItem("preferredTheme") ?? defaultStylesheet;

  /* 
		During document initialization:
		- Add the event listener for each button click
		- And also look for the active button from local storage
		*/
  themeButtons.forEach((themeButton) => {
    /** @type {string} */
    let stylesheet = themeButton.dataset.theme;

    themeButton.addEventListener("click", () => {
      setAsActiveTheme(stylesheet);
    });

    // Cache mapping from stylesheet name to its corresponding button
    styleSheetMap.set(stylesheet, themeButton);

    if (stylesheet === savedStylesheet) setAsActiveTheme(savedStylesheet);
  });
});

/**
 * @description Sets the active stylesheet to be used for the whole document
 *
 * This function also updates the state of theme buttons
 *
 * @param {string} newActiveStylesheet
 */
function setAsActiveTheme(newActiveStylesheet) {
  const activeThemeButton = styleSheetMap.get(activeStylesheet);
  const newActiveThemeButton = styleSheetMap.get(newActiveStylesheet);

  if (activeThemeButton) activeThemeButton.removeAttribute("disabled");

  activeStylesheet = newActiveStylesheet;
  // The second parameter is an empty string because `disabled` does not require a value, but the 2nd parameter can't be empty
  newActiveThemeButton.setAttribute("disabled", "");

  documentStylesheet.href = `styles/${newActiveStylesheet}`;

	// Save the active theme so that it is remembered after page reload
  localStorage.setItem("preferredTheme", newActiveStylesheet);
}
