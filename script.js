document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-link[data-category]");
    const searchForm = document.getElementById("searchForm");
    const searchInput = document.getElementById("searchInput");
    const content = document.getElementById("content");

    // Load default category on page load
    setActiveCategory("top-headlines"); // Default category set to 'top-headlines'   

    // Function to set active navbar category and fetch news
    function setActiveCategory(category) {
        // Remove 'active' class from all nav links
        navLinks.forEach(link => link.classList.remove("active"));

        // Add active class only if it's a predefined category
        const activeLink = document.querySelector(`.nav-link[data-category="${category}"]`);
        if (activeLink) {
            activeLink.classList.add("active");
        }

        // Fetch and display news articles
        fetchNews(category);
    }

    // Function to fetch news from get_news.php
    function fetchNews(query) {
        //content.innerHTML = `<h2>Loading news for: ${query}...</h2>`;

        fetch(`get_news.php?query=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => {
                displayNews(data, query);
            })
            .catch(error => {
                //content.innerHTML = `<h2>Error fetching news.</h2>`;
                console.error("Error:", error);
            });
    }

    function fetchSearchQueryNews(query) {
        navLinks.forEach(link => link.classList.remove("active"));
        fetch(`get_news.php?query=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => {
                displayNews(data, query);
            })
            .catch(error => {
                //content.innerHTML = `<h2>Error fetching news.</h2>`;
                console.error("Error:", error);
            });
    }

    // Function to display news articles
    function displayNews(data, query) {
        if (data.articles && data.articles.length > 0) {
            let newsHTML = `<div class="news-container">`; // Add container div
            data.articles.forEach(article => {
                newsHTML += `
                    <div class="news-card">
                        <img src="${article.image}" alt="News Image">
                        <div class="news-card-content">
                            <div class="news-card-title">${article.title}</div>
                            <div class="news-card-description">${article.description}</div>
                            <a href="${article.url}" target="_blank">Read More..</a>
                        </div>
                    </div>
                `;
            });
            newsHTML += `</div>`; // Close container div
            content.innerHTML = newsHTML;
        } 
        
        else 
            content.innerHTML = `<h2>No news found for: ${query}</h2>`;      
    }
 
    // Handle nav link clicks
    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            setActiveCategory(this.getAttribute("data-category"));
        });
    });

    // Handle search form submission
    searchForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const query = searchInput.value.trim();
        if (query)
            fetchSearchQueryNews(query); 
    });
});
