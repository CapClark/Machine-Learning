document.addEventListener("DOMContentLoaded", function () {
    const ingredientsInput = document.getElementById("ingredients");
    const inputContainer = document.getElementById("inputContainer");
    const submitButton = document.getElementById("submitButton");
    const outputContainer = document.getElementById("output");
  
    submitButton.addEventListener("click", function () {
      handleIngredientsInput();
    });
  
    ingredientsInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        handleIngredientsInput();
      }
    });
  
    const handleIngredientsInput = () => {
      const targetIngredients = parseInt(ingredientsInput.value);
      const li = new Map();
      let totalIngredients = 0;
  
      const askIngredients = () => {
        const ingredientLabel = document.createElement("label");
        ingredientLabel.textContent = "Enter Ingredient and quantity in grams:";
        inputContainer.appendChild(ingredientLabel);
  
        const ingredientInput = document.createElement("input");
        ingredientInput.type = "text";
        inputContainer.appendChild(ingredientInput);
  
        const quantityInput = document.createElement("input");
        quantityInput.type = "number";
        inputContainer.appendChild(quantityInput);
  
        const lineBreak = document.createElement("br");
        inputContainer.appendChild(lineBreak);
  
        const submitButton = document.createElement("button");
        submitButton.textContent = "Add Ingredient";
        inputContainer.appendChild(submitButton);
  
        const handleAddIngredient = () => {
          const ingredient = ingredientInput.value;
          const quantity = parseInt(quantityInput.value);
          li.set(ingredient, quantity);
          totalIngredients++;
  
          if (totalIngredients < targetIngredients) {
            inputContainer.innerHTML = "";
            askIngredients();
          } else {
            let sum = 0;
            li.forEach((quantity) => {
              sum += quantity;
            });
  
            const weightLabel = document.createElement("label");
            weightLabel.textContent = "Enter the weight your recipe has to be:";
            inputContainer.appendChild(weightLabel);
  
            const weightInput = document.createElement("input");
            weightInput.type = "number";
            weightInput.id = "weightInput";
            inputContainer.appendChild(weightInput);
  
            const calculateButton = document.createElement("button");
            calculateButton.textContent = "Calculate";
            inputContainer.appendChild(calculateButton);
  
            const calculateValues = () => {
              const targetWeight = parseInt(document.getElementById("weightInput").value);
              const ratio = Math.floor(targetWeight / sum);
  
              const updatedValues = document.createElement("div");
              updatedValues.textContent = "Here are the updated values:";
  
              li.forEach((quantity, ingredient) => {
                const ingredientLine = document.createElement("div");
                const updatedQuantity = quantity * ratio;
                ingredientLine.textContent = ingredient + ": " + updatedQuantity + " grams";
                updatedValues.appendChild(ingredientLine);
              });
  
              outputContainer.innerHTML = "";
              outputContainer.appendChild(updatedValues);
            };
  
            calculateButton.addEventListener("click", function (event) {
              event.preventDefault();
              calculateValues();
            });
  
            weightInput.addEventListener("keydown", function (event) {
              if (event.key === "Enter") {
                event.preventDefault();
                calculateValues();
              }
            });
          }
        };
  
        submitButton.addEventListener("click", function (event) {
          event.preventDefault();
          handleAddIngredient();
        });
  
        ingredientInput.addEventListener("keydown", function (event) {
          if (event.key === "Enter") {
            event.preventDefault();
            handleAddIngredient();
          }
        });
      };
  
      inputContainer.innerHTML = "";
      outputContainer.innerHTML = "";
      askIngredients();
    };
  });
  