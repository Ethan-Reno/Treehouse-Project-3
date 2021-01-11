#Treehouse Project 3 - Interactive Form
_______________________________________

This project includes all of the "meets expectations" requirments of the 3rd Treehouse project, and one of the "exceeds expectations" conditions.

The project includes an interactive form with a variety of features, including:
 - Accepting and validating user information.
    - The form will not submit if any of the required inputs contains an invalid input.
    - The form will display error text next to any form that includes invalid data.
 - Dynamically displaying and hiding html elements based on user input.
    - The form will populate t-shirt colors based on which style is selected.
    - The form will display payment information only for the payment method that is selected.
    - The form will disable conference activites that have scheduling conflicts with activities that are already selected.

In the future, this project will include additional features, including:
- Displaying real-time error messages in forms that include invalid inputs.
- Displaying error hints that are unique to the reason that a form's input is valid, for example:
    - if an email input is invalid because it does not include an @ symbol, the error message will display: "A valid email must include an @ symbol".
    - if an email input is invalid because it includes two @@ symbols, the error message will display: "A valid email cannot include two @ symbols".
    - This feature can include a wide variety of error messages - I have yet to decide on how many conditions will be accepted.

Bugfixes 11/01/2021:
- The form will no longer submit if an activity has not been selected.
- The form will not require correctly formatted credit card information to submit if paypal or bitcoin payment methods are selected
- An error icon no longer appears on the form element itself when any error is detected.
- A red border will no longer remain around elements that displayed an error message previously, even after they were corrected.
- The shirt color element will reset to a placeholder selection when a different shirt design is selected.