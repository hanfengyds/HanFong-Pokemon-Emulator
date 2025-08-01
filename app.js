
// 颜色映射
const typeColors = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC'
};

// 存储反转后的数据
let chineseNames = {};
let abilityIndex = {};

Promise.all([
  fetch('pokemon-index.json').then(res => res.json()),
  fetch('ability-index.json').then(res => res.json())
]).then(([nameData, abilityData]) => {
  // 反转键值对：{中文: 英文} → {英文: 中文}
  chineseNames = Object.fromEntries(
    Object.entries(nameData).map(([chinese, english]) => [english, chinese])
  );
  // 存储能力对照表
  abilityIndex = abilityData;
  initPokemonApp();
}).catch(error => {
  console.error('加载JSON出错:', error);
});

function initPokemonApp() {
  // 现在可以用英文名查中文名
  console.log(chineseNames['pikachu']); // 输出 "皮卡丘"
}



// 宝可梦图像URL生成函数
function getPokemonImageUrl(id) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

// BP管理器
class BPManager {
    constructor() {
        this.phase = 'red-pick'; // 红方禁用阶段
        this.remainingBans = 3; // 剩余禁用次数
        this.totalBans = 3; // 总禁用次数
        this.totalPicks = 6; // 每队选择数量
        // 新增计数器初始化
        this.redPicks = 0;
        this.bluePicks = 0;
        this.redBans = 0;
        this.blueBans = 0;
        this.redTeam = [];
        this.blueTeam = [];
        this.bannedPokemon = [];
        this.allPokemon = [];
        this.filteredPokemon = [];
        this.currentTeam = 'red'; // 当前操作队伍
        this.pickOrder = [
                       'red-pick', 'blue-pick', 'blue-ban', 'red-pick', 
            'red-ban', 'blue-pick', 'blue-ban', 'red-pick',  'red-ban', 'blue-pick',
            'blue-ban', 'red-pick', 'red-ban', 'blue-pick', 'red-pick', 'blue-pick', 'red-pick', 'blue-pick'
        ];
        // 新增：计算各阶段总数
        this.redTotalPicks = this.pickOrder.filter(p => p === 'red-pick').length;
        this.blueTotalPicks = this.pickOrder.filter(p => p === 'blue-pick').length;
        this.redTotalBans = this.pickOrder.filter(p => p === 'red-ban').length;
        this.blueTotalBans = this.pickOrder.filter(p => p === 'blue-ban').length;
        // 新增：初始化当前阶段计数器
        this.currentPhaseIndex = 0;
        this.updateCurrentCounters(); // 初始化计数器
        this.currentTier = 'all'; // 当前分级
    }
    
    // 新增：更新当前阶段计数器的辅助方法
    updateCurrentCounters() {
        const currentPhase = this.pickOrder[this.currentPhaseIndex];
        // 修复：初始阶段计数器从0开始
        if (currentPhase === 'red-pick') this.redPicks = 0;
        else if (currentPhase === 'blue-pick') this.bluePicks = 0;
        else if (currentPhase === 'red-ban') this.redBans = 0;
        else if (currentPhase === 'blue-ban') this.blueBans = 0;
    }
    
    init(pokemonList) {
        this.allPokemon = pokemonList;
        this.filteredPokemon = [...pokemonList];
        this.updatePhase();
    }
    
    nextPhase() {
        this.currentPhaseIndex++;
        if (this.currentPhaseIndex >= this.pickOrder.length) {
            this.phase = 'completed';
        } else {
            this.phase = this.pickOrder[this.currentPhaseIndex];
            // 移除：阶段切换时不再直接递增计数器
            // if (this.phase === 'red-pick') {
            //     this.redPicks++;
            // } else if (this.phase === 'blue-pick') {
            //     this.bluePicks++;
            // } else if (this.phase === 'red-ban') {
            //     this.redBans++;
            // } else if (this.phase === 'blue-ban') {
            //     this.blueBans++;
            // }
            if (this.phase.includes('ban')) {
                this.remainingBans = 1;
            }
        }
        this.updatePhase();
    }
    
    updatePhase() {
        const phaseText = document.getElementById('phase-text');
        const phaseIconRed = document.querySelector('.phase-icon.red-phase');
        const phaseIconBlue = document.querySelector('.phase-icon.blue-phase');
        
        if (this.phase === 'completed') {
            phaseText.textContent = 'BP流程已完成！';
            phaseIconRed.style.opacity = '0.5';
            phaseIconBlue.style.opacity = '0.5';
            return;
        }
        
        const isRedPhase = this.phase.includes('red');
        const isPickPhase = this.phase.includes('pick');
        
        let phaseLabel, current, total;
        if (isPickPhase) {
            phaseLabel = isRedPhase ? '红色方自选阶段' : '蓝色方自选阶段';
            current = isRedPhase ? this.redTeam.length : this.blueTeam.length;
            total = isRedPhase ? this.redTotalPicks : this.blueTotalPicks;
        } else {
            phaseLabel = isRedPhase ? '红色方禁用阶段' : '蓝色方禁用阶段';
            current = isRedPhase ? this.redBans : this.blueBans;
            total = isRedPhase ? this.redTotalBans : this.blueTotalBans;
        }
        
        phaseText.textContent = `${phaseLabel}（${current}/${total}）`;
        
        phaseIconRed.style.opacity = isRedPhase ? '1' : '0.5';
        phaseIconBlue.style.opacity = !isRedPhase ? '1' : '0.5';
        
        this.currentTeam = isRedPhase ? 'red' : 'blue';
    }
    
    selectPokemon(pokemon) {
        if (this.phase === 'completed') return false;
        
        if (this.isPokemonBanned(pokemon)) return false;
        if (this.isPokemonSelected(pokemon)) return false;
        
        if (this.phase.includes('ban')) {
            this.bannedPokemon.push(pokemon);
            this.remainingBans--;
            
            // 新增：禁用后递增对应计数器
            if (this.phase === 'red-ban') this.redBans++;
            else if (this.phase === 'blue-ban') this.blueBans++;
            
            if (this.remainingBans === 0) {
                this.nextPhase();
            } else {
                this.updatePhase();
            }
        } else {
            if (this.phase.includes('red')) {
                this.redTeam.push(pokemon);
                this.redPicks++;
            } else {
                this.blueTeam.push(pokemon);
                this.bluePicks++;
            }
            
            this.nextPhase();
        }
        
        this.updateUI();
        return true;
    }
    
    isPokemonBanned(pokemon) {
        return this.bannedPokemon.some(p => p.id === pokemon.id);
    }
    
    isPokemonSelected(pokemon) {
        return this.redTeam.some(p => p.id === pokemon.id) || 
               this.blueTeam.some(p => p.id === pokemon.id);
    }
    
    reset() {
        this.phase = this.pickOrder[0]; // 使用设计的初始阶段
        this.remainingBans = this.totalBans;
        this.redTeam = [];
        this.blueTeam = [];
        this.bannedPokemon = [];
        this.currentPhaseIndex = 0;
        // 新增：重置所有计数器
        this.redPicks = 0;
        this.bluePicks = 0;
        this.redBans = 0;
        this.blueBans = 0;
        this.updatePhase();
        this.updateUI();
    }
    randomSelect() {
        if (this.phase === 'completed') return;
        
        const availablePokemon = this.filteredPokemon.filter(
            p => !this.isPokemonBanned(p) && !this.isPokemonSelected(p)
        );
        
        if (availablePokemon.length === 0) return;
        
        const randomIndex = Math.floor(Math.random() * availablePokemon.length);
        this.selectPokemon(availablePokemon[randomIndex]);
    }
    
    updateUI() {
        document.querySelectorAll('.pokemon-card').forEach(card => {
            const pokemonId = parseInt(card.dataset.id);
            const pokemon = this.allPokemon.find(p => p.id === pokemonId);
            
            card.classList.remove('selected-red', 'selected-blue', 'banned');
            
            if (this.isPokemonBanned(pokemon)) {
                card.classList.add('banned');
            } else if (this.redTeam.some(p => p.id === pokemonId)) {
                card.classList.add('selected-red');
            } else if (this.blueTeam.some(p => p.id === pokemonId)) {
                card.classList.add('selected-blue');
            }
        });
        
        const redTeamList = document.getElementById('red-team-list');
        redTeamList.innerHTML = this.redTeam.length === 0 ? 
            '<div class="empty-message">暂无选择的宝可梦</div>' : 
            this.redTeam.map(p => this.createTeamPokemonElement(p, 'red')).join('');
        
        const blueTeamList = document.getElementById('blue-team-list');
        blueTeamList.innerHTML = this.blueTeam.length === 0 ? 
            '<div class="empty-message">暂无选择的宝可梦</div>' : 
            this.blueTeam.map(p => this.createTeamPokemonElement(p, 'blue')).join('');
        
        const redBannedList = document.getElementById('red-banned-list');
        const blueBannedList = document.getElementById('blue-banned-list');
        
        const redBanned = this.bannedPokemon.filter((_, index) => index % 2 === 0);
        const blueBanned = this.bannedPokemon.filter((_, index) => index % 2 === 1);
        
        redBannedList.innerHTML = redBanned.length === 0 ? 
            '<div class="empty-message">暂无禁用的宝可梦</div>' : 
            redBanned.map(p => this.createBannedPokemonElement(p)).join('');
        
        blueBannedList.innerHTML = blueBanned.length === 0 ? 
            '<div class="empty-message">暂无禁用的宝可梦</div>' : 
            blueBanned.map(p => this.createBannedPokemonElement(p)).join('');
    }
    
    createTeamPokemonElement(pokemon, team) {
        return `
            <div class="team-pokemon ${team}-team-pokemon" data-id="${pokemon.id}">
                <img src="${pokemon.image}" alt="${pokemon.name}">
                <div class="team-pokemon-info">
                    <div class="team-pokemon-name">${pokemon.name}</div>
                    <div class="team-pokemon-types">
                        ${pokemon.types.map(type => `
                            <span class="team-pokemon-type" style="background-color: ${typeColors[type]}">${type}</span>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }
    
    createBannedPokemonElement(pokemon) {
        return `
            <div class="banned-pokemon" data-id="${pokemon.id}">
                <img src="${pokemon.image}" alt="${pokemon.name}">
                <span>${pokemon.name}</span>
            </div>
        `;
    }
    
    exportConfig() {
        const config = {
            phase: this.phase,
            remainingBans: this.remainingBans,
            currentPhaseIndex: this.currentPhaseIndex,
            redTeam: this.redTeam.map(p => p.id),
            blueTeam: this.blueTeam.map(p => p.id),
            bannedPokemon: this.bannedPokemon.map(p => p.id),
            timestamp: new Date().toISOString()
        };
        
        return JSON.stringify(config, null, 2);
    }
    
    
    getSuggestedPokemon() {
        const opponentTeam = this.currentTeam === 'red' ? this.blueTeam : this.redTeam;
        const myTeam = this.currentTeam === 'red' ? this.redTeam : this.blueTeam;
        
        if (opponentTeam.length === 0) {
            return this.filteredPokemon
                .filter(p => !this.isPokemonBanned(p) && !this.isPokemonSelected(p))
                .sort((a, b) => this.calculateTotalStats(b) - this.calculateTotalStats(a))
                .slice(0, 6);
        }
        
        const opponentWeaknesses = this.calculateTeamWeaknesses(opponentTeam);
        const opponentResistances = this.calculateTeamResistances(opponentTeam);
        const myWeaknesses = this.calculateTeamWeaknesses(myTeam);
        
        const availablePokemon = this.filteredPokemon
            .filter(p => !this.isPokemonBanned(p) && !this.isPokemonSelected(p));
        
        const scoredPokemon = availablePokemon.map(pokemon => {
            let score = 0;
            
            pokemon.types.forEach(type => {
                if (opponentWeaknesses[type]) {
                    score += opponentWeaknesses[type] * 2;
                }
            });
            
            pokemon.types.forEach(type => {
                if (opponentResistances[type]) {
                    score += opponentResistances[type];
                }
                
                if (myWeaknesses[type]) {
                    score -= myWeaknesses[type] * 0.5;
                }
            });
            
            score += this.calculateTotalStats(pokemon) / 100;
            
            return { pokemon, score };
        });
        
        return scoredPokemon
            .sort((a, b) => b.score - a.score)
            .slice(0, 6)
            .map(item => item.pokemon);
    }
    
    calculateTotalStats(pokemon) {
        return pokemon.stats.hp + pokemon.stats.attack + pokemon.stats.defense + 
               pokemon.stats.specialAttack + pokemon.stats.specialDefense + pokemon.stats.speed;
    }
    
    calculateTeamWeaknesses(team) {
        const weaknesses = {};
        
        const typeAdvantages = {
            normal: ['fighting'],
            fire: ['water', 'ground', 'rock'],
            water: ['electric', 'grass'],
            electric: ['ground'],
            grass: ['fire', 'ice', 'poison', 'flying', 'bug'],
            ice: ['fire', 'fighting', 'rock', 'steel'],
            fighting: ['flying', 'psychic', 'fairy'],
            poison: ['ground', 'psychic'],
            ground: ['water', 'grass', 'ice'],
            flying: ['electric', 'ice', 'rock'],
            psychic: ['bug', 'ghost', 'dark'],
            bug: ['fire', 'flying', 'rock'],
            rock: ['water', 'grass', 'fighting', 'ground', 'steel'],
            ghost: ['ghost', 'dark'],
            dragon: ['ice', 'dragon', 'fairy'],
            dark: ['fighting', 'bug', 'fairy'],
            steel: ['fire', 'fighting', 'ground'],
            fairy: ['poison', 'steel']
        };
        
        team.forEach(pokemon => {
            pokemon.types.forEach(type => {
                if (typeAdvantages[type]) {
                    typeAdvantages[type].forEach(weakness => {
                        weaknesses[weakness] = (weaknesses[weakness] || 0) + 1;
                    });
                }
            });
        });
        
        return weaknesses;
    }
    
    calculateTeamResistances(team) {
        const resistances = {};
        
        const typeResistances = {
            normal: [ 'ghost'],
            fire: ['fire', 'grass', 'ice', 'bug', 'steel', 'fairy'],
            water: ['fire', 'water', 'ice', 'steel'],
            electric: ['electric', 'flying', 'steel'],
            grass: ['water', 'electric', 'grass', 'ground'],
            ice: ['ice'],
            fighting: ['bug', 'rock', 'dark'],
            poison: ['grass', 'fighting', 'poison', 'bug', 'fairy'],
            ground: ['poison', 'rock','electric'],
            flying: ['grass', 'fighting', 'bug'],
            psychic: ['fighting', 'psychic'],
            bug: ['grass', 'fighting', 'ground'],
            rock: ['normal', 'fire', 'poison', 'flying'],
            ghost: ['poison', 'bug','normal'],
            dragon: ['fire', 'water', 'electric', 'grass'],
            dark: ['ghost', 'dark'],
            steel: ['normal', 'grass', 'ice', 'flying', 'psychic', 'bug', 'rock', 'dragon', 'steel', 'fairy','poison'],
            fairy: ['fighting', 'bug', 'dark','dragon']
        };
        
        team.forEach(pokemon => {
            pokemon.types.forEach(type => {
                if (typeResistances[type]) {
                    typeResistances[type].forEach(resistance => {
                        resistances[resistance] = (resistances[resistance] || 0) + 1;
                    });
                }
            });
        });
        
        return resistances;
    }
    
    // 新增方法：根据分级过滤宝可梦
    filterByTier(tier) {
        this.currentTier = tier;
        this.filterPokemon();
    }
}

// 主应用
class PokemonBPApp {
    constructor() {
        this.bpManager = new BPManager();
        this.initElements();
        this.setupEventListeners();
        this.loadPokemonData();
        this.abilityIdToFileNumber = {}; // 添加此行
    }
    
    initElements() {
        this.elements = {
            pokemonGrid: document.getElementById('pokemon-grid'),
            searchBox: document.getElementById('search-box'),
            generationFilter: document.getElementById('generation-filter'),
            typeFilter: document.getElementById('type-filter'),
            tierFilter: document.getElementById('tier-filter'),
            sortFilter: document.getElementById('sort-filter'),
            resetBtn: document.getElementById('reset-btn'),
            randomBtn: document.getElementById('random-btn'),
            suggestBtn: document.getElementById('suggest-btn'),
            exportBtn: document.getElementById('export-btn'),
            importBtn: document.getElementById('import-btn'),
            redTeamToggle: document.getElementById('red-team-toggle'),
            blueTeamToggle: document.getElementById('blue-team-toggle'),
            redTeamSection: document.getElementById('red-team-section'),
            blueTeamSection: document.getElementById('blue-team-section'),
            pokemonDetails: document.getElementById('pokemon-details'),
            importModal: document.getElementById('import-modal'),
            suggestionModal: document.getElementById('suggestion-modal'),
            loading: document.getElementById('loading'),
            progressContainer: document.getElementById('progress-container'),
            progressBar: document.getElementById('progress-bar')
        };
    }
    
async loadPokemonData() {
    this.elements.progressContainer.style.display = 'block';
    this.elements.loading.querySelector('span').textContent = '正在加载宝可梦数据...';
    
    try {
        // 1. 从本地加载数据
        const response = await fetch('pokemon-details.json');
        if (!response.ok) throw new Error(`加载失败: ${response.status}`);
        
        const pokemonData = await response.json();
        
        // 2. 转换数据格式
        this.bpManager.allPokemon = pokemonData.map(pokemon => ({
            id: pokemon.id,
            name: chineseNames[pokemon.name] || pokemon.name,
            englishName: pokemon.name,
            image: pokemon.image || getPokemonImageUrl(pokemon.id),
            types: pokemon.types,
            stats: pokemon.stats,
            height: pokemon.height,
            weight: pokemon.weight,
            abilities: pokemon.abilities
        }));
        
        // 3. 初始化UI
        this.renderPokemonGrid(this.bpManager.allPokemon);
        this.bpManager.init(this.bpManager.allPokemon);
        
        this.elements.loading.style.display = 'none';
        this.elements.progressContainer.style.display = 'none';
        
    } catch (error) {
        console.error('加载本地宝可梦数据失败:', error);
        this.elements.loading.innerHTML = `
            <div style="color: #e74c3c;">
                <i class="fas fa-exclamation-triangle"></i> 
                加载失败: ${error.message}
            </div>
        `;
        this.elements.progressContainer.style.display = 'none';
        
        // 可选：保留原始API调用作为备用
        // await this.loadFromPokeAPI(); 
    }
}
    
transformPokemonData(apiData) {
    const id = apiData.id;
    const englishName = apiData.name;
    const chineseName = chineseNames[englishName] || englishName;
    
    return {
        id: id,
        name: chineseName,
        englishName: englishName,
        image: getPokemonImageUrl(id),
        types: apiData.types.map(t => t.type.name),
        stats: {
            hp: apiData.stats[0].base_stat,
            attack: apiData.stats[1].base_stat,
            defense: apiData.stats[2].base_stat,
            specialAttack: apiData.stats[3].base_stat,
            specialDefense: apiData.stats[4].base_stat,
            speed: apiData.stats[5].base_stat
        },
        height: apiData.height / 10,
        weight: apiData.weight / 10,
        abilities: apiData.abilities.map(a => a.ability.name)
    };
}
    
    renderPokemonGrid(pokemonList) {
        this.bpManager.filteredPokemon = pokemonList;
        this.elements.pokemonGrid.innerHTML = pokemonList.map(pokemon => `
            <div class="pokemon-card" data-id="${pokemon.id}" draggable="true">
                <div class="pokemon-id">#${pokemon.id.toString().padStart(3, '0')}</div>
                <img class="pokemon-image" src="${pokemon.image}" alt="${pokemon.name}" 
                     onerror="this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png'">
                <div class="pokemon-name">${pokemon.name}</div>
                <div class="pokemon-types">
                    ${pokemon.types.map(type => `
                        <span class="type-badge" style="background-color: ${typeColors[type]}">
                            ${type}
                        </span>
                    `).join('')}
                </div>
            </div>
        `).join('');
        
        this.bpManager.updateUI();
    }
    
    filterPokemon() {
        const searchTerm = this.elements.searchBox.value.toLowerCase();
        const generation = this.elements.generationFilter.value;
        const type = this.elements.typeFilter.value;
        const sortBy = this.elements.sortFilter.value;
        const tier = this.elements.tierFilter.value;
        
        let filtered = this.bpManager.allPokemon.filter(pokemon => {
            // 搜索过滤
            const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm) || 
                                pokemon.id.toString().includes(searchTerm);
            
            // 世代过滤
            const matchesGeneration = generation === 'all' || this.getGeneration(pokemon.id) === parseInt(generation);
            
            // 类型过滤
            const matchesType = type === 'all' || pokemon.types.includes(type);
            
            // 分级过滤
            let matchesTier = true;
            if (tier !== 'all') {
                matchesTier = tierPokemons[tier]?.includes(pokemon.englishName) || false;
            }
            
            return matchesSearch && matchesGeneration && matchesType && matchesTier;
        });
        
        // 排序
        switch (sortBy) {
            case 'name':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'weight':
                filtered.sort((a, b) => b.weight - a.weight);
                break;
            case 'height':
                filtered.sort((a, b) => b.height - a.height);
                break;
            default: // id
                filtered.sort((a, b) => a.id - b.id);
        }
        
        this.renderPokemonGrid(filtered);
    }
    
    getGeneration(id) {
        if (id <= 151) return 1;
        if (id <= 251) return 2;
        if (id <= 386) return 3;
        if (id <= 493) return 4;
        if (id <= 649) return 5;
        if (id <= 721) return 6;
        if (id <= 809) return 7;
        if (id <= 905) return 8;
        return 9;
    }
    
    showPokemonDetails(pokemonId) {
        const pokemon = this.bpManager.allPokemon.find(p => p.id === pokemonId);
        if (!pokemon) return;
        
        const details = this.elements.pokemonDetails;
        document.getElementById('detail-name').textContent = pokemon.name;
        document.getElementById('detail-id').textContent = `#${pokemon.id.toString().padStart(3, '0')}`;
        document.getElementById('detail-image').src = pokemon.image;
        
        const typesContainer = document.getElementById('detail-types');
        typesContainer.innerHTML = pokemon.types.map(type => `
            <span class="type-badge" style="background-color: ${typeColors[type]}">
                ${type}
            </span>
        `).join('');
        
        const stats = pokemon.stats;
        document.getElementById('stat-hp-value').textContent = stats.hp;
        document.getElementById('stat-attack-value').textContent = stats.attack;
        document.getElementById('stat-defense-value').textContent = stats.defense;
        document.getElementById('stat-special-attack-value').textContent = stats.specialAttack;
        document.getElementById('stat-special-defense-value').textContent = stats.specialDefense;
        document.getElementById('stat-speed-value').textContent = stats.speed;
        
        this.setStatBar('stat-hp', stats.hp);
        this.setStatBar('stat-attack', stats.attack);
        this.setStatBar('stat-defense', stats.defense);
        this.setStatBar('stat-special-attack', stats.specialAttack);
        this.setStatBar('stat-special-defense', stats.specialDefense);
        this.setStatBar('stat-speed', stats.speed);
        
        const abilitiesContainer = document.getElementById('detail-abilities');
        abilitiesContainer.innerHTML = pokemon.abilities.map(ability => {
            const abilityChinese = abilityIndex[ability] || ability;
            return `<span class="ability" data-ability="${abilityChinese}">${abilityChinese}</span>`;
        }).join('');
        
        // 添加特性悬停事件监听
        // 先加载ability-map.json获取特性中文名到文件名的映射
        let abilityMap = {};
        fetch('ability-map.json')
            .then(response => response.json())
            .then(data => {
                abilityMap = data;
                // 等映射加载完成后再绑定事件
                document.querySelectorAll('.ability').forEach(span => {
                    span.addEventListener('mouseover', function(e) {
                        const chineseName = this.dataset.ability;
                        // 直接从映射中获取文件名，不再使用索引计算
                        const fileName = abilityMap[chineseName];
                        if (!fileName) return;

                        const url = `ability/${fileName}`;

                        fetch(url)
                            .then(response => response.json())
                            .then(data => {
                                // 创建并显示提示框
                                // 移除所有现有提示框
                                document.querySelectorAll('.ability-tooltip').forEach(tooltip => tooltip.remove());
                                const tooltip = document.createElement('div');
                                tooltip.className = 'ability-tooltip';
                                tooltip.innerHTML = data.effect.replace(/\n/g, '<br>');
                                tooltip.style.left = `${e.pageX + 10}px`;
                                tooltip.style.top = `${e.pageY + 10}px`;
                                document.body.appendChild(tooltip);
                            })
                            .catch(error => console.error('加载特性数据失败:', error));
                    });

                    span.addEventListener('mouseout', function() {
                        // 移除提示框
                        document.querySelectorAll('.ability-tooltip').forEach(tooltip => tooltip.remove());
                    });
                });
            })
            .catch(error => console.error('加载特性映射文件失败:', error));
        document.getElementById('detail-height').textContent = pokemon.height;
        document.getElementById('detail-weight').textContent = pokemon.weight;
        
        details.classList.add('show');
    }
    
    setStatBar(statId, value) {
        const maxStat = 255;
        const percentage = (value / maxStat) * 100;
        const bar = document.getElementById(statId);
        bar.style.width = `${percentage}%`;
        
        if (value < 50) {
            bar.style.background = '#e74c3c';
        } else if (value < 80) {
            bar.style.background = '#f39c12';
        } else if (value < 100) {
            bar.style.background = '#2ecc71';
        } else {
            bar.style.background = 'linear-gradient(90deg, #3498db, #9b59b6)';
        }
    }
    
    showImportModal() {
        this.elements.importModal.classList.add('show');
    }
    
    showSuggestionModal() {
        const suggestedPokemon = this.bpManager.getSuggestedPokemon();
        const suggestedContainer = document.getElementById('suggested-pokemon');
        
        suggestedContainer.innerHTML = suggestedPokemon.map(pokemon => `
            <div class="pokemon-card" data-id="${pokemon.id}">
                <div class="pokemon-id">#${pokemon.id.toString().padStart(3, '0')}</div>
                <img class="pokemon-image" src="${pokemon.image}" alt="${pokemon.name}">
                <div class="pokemon-name">${pokemon.name}</div>
                <div class="pokemon-types">
                    ${pokemon.types.map(type => `
                        <span class="type-badge" style="background-color: ${typeColors[type]}">
                            ${type}
                        </span>
                    `).join('')}
                </div>
            </div>
        `).join('');
        
        this.elements.suggestionModal.classList.add('show');
    }
    
    setupEventListeners() {
        // 修改点击事件为显示精灵详情
       this.elements.pokemonGrid.addEventListener('click', (e) => {
                const card = e.target.closest('.pokemon-card');
                if (card) {
                    const pokemonId = parseInt(card.dataset.id);
                    this.showPokemonDetails(pokemonId);
                }
            });
        
        // 添加拖拽功能
        this.elements.pokemonGrid.addEventListener('dragstart', (e) => {
            const card = e.target.closest('.pokemon-card');
            if (card) {
                e.dataTransfer.setData('text/plain', card.dataset.id);
                e.dataTransfer.effectAllowed = 'copy';
                card.classList.add('dragging');
            }
        });
        
        this.elements.pokemonGrid.addEventListener('dragend', (e) => {
            const card = e.target.closest('.pokemon-card');
            if (card) {
                card.classList.remove('dragging');
            }
        });
        
        // 为队伍和禁用区域添加拖放功能
        const dropZones = [
            document.getElementById('red-team-list'),
            document.getElementById('blue-team-list'),
            document.getElementById('red-banned-list'),
            document.getElementById('blue-banned-list')
        ];
        
        dropZones.forEach(zone => {
            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'copy';
                zone.classList.add('drop-hover');
            });
        
            zone.addEventListener('dragleave', () => {
                zone.classList.remove('drop-hover');
            });
        
            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                zone.classList.remove('drop-hover');
                
                const pokemonId = parseInt(e.dataTransfer.getData('text/plain'));
                const pokemon = this.bpManager.allPokemon.find(p => p.id === pokemonId);
                
                if (pokemon) {
                    this.bpManager.selectPokemon(pokemon);
                }
            });
        });
    
        this.elements.pokemonGrid.addEventListener('dblclick', (e) => {
            const card = e.target.closest('.pokemon-card');
            if (card) {
                const pokemonId = parseInt(card.dataset.id);
                this.showPokemonDetails(pokemonId);
            }
        });
        
        this.elements.searchBox.addEventListener('input', () => this.filterPokemon());
        this.elements.generationFilter.addEventListener('change', () => this.filterPokemon());
        this.elements.typeFilter.addEventListener('change', () => this.filterPokemon());
        this.elements.tierFilter.addEventListener('change', () => this.filterPokemon());
        this.elements.sortFilter.addEventListener('change', () => this.filterPokemon());
        
        this.elements.resetBtn.addEventListener('click', () => {
            if (confirm('确定要重置当前的BP选择吗？')) {
                this.bpManager.reset();
            }
        });
        
        this.elements.randomBtn.addEventListener('click', () => this.bpManager.randomSelect());
        this.elements.suggestBtn.addEventListener('click', () => this.showSuggestionModal());
        
        this.elements.exportBtn.addEventListener('click', () => {
            // 创建浮窗元素前先移除已存在的浮窗
            const existingWindow = document.querySelector('.export-window');
            if (existingWindow) {
                document.body.removeChild(existingWindow);
            }
            // 创建浮窗元素
            const exportWindow = document.createElement('div');
            exportWindow.className = 'export-window';
            exportWindow.innerHTML = `
                <div class="export-window-content">
                    <button class="close-btn">&times;</button>
                    <div class="team-container">
                        <div class="red-team">${this.bpManager.redTeam.map(p => `
                            <div class="simple-pokemon">
                                <img src="${p.image}" alt="${p.name}">
                                <div>${p.name}</div>
                            </div>
                        `).join('')}</div>
                        <div class="vs-controls">
                            <button class="copy-btn red">导出</button>
                            <div class="vs">VS</div>
                            <button class="copy-btn blue">导出</button>
                        </div>
                        <div class="blue-team">${this.bpManager.blueTeam.map(p => `
                            <div class="simple-pokemon">
                                <img src="${p.image}" alt="${p.name}">
                                <div>${p.name}</div>
                            </div>
                        `).join('')}</div>
                    </div>
                </div>
            `;
            document.body.appendChild(exportWindow);
            
            // 关闭按钮事件
            exportWindow.querySelector('.close-btn').addEventListener('click', () => {
                document.body.removeChild(exportWindow);
            });
            
            // 点击背景关闭
            exportWindow.addEventListener('click', (e) => {
                if (e.target === exportWindow) {
                    document.body.removeChild(exportWindow);
                }
            });
            
            // 为红色复制按钮添加点击事件监听器
            const redCopyBtn = exportWindow.querySelector('.copy-btn.red');
            redCopyBtn.addEventListener('click', () => {
                // 获取红色方队伍的精灵
                const redTeam = this.bpManager.redTeam;
                
                // 提取精灵英文名称（保持原始大小写）
                const pokemonNames = redTeam.map(p => p.englishName);
                
                // 查找对应的精灵数据并拼接
                // 使用staff.js中的全局pokemonData变量
                const copyText = pokemonNames
                    .filter(name => pokemonData && pokemonData[name.toLowerCase()])
                    .map(name => pokemonData[name.toLowerCase()])
                    .join('\n\n');
                
                // 复制到剪贴板
                navigator.clipboard.writeText(copyText).then(() => {
                    alert('红色队伍数据已复制！请粘贴到队伍中！');
                    // 复制成功后跳转到指定网站
                    window.open('https://play.pokemonshowdown.com/teambuilder', '_blank');
                }).catch(err => {
                    console.error('无法复制内容: ', err);
                    alert('复制失败，请手动复制');
                });
            });
            
            // 为蓝色复制按钮添加点击事件监听器
            const blueCopyBtn = exportWindow.querySelector('.copy-btn.blue');
            blueCopyBtn.addEventListener('click', () => {
                // 获取蓝色方队伍的精灵
                const blueTeam = this.bpManager.blueTeam;
                
                // 提取精灵英文名称（保持原始大小写）
                const pokemonNames = blueTeam.map(p => p.englishName);
                
                // 查找对应的精灵数据并拼接
                // 使用staff.js中的全局pokemonData变量
                const copyText = pokemonNames
                    .filter(name => pokemonData && pokemonData[name.toLowerCase()])
                    .map(name => pokemonData[name.toLowerCase()])
                    .join('\n\n');
                
                // 复制到剪贴板
                navigator.clipboard.writeText(copyText).then(() => {
                    alert('蓝色队伍数据已复制！请粘贴到队伍中！');
                    // 复制成功后跳转到指定网站
                    window.open('https://play.pokemonshowdown.com/teambuilder', '_blank');
                }).catch(err => {
                    console.error('无法复制内容: ', err);
                    alert('复制失败，请手动复制');
                });
            });
        });
        
        this.elements.importBtn.addEventListener('click', () => this.showImportModal());
        
        document.getElementById('confirm-import').addEventListener('click', () => {
            const importData = document.getElementById('import-data').value;
            if (this.bpManager.importConfig(importData)) {
                alert('导入成功！');
                this.elements.importModal.classList.remove('show');
            } else {
                alert('导入失败，请检查数据格式！');
            }
        });
        
        document.querySelectorAll('.close-details').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.target.closest('.pokemon-details').classList.remove('show');
            });
        });
        
        document.querySelectorAll('.pokemon-details').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('show');
                }
            });
        });
        
        this.elements.redTeamToggle.addEventListener('click', () => {
            this.elements.redTeamSection.classList.add('active');
            this.elements.blueTeamSection.classList.remove('active');
        });
        
        this.elements.blueTeamToggle.addEventListener('click', () => {
            this.elements.blueTeamSection.classList.add('active');
            this.elements.redTeamSection.classList.remove('active');
        });
        
        document.getElementById('suggested-pokemon').addEventListener('click', (e) => {
            const card = e.target.closest('.pokemon-card');
            if (card) {
                const pokemonId = parseInt(card.dataset.id);
                this.bpManager.selectPokemon(this.bpManager.allPokemon.find(p => p.id === pokemonId));
                this.elements.suggestionModal.classList.remove('show');
            }
        });
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new PokemonBPApp();
});
