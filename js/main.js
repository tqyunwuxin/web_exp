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

// Premium features related code

// Check if user has paid
function isPaid() {
    return localStorage.getItem('premiumUser') === 'true';
}

// Set paid status
function setPaidStatus() {
    localStorage.setItem('premiumUser', 'true');
    localStorage.setItem('paidDate', new Date().toISOString());
    updateUIForPaidUser();
}

// Update UI for paid user
function updateUIForPaidUser() {
    // Add premium user class
    document.body.classList.add('premium-user');
    
    // Show VIP status
    const vipStatus = document.getElementById('vipStatus');
    if (vipStatus) {
        vipStatus.style.display = 'block';
    }
    
    // Hide premium section
    const premiumSection = document.getElementById('premiumSection');
    if (premiumSection) {
        premiumSection.style.display = 'none';
    }
}

// Simulate payment process
function initiatePay() {
    // Display payment confirmation dialog
    const confirmed = confirm(
        '🚀 Upgrade to Optimized Version\n\n' +
        '✓ Optimized game loading experience\n' +
        '✓ Enhanced interface experience\n' +
        '✓ VIP user exclusive badge\n\n' +
        'Price: $1 (One-time payment)\n\n' +
        'Click OK to continue payment process'
    );
    
    if (confirmed) {
        // Simulate payment process
        showPaymentProcess();
    }
}

// Display payment process
function showPaymentProcess() {
    // Create payment simulation interface
    const paymentModal = document.createElement('div');
    paymentModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    `;
    
    paymentModal.innerHTML = `
        <div style="background: white; padding: 2rem; border-radius: 10px; text-align: center; max-width: 400px;">
            <h3>💳 Processing Payment...</h3>
            <p>Redirecting to Creem payment page</p>
            <div style="margin: 1rem 0;">
                <div style="border: 2px solid #667eea; border-top: 2px solid transparent; border-radius: 50%; width: 30px; height: 30px; animation: spin 1s linear infinite; margin: 0 auto;"></div>
            </div>
            <p style="font-size: 0.9rem; color: #666;">
                In production, this will redirect to actual payment page<br>
                <small>(Demo mode: Payment will complete automatically in 3 seconds)</small>
            </p>
            <button onclick="cancelPayment()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #ccc; border: none; border-radius: 5px; cursor: pointer;">Cancel</button>
        </div>
    `;
    
    // Add spinning animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(paymentModal);
    
    // Simulate payment success after 3 seconds
    setTimeout(() => {
        document.body.removeChild(paymentModal);
        paymentSuccess();
    }, 3000);
    
    // Global cancel payment function
    window.cancelPayment = function() {
        document.body.removeChild(paymentModal);
    };
}

// Payment success handler
function paymentSuccess() {
    // Set paid status
    setPaidStatus();
    
    // Display success message
    alert('🎉 Payment Successful!\n\nYou are now a VIP user with optimized game loading experience!\n\nRefresh the page to experience the new features.');
    
    // Refresh page to display new status
    location.reload();
}

// Optimized game loading function
function loadGameWithOptimization(gameId, gameUrl) {
    const isPaidUser = isPaid();
    const loadDelay = isPaidUser ? 500 : 3000; // VIP users 0.5s, free users 3s
    
    // Save game URL to local storage
    localStorage.setItem('currentGame', gameUrl);
    
    // Show loading indicator
    showLoadingIndicator(isPaidUser);
    
    // Delayed loading to show difference
    setTimeout(() => {
        window.location.href = `game.html?id=${gameId}`;
    }, loadDelay);
}

// Show loading indicator
function showLoadingIndicator(isPaidUser) {
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading-indicator';
    loadingDiv.innerHTML = isPaidUser 
        ? '<div class="loading-premium">🚀 VIP Optimized Loading...</div>'
        : '<div class="loading-free">⏳ Loading game...</div>';
    
    document.body.appendChild(loadingDiv);
    
    // Remove after 3 seconds (if still exists)
    setTimeout(() => {
        if (document.body.contains(loadingDiv)) {
            document.body.removeChild(loadingDiv);
        }
    }, 4000);
}

// 修改原有的loadGame函数以使用优化版本
function loadGame(gameId, gameUrl) {
    loadGameWithOptimization(gameId, gameUrl);
}

// 页面加载时检查付费状态
document.addEventListener('DOMContentLoaded', () => {
    // 检查并应用付费状态
    if (isPaid()) {
        updateUIForPaidUser();
    }
    
    // 原有的初始化逻辑
    if (document.querySelector('.game-grid')) {
        initHomePage();
    } else if (document.querySelector('.game-container')) {
        initGamePage();
    }
}); 