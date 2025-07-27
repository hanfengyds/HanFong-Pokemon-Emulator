// username.js - 宝可梦BP对战系统用户名管理模块（完整头像版）

class UsernameManager {
    constructor(multiplayerManager) {
        this.multiplayer = multiplayerManager;
        this.username = this.getSavedUsername() || `用户${Math.floor(Math.random() * 1000)}`;
        this.avatar = this.getSavedAvatar() || '1'; // 默认头像编号为1
        
        // 初始化UI
        this.initUsernameModal();
        
        // 更新Firebase中的用户信息
        this.updateFirebaseUserInfo();
        
        // 添加用户名修改按钮
        this.addUsernameChangeButton();
        
        // 初始化用户列表
        this.initUserList();
    }
    
    initUsernameModal() {
        // 创建用户名设置弹窗
        this.createUsernameModal();
        
        // 如果没有保存的用户名，显示弹窗
        if (!this.getSavedUsername()) {
            this.showUsernameModal();
        }
    }
    
    createUsernameModal() {
        // 如果弹窗已存在，先移除
        const existingModal = document.getElementById('username-modal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // 创建弹窗HTML（包含头像选择区域）
        const modalHTML = `
            <div class="modal-overlay" id="username-modal">
                <div class="modal-content">
                    <h2>设置个人信息</h2>
                    <p>选择头像并输入用户名</p>
                    
                    <div class="avatar-selection">
                        <div class="current-avatar">
                            <img id="selected-avatar" src="home/${this.avatar}.png" alt="当前头像">
                        </div>
                        <div class="avatar-grid" id="avatar-grid"></div>
                    </div>
                    
                    <input type="text" id="username-input" maxlength="20" value="${this.username}" placeholder="输入用户名">
                    
                    <div class="modal-buttons">
                        <button id="confirm-username">确认</button>
                    </div>
                </div>
            </div>
        `;
        
        // 添加到body
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // 加载头像选项
        this.loadAvatars();
        
        // 添加事件监听
        document.getElementById('confirm-username').addEventListener('click', () => {
            const newUsername = document.getElementById('username-input').value.trim();
            if (newUsername) {
                this.setUsername(newUsername);
                this.hideUsernameModal();
            }
        });
        
        document.getElementById('username-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const newUsername = document.getElementById('username-input').value.trim();
                if (newUsername) {
                    this.setUsername(newUsername);
                    this.hideUsernameModal();
                }
            }
        });
        
        // 添加样式
        this.addModalStyles();
        
        // 自动聚焦输入框
        document.getElementById('username-input').focus();
    }
    
    loadAvatars() {
        const avatarGrid = document.getElementById('avatar-grid');
        avatarGrid.innerHTML = ''; // 清空现有内容

        // 指定特定的头像编号数组
        const availableAvatars = [4,36,25,79, 94,143,212,430,722,983,259,778];
        
        availableAvatars.forEach(i => {
            const avatarItem = document.createElement('div');
            avatarItem.className = 'avatar-item';
            if (i.toString() === this.avatar) {
                avatarItem.classList.add('selected');
            }
            
            avatarItem.innerHTML = `
                <img src="home/${i}.png" alt="头像${i}" title="头像${i}">
            `;
            
            avatarItem.addEventListener('click', () => {
                this.avatar = i.toString();
                document.getElementById('selected-avatar').src = `home/${i}.png`;
                
                // 更新所有头像的选中状态
                document.querySelectorAll('.avatar-item').forEach(item => {
                    item.classList.remove('selected');
                });
                avatarItem.classList.add('selected');
            });
            
            avatarGrid.appendChild(avatarItem);
        });
    }
    
    addModalStyles() {
        // 如果样式已存在，先移除
        const existingStyle = document.getElementById('username-modal-styles');
        if (existingStyle) {
            existingStyle.remove();
        }
        
        const style = document.createElement('style');
        style.id = 'username-modal-styles';
        style.textContent = `
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.7);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
            }
            
            .modal-content {
                background-color: white;
                padding: 25px;
                border-radius: 10px;
                width: 350px;
                max-width: 90%;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
            }
            
            .modal-content h2 {
                margin-top: 0;
                margin-bottom: 5px;
                color: #2c3e50;
                text-align: center;
            }
            
            .modal-content p {
                margin-top: 0;
                margin-bottom: 20px;
                color: #7f8c8d;
                text-align: center;
                font-size: 0.9rem;
            }
            
            .avatar-selection {
                margin-bottom: 20px;
            }
            
            .current-avatar {
                text-align: center;
                margin-bottom: 15px;
            }
            
            .current-avatar img {
                width: 80px;
                height: 80px;
                border-radius: 50%;
                border: 3px solid #3498db;
                object-fit: cover;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            
            .avatar-grid {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 12px;
                margin-bottom: 15px;
            }
            
            .avatar-item {
                cursor: pointer;
                transition: all 0.2s ease;
                text-align: center;
            }
            
            .avatar-item:hover {
                transform: scale(1.1);
            }
            
            .avatar-item.selected {
                position: relative;
                transform: scale(1.1);
            }
            
            .avatar-item.selected::after {
                content: "✓";
                position: absolute;
                top: -5px;
                right: -5px;
                background: #2ecc71;
                color: white;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
            }
            
            .avatar-item img {
                width: 100%;
                height: auto;
                border-radius: 50%;
                border: 2px solid #ecf0f1;
                transition: border-color 0.2s;
            }
            
            .avatar-item:hover img {
                border-color: #3498db;
            }
            
            .avatar-item.selected img {
                border-color: #3498db;
                box-shadow: 0 2px 8px rgba(52, 152, 219, 0.3);
            }
            
            #username-input {
                width: 100%;
                padding: 12px 15px;
                margin-bottom: 20px;
                border: 1px solid #ddd;
                border-radius: 6px;
                font-size: 16px;
                transition: border-color 0.2s;
            }
            
            #username-input:focus {
                outline: none;
                border-color: #3498db;
                box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
            }
            
            .modal-buttons {
                display: flex;
                justify-content: flex-end;
            }
            
            #confirm-username {
                padding: 10px 20px;
                background-color:rgb(120, 120, 120);
                color: white;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-size: 16px;
                transition: background-color 0.2s;
            }
            
            #confirm-username:hover {
                background-color:rgb(60, 62, 62);
            }
            
            .change-username-btn {
    
                order: -1;
                cursor: pointer;
                color:rgb(224, 224, 224);
                transition: color 0.2s;
            }
            
            .change-username-btn:hover {
                color:rgb(119, 123, 124);
            }
        `;
        document.head.appendChild(style);
    }
    
    showUsernameModal() {
        const modal = document.getElementById('username-modal');
        if (modal) {
            modal.style.display = 'flex';
            document.getElementById('username-input').value = this.username;
            document.getElementById('username-input').focus();
        }
    }
    
    hideUsernameModal() {
        const modal = document.getElementById('username-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }
    
    setUsername(newUsername) {
        if (newUsername && newUsername.length > 0) {
            this.username = newUsername;
            this.saveUsername();
            this.saveAvatar();
            this.updateFirebaseUserInfo();
            
            if (this.multiplayer) {
                this.multiplayer.currentUsername = this.username;
                this.multiplayer.currentAvatar = this.avatar;
            }
        }
    }
    
    saveUsername() {
        localStorage.setItem('pokemon-bp-username', this.username);
    }
    
    saveAvatar() {
        localStorage.setItem('pokemon-bp-avatar', this.avatar);
    }
    
    getSavedUsername() {
        return localStorage.getItem('pokemon-bp-username');
    }
    
    getSavedAvatar() {
        return localStorage.getItem('pokemon-bp-avatar');
    }
    
    updateFirebaseUserInfo() {
        if (this.multiplayer && this.multiplayer.usersRef) {
            const userRef = this.multiplayer.usersRef.child(this.multiplayer.userId);
            userRef.update({
                name: this.username,
                avatar: this.avatar
            });
        }
    }
    
    addUsernameChangeButton() {
        const chatHeader = document.querySelector('.chat-header');
        if (!chatHeader) return;
        
        // 如果按钮已存在，先移除
        const existingBtn = chatHeader.querySelector('.change-username-btn');
        if (existingBtn) {
            existingBtn.remove();
        }
        
        const changeBtn = document.createElement('span');
        changeBtn.className = 'change-username-btn';
        changeBtn.innerHTML = '<i class="fas fa-user-cog"></i>';
        changeBtn.title = '更改用户名和头像';
        changeBtn.addEventListener('click', () => {
            this.showUsernameModal();
        });
        
        chatHeader.appendChild(changeBtn);
    }
    
    // 新增：初始化用户列表
    initUserList() {
        // 确保DOM加载完成
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupUserListListener());
        } else {
            this.setupUserListListener();
        }
    }
    
    // 新增：设置用户列表监听器
    setupUserListListener() {
        if (!this.multiplayer || !this.multiplayer.usersRef) return;
        
        // 监听用户变化更新列表
        this.multiplayer.usersRef.on('value', () => this.updateUserList());
        
        // 设置聊天标签切换事件
        this.setupChatTabListener();
    }
    
    // 新增：设置聊天标签切换
    setupChatTabListener() {
        const tabs = document.querySelectorAll('.chat-tab');
        if (!tabs.length) return;
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                if (tab.dataset.tab === 'users') {
                    this.updateUserList();
                }
            });
        });
    }
    
    // 新增：更新用户列表
    updateUserList() {
        if (!this.multiplayer || !this.multiplayer.usersRef) return;
        
        const userListContent = document.getElementById('user-list-content');
        const userCountElement = document.getElementById('user-count');
        
        if (!userListContent || !userCountElement) return;
        
        this.multiplayer.usersRef.once('value').then((snapshot) => {
            const users = snapshot.val();
            userListContent.innerHTML = '';
            
            if (!users) {
                userCountElement.textContent = '0';
                return;
            }
            
            const userCount = Object.keys(users).length;
            userCountElement.textContent = userCount;
            
            // 遍历所有用户
            Object.values(users).forEach(user => {
                const userItem = document.createElement('div');
                userItem.className = 'user-item';
                
                userItem.innerHTML = `
                    <img src="home/${user.avatar || '1'}.png" alt="${user.name}" class="user-avatar">
                    <div class="user-name">${user.name}</div>
                    <div class="user-status"></div>
                `;
                
                userListContent.appendChild(userItem);
            });
        });
    }
}

// 导出模块
function initUsernameManager(multiplayerManager) {
    const manager = new UsernameManager(multiplayerManager);
    
    // 将用户名管理器实例赋给multiplayerManager
    if (multiplayerManager) {
        multiplayerManager.usernameManager = manager;
        multiplayerManager.currentUsername = manager.username;
        multiplayerManager.currentAvatar = manager.avatar;
    }
    
    return manager;
}
