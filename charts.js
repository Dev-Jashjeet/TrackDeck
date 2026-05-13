const strPerson = localStorage.getItem("usersDetails");
const Persons = JSON.parse(strPerson);
const sPersonEmail = sessionStorage.getItem("loginemail");
let Person;
let Expenses = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
for (let user of Persons) {
    if (user.email === sPersonEmail) {
        Person = user;
    }
}
if (Person) {
    for (let exp of Person.transactions) {
        if (exp.type === "Expense") {
            const D = new Date(exp.date);
            const date = Number(D.getMonth());
            Expenses[date] = (Expenses[date] || 0) + exp.amount;
        }
    }
}
const lineCanvas = document.querySelector("#lineChart");
const chart = new Chart(lineCanvas, {
    type: "line",
    data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "Monthly Expenses",
                data: Expenses,
                borderColor: "#3b82f6",
                backgroundColor: "rgba(59, 130, 246, 0.2)",
                fill: true,
                tension: 0,
                borderWidth: 3,
                pointBackgroundColor: "#3b82f6",
                pointRadius: 0,
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom"
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
export {};
