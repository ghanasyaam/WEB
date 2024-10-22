const x = document.getElementById("demo");

        const asteroidKey = 'flaYac5emgtddyB8RWgDF0KJ5UI1nVXFhAavwOGE';
        const asteroidApiUrl = `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${asteroidKey}`;

        async function fetchAPOD() {
            try {

                const response2 = await fetch(asteroidApiUrl);
                const data2 = await response2.json();

                const date = document.getElementById('apod-date').value;
                const nasaApiKey = '6YSTvYzwepx22pXDZID7YZNqTB8izg3k64ffGoiC';
                const nasaApiUrl = `https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}&date=${date}`;
                const response = await fetch(nasaApiUrl);
                const data = await response.json();
                document.getElementById('apod-title').innerText = data.title;
                document.getElementById('apod-image').src = data.url;
                document.getElementById('apod-description').innerText = data.explanation;
                document.getElementById('apod-image').src = data.hdurl;
                document.getElementById('apod-image').style.display = "block";
                console.log(data);

                console.log(data2);
            } catch (error) {
                console.error('Error fetching APOD:', error);
            }
        }

        window.onload = fetchAPOD;