// Game data
const games = [
    {
        id: 'count-masters',
        name: 'Count Masters',
        description: 'Stickman group battle game, control your character through clicking and dragging',
        type: 'Action/Strategy',
        url: 'https://games.crazygames.com/en_US/count-masters-stickman-games/index.html?v=1.332',
        cover: 'images/count-masters/cover.jpg'
    },
    {
        id: 'slice-master',
        name: 'Slice Master',
        description: 'Casual puzzle game, slice objects by sliding your finger or mouse',
        type: 'Casual/Skill',
        url: 'https://games.crazygames.com/en_US/slice-master/index.html?v=1.332',
        cover: 'images/slice-master/cover.jpg'
    },
    {
        id: 'fortzone-battle',
        name: 'Fortzone Battle',
        description: 'Battle Royale game, use WASD to move and mouse to aim and shoot',
        type: 'Shooting/Battle',
        url: 'https://games.crazygames.com/en_US/fortzone-battle-royale-xkd/index.html?v=1.332',
        cover: 'images/fortzone-battle/cover.jpg'
    }
];

// Create game card
function createGameCard(game) {
    return `
        <div class="game-card" onclick="loadGame('${game.id}', '${game.url}')">
            <img src="${game.cover}" alt="${game.name}">
            <div class="game-card-content">
                <h3>${game.name}</h3>
                <p>${game.description}</p>
                <span class="game-type">${game.type}</span>
            </div>
        </div>
    `;
}

// Load game
function loadGame(gameId, gameUrl) {
    // Save game URL to local storage
    localStorage.setItem('currentGame', gameUrl);
    // Redirect to game page
    window.location.href = `game.html?id=${gameId}`;
}

// Initialize home page
function initHomePage() {
    const gameGrid = document.querySelector('.game-grid');
    if (gameGrid) {
        gameGrid.innerHTML = games.map(game => createGameCard(game)).join('');
    }
}

// Initialize game page
function initGamePage() {
    const gameContainer = document.querySelector('.game-container');
    if (gameContainer) {
        const gameUrl = localStorage.getItem('currentGame');
        if (gameUrl) {
            const iframe = document.createElement('iframe');
            iframe.src = gameUrl;
            iframe.width = '100%';
            iframe.height = '100%';
            iframe.frameBorder = '0';
            gameContainer.appendChild(iframe);
        }
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.game-grid')) {
        initHomePage();
    } else if (document.querySelector('.game-container')) {
        initGamePage();
    }
}); 