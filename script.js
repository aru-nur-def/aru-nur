// Selecting the necessary elements
const nameInput = document.getElementById("name");
const startingBidInput = document.getElementById("startingBid");
const educationSelect = document.getElementById("education");
const familyNetWorthSelect = document.getElementById("familyNetWorth");
const casteSelect = document.getElementById("caste");
const skillsCheckboxes = document.querySelectorAll("#skills input[type=checkbox]");
const ageRadios = document.querySelectorAll("#age input[type=radio]");
const reputationCheckboxes = document.querySelectorAll("#reputation input[type=checkbox]");
const loveLetterTextarea = document.getElementById("loveLetter");
const resultsDiv = document.getElementById("results");
const calculateBtn = document.getElementById("calculateBtn");

// Calculate function
const calculate = () => {
    // Name and starting bid
    let name = nameInput.value;
    let price = Number(startingBidInput.value);

    if (!name || !price) {
        alert("Please enter both the name and starting bid.");
        return;
    }

    // Adding the selected coefficients
    price *= Number(educationSelect.value);
    price *= Number(familyNetWorthSelect.value);
    price += Number(casteSelect.value);

    // Calculating skills using array filterReduce
    let skillBonus = Array.from(skillsCheckboxes)
        .filter(skill => skill.checked)
        .reduce((total, skill) => total + Number(skill.value), 0);
    price += skillBonus;

    // Age coefficient using forEach
    ageRadios.forEach(radio => {
        if (radio.checked) {
            price *= Number(radio.value);
        }
    });

    // Reputation penalty using for loop
    for (let reputation of reputationCheckboxes) {
        if (reputation.checked) {
            if (Number(reputation.value) < 0) {
                price += Number(reputation.value);
            } else {
                price *= Number(reputation.value);
            }
        }
    }

    // Getting the love letter text
    const loveLetter = loveLetterTextarea.value;

    // Creating the result object
    const groom = {
        groom_name: name,
        groom_price: price.toFixed(2),
        love_letter: loveLetter
    };

    // Displaying the result with template strings
    resultsDiv.innerHTML = `
        <p>Your price for ${groom.groom_name} is $${groom.groom_price}.</p>
        <p>Your love letter: ${groom.love_letter}</p>
    `;
};

// Event listener for calculate button
calculateBtn.addEventListener("click", calculate);
