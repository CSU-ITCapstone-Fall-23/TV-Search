function searchShow(query) {
    const url = `https://api.tvmaze.com/search/shows?q=${query}`;       // Base url + user search query from argument
    fetch(url)
    .then(response => response.json())                                  // Get data in json format
    .then((jsonData) => {
        const results = new Map(Object.entries(jsonData));              // Map info from json to object
        console.log(results)
        renderResults(results);                                         // Call other function to display info on page
        document.getElementById("errorMessage").innerHTML = "";         // Clear error message if successful
    })
    .catch((error) => {
        document.getElementById("errorMessage").innerHTML = error;      // Display error message if unsuccessful
        renderResults([]);                                              // Clear show info if unsuccessful
    });
}

function renderResults(results) {
    const list = document.getElementById("resultsList");                // Get blank area to add show info to
    list.innerHTML = "";
    results.forEach(result => {                                         // Loop through each search result
        const element = document.createElement("li");                                                           // Create new HTML list item element
        element.innerHTML = element.innerHTML + "<h3><b>" + result.show.name + "</b></h3>";                     // Add show title
        element.innerHTML = element.innerHTML + "<i>(Premiered " + result.show.premiered + ") </i><br>";        // Add premier date
        element.innerHTML = element.innerHTML + "Genres: " + result.show.genres;                                // Add genres
        list.appendChild(element);      // Add list item element to the page
    });
}

window.onload = () => {
    const searchTitle = document.getElementById("searchTitle");         // Get user input text box
    searchTitle.onkeyup = (event) =>{                                   // Update every time a key is released

        if (searchTitle.value.trim().length === 0) {                    // Don't search if blank text box
            return;
        }
        
        searchShow(searchTitle.value);                                  // Call other function to make API call to get info
    };
}