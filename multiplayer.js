// multiplayer.js - 宝可梦BP对战系统多人联机模块（完整修复版）

class MultiplayerManager {
    constructor(bpManager) {
        this.bpManager = bpManager;
        this.roomId = this.getRoomIdFromUrl() || this.generateRoomId();
        this.userId = this.generateUserId();
        this.isHost = !this.getRoomIdFromUrl();
        this.currentUsername = null; // 新增：当前用户名
        this.currentAvatar = '1'; // 默认头像
        
        // 初始化Firebase
        this.initFirebase();
        
        // 设置UI事件
        this.setupUI();
        
        // 初始化聊天功能
        this.setupChat();
    }
    
    initFirebase() {
        const firebaseConfig = {
            apiKey: "AIzaSyAuYq4BetwW1kQIfxqQtd1Fq3PKzW45hj0",
            authDomain: "hf-poke.firebaseapp.com",
            databaseURL: "https://hf-poke-default-rtdb.firebaseio.com",
            projectId: "hf-poke",
            storageBucket: "hf-poke.appspot.com",
            messagingSenderId: "463196183278",
            appId: "1:463196183278:web:154fe26fdb7ae103dfb1ff",
            measurementId: "G-Q69MDR38ST"
        };
        
        firebase.initializeApp(firebaseConfig);
        this.database = firebase.database();
        
        this.roomRef = this.database.ref(`rooms/${this.roomId}`);
        this.usersRef = this.database.ref(`rooms/${this.roomId}/users`);
        this.stateRef = this.database.ref(`rooms/${this.roomId}/state`);
        this.chatRef = this.database.ref(`rooms/${this.roomId}/chat`);
        
        this.setupStateListener();
        this.setupUserPresence();
    }
    
    setupStateListener() {
        this.stateRef.on('value', (snapshot) => {
            const data = snapshot.val();
            if (data) {
                this.applyRemoteState(data);
            }
        });
    }
    
    applyRemoteState(remoteState) {
        if (remoteState.lastUpdatedBy === this.userId) return;
        
        this.bpManager.phase = remoteState.phase || 'red-ban';
        this.bpManager.currentPhaseIndex = remoteState.currentPhaseIndex || 0;
        this.bpManager.remainingBans = remoteState.remainingBans || 3;
        
        this.bpManager.redTeam = remoteState.redTeam 
            ? remoteState.redTeam.map(id => this.bpManager.allPokemon.find(p => p.id === id)).filter(Boolean)
            : [];
        
        this.bpManager.blueTeam = remoteState.blueTeam 
            ? remoteState.blueTeam.map(id => this.bpManager.allPokemon.find(p => p.id === id)).filter(Boolean)
            : [];
        
        this.bpManager.bannedPokemon = remoteState.bannedPokemon 
            ? remoteState.bannedPokemon.map(id => this.bpManager.allPokemon.find(p => p.id === id)).filter(Boolean)
            : [];
        
        this.bpManager.updatePhase();
        this.bpManager.updateUI();
    }
    
    sendLocalState() {
        const state = {
            phase: this.bpManager.phase,
            currentPhaseIndex: this.bpManager.currentPhaseIndex,
            remainingBans: this.bpManager.remainingBans,
            redTeam: this.bpManager.redTeam.map(p => p.id),
            blueTeam: this.bpManager.blueTeam.map(p => p.id),
            bannedPokemon: this.bpManager.bannedPokemon.map(p => p.id),
            lastUpdatedBy: this.userId,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        };
        
        this.stateRef.set(state);
    }
    
    setupUserPresence() {
        const userRef = this.usersRef.child(this.userId);
        
        // 使用currentUsername（如果已设置）或默认随机用户名
        const username = this.currentUsername || `用户${Math.floor(Math.random() * 1000)}`;
        
        userRef.set({
            name: username,
            isHost: this.isHost,
            joinedAt: firebase.database.ServerValue.TIMESTAMP
        });
        
        userRef.onDisconnect().remove();
        
        this.usersRef.on('child_added', (snapshot) => {
            if (snapshot.key !== this.userId) {
                this.showUserJoined(snapshot.val().name);
            }
        });
        
        this.usersRef.on('child_removed', (snapshot) => {
            this.showUserLeft(snapshot.val().name);
        });
    }
    
    setupUI() {
        document.getElementById('room-id-display').textContent = this.roomId;
        
        document.getElementById('share-room-btn').addEventListener('click', () => {
            this.shareRoomLink();
        });
        
        const originalSelect = this.bpManager.selectPokemon.bind(this.bpManager);
        this.bpManager.selectPokemon = (pokemon) => {
            const result = originalSelect(pokemon);
            if (result) {
                this.sendLocalState();
            }
            return result;
        };
        
        const originalReset = this.bpManager.reset.bind(this.bpManager);
        this.bpManager.reset = () => {
            originalReset();
            this.sendLocalState();
        };
        
        const originalRandom = this.bpManager.randomSelect.bind(this.bpManager);
        this.bpManager.randomSelect = () => {
            originalRandom();
            this.sendLocalState();
        };
    }
    
    setupChat() {
        const chatBtn = document.getElementById('collaborate-btn');
        chatBtn.onclick = null; // 清除可能存在的旧事件
        
        chatBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const chatContainer = document.getElementById('chat-container');
            
            if (chatContainer.classList.contains('show')) {
                chatContainer.classList.remove('show');
                chatBtn.innerHTML = '<i class="fas fa-users"></i> 多人聊天';
            } else {
                chatContainer.classList.add('show');
                chatBtn.innerHTML = '<i class="fas fa-users"></i> 关闭聊天';
            }
        });
        
        // 修复关闭按钮事件，保持状态一致
        document.querySelector('.close-chat').addEventListener('click', () => {
            const chatContainer = document.getElementById('chat-container');
            chatContainer.classList.remove('show'); // 使用classList而非直接设置style
            chatBtn.innerHTML = '<i class="fas fa-users"></i> 多人聊天';
        });
        
        this.initChatFunctionality();
    }
    
    initChatFunctionality() {
        document.getElementById('send-message').addEventListener('click', () => this.sendChatMessage());
        document.getElementById('chat-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendChatMessage();
        });
        
        // 添加标签切换功能
        document.querySelectorAll('.chat-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.getAttribute('data-tab');
                
                // 更新活动标签
                document.querySelectorAll('.chat-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // 显示对应的视图
                if (tabName === 'messages') {
                    document.getElementById('chat-messages').style.display = 'flex';
                    document.getElementById('user-list').style.display = 'none';
                    document.querySelector('.chat-input-area').style.display = 'flex';
                } else {
                    document.getElementById('chat-messages').style.display = 'none';
                    document.getElementById('user-list').style.display = 'flex';
                    document.querySelector('.chat-input-area').style.display = 'none';
                    this.updateUserList(); // 切换时更新用户列表
                }
            });
        });
        
        this.chatRef.limitToLast(50).on('child_added', (snapshot) => {
            const message = snapshot.val();
            this.displayChatMessage(message);
        });
        
        this.makeChatDraggable();
    }
    
    sendChatMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        
        if (message) {
            const username = this.currentUsername || `用户${this.userId.substring(0, 4)}`;
            const avatar = this.currentAvatar || '1';
            
            this.chatRef.push({
                userId: this.userId,
                username: username,
                avatar: avatar,
                message: message,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                team: this.bpManager.phase.includes('red') ? 'red' : 'blue'
            });
            input.value = '';
        }
    }
    
    displayChatMessage(message) {
        const messagesContainer = document.getElementById('chat-messages');
        const messageElement = document.createElement('div');
        messageElement.className = `message ${message.team}-message`;
        
        messageElement.innerHTML = `
            <div class="message-header">
                <img class="message-avatar" src="home/${message.avatar || '1'}.png" alt="${message.username}">
                <span class="message-username">${message.username}:</span>
            </div>
            <div class="message-text">${message.message}</div>
        `;
        
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    makeChatDraggable() {
        const chatContainer = document.getElementById('chat-container');
        const chatHeader = document.querySelector('.chat-header');
        
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        
        chatHeader.onmousedown = dragMouseDown;
        
        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }
        
        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            chatContainer.style.top = (chatContainer.offsetTop - pos2) + "px";
            chatContainer.style.left = (chatContainer.offsetLeft - pos1) + "px";
        }
        
        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
    
    generateRoomId() {
        return Math.random().toString(36).substring(2, 8);
    }
    
    generateUserId() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
    
    getRoomIdFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return params.get('room');
    }
    
    shareRoomLink() {
        const roomLink = `${window.location.origin}${window.location.pathname}?room=${this.roomId}`;
        navigator.clipboard.writeText(roomLink).then(() => {
            this.showMessage('房间链接已复制到剪贴板！');
        });
    }
    
    showUserJoined(username) {
        this.showMessage(`${username} 加入了房间`);
    }
    
    showUserLeft(username) {
        this.showMessage(`${username} 离开了房间`);
    }
    
    showMessage(message) {
        const toast = document.createElement('div');
        toast.className = 'toast-message';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => document.body.removeChild(toast), 500);
        }, 3000);
    }
    
    // 新增：更新用户名的方法
    updateUsername(newUsername) {
        this.currentUsername = newUsername;
        
        // 更新Firebase中的用户名
        if (this.usersRef) {
            const userRef = this.usersRef.child(this.userId);
            userRef.update({
                name: newUsername
            });
        }
    }
}

// 导出模块
function initMultiplayer(bpManager) {
    const multiplayer = new MultiplayerManager(bpManager);
    
    // 将multiplayer实例传递给usernameManager
    if (typeof initUsernameManager === 'function') {
        multiplayer.usernameManager = initUsernameManager(multiplayer);
    }
    
    return multiplayer;
}
