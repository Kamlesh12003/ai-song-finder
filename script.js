// script.js

/**
 * Fetches and displays lyrics via Lyrics.ovh,
 * routed through a CORS proxy (AllOrigins) to avoid CORS blocks.
 */
function findLyrics() {
    const artist = document.getElementById("artist").value.trim();
    const title  = document.getElementById("title").value.trim();
    const output = document.getElementById("lyricsDisplay");
  
    // 1. Validate
    if (!artist || !title) {
      output.innerHTML = "<p>❗ Please enter both artist and song title.</p>";
      return;
    }
  
    // 2. Show loading
    output.innerHTML = "<p>🔍 Searching for lyrics...</p>";
  
    // 3. Build target URL and proxy URL
    const targetURL = `https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`;
    const proxyURL  = `https://api.allorigins.win/raw?url=${encodeURIComponent(targetURL)}`;
  
    console.log("Fetching via proxy:", proxyURL);
  
    // 4. Fetch through proxy
    fetch(proxyURL)
      .then(res => {
        if (!res.ok) throw new Error(`Proxy returned ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log("API response:", data);
        if (data.lyrics) {
          output.innerText = `🎵 ${title} by ${artist}\n\n${data.lyrics}`;
        } else {
          output.innerHTML = "<p>❌ Lyrics not found. Try another song.</p>";
        }
      })
      .catch(err => {
        console.error("Fetch error:", err);
        output.innerHTML = `<p>🚫 Error fetching lyrics: ${err.message}</p>`;
      });
  }
  