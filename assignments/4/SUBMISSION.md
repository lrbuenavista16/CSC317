# Assignment 4: Calculator

## Name and Student ID

* **Name:** Luis Buenavista
* **Student ID:** 923271073

## Links

* **GitHub Repository:** `https://github.com/lrbuenavista16/CSC317/tree/main/assignments/4`
* **Live GitHub Pages URL:** `https://lrbuenavista16.github.io/CSC317/assignments/4/calculator.html`

## Brief Description

This project is a fully functional, mobile-responsive calculator built with vanilla JavaScript, HTML5, and CSS3. The core logic is based on JavaScript's `eval()` function, which enables a seamless "expression-based" display, allowing the user to see their full calculation (e.g., `10+5*2`) as they type.

The implementation includes all required operations: addition, subtraction, multiplication, division, modulo (`%`), and sign toggle (`+/-`). The display features dynamic font shrinking to accommodate long numbers and a 15-character hard cap on both input and output to prevent overflow and errors.

## Challenges and Solutions

The primary challenge was deciding on the core logic. I initially explored a complex "state-machine" approach (tracking `firstOperand`, `operator`, etc.) but found it difficult to implement.

I switched to an `eval()`-based system, which simplified the expression-building. However, this introduced new challenges, specifically for the `+/-` and `%` buttons, which don't fit naturally into an expression string. I overcame this by implementing them as "immediate" functions: they `eval()` the "current" expression, perform their operation on the "result", and then replace the expression with that new value.

## Additional Features

* **Dynamic Font Shrinking:** The display text automatically shrinks at two different breakpoints to fit long numbers.
* **15-Character Hard Cap:** The calculator stops new input (except `clear` or `=`) at 15 characters and also trims long decimal *results* to 15 characters.
* **Full Keyboard Support:** The calculator is fully usable with keyboard inputs, mapping keys like `*`, `/`, and `Enter` to the correct calculator functions.
* **Mobile-First Responsive Design:** The layout is optimized for mobile, and common issues like tap-zooming have been fixed.
* **Custom Color Theme:** Implemented a custom navy blue, grey, and muted orange color scheme.
* **Input Reset:** After a calculation is performed, typing a new number starts a new calculation instead of appending to the result.

## Acknowledgments

This project was completed with assistance from Google's AI assistant, Gemini. I used it as a "coding partner" to discuss logic, draft functions, debug issues (like the hard cap logic), and explore different implementation strategies.