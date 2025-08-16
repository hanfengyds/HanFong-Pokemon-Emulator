// 修改staff.js为全局变量模式
const pokemonData = {
clefable:`Clefable @ Leftovers  
Ability: Magic Guard  
Tera Type: Fairy  
EVs: 252 HP / 252 Def / 4 SpA  
Bold Nature  
IVs: 0 Atk  
- Calm Mind  
- Moonblast  
- Soft-Boiled  
- Stealth Rock`,  

gyarados :`Gyarados @ Flyinium Z  
Ability: Moxie  
Tera Type: Water  
EVs: 252 Atk / 4 SpD / 252 Spe  
Jolly Nature  
- Dragon Dance  
- Power Whip  
- Waterfall  
- Floaty Fall`,  

Moltres :`Moltres @ Heavy-Duty Boots  
Ability: Flame Body  
Tera Type: Fire  
EVs: 236 HP / 252 SpA / 20 Spe  
Modest Nature  
IVs: 0 Atk  
- Fire Blast  
- Hurricane  
- Roost  
- Scorching Sands`,  

latios:`Latios (M) @ Soul Dew  
Ability: Levitate  
Tera Type: Dragon  
EVs: 76 HP / 180 SpA / 252 Spe  
Timid Nature  
IVs: 0 Atk  
- Draco Meteor  
- Luster Purge  
- Calm Mind  
- Recover`,  

garchomp:`Garchomp @ Rocky Helmet  
Ability: Rough Skin  
Tera Type: Dragon  
EVs: 252 HP / 248 Def / 8 Spe  
Impish Nature  
- Dragon Tail  
- Earthquake  
- Stealth Rock  
- Toxic`,  

hippowdon:`Hippowdon @ Leftovers  
Ability: Sand Stream  
Tera Type: Ground  
EVs: 252 HP / 4 Atk / 252 SpD  
Careful Nature  
- Earthquake  
- Yawn  
- Slack Off  
- Stealth Rock`,  

electivire:`Electivire @ Life Orb  
Ability: Hadron Engine  
Tera Type: Electric  
EVs: 104 Atk / 152 SpA / 252 Spe  
Hasty Nature  
- Rising Voltage  
- Volt Switch  
- Ice Punch  
- Earthquake`,  

magortar:`Magmortar @ Choice Scarf  
Ability: Orichalcum Pulse  
Tera Type: Fire  
EVs: 52 Atk / 204 SpA / 252 Spe  
Hasty Nature  
- Weather Ball  
- Low Kick  
- Thunderbolt  
- Solar Beam`, 

dialga:`Dialga @ Assault Vest  
Ability: Pressure  
Tera Type: Steel  
EVs: 252 HP / 236 SpA / 20 Spe  
Modest Nature  
IVs: 0 Atk  
- Draco Meteor  
- Flash Cannon  
- Earth Power  
- Ice Beam`,  

heatran:`Heatran @ Leftovers  
Ability: Flame Body  
Tera Type: Fire  
EVs: 132 HP / 252 SpA / 124 Spe  
Modest Nature  
IVs: 0 Atk  
- Earth Power  
- Lava Plume  
- Stealth Rock  
- Taunt`,  

cobalion:`Cobalion @ Rocky Helmet  
Ability: Justified  
Tera Type: Steel  
EVs: 148 HP / 252 Def / 108 Spe  
Impish Nature  
IVs: 0 Atk  
- Body Press  
- Stealth Rock  
- Thunder Wave  
- Volt Switch`,  

hawlucha:`Hawlucha @ Electric Seed  
Ability: Unburden  
Tera Type: Fighting  
EVs: 252 Atk / 4 SpD / 252 Spe  
Adamant Nature  
- Acrobatics  
- Close Combat  
- Encore  
- Swords Dance`,  

toxapex:`Toxapex @ Black Sludge  
Ability: Regenerator  
Tera Type: Poison  
EVs: 252 HP / 4 Atk / 252 Def  
Relaxed Nature  
- Baneful Bunker  
- Infestation  
- Knock Off  
- Toxic Spikes`,  

celesteela:`Celesteela @ Power Herb  
Ability: Beast Boost  
Tera Type: Steel  
IVs: 0 Atk  
- Air Slash  
- Autotomize  
- Flamethrower  
- Meteor Beam`,  

kartana:`Kartana @ Normalium Z  
Ability: Beast Boost  
Tera Type: Grass  
EVs: 252 Atk / 4 SpD / 252 Spe  
Jolly Nature  
- Last Resort  
- Knock Off  
- Sacred Sword  
- Leaf Blade`,  

magearna:`Magearna @ Leftovers  
Ability: Soul-Heart  
Tera Type: Steel  
EVs: 252 HP / 252 Def / 4 SpA  
Bold Nature  
IVs: 0 Atk  
- Calm Mind  
- Iron Defense  
- Draining Kiss  
- Stored Power`,  

zeraora:`Zeraora @ Life Orb  
Ability: Iron Fist  
Tera Type: Electric  
EVs: 252 Atk / 4 SpD / 252 Spe  
Jolly Nature  
- Plasma Fists  
- Drain Punch  
- Knock Off  
- Toxic`,  

ceruledge:`Ceruledge @ Focus Sash  
Ability: Weak Armor  
Tera Type: Fire  
EVs: 252 Atk / 4 SpD / 252 Spe  
Jolly Nature  
- Bitter Blade  
- Poltergeist  
- Swords Dance  
- Close Combat`,  

['iron-treads']:`Iron Treads @ Heavy-Duty Boots  
Ability: Quark Drive  
Tera Type: Ground  
EVs: 252 SpA / 4 SpD / 252 Spe  
Timid Nature  
- Earth Power  
- Steel Beam  
- Rapid Spin  
- Stealth Rock`,  

gholdengo:`Gholdengo @ Choice Specs  
Ability: Good as Gold  
Tera Type: Steel  
EVs: 252 SpA / 4 SpD / 252 Spe  
Timid Nature  
IVs: 0 Atk  
- Make It Rain  
- Shadow Ball  
- Focus Blast  
- Trick`,  

['iron-valiant']:`Iron Valiant @ Booster Energy  
Ability: Quark Drive  
Tera Type: Fairy  
EVs: 252 SpA / 4 SpD / 252 Spe  
Timid Nature  
IVs: 0 Atk  
- Calm Mind  
- Aura Sphere  
- Moonblast  
- Thunderbolt`,  

['raging-bolt']:`Raging Bolt @ Leftovers  
Ability: Protosynthesis  
Tera Type: Electric  
EVs: 252 HP / 252 SpA / 4 SpD  
Modest Nature  
IVs: 20 Atk  
- Dragon Pulse  
- Thunderbolt  
- Calm Mind  
- Thunderclap`,  

['iron-boulder']:`Iron Boulder @ Life Orb  
Ability: Quark Drive  
Tera Type: Rock  
EVs: 252 Atk / 4 SpD / 252 Spe  
Jolly Nature  
- Close Combat  
- Earthquake  
- Mighty Cleave  
- Swords Dance`,  

['rotom-wash ']:`Rotom-Wash @ Choice Specs  
Ability: Levitate  
Tera Type: Electric  
EVs: 252 HP / 204 Def / 52 Spe  
Bold Nature  
IVs: 0 Atk  
- Hydro Pump  
- Volt Switch  
- Trick  
- Will-O-Wisp`,  

['landorus-therian (M)']:`Landorus-Therian (M) @ Rockium Z  
Ability: Intimidate  
Tera Type: Ground  
EVs: 252 Atk / 4 SpD / 252 Spe  
Jolly Nature  
- Earthquake  
- Knock Off  
- Stone Edge  
- U-turn`,  

['venusaur-mega']:`Venusaur-Mega @ Venusaurite  
Ability: Thick Fat  
Tera Type: Grass  
EVs: 252 HP / 244 Def / 12 Spe  
Bold Nature  
IVs: 0 Atk  
- Giga Drain  
- Synthesis  
- Hidden Power [Fire]  
- Earth Power`,  

['houndoom-mega']:`Houndoom-Mega @ Houndoominite  
Ability: Solar Power  
Tera Type: Dark  
EVs: 4 Atk / 252 SpA / 252 Spe  
Hasty Nature  
- Dark Pulse  
- Fire Blast  
- Pursuit  
- Destiny Bond`,  

['ogerpon-cornerstone (F)']:`Ogerpon-Cornerstone (F) @ Cornerstone Mask  
Ability: Sturdy  
Tera Type: Rock  
EVs: 252 Atk / 4 SpD / 252 Spe  
Jolly Nature  
- Ivy Cudgel  
- Horn Leech  
- Knock Off  
- U-turn`,  

['terapagos-terastal']:`Terapagos-Terastal @ Heavy-Duty Boots  
Ability: Tera Shell  
Tera Type: Stellar  
EVs: 252 SpA / 4 SpD / 252 Spe  
Timid Nature  
IVs: 15 Atk  
- Calm Mind  
- Tera Starstorm  
- Flamethrower  
- Earth Power`,  

['ting-lu']:`Ting-Lu @ Leftovers  
Ability: Vessel of Ruin  
Tera Type: Dark  
EVs: 252 HP / 4 Def / 252 SpD  
Careful Nature  
- Earthquake  
- Ruination  
- Spikes  
- Whirlwind`, 

zapdos:`Zapdos @ Heavy-Duty Boots  
Ability: Static  
Tera Type: Electric  
EVs: 252 HP / 252 Def / 4 SpA  
Bold Nature  
IVs: 0 Atk  
- Defog  
- Volt Switch  
- Roost  
- Hurricane`,

glimmora:`Glimmora @ Power Herb  
Ability: Toxic Debris  
Tera Type: Rock  
EVs: 252 SpA / 4 SpD / 252 Spe  
Timid Nature  
IVs: 0 Atk  
- Meteor Beam  
- Rock Polish  
- Sludge Wave  
- Dazzling Gleam`,

hydrapple:`Hydrapple @ Heavy-Duty Boots  
Ability: Regenerator  
Tera Type: Grass  
EVs: 252 HP / 252 Def / 4 SpD  
Bold Nature  
IVs: 0 Atk  
- Earth Power  
- Fickle Beam  
- Giga Drain  
- Nasty Plot`,

['lilligant-hisui']:`Lilligant-Hisui (F)  @ Life Orb  
Ability: Hustle  
Tera Type: Grass  
EVs: 252 Atk / 4 SpD / 252 Spe  
Jolly Nature  
- Close Combat  
- Leaf Blade  
- Triple Axel  
- Victory Dance`,

golisopod:`Golisopod @ Leftovers  
Ability: Mountaineer  
Tera Type: Bug  
EVs: 252 HP / 252 Atk  
Adamant Nature  
- First Impression  
- Spikes  
- Liquidation  
- Close Combat`,

['absol-mega']:`Absol-Mega @ Absolite  
Ability: Sword of Ruin  
Tera Type: Dark  
EVs: 252 Atk / 4 SpA / 252 Spe  
Hasty Nature  
- Sucker Punch  
- Fire Blast  
- Close Combat  
- Knock Off`,
};
