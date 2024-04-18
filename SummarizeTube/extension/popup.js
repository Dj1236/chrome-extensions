document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("summarise");
  btn.addEventListener("click", function () {
    btn.disabled = true;
    btn.innerHTML = "Summarizing...";
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      var url = tabs[0].url;
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "http://127.0.0.1:5000/summary?url=" + url, true);
      xhr.onload = function () {
        var text = xhr.responseText;
        const p = document.getElementById("output");
        p.innerHTML = text;
        btn.disabled = false;
        btn.innerHTML = "summarise";
      };
      xhr.send();
    });
  });
});
// Function to simulate getting summary data
function getSummary() {
    // Simulate getting summary data from somewhere
    return "This is the summary text.";
}

// Function to display summary
function displaySummary() {
    // Get the output element
    var outputElement = document.getElementById("output");
    // Get the summary label element
    var summaryLabel = document.querySelector(".summary-label");

    // Get summary data
    var summaryData = getSummary();

    // Update the output element with the summary data
    outputElement.textContent = summaryData;
    // Show the summary label
    summaryLabel.style.display = "block";
}

// Add click event listener to the button
document.getElementById("summarise").addEventListener("click", displaySummary);


// const btn = document.getElementById("summarize");
// btn.addEventListener("click", function() {
//     btn.disabled = true;
//     btn.innerHTML = "Summarizing...";
//     chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
//         var url = tabs[0].url;
//         var xhr = new XMLHttpRequest();
//         xhr.open("GET", "http://127.0.0.1:5000/summary?url=" + url, true);
//         xhr.onload = function() {
//             var text = xhr.responseText;
//             const p = document.getElementById("output");
//             p.innerHTML = text;
//             btn.disabled = false;
//             btn.innerHTML = "Summarize";
//         }
//         xhr.send();
//     });
// });
