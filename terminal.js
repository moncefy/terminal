const output_el = document.getElementById("output");
const input_el = document.getElementById("prompt");
const prefix = "@CODIHA#~"; 

input_el.addEventListener("keypress", (event) => {
    const text = input_el.value.trim();
    if (event.key === "Enter" && text) {
        processCommand(text);
        input_el.value = "";
    }
});


function processCommand(command) {
    message(`${prefix} $${command}`,"green");

    if (command === "help") {
        message("Commands: help, clear, about, triangle <integer>, echo <message>,  <num> <operator> <num>", "white");
    } else if (command === "clear") {
        output_el.innerHTML = "";
    } else if (command === "about") {
        message("CODIHA terminal. Try it out by executing some basic terminal commands !", "white");
    } else if (command.startsWith("triangle")) {
        const args = command.split(" ");
        if (args.length === 2 && !isNaN(args[1])) {
            triangle(parseInt(args[1], 10));
        } else {
            message("Usage: triangle <integer>", "red");
        }
    } else if (command.startsWith("echo")) {
        const echoText = command.replace("echo ", "");
        message(echoText, "white");
    } else if (command.match(/^(\d+)([+\-*/])(\d+)$/)) {
        processMathCommand(command);
    } else {
        message(`Unknown command: ${command}`, "red");
    }
}

function triangle(n) {
    if (n <= 0 || isNaN(n)) {
        message("Enter a positive number.", "red");
        return;
    }
    for (let i = 1; i <= n; i++) {
        let row = [];
        for (let j = 1; j <= i; j++) {
            row.push("*");
        }
        message(row.join(" "), "white");
    }
}

function message(text, color = "green") {
    const p_el = document.createElement("p");
    p_el.innerText = text;
    p_el.style.color = color;
    output_el.appendChild(p_el);
    output_el.scrollTo({ top: output_el.scrollHeight, behavior: "smooth" });
}

function processMathCommand(command) {
    const parts = command.split(/([+\-*/])/);  // Split by operators
    const num1 = parseFloat(parts[0]);
    const operator = parts[1];
    const num2 = parseFloat(parts[2]);
    let result;

    switch (operator) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "*":
            result = num1 * num2;
            break;
        case "/":
            if (num2 === 0) {
                message("Division by zero is not allowed.", "red");
                return;
            }
            result = num1 / num2;
            break;
        default:
            message(`Unknown operator: ${operator}`, "red");
            return;
    }

    message(`Result: ${result}`, "blue");
}





