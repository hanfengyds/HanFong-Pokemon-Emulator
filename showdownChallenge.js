// 全局变量，用于跟踪当前弹窗
let currentPopup = null;

/**
 * 打开 Showdown 挑战弹窗
 * @param {string} username - 要挑战的用户名
 */
function openShowdownChallengePopup(username) {
    // 如果已有弹窗，直接返回
    if (currentPopup) return;

    // 获取宝可梦卡池元素
    const poolSection = document.querySelector('.pool-section');
    if (!poolSection) return;

    // 创建弹窗元素
    const popup = document.createElement('div');
    popup.style.position = 'absolute';
    updatePopupPosition(popup, poolSection);
    popup.style.backgroundColor = 'white';
    popup.style.border = '1px solid #ccc';
    popup.style.zIndex = '1000';
    popup.style.overflow = 'hidden';

    // 创建 iframe 元素
    const iframe = document.createElement('iframe');
    iframe.src = `https://play.pokemonshowdown.com/challenge-${username}`;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';

    // 创建关闭按钮
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '0';
    closeBtn.style.right = '0';
    closeBtn.style.padding = '5px 10px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.addEventListener('click', () => {
        popup.remove();
        currentPopup = null;
        window.removeEventListener('resize', handleResize);
    });

    // 组装弹窗
    popup.appendChild(closeBtn);
    popup.appendChild(iframe);
    document.body.appendChild(popup);

    // 更新当前弹窗引用
    currentPopup = popup;

    // 窗口大小变化时更新弹窗位置和大小
    function handleResize() {
        updatePopupPosition(popup, poolSection);
    }
    window.addEventListener('resize', handleResize);
}

/**
 * 更新弹窗的位置和大小
 * @param {HTMLElement} popup - 弹窗元素
 * @param {HTMLElement} poolSection - 宝可梦卡池元素
 */
function updatePopupPosition(popup, poolSection) {
    popup.style.top = poolSection.offsetTop + 'px';
    popup.style.left = poolSection.offsetLeft + 'px';
    popup.style.width = poolSection.offsetWidth + 'px';
    popup.style.height = poolSection.offsetHeight + 'px';
}

/**
 * 为用户信息元素添加点击事件
 * @param {HTMLElement} userInfo - 用户信息元素
 * @param {string} username - 用户名
 */
function addChallengeClickListener(userInfo, username) {
    // 检查元素是否已经绑定过事件
    if (userInfo.dataset.clickEventAdded) return;
    userInfo.dataset.clickEventAdded = 'true';
    userInfo.addEventListener('click', () => {
        openShowdownChallengePopup(username);
    });
}

// 页面加载完成后，初始化监听
document.addEventListener('DOMContentLoaded', () => {
    // 立即尝试绑定一次
    bindClickEvents();

    // 使用 MutationObserver 监听 DOM 变化
    const observer = new MutationObserver(() => {
        bindClickEvents();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});

function bindClickEvents() {
    const userInfoElements = document.querySelectorAll('.user-team-info');
    userInfoElements.forEach(element => {
        const username = element.querySelector('.user-team-name').textContent.trim();
        addChallengeClickListener(element, username);
    });
}

module.exports = {
    openShowdownChallengePopup,
    addChallengeClickListener
};