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

// 付费功能相关代码

// 检测用户是否已付费
function isPaid() {
    return localStorage.getItem('premiumUser') === 'true';
}

// 设置付费状态
function setPaidStatus() {
    localStorage.setItem('premiumUser', 'true');
    localStorage.setItem('paidDate', new Date().toISOString());
    updateUIForPaidUser();
}

// 更新UI显示付费状态
function updateUIForPaidUser() {
    // 添加premium用户类
    document.body.classList.add('premium-user');
    
    // 显示VIP状态
    const vipStatus = document.getElementById('vipStatus');
    if (vipStatus) {
        vipStatus.style.display = 'block';
    }
    
    // 隐藏付费横幅
    const premiumSection = document.getElementById('premiumSection');
    if (premiumSection) {
        premiumSection.style.display = 'none';
    }
}

// 模拟支付流程
function initiatePay() {
    // 显示支付确认对话框
    const confirmed = confirm(
        '🚀 升级到优化版本\n\n' +
        '✓ 游戏加载体验优化\n' +
        '✓ 更好的界面体验\n' +
        '✓ VIP用户专属标识\n\n' +
        '价格：$1 (一次性付费)\n\n' +
        '点击确定继续支付流程'
    );
    
    if (confirmed) {
        // 模拟支付流程
        showPaymentProcess();
    }
}

// 显示支付流程
function showPaymentProcess() {
    // 创建支付模拟界面
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
            <h3>💳 支付处理中...</h3>
            <p>正在跳转到Creem支付页面</p>
            <div style="margin: 1rem 0;">
                <div style="border: 2px solid #667eea; border-top: 2px solid transparent; border-radius: 50%; width: 30px; height: 30px; animation: spin 1s linear infinite; margin: 0 auto;"></div>
            </div>
            <p style="font-size: 0.9rem; color: #666;">
                实际环境中将跳转到真实支付页面<br>
                <small>（演示模式：3秒后自动完成支付）</small>
            </p>
            <button onclick="cancelPayment()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #ccc; border: none; border-radius: 5px; cursor: pointer;">取消</button>
        </div>
    `;
    
    // 添加旋转动画CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(paymentModal);
    
    // 3秒后模拟支付成功
    setTimeout(() => {
        document.body.removeChild(paymentModal);
        paymentSuccess();
    }, 3000);
    
    // 全局取消支付函数
    window.cancelPayment = function() {
        document.body.removeChild(paymentModal);
    };
}

// 支付成功处理
function paymentSuccess() {
    // 设置付费状态
    setPaidStatus();
    
    // 显示成功消息
    alert('🎉 支付成功！\n\n现在您已升级为VIP用户，享受优化的游戏加载体验！\n\n刷新页面即可体验新功能。');
    
    // 刷新页面以显示新状态
    location.reload();
}

// 优化的游戏加载函数
function loadGameWithOptimization(gameId, gameUrl) {
    const isPaidUser = isPaid();
    const loadDelay = isPaidUser ? 500 : 3000; // VIP用户0.5秒，免费用户3秒
    
    // 保存游戏URL到本地存储
    localStorage.setItem('currentGame', gameUrl);
    
    // 显示加载指示器
    showLoadingIndicator(isPaidUser);
    
    // 延迟加载以体现差异
    setTimeout(() => {
        window.location.href = `game.html?id=${gameId}`;
    }, loadDelay);
}

// 显示加载指示器
function showLoadingIndicator(isPaidUser) {
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading-indicator';
    loadingDiv.innerHTML = isPaidUser 
        ? '<div class="loading-premium">🚀 VIP优化加载中...</div>'
        : '<div class="loading-free">⏳ 正在加载游戏...</div>';
    
    document.body.appendChild(loadingDiv);
    
    // 3秒后移除（如果还存在）
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