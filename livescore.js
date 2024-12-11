// Your RapidAPI key
const apiKey = '97efbd7e-e145-496d-97d2-40e5f8a5099f'; // Replace with your actual API key
const apiUrl = 'https://api.cricapi.com/v1/series';

// Function to fetch live cricket scores
async function fetchLiveScores() {
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'cricapi.com'
            }
        });

        const data = await response.json();

        // Get the live matches
        const matches = data.matches.filter(match => match.status === "Live");
        
        const scoresContainer = document.getElementById('scores');
        
        if (matches.length === 0) {
            scoresContainer.innerHTML = '<p>No live matches at the moment.</p>';
            return;
        }

        // Loop through the live matches and display scores
        matches.forEach(match => {
            const scoreElement = document.createElement('div');
            scoreElement.classList.add('score');
            
            const matchDetails = `
                <h3>${match.team1} vs ${match.team2}</h3>
                <p>Status: ${match.status}</p>
                <p>Score: ${match.score}</p>
                <p>Venue: ${match.venue}</p>
            `;
            
            scoreElement.innerHTML = matchDetails;
            scoresContainer.appendChild(scoreElement);
        });
    } catch (error) {
        console.error('Error fetching live scores:', error);
        document.getElementById('scores').innerHTML = '<p>Failed to fetch live scores. Please try again later.</p>';
    }
}

// Fetch live scores on page load
window.onload = fetchLiveScores;
