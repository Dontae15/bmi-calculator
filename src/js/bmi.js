document.addEventListener('DOMContentLoaded', function () {
    const calculateBmiBtn = document.getElementById('calculate-bmi');
    const bmiDisplayContainer = document.querySelector('.bmi-result');
    const bmiForm = document.getElementById('bmi-form');
    const metricRadio = document.getElementById('metric');
    const imperialRadio = document.getElementById('imperial');
    const metricFields = document.querySelector('.input-field');
    const imperialFields = document.querySelector('.input-field-imperial');

    // Function to toggle between metric and imperial input fields
    function toggleInputFields() {
        if (imperialRadio.checked) {
            metricFields.style.display = 'none';
            imperialFields.style.display = 'flex';
        } else {
            metricFields.style.display = 'flex';
            imperialFields.style.display = 'none';
        }
    }

    // Call the toggle function on page load to ensure correct fields are shown
    toggleInputFields();

    // Add event listeners to toggle when radio buttons change
    metricRadio.addEventListener('change', toggleInputFields);
    imperialRadio.addEventListener('change', toggleInputFields);

    // Existing event listener for BMI calculation
    calculateBmiBtn.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent form submission
    
        let heightValue, weightValue, bmiValue;
        let idealMinWeight, idealMaxWeight; // Define ideal weight variables
    
        const imperialRadio = document.getElementById('imperial'); // Radio button for imperial units
        const metricRadio = document.getElementById('metric'); // Radio button for metric units
    
        if (imperialRadio.checked) {
            // Imperial units: Convert feet/inches to meters and stone/pounds to kilograms
            const heightFeet = parseFloat(document.getElementById('input-feet').value);
            const heightInches = parseFloat(document.getElementById('input-inches').value);
            const weightStone = parseFloat(document.getElementById('input-stones').value);
            const weightPounds = parseFloat(document.getElementById('input-pounds').value);
    
            // Validate inputs for imperial
            if (isNaN(heightFeet) || isNaN(heightInches) || isNaN(weightStone) || isNaN(weightPounds)) {
                bmiDisplayContainer.textContent = 'Please enter valid numbers for height and weight.';
                return;
            }
    
            // Convert height from feet/inches to meters
            heightValue = (heightFeet * 0.3048) + (heightInches * 0.0254);
    
            // Convert weight from stone/pounds to kilograms
            weightValue = (weightStone * 6.35029) + (weightPounds * 0.453592);
    
            // Calculate ideal weight range in kilograms
            let idealMinWeightKg = 18.5 * (heightValue * heightValue);
            let idealMaxWeightKg = 24.9 * (heightValue * heightValue);
    
            // Convert ideal weight to stones and pounds
            const idealMinWeightStones = Math.floor(idealMinWeightKg / 6.35029);
            const idealMinWeightPounds = Math.round((idealMinWeightKg % 6.35029) / 0.453592);
    
            const idealMaxWeightStones = Math.floor(idealMaxWeightKg / 6.35029);
            const idealMaxWeightPounds = Math.round((idealMaxWeightKg % 6.35029) / 0.453592);
    
            // Update idealMinWeight and idealMaxWeight to show in stones and pounds
            idealMinWeight = `${idealMinWeightStones}st ${idealMinWeightPounds}lbs`;
            idealMaxWeight = `${idealMaxWeightStones}st ${idealMaxWeightPounds}lbs`;
    
        } else {
            // Metric units: Get height in cm and weight in kg
            heightValue = parseFloat(document.getElementById('height').value);
            weightValue = parseFloat(document.getElementById('weight').value);
    
            // Ensure that height and weight have valid values
            if (isNaN(heightValue) || isNaN(weightValue)) {
                bmiDisplayContainer.textContent = 'Please enter valid numbers for height and weight.';
                return;
            }
    
            // Convert height from cm to meters
            heightValue = heightValue / 100;
    
            // Calculate ideal weight range in kilograms
            idealMinWeight = (18.5 * (heightValue * heightValue)).toFixed(1) + 'kgs';
            idealMaxWeight = (24.9 * (heightValue * heightValue)).toFixed(1) + 'kgs';
        }
    
        // Calculate BMI
        bmiValue = weightValue / (heightValue * heightValue);
    
        // Hide the previous BMI display (if needed)
        bmiDisplayContainer.style.display = 'none';
    
        // Create and display BMI result elements
        const bmiResultDisplay = document.createElement('div');
        bmiResultDisplay.classList.add('bmi-result-display');
        bmiForm.appendChild(bmiResultDisplay);
    
        const bmiDisplay = document.createElement('div');
        bmiDisplay.classList.add('bmi-display');
        bmiResultDisplay.appendChild(bmiDisplay);
    
        const bmiHeading = document.createElement('p');
        bmiHeading.classList.add('text-preset-5-bold');
        bmiHeading.textContent = 'Your BMI is...';
        bmiDisplay.appendChild(bmiHeading);
    
        const bmi = document.createElement('h1');
        bmi.classList.add('text-preset-1');
        bmi.textContent = `${bmiValue.toFixed(1)}`;
        bmiDisplay.appendChild(bmi);
    
        const bmiResultDisplayContentContainer = document.createElement('div');
        bmiResultDisplayContentContainer.classList.add('bmi-result-container');
        bmiResultDisplay.appendChild(bmiResultDisplayContentContainer);
    
        const bmiResultDisplayContent = document.createElement('p');
        bmiResultDisplayContent.classList.add('text-preset-6');
    
        // Determine the BMI category and display the appropriate message
        if (imperialRadio.checked) {
            // Display in stones and pounds
            if (bmiValue < 18.5) {
                bmiResultDisplayContent.textContent = `Your BMI suggests you're underweight. Your ideal weight is between ${idealMinWeight} - ${idealMaxWeight}.`;
            } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
                bmiResultDisplayContent.textContent = `Your BMI suggests you're a healthy weight. Your ideal weight is between ${idealMinWeight} - ${idealMaxWeight}.`;
            } else if (bmiValue >= 25 && bmiValue <= 29.9) {
                bmiResultDisplayContent.textContent = `Your BMI suggests you're overweight. Your ideal weight is between ${idealMinWeight} - ${idealMaxWeight}.`;
            } else if (bmiValue >= 30) {
                bmiResultDisplayContent.textContent = `Your BMI suggests you're obese. Your ideal weight is between ${idealMinWeight} - ${idealMaxWeight}.`;
            }
        } else {
            // Metric: Display in kilograms
            if (bmiValue < 18.5) {
                bmiResultDisplayContent.textContent = `Your BMI suggests you're underweight. Your ideal weight is between ${idealMinWeight} - ${idealMaxWeight}.`;
            } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
                bmiResultDisplayContent.textContent = `Your BMI suggests you're a healthy weight. Your ideal weight is between ${idealMinWeight} - ${idealMaxWeight}.`;
            } else if (bmiValue >= 25 && bmiValue <= 29.9) {
                bmiResultDisplayContent.textContent = `Your BMI suggests you're overweight. Your ideal weight is between ${idealMinWeight} - ${idealMaxWeight}.`;
            } else if (bmiValue >= 30) {
                bmiResultDisplayContent.textContent = `Your BMI suggests you're obese. Your ideal weight is between ${idealMinWeight} - ${idealMaxWeight}.`;
            }
        }
    
        // Append the result content to the result container
        bmiResultDisplayContentContainer.appendChild(bmiResultDisplayContent);
            
    });
    
});
