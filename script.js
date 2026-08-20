/* ==========================================================================
   MusicAPI V2 — documentation data + rendering
   ========================================================================== */

const PROD_BASE = "https://musicapi-1xqp.onrender.com";
const LOCAL_BASE = "http://localhost/MusicAPI-v2";

/* ---------------- Route table (complete, active routes only) ---------------- */
const routes = [
    ["GET", "/", "Public", "API status / health check"],
    ["POST", "/auth/register", "Public", "Register a new user"],
    ["POST", "/auth/login", "Public", "Login and receive a JWT"],
    ["POST", "/auth/logout", "No explicit auth", "Return logout response; JWT is not invalidated server-side"],
    ["GET", "/home", "Optional", "Home recommendations and discovery data"],
    ["GET", "/songs", "Public", "Paginated song list"],
    ["GET", "/songs/trending", "Public", "Trending songs"],
    ["GET", "/songs/popular", "Public", "Popular songs"],
    ["GET", "/songs/latest", "Public", "Latest songs"],
    ["GET", "/songs/new", "Public", "Alias for latest songs"],
    ["GET", "/songs/recommended", "Optional", "Recommended songs"],
    ["GET", "/songs/{id}", "Public", "Song details"],
    ["GET", "/songs/{id}/play", "Required", "Record a song play"],
    ["POST", "/songs/{id}/play", "Required", "Record a song play"],
    ["POST", "/songs/{id}/progress", "Required", "Record playback progress"],
    ["GET", "/tracks", "Public", "Filter songs by genre tags"],
    ["GET", "/artists", "Public", "List artists"],
    ["GET", "/artists/{id}", "Public", "Artist details"],
    ["GET", "/artists/{id}/tracks", "Public", "Artist songs"],
    ["GET", "/artists/{id}/albums", "Public", "Artist albums"],
    ["GET", "/albums", "Public", "Paginated albums"],
    ["GET", "/albums/search", "Public", "Search albums"],
    ["GET", "/albums/{id}", "Public", "Album details"],
    ["GET", "/albums/{id}/tracks", "Public", "Album with tracks"],
    ["GET", "/search", "Public", "Search songs and artists"],
    ["GET", "/favorites", "Required", "Current user's favorites"],
    ["POST", "/favorites", "Required", "Add a favorite song"],
    ["DELETE", "/favorites/{id}", "Required", "Remove favorite by song ID"],
    ["GET", "/history", "Required", "Listening history"],
    ["POST", "/history", "Required", "Add history entry"],
    ["DELETE", "/history/{id}", "Required", "Delete one history record"],
    ["DELETE", "/history", "Required", "Clear listening history"],
    ["GET", "/playlists", "Required", "User playlists"],
    ["GET", "/playlists/{id}/tracks", "Optional", "Playlist details and tracks"],
    ["POST", "/playlists", "Required", "Create playlist"],
    ["PUT", "/playlists/{id}", "Required", "Update playlist"],
    ["DELETE", "/playlists/{id}", "Required", "Delete playlist"],
    ["POST", "/playlists/{id}/songs", "Required", "Add song to playlist"],
    ["DELETE", "/playlists/{id}/songs/{songId}", "Required", "Remove song from playlist"],
    ["GET", "/profile", "Required", "Current user profile"],
    ["PUT", "/profile", "Required", "Update profile"],
    ["GET", "/settings", "Required", "User settings"],
    ["PUT", "/settings", "Required", "Update user settings"]
];

/* ---------------- Sidebar navigation ---------------- */
const groups = {
    "Introduction": [
        ["overview", "Overview"],
        ["architecture", "Architecture"],
        ["stack", "Tech Stack"],
        ["structure", "Project Structure"]
    ],
    "Getting Started": [
        ["quickstart", "Quick Start"],
        ["local", "Local Development"],
        ["env", "Environment Variables"],
        ["database", "Database Setup"],
        ["testing", "API Testing"]
    ],
    "Authentication": [
        ["jwt", "JWT"],
        ["register", "Register"],
        ["login", "Login"],
        ["logout", "Logout"]
    ],
    "API Reference": [
        ["conventions", "Response Format"],
        ["statuscodes", "Status Codes"],
        ["reference", "All Routes"],
        ["root", "Root"],
        ["home", "Home"],
        ["songs", "Songs"],
        ["artists", "Artists"],
        ["albums", "Albums"],
        ["genres", "Genres"],
        ["search", "Search"],
        ["favorites", "Favorites"],
        ["history", "History"],
        ["playlists", "Playlists"],
        ["profile", "Profile"],
        ["settings", "Settings"],
        ["explorer", "API Explorer"]
    ],
    "Database": [
        ["db-overview", "Overview"],
        ["er-diagram", "ER Diagram"],
        ["db-tables", "Tables"]
    ],
    "Flutter": [
        ["flutter-base", "Base Configuration"],
        ["flutter-requests", "GET / POST Requests"],
        ["flutter-jwt", "JWT Requests"],
        ["flutter-pagination", "Pagination"]
    ],
    "Operations": [
        ["pagination", "Pagination"],
        ["security", "Security"],
        ["deployment", "Deployment"],
        ["troubleshooting", "Troubleshooting"],
        ["implementation", "Implementation Notes"]
    ]
};

/* ---------------- Full endpoint detail data ---------------- */
/* Each entry renders into a group container by `group` id */
const endpoints = [{
        group: "songEndpoints",
        method: "GET",
        path: "/songs",
        auth: "Public",
        title: "All Songs",
        desc: "Get a paginated list of songs.",
        query: [
            ["page", "integer", "No — default 1"],
            ["limit", "integer", "No — default 20, max 100"]
        ],
        example: "GET /songs?page=2&limit=50",
        response: { success: true, message: "Success", data: { tracks: [], pagination: { page: 1, limit: 20, total: 100, total_pages: 5, has_next: true, has_previous: false } } }
    },

    {
        group: "songEndpoints",
        method: "GET",
        path: "/songs/{id}",
        auth: "Public",
        title: "Song Details",
        desc: "Returns complete song details including media, metadata, statistics, artists, album and genres.",
        pathParams: [
            ["id", "integer", "Yes"]
        ],
        example: "GET /songs/28",
        response: { success: true, message: "Success", data: { id: 28, title: "Song Title", slug: "song-title", description: "...", lyrics: "...", media: { audio_url: "https://...", cover_url: "https://...", duration_seconds: 195 }, metadata: { language: "Hindi", release_date: "2026-01-01" }, statistics: { play_count: 0, like_count: 0, download_count: 0 }, artists: [], album: null, genres: [] } },
        errors: [
            ["404", "Song not found."]
        ]
    },

    {
        group: "songEndpoints",
        method: "GET",
        path: "/songs/trending",
        auth: "Public",
        title: "Trending Songs",
        desc: "Returns paginated trending songs.",
        query: [
            ["page", "integer", "No"],
            ["limit", "integer", "No"]
        ],
        example: "GET /songs/trending?page=1&limit=20",
        response: { success: true, message: "Success", data: { tracks: [], pagination: {} } }
    },

    {
        group: "songEndpoints",
        method: "GET",
        path: "/songs/popular",
        auth: "Public",
        title: "Popular Songs",
        desc: "Returns paginated popular songs.",
        query: [
            ["page", "integer", "No"],
            ["limit", "integer", "No"]
        ],
        example: "GET /songs/popular?page=1&limit=20",
        response: { success: true, message: "Success", data: { tracks: [], pagination: {} } }
    },

    {
        group: "songEndpoints",
        method: "GET",
        path: "/songs/latest",
        altPath: "/songs/new",
        auth: "Public",
        title: "Latest / New Songs",
        desc: "Two routes — /songs/latest and /songs/new — currently point to the same controller method and return identical results.",
        query: [
            ["page", "integer", "No"],
            ["limit", "integer", "No"]
        ],
        example: "GET /songs/latest?page=1&limit=20",
        response: { success: true, message: "Success", data: { tracks: [], pagination: {} } }
    },

    {
        group: "songEndpoints",
        method: "GET",
        path: "/songs/recommended",
        auth: "Optional",
        title: "Recommended Songs",
        desc: "The controller attempts to identify the current user from the JWT if present. Guests get default/guest recommendation logic; authenticated users can get personalized recommendations based on activity.",
        query: [
            ["page", "integer", "No"],
            ["limit", "integer", "No"]
        ],
        example: "GET /songs/recommended?page=1&limit=20",
        response: { success: true, message: "Success", data: { tracks: [], pagination: {} } }
    },

    {
        group: "songEndpoints",
        method: "GET / POST",
        path: "/songs/{id}/play",
        auth: "Required",
        title: "Record Song Play",
        desc: "Both GET and POST are registered for this route. Validates the song, increments its play count, adds a history record and a song-view record, then returns updated song information.",
        pathParams: [
            ["id", "integer", "Yes"]
        ],
        body: { play_duration: 120, completed: false },
        notes: "Request body is optional.",
        example: "POST /songs/28/play",
        response: { success: true, message: "Play recorded.", data: {} }
    },

    {
        group: "songEndpoints",
        method: "POST",
        path: "/songs/{id}/progress",
        auth: "Required",
        title: "Playback Progress",
        desc: "Records incremental playback progress for a song. Negative play_duration values are normalized to zero.",
        pathParams: [
            ["id", "integer", "Yes"]
        ],
        body: { play_duration: 120, completed: false },
        example: "POST /songs/28/progress",
        response: { success: true, message: "Success", data: { song_id: 28, play_duration: 120, completed: false } }
    },

    {
        group: "songEndpoints",
        method: "GET",
        path: "/tracks",
        auth: "Public",
        title: "Genre / Tag Filtering",
        desc: "Filters songs using the tags query parameter, matched against genre name and slug. Multiple tags are comma-separated.",
        query: [
            ["tags", "string", "Yes — e.g. Hindi or hindi,pop"],
            ["page", "integer", "No"],
            ["limit", "integer", "No"]
        ],
        example: "GET /tracks?tags=Hindi",
        response: { success: true, message: "Success", data: { filter: { type: "genre", value: "Hindi" }, tracks: [], pagination: {} } },
        errors: [
            ["400", "tags parameter is required."]
        ]
    },

    {
        group: "artistEndpoints",
        method: "GET",
        path: "/artists",
        auth: "Public",
        title: "All Artists",
        desc: "Returns a paginated list of artists.",
        query: [
            ["page", "integer", "No"],
            ["limit", "integer", "No"]
        ],
        example: "GET /artists",
        response: { success: true, message: "Success", data: { artists: [], pagination: {} } }
    },

    {
        group: "artistEndpoints",
        method: "GET",
        path: "/artists/{id}",
        auth: "Public",
        title: "Artist Details",
        desc: "Returns artist details.",
        pathParams: [
            ["id", "integer", "Yes"]
        ],
        example: "GET /artists/1",
        response: { success: true, message: "Success", data: { id: 1, name: "Artist Name" } },
        errors: [
            ["404", "Artist not found."]
        ]
    },

    {
        group: "artistEndpoints",
        method: "GET",
        path: "/artists/{id}/tracks",
        auth: "Public",
        title: "Artist's Songs",
        desc: "Returns an artist and their associated tracks with pagination.",
        pathParams: [
            ["id", "integer", "Yes"]
        ],
        query: [
            ["page", "integer", "No"],
            ["limit", "integer", "No"]
        ],
        example: "GET /artists/1/tracks?page=1&limit=20",
        response: { success: true, message: "Success", data: { artist: {}, tracks: [], pagination: {} } }
    },

    {
        group: "artistEndpoints",
        method: "GET",
        path: "/artists/{id}/albums",
        auth: "Public",
        title: "Artist's Albums",
        desc: "Returns an artist and their associated albums with pagination.",
        pathParams: [
            ["id", "integer", "Yes"]
        ],
        query: [
            ["page", "integer", "No"],
            ["limit", "integer", "No"]
        ],
        example: "GET /artists/1/albums?page=1&limit=20",
        response: { success: true, message: "Success", data: { artist: {}, albums: [], pagination: {} } }
    },

    {
        group: "albumEndpoints",
        method: "GET",
        path: "/albums",
        auth: "Public",
        title: "All Albums",
        desc: "Returns paginated albums.",
        query: [
            ["page", "integer", "No"],
            ["limit", "integer", "No"]
        ],
        example: "GET /albums?page=1&limit=20",
        response: { success: true, message: "Success", data: { albums: [], pagination: {} } }
    },

    {
        group: "albumEndpoints",
        method: "GET",
        path: "/albums/search",
        auth: "Public",
        title: "Search Albums",
        desc: "Searches albums using q. If q is empty, the current implementation returns an empty successful response rather than an error.",
        query: [
            ["q", "string", "Yes"]
        ],
        example: "GET /albums/search?q=bollywood",
        response: { success: true, message: "Success", data: { albums: [] } }
    },

    {
        group: "albumEndpoints",
        method: "GET",
        path: "/albums/{id}",
        auth: "Public",
        title: "Album Details",
        desc: "Returns album details.",
        pathParams: [
            ["id", "integer", "Yes"]
        ],
        example: "GET /albums/1",
        response: { success: true, message: "Success", data: { id: 1, title: "Album Title" } },
        errors: [
            ["404", "Album not found."]
        ]
    },

    {
        group: "albumEndpoints",
        method: "GET",
        path: "/albums/{id}/tracks",
        auth: "Public",
        title: "Album with Tracks",
        desc: "Returns an album along with its associated tracks.",
        pathParams: [
            ["id", "integer", "Yes"]
        ],
        example: "GET /albums/1/tracks",
        response: { success: true, message: "Success", data: { album: {}, tracks: [] } },
        errors: [
            ["404", "Album not found."]
        ]
    },

    {
        group: "favoriteEndpoints",
        method: "GET",
        path: "/favorites",
        auth: "Required",
        title: "Get Favorites",
        desc: "Returns the authenticated user's favorite songs.",
        query: [
            ["page", "integer", "No"],
            ["limit", "integer", "No"]
        ],
        example: "GET /favorites?page=1&limit=20",
        response: { success: true, message: "Success", data: { favorites: [], pagination: {} } }
    },

    {
        group: "favoriteEndpoints",
        method: "POST",
        path: "/favorites",
        auth: "Required",
        title: "Add Favorite",
        desc: "Adds a song to the current user's favorites.",
        body: { song_id: 28 },
        example: "POST /favorites",
        response: { success: true, message: "Song added to favorites.", data: {} },
        status: 201
    },

    {
        group: "favoriteEndpoints",
        method: "DELETE",
        path: "/favorites/{id}",
        auth: "Required",
        title: "Remove Favorite",
        desc: "Removes a favorite. {id} here represents the song ID, not the favorites row ID.",
        pathParams: [
            ["id", "integer", "Yes — song ID"]
        ],
        example: "DELETE /favorites/28",
        response: { success: true, message: "Song removed from favorites.", data: {} }
    },

    {
        group: "historyEndpoints",
        method: "GET",
        path: "/history",
        auth: "Required",
        title: "Get History",
        desc: "Returns listening history, including history ID, played timestamp, play duration, completion state, device, song info and pagination.",
        query: [
            ["page", "integer", "No"],
            ["limit", "integer", "No"]
        ],
        example: "GET /history?page=1&limit=20",
        response: { success: true, message: "Success", data: { history: [], pagination: {} } }
    },

    {
        group: "historyEndpoints",
        method: "POST",
        path: "/history",
        auth: "Required",
        title: "Add History Entry",
        desc: "Manually adds a history entry. Only song_id is required.",
        body: { song_id: 28, play_duration: 120, completed: false, device: "Android" },
        example: "POST /history",
        response: { success: true, message: "Created Successfully", data: {} },
        status: 201
    },

    {
        group: "historyEndpoints",
        method: "DELETE",
        path: "/history/{id}",
        auth: "Required",
        title: "Delete History Record",
        desc: "Deletes one history record.",
        pathParams: [
            ["id", "integer", "Yes"]
        ],
        example: "DELETE /history/10",
        response: { success: true, message: "Success", data: null }
    },

    {
        group: "historyEndpoints",
        method: "DELETE",
        path: "/history",
        auth: "Required",
        title: "Clear History",
        desc: "Clears the current user's entire listening history.",
        example: "DELETE /history",
        response: { success: true, message: "Success", data: null }
    },

    {
        group: "playlistEndpoints",
        method: "GET",
        path: "/playlists",
        auth: "Required",
        title: "Get Playlists",
        desc: "Returns the authenticated user's playlists.",
        query: [
            ["page", "integer", "No"]
        ],
        example: "GET /playlists",
        response: { success: true, message: "Success", data: { playlists: [] } }
    },

    {
        group: "playlistEndpoints",
        method: "GET",
        path: "/playlists/{id}/tracks",
        auth: "Optional",
        title: "Playlist Details & Tracks",
        desc: "Returns playlist details and tracks. Public playlists can be accessed without authentication; authenticated users can supply a JWT for ownership/visibility logic. This is the active playlist-detail route.",
        pathParams: [
            ["id", "integer", "Yes"]
        ],
        example: "GET /playlists/1/tracks",
        response: { success: true, message: "Success", data: { playlist: {}, tracks: [] } }
    },

    {
        group: "playlistEndpoints",
        method: "POST",
        path: "/playlists",
        auth: "Required",
        title: "Create Playlist",
        desc: "Creates a new playlist. Only title is required.",
        body: { title: "My Playlist", description: "My favorite songs", cover_url: "https://example.com/cover.jpg", is_public: 1 },
        example: "POST /playlists",
        response: { success: true, message: "Created Successfully", data: { playlist_id: 1 } },
        status: 201
    },

    {
        group: "playlistEndpoints",
        method: "PUT",
        path: "/playlists/{id}",
        auth: "Required",
        title: "Update Playlist",
        desc: "Updates a playlist.",
        pathParams: [
            ["id", "integer", "Yes"]
        ],
        body: { title: "Updated Playlist", description: "Updated description", cover_url: "https://example.com/cover.jpg", is_public: 1 },
        example: "PUT /playlists/1",
        response: { success: true, message: "Success", data: {} }
    },

    {
        group: "playlistEndpoints",
        method: "DELETE",
        path: "/playlists/{id}",
        auth: "Required",
        title: "Delete Playlist",
        desc: "Deletes a playlist.",
        pathParams: [
            ["id", "integer", "Yes"]
        ],
        example: "DELETE /playlists/1",
        response: { success: true, message: "Success", data: null }
    },

    {
        group: "playlistEndpoints",
        method: "POST",
        path: "/playlists/{id}/songs",
        auth: "Required",
        title: "Add Song to Playlist",
        desc: "Adds a song to a playlist.",
        pathParams: [
            ["id", "integer", "Yes — playlist ID"]
        ],
        body: { song_id: 28 },
        example: "POST /playlists/1/songs",
        response: { success: true, message: "Success", data: {} }
    },

    {
        group: "playlistEndpoints",
        method: "DELETE",
        path: "/playlists/{id}/songs/{songId}",
        auth: "Required",
        title: "Remove Song from Playlist",
        desc: "Removes a song from a playlist.",
        pathParams: [
            ["id", "integer", "Yes — playlist ID"],
            ["songId", "integer", "Yes — song ID"]
        ],
        example: "DELETE /playlists/1/songs/28",
        response: { success: true, message: "Success", data: null }
    },
];

/* ---------------- Database tables (full schema) ---------------- */
const dbTables = [{
        name: "users",
        desc: "Application users. Passwords are bcrypt hashes, never stored in plaintext.",
        cols: ["id", "name", "email", "password_hash", "avatar_url", "country", "birth_date", "gender", "bio", "is_premium", "status", "last_login", "created_at", "updated_at", "deleted_at"]
    },
    {
        name: "songs",
        desc: "Music tracks.",
        cols: ["id", "title", "slug", "description", "lyrics", "audio_url", "cover_url", "duration_seconds", "language", "release_date", "play_count", "like_count", "download_count", "is_explicit", "is_active", "created_at", "updated_at", "deleted_at"]
    },
    {
        name: "artists",
        desc: "Artist profiles.",
        cols: ["id", "name", "slug", "bio", "country", "image_url", "verified", "monthly_listeners", "created_at", "updated_at", "deleted_at"]
    },
    {
        name: "albums",
        desc: "Albums. album_type is one of Album, Single, EP, Compilation.",
        cols: ["id", "title", "slug", "description", "cover_url", "release_date", "album_type", "copyright", "label", "total_tracks", "created_at", "updated_at", "deleted_at"]
    },
    { name: "genres", desc: "Genre definitions.", cols: ["id", "name", "slug", "created_at"] },
    {
        name: "song_artists",
        desc: "Many-to-many link between songs and artists. role is one of Main, Featured, Composer, Producer.",
        cols: ["song_id", "artist_id", "role", "created_at"]
    },
    { name: "song_albums", desc: "Connects songs to albums with track/disc ordering.", cols: ["song_id", "album_id", "track_number", "disc_number", "created_at"] },
    { name: "song_genres", desc: "Many-to-many link between songs and genres.", cols: ["song_id", "genre_id", "created_at"] },
    {
        name: "playlists",
        desc: "User playlists. The title column is named title, not name.",
        cols: ["id", "user_id", "title", "description", "cover_url", "is_public", "total_songs", "created_at", "updated_at"]
    },
    { name: "playlist_songs", desc: "Connects playlists to songs with position.", cols: ["playlist_id", "song_id", "position", "added_at"] },
    { name: "favorites", desc: "Songs favorited by users.", cols: ["id", "user_id", "song_id", "created_at"] },
    { name: "history", desc: "Playback history records.", cols: ["id", "user_id", "song_id", "played_at", "play_duration", "completed", "device"] },
    { name: "song_views", desc: "Song view / playback view metadata.", cols: ["id", "song_id", "user_id", "viewed_at", "ip_address", "device", "platform"] },
    { name: "artist_follows", desc: "Artist follow relationships. Table exists — no API route registered yet.", cols: ["user_id", "artist_id", "created_at"] },
    {
        name: "notifications",
        desc: "User notifications. Table exists — no API route registered yet. type is one of general, artist, playlist, album, system.",
        cols: ["id", "user_id", "title", "message", "type", "reference_id", "is_read", "created_at"]
    },
    { name: "search_history", desc: "Search query log. Table exists — no API route registered yet.", cols: ["id", "user_id", "keyword", "searched_at"] },
    { name: "user_settings", desc: "Per-user preferences.", cols: ["user_id", "theme", "language", "stream_quality", "download_quality", "autoplay", "crossfade_seconds", "normalize_volume", "explicit_content", "created_at", "updated_at"] },
];

/* ---------------- HTTP status codes ---------------- */
const statusCodes = [
    ["200", "Successful request"],
    ["201", "Resource created"],
    ["400", "Bad request"],
    ["401", "Authentication required / invalid"],
    ["403", "Forbidden"],
    ["404", "Resource or route not found"],
    ["409", "Conflict, such as an existing email"],
    ["422", "Validation failure"],
    ["500", "Internal server error"]
];

/* ==========================================================================
   Render helpers
   ========================================================================== */
function esc(s) { return String(s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c])); }

function pretty(obj) { return JSON.stringify(obj, null, 2); }

function authClass(a) {
    a = a.toLowerCase();
    if (a.includes('required')) return 'required';
    if (a.includes('public')) return 'public';
    if (a.includes('optional')) return 'optional';
    return 'none';
}

function methodClass(m) { return m.split(' ')[0].toLowerCase(); }

function codeBlock(code, label) {
    return `<div class="code-wrap"><span class="code-label">${label||''}</span><button class="copy-btn" data-copy>Copy</button><pre><code>${esc(code)}</code></pre></div>`;
}

function paramTable(title, rows) {
    return `<div class="section-label">${title}</div><table class="param-table"><thead><tr><th>Name</th><th>Type</th><th>Required</th></tr></thead><tbody>${
    rows.map(r=>{
      const isReq = /yes/i.test(r[2]);
      const rest = r[2].replace(/^(yes|no)\s*-*\s*/i,'');
      return `<tr><td>${r[0]}</td><td>${r[1]}</td><td><span class="req-flag ${isReq?'req-yes':'req-no'}">${isReq?'required':'optional'}</span> ${rest}</td></tr>`;
    }).join('')
  }</tbody></table>`;
}
function errorList(errors){
  return `<div class="section-label">Errors</div><div class="error-list">${
    errors.map(e=>`<div class="error-item"><b>${e[0]}</b><span>${e[1]}</span></div>`).join('')
  }</div>`;
}

function endpointCard(ep){
  const methods = ep.method.split(' / ');
  const badges = methods.map(m=>`<span class="method ${methodClass(m)}">${m}</span>`).join(' ');
  let html = `<article class="endpoint-card" id="ep-${slug(ep.path)}-${methodClass(ep.method)}">`;
  html += `<div class="endpoint-head">${badges}<code>${ep.path}${ep.altPath?` <span style="color:var(--muted)">· also ${ep.altPath}</span>`:''}</code><span class="auth ${authClass(ep.auth)}">${ep.auth}</span></div>`;
  html += `<div class="endpoint-title">${ep.title}</div>`;
  html += `<p>${ep.desc}</p>`;
  if(ep.pathParams) html += paramTable('Path Parameters', ep.pathParams);
  if(ep.query) html += paramTable('Query Parameters', ep.query);
  if(ep.body) html += codeBlock(pretty(ep.body), 'request body');
  html += codeBlock(ep.example, 'example request');
  html += codeBlock(pretty(ep.response), `example response · ${ep.status||200}`);
  if(ep.errors) html += errorList(ep.errors);
  if(ep.notes) html += `<div class="callout info"><b>Note</b><br>${ep.notes}</div>`;
  html += `</article>`;
  return html;
}
function slug(s){ return s.replace(/[{}\/]/g,'-').replace(/^-+|-+$/g,''); }

/* ==========================================================================
   Mount
   ========================================================================== */

// group endpoint cards by container id
const byGroup = {};
endpoints.forEach(ep=>{ (byGroup[ep.group] = byGroup[ep.group]||[]).push(ep); });
Object.keys(byGroup).forEach(gid=>{
  const el = document.getElementById(gid);
  if(el) el.innerHTML = byGroup[gid].map(endpointCard).join('');
});

// nav tree
const nav = document.getElementById("nav");
nav.innerHTML = Object.entries(groups).map(([g,items])=>
  `<div class="nav-group"><div class="nav-title">${g}</div>${items.map(([id,label])=>`<a class="nav-link" href="#${id}" data-id="${id}">${label}</a>`).join("")}</div>`
).join("");

// route table with method chips + text filter
const table = document.getElementById("routeTable");
let activeMethod = "ALL";
function renderTable(filter=""){
  const f = filter.toLowerCase();
  const rows = routes.filter(r => (activeMethod==="ALL" || r[0]===activeMethod) && r.join(" ").toLowerCase().includes(f));
  table.innerHTML = rows.map(r=>
    `<tr><td><span class="method ${methodClass(r[0])}">${r[0]}</span></td><td>${r[1]}</td><td><span class="auth ${authClass(r[2])}">${r[2]}</span></td><td class="wrap">${r[3]}</td></tr>`
  ).join("") || `<tr><td colspan="4" style="color:var(--muted)">No matching routes.</td></tr>`;
}
renderTable();
document.getElementById("routeFilter").addEventListener("input", e => renderTable(e.target.value));
document.querySelectorAll(".chip[data-method]").forEach(chip=>{
  chip.addEventListener("click", ()=>{
    document.querySelectorAll(".chip[data-method]").forEach(c=>c.classList.remove("active"));
    chip.classList.add("active");
    activeMethod = chip.dataset.method;
    renderTable(document.getElementById("routeFilter").value);
  });
});

// status codes table
document.getElementById("statusTable").innerHTML = statusCodes.map(s=>
  `<tr><td><span class="method" style="background:var(--panel2);color:var(--text)">${s[0]}</span></td><td class="wrap">${s[1]}</td></tr>`
).join("");

// db tables
document.getElementById("dbTablesList").innerHTML = dbTables.map(t=>
  `<div class="db-table-card" id="db-${t.name}"><h4>${t.name}</h4><p style="margin:2px 0 0">${t.desc}</p><div class="db-cols">${t.cols.map(c=>`<span>${c}</span>`).join('')}</div></div>`
).join("");
document.getElementById("dbOverviewChips").innerHTML =
  `<div class="db-list">${dbTables.map(t=>`<span>${t.name}</span>`).join('')}</div>`;

/* ---------------- Base URL selector ---------------- */
const base = document.getElementById("baseUrl"), activeBase = document.getElementById("activeBase");
const expBaseDisplay = document.getElementById("expBaseDisplay");
base.addEventListener("change", ()=>{
  activeBase.textContent = base.value;
  if(expBaseDisplay) expBaseDisplay.textContent = base.value;
});

/* ---------------- Route filter toolbar already wired above ---------------- */

/* ---------------- Mobile sidebar ---------------- */
const sidebar = document.getElementById("sidebar");
document.getElementById("menuBtn").addEventListener("click", ()=> sidebar.classList.toggle("open"));
document.addEventListener("click", e=>{
  if(e.target.closest(".nav-link") || e.target.closest(".search-results a")) sidebar.classList.remove("open");
});

/* ---------------- Theme toggle (in-memory only — no storage APIs) ---------------- */
const themeBtn = document.getElementById("themeBtn");
let currentTheme = "light";
themeBtn.addEventListener("click", ()=>{
  currentTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = currentTheme;
  themeBtn.textContent = currentTheme === "dark" ? "☾" : "☼";
});

/* ---------------- Search (nav + routes + endpoint content) ---------------- */
function searchDocs(value){
  const q = value.trim().toLowerCase();
  const box = document.getElementById("searchResults");
  if(!q){ box.classList.remove("show"); box.innerHTML = ""; return; }
  const matches = [];
  Object.entries(groups).forEach(([g,items])=>items.forEach(([id,label])=>{
    if((g+" "+label+" "+id).toLowerCase().includes(q)) matches.push([id,label,g]);
  }));
  routes.forEach(r=>{
    if(r.join(" ").toLowerCase().includes(q)) matches.push(["reference", `${r[0]} ${r[1]}`, "API Reference"]);
  });
  dbTables.forEach(t=>{
    if((t.name+" "+t.desc).toLowerCase().includes(q)) matches.push([`db-${t.name}`, t.name, "Database"]);
  });
  const seen = new Set();
  const deduped = matches.filter(m=>{ const k=m[0]+m[1]; if(seen.has(k)) return false; seen.add(k); return true; });
  box.innerHTML = deduped.slice(0,10).map(x=>`<a href="#${x[0]}"><b>${x[1]}</b><br><span>${x[2]}</span></a>`).join("") || `<a>No results found</a>`;
  box.classList.add("show");
}
document.getElementById("search").addEventListener("input", e=>searchDocs(e.target.value));
document.getElementById("mobileSearch").addEventListener("input", e=>searchDocs(e.target.value));

/* ---------------- Scrollspy ---------------- */
const sections = [...document.querySelectorAll(".doc-section")];
const links = [...document.querySelectorAll(".nav-link")];
const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) links.forEach(l=>l.classList.toggle("active", l.dataset.id===entry.target.id));
  });
},{rootMargin:"-120px 0px -60% 0px",threshold:0});
sections.forEach(s=>observer.observe(s));

/* ---------------- Back to top ---------------- */
const toTopBtn = document.getElementById("toTop");
if(toTopBtn){
  window.addEventListener("scroll", ()=>{
    toTopBtn.classList.toggle("show", window.scrollY > 480);
  }, { passive: true });
  toTopBtn.addEventListener("click", ()=>{
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ---------------- Keyboard shortcut ---------------- */
document.addEventListener("keydown", e=>{
  if((e.metaKey||e.ctrlKey) && e.key.toLowerCase()==="k"){ e.preventDefault(); document.getElementById("search").focus(); }
});

/* ---------------- Copy-to-clipboard on every code block ---------------- */
document.addEventListener("click", e=>{
  const btn = e.target.closest(".copy-btn");
  if(!btn) return;
  const codeEl = btn.parentElement.querySelector("code");
  if(!codeEl) return;
  navigator.clipboard.writeText(codeEl.textContent).then(()=>{
    const orig = btn.textContent;
    btn.textContent = "Copied";
    btn.classList.add("copied");
    setTimeout(()=>{ btn.textContent = orig; btn.classList.remove("copied"); }, 1300);
  }).catch(()=>{});
});

/* ---------------- API Explorer ---------------- */
const expMethod = document.getElementById("expMethod");
const expPath = document.getElementById("expPath");
const expToken = document.getElementById("expToken");
const expBody = document.getElementById("expBody");
const expBodyWrap = document.getElementById("expBodyWrap");
const expStatus = document.getElementById("expStatus");
const expResp = document.getElementById("expResp");

function syncExplorer(){
  expBodyWrap.style.display = ["POST","PUT"].includes(expMethod.value) ? "block" : "none";
}
if(expMethod){
  expMethod.addEventListener("change", syncExplorer);
  syncExplorer();

  document.getElementById("expSend").addEventListener("click", async ()=>{
    const path = expPath.value.startsWith("/") ? expPath.value : "/"+expPath.value;
    const url = base.value + path;
    const headers = {};
    if(expToken.value.trim()) headers["Authorization"] = "Bearer " + expToken.value.trim();
    const opts = { method: expMethod.value, headers };
    if(["POST","PUT"].includes(expMethod.value) && expBody.value.trim()){
      headers["Content-Type"] = "application/json";
      opts.body = expBody.value.trim();
    }
    expStatus.textContent = "Sending…";
    expStatus.className = "explorer-status";
    expResp.textContent = "";
    try{
      const res = await fetch(url, opts);
      const text = await res.text();
      let display = text;
      try{ display = JSON.stringify(JSON.parse(text), null, 2); }catch(_e){}
      expStatus.textContent = `${res.status} ${res.statusText}`;
      expStatus.className = "explorer-status " + (res.ok ? "ok" : "err");
      expResp.textContent = display || "(empty response)";
    }catch(err){
      expStatus.textContent = "Request failed";
      expStatus.className = "explorer-status err";
      expResp.textContent = String(err) + "\n\nThis can happen due to CORS, network restrictions, or the API being offline.";
    }
  });
}