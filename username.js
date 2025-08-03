// username.js - 宝可梦BP对战系统用户名管理模块（完整头像版）

class UsernameManager {
    constructor(multiplayerManager) {
        this.multiplayer = multiplayerManager;
        this.username = this.getSavedUsername() || `用户${Math.floor(Math.random() * 1000)}`;
        this.avatar = this.getSavedAvatar() || '1.png'; // 默认头像修改为带扩展名的格式
        this.team = this.getSavedTeam() || 'red'; // 默认红队

        // 初始化UI
        this.initUsernameModal();

        // 更新Firebase中的用户信息
        this.updateFirebaseUserInfo();

        // 添加用户名修改按钮
        this.addUsernameChangeButton();

        // 初始化用户列表
        this.initUserList();

        // 显示用户队伍信息
        this.displayUserTeamInfo();
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

        // 创建弹窗HTML（包含头像选择区域和队伍选择）
        const modalHTML = `
            <div class="modal-overlay" id="username-modal">
                <div class="modal-content">
                    <h2>用户信息设置</h2>
                    <p>修改头像、队伍和用户名</p>

                    <div class="avatar-selection">
                        <div class="current-avatar">
                            <img id="selected-avatar" src="home/${this.avatar}" alt="当前头像">
                        </div>
                        <div class="avatar-grid" id="avatar-grid"></div>
                    </div>

                    <div class="team-selection">
                        <p>选择队伍:</p>
                        <div class="team-options">
                            <label class="team-option">
                                <input type="radio" name="team" value="red" ${this.team === 'red' ? 'checked' : ''}>
                                <span class="team-text red">红队</span>
                            </label>
                            <label class="team-option">
                                <input type="radio" name="team" value="blue" ${this.team === 'blue' ? 'checked' : ''}>
                                <span class="team-text blue">蓝队</span>
                            </label>
                            <label class="team-option">
                                <input type="radio" name="team" value="spectator" ${this.team === 'spectator' ? 'checked' : ''}>
                                <span class="team-text spectator">观战</span>
                            </label>
                        </div>
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

        // 加载头像选项 - 恢复为最初的简洁版本
        this.loadAvatars();

        // 添加事件监听
        document.getElementById('confirm-username').addEventListener('click', () => {
            const newUsername = document.getElementById('username-input').value.trim();
            if (newUsername) {
                // 获取选中的队伍
                const selectedTeam = document.querySelector('input[name="team"]:checked').value;
                this.team = selectedTeam;
                
                this.setUsername(newUsername);
                this.hideUsernameModal();
                this.displayUserTeamInfo();
            }
        });

        document.getElementById('username-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const newUsername = document.getElementById('username-input').value.trim();
                if (newUsername) {
                    // 获取选中的队伍
                    const selectedTeam = document.querySelector('input[name="team"]:checked').value;
                    this.team = selectedTeam;
                     
                    this.setUsername(newUsername);
                    this.hideUsernameModal();
                    this.displayUserTeamInfo();
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

        // 直接使用带扩展名的完整文件名
        const availableAvatars = ['0.1.png','0.2.png','0.3.png','0.4.png','0.5.png','0.6.png','0.7.png','0.8.png','0.9.png','0.10.png',
            '0.11.png','0.12.png','0.13.png','0.14.png','0.15.png','0.16.png','0.17.png','0.8.png','0.19.png','0.20.png','0.png',
             '143.png', '212.png', '306M.png','330.png','383P.png','382P.png',
             '964HERO.png','328.png','77G.png',
             '25Ca1.png','445.png','802.png','48.png','359M.png','231.png'];
        
        // 创建滑动容器
        const avatarScroller = document.createElement('div');
        avatarScroller.className = 'avatar-scroller';
        
        availableAvatars.forEach(filename => {
            const avatarItem = document.createElement('div');
            avatarItem.className = 'avatar-item';
            if (filename === this.avatar) {
                avatarItem.classList.add('selected');
            }
            
            avatarItem.innerHTML = `
                <img src="home/${filename}" alt="头像${filename}" title="头像${filename}">
            `;
            
            avatarItem.addEventListener('click', () => {
                this.avatar = filename;
                document.getElementById('selected-avatar').src = `home/${filename}`;
                
                // 更新所有头像的选中状态
                document.querySelectorAll('.avatar-item').forEach(item => {
                    item.classList.remove('selected');
                });
                avatarItem.classList.add('selected');
            });
            
            avatarScroller.appendChild(avatarItem);
        });
        
        avatarGrid.appendChild(avatarScroller);
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
            
            // 修改为滑动容器样式
            .avatar-grid {
                width: 100%;
                overflow: hidden;
                margin-bottom: 15px;
            }
            
            .avatar-scroller {
                display: flex;
                gap: 12px;
                padding: 10px 0;
                overflow-x: auto;
                scrollbar-width: thin;
                scrollbar-color: #3498db #ecf0f1;
                -webkit-overflow-scrolling: touch;
            }
            
            .avatar-scroller::-webkit-scrollbar {
                height: 6px;
            }
            
            .avatar-scroller::-webkit-scrollbar-track {
                background: #ecf0f1;
                border-radius: 10px;
            }
            
            .avatar-scroller::-webkit-scrollbar-thumb {
                background-color: #3498db;
                border-radius: 10px;
            }
            
            .avatar-item {
                flex: 0 0 auto;
                width: 60px;
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
            
            /* 队伍选择样式保持不变 */
            .team-selection {
                margin-bottom: 20px;
            }
            
            .team-options {
                display: flex;
                justify-content: center;
                gap: 20px;
                margin-top: 10px;
            }
            
            .team-option {
                display: flex;
                align-items: center;
                cursor: pointer;
            }
            
            .team-text {
                margin-right: 8px;
                font-weight: bold;
            }
            
            .team-text.red {
                color: #e74c3c;
            }
            
            .team-text.blue {
                color: #3498db;
            }
            
            .team-text.spectator {
                color: #2ecc71;
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
            
            .user-team-info {
                display: flex;
                align-items: center;
                padding: 10px;
                border-radius: 6px;
                margin-bottom: 10px;
            }
            
            .user-team-info.red {
                background-color: rgba(231, 76, 60, 0.1);
                border: 1px solid #e74c3c;
            }
            
            .user-team-info.blue {
                background-color: rgba(52, 152, 219, 0.1);
                border: 1px solid #3498db;
            }
            
            .user-team-avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                margin-right: 10px;
                object-fit: cover;
            }
            
            .user-team-name {
                font-weight: bold;
            }
        `;
        document.head.appendChild(style);
    }

    // 保留所有其他方法不变...
    saveTeam() {
        localStorage.setItem('pokemon-bp-team', this.team);
    }

    getSavedTeam() {
        return localStorage.getItem('pokemon-bp-team');
    }

    setUsername(newUsername) {
        if (newUsername && newUsername.length > 0) {
            this.username = newUsername;
            this.saveUsername();
            this.saveAvatar();
            this.saveTeam();
            this.updateFirebaseUserInfo();
            
            if (this.multiplayer) {
                this.multiplayer.currentUsername = this.username;
                this.multiplayer.currentAvatar = this.avatar;
                this.multiplayer.currentTeam = this.team;
            }
        }
    }

    updateFirebaseUserInfo() {
        if (this.multiplayer && this.multiplayer.usersRef) {
            const userRef = this.multiplayer.usersRef.child(this.multiplayer.userId);
            userRef.update({
                name: this.username,
                avatar: this.avatar,
                team: this.team
            });
        }
    }

    displayUserTeamInfo() {
        // 移除旧的用户信息（包括自己的）
        document.querySelectorAll('.user-team-info').forEach(el => {
            if (!el.dataset.userId || el.dataset.userId === this.multiplayer.userId) {
                el.remove();
            }
        });
        
        const redTeamSection = document.getElementById('red-team-section');
        const blueTeamSection = document.getElementById('blue-team-section');
        
        // 创建用户信息元素
        const userInfo = document.createElement('div');
        userInfo.className = `user-team-info ${this.team}`;
        userInfo.dataset.userId = this.multiplayer.userId; // 标记为自己的信息
        userInfo.innerHTML = `
            <img src="home/${this.avatar}" alt="${this.username}" class="user-team-avatar">
            <div class="user-team-name">${this.username}</div>
        `;
        
        // 添加到对应队伍区域的标题上方
        if (this.team === 'red' && redTeamSection) {
            const teamTitle = redTeamSection.querySelector('.team-title');
            if (teamTitle) {
                redTeamSection.insertBefore(userInfo, teamTitle);
            } else {
                redTeamSection.prepend(userInfo);
            }
        } else if (this.team === 'blue' && blueTeamSection) {
            const teamTitle = blueTeamSection.querySelector('.team-title');
            if (teamTitle) {
                blueTeamSection.insertBefore(userInfo, teamTitle);
            } else {
                blueTeamSection.prepend(userInfo);
            }
        }
        
        // 确保Firebase中的信息是最新的
        this.updateFirebaseUserInfo();
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
    
    addUsernameChangeButton() {
        const chatHeader = document.querySelector('.chat-header');
        if (!chatHeader) return;
        
        const existingBtn = chatHeader.querySelector('.change-username-btn');
        if (existingBtn) existingBtn.remove();
        
        const changeBtn = document.createElement('span');
        changeBtn.className = 'change-username-btn';
        changeBtn.innerHTML = '<i class="fas fa-user-cog"></i>';
        changeBtn.title = '更改用户名和头像';
        changeBtn.addEventListener('click', () => this.showUsernameModal());
        
        chatHeader.appendChild(changeBtn);
    }
    
    initUserList() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupUserListListener());
        } else {
            this.setupUserListListener();
        }
    }
    
    setupUserListListener() {
        if (!this.multiplayer || !this.multiplayer.usersRef) return;
        this.multiplayer.usersRef.on('value', () => this.updateUserList());
    }
    
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
            
            userCountElement.textContent = Object.keys(users).length;
            
            Object.values(users).forEach(user => {
                const userItem = document.createElement('div');
                userItem.className = 'user-item';
                userItem.innerHTML = `
                    <img src="home/${user.avatar || '1.png'}" alt="${user.name}" class="user-avatar">
                    <div class="user-name">${user.name}</div>
                `;
                userListContent.appendChild(userItem);
            });
        });
    }
}

function initUsernameManager(multiplayerManager) {
    const manager = new UsernameManager(multiplayerManager);
    
    if (multiplayerManager) {
        multiplayerManager.usernameManager = manager;
        multiplayerManager.currentUsername = manager.username;
        multiplayerManager.currentAvatar = manager.avatar;
        multiplayerManager.currentTeam = manager.team;
    }
    
    return manager;
}
