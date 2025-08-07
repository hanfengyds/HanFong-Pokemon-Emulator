// 修改staff.js为全局变量模式
const pokemonData = {
  articuno: `Articuno @ Leftovers
Ability: Magic Guard
Tera Type: Ice
EVs: 248 HP / 252 SpA / 8 SpD
Modest Nature
IVs: 0 Atk
- Freeze-Dry
- Defog
- Hurricane
- Roost`,

  golisopod: `Golisopod @ Heavy-Duty Boots  
Ability: Emergency Exit  
Tera Type: Bug  
EVs: 252 HP / 252 Atk / 4 SpD  
Adamant Nature  
- First Impression  
- Knock Off  
- Liquidation  
- Flip Turn`,

regirock: `Regirock @ Chesto Berry
Ability: Clear Body
Tera Type: Rock
EVs: 252 HP / 4 Atk / 44 Def / 208 SpD
Careful Nature
- Salt Cure
- Rest
- Body Press
- Iron Defense`,

  jellicent: `Jellicent @ Leftovers  
Ability: Water Absorb  
Tera Type: Water  
EVs: 252 HP / 204 Def / 52 SpD  
Bold Nature  
IVs: 0 Atk  
- Recover  
- Protect  
- Scald  
- Strength Sap`,

['mimikyu-totem-disguised']  :`Mimikyu @ Life Orb  
Ability: Disguise  
Tera Type: Ghost  
EVs: 252 Atk / 4 SpD / 252 Spe  
Jolly Nature  
- Shadow Claw  
- Shadow Sneak  
- Swords Dance  
- Play Rough`,


  magnezone:`Magnezone @ Choice Scarf  
Ability: Levitate  
Tera Type: Electric  
EVs: 4 Def / 252 SpA / 252 Spe  
Timid Nature  
IVs: 0 Atk  
- Volt Switch  
- Flash Cannon  
- Thunderbolt  
- Hidden Power [Ground]`,

  haxorus:`Haxorus @ Life Orb  
Ability: Mold Breaker  
Tera Type: Dragon  
EVs: 252 Atk / 4 SpD / 252 Spe  
Adamant Nature  
- Dragon Dance  
- Earthquake  
- Close Combat  
- Outrage`,

['sableye-mega']:`Sableye-Mega @ Sablenite  
Ability: PranTera 
Type: Dark  
EVs: 248 HP / 8 Def / 252 SpD  
Careful Nature  
- Knock Off  
- Will-O-Wisp  
- Recover  
- Protect`,

lucario:`Lucario @ Choice Scarf  
Ability: Adaptability  
Tera Type: Fighting  
EVs: 252 Atk / 4 SpD / 252 Spe  
Jolly Nature  
- Close Combat  
- Meteor Mash  
- Crunch  
- Thunder Punch`,

['keldeo-ordinary']:`Keldeo @ Choice Specs  
Ability: Technician  
Tera Type: Water  
EVs: 252 SpA / 4 SpD / 252 Spe  
Timid Nature  
- Flip Turn  
- Water Pulse  
- Vacuum Wave  
- Secret Sword`,

tangrowth:`Tangrowth @ Rocky Helmet  
Ability: Regenerator  
Tera Type: Grass  
EVs: 252 HP / 252 Def / 4 SpD  
Bold Nature  
- Giga Drain  
- Sludge Bomb  
- Knock Off  
- Stun Spore`,

corviknight:`Corviknight @ Rocky Helmet  
Ability: Pressure  
Tera Type: Flying  
EVs: 248 HP / 8 Atk / 252 Def  
Impish Nature  
- Brave Bird  
- Defog  
- Roost  
- U-turn`,

volcanion:`Volcanion @ Assault Vest  
Ability: Water Absorb  
Tera Type: Fire  
EVs: 248 HP / 56 SpA / 144 SpD / 60 Spe  
Modest Nature  
IVs: 0 Atk  
- Steam Eruption  
- Flamethrower  
- Earth Power  
- Sludge Bomb`,

['gardevoir-mega']:`Gardevoir-Mega @ Gardevoirite  
Ability: Trace  
Tera Type: Psychic  
EVs: 252 SpA / 4 SpD / 252 Spe  
Timid Nature  
IVs: 0 Atk  
- Moonblast  
- Psyshock  
- Mystical Fire  
- Calm Mind`,

['slowking-galar']:`Slowking-Galar @ Heavy-Duty Boots  
Ability: Regenerator  
Tera Type: Poison  
EVs: 252 HP / 4 Def / 252 SpD  
Calm Nature  
IVs: 0 Atk  
- Future Sight  
- Sludge Bomb  
- Chilly Reception  
- Thunder Wave`,

['tornadus-therian']:`Tornadus-Therian (M) @ Heavy-Duty Boots  
Ability: Regenerator  
Tera Type: Flying  
EVs: 248 HP / 8 Def / 252 Spe  
Timid Nature  
- Hurricane  
- Heat Wave  
- Knock Off  
- U-turn`,

['ampharos-mega']:`Ampharos-Mega @ Ampharosite  
Ability: Electromorphosis  
Tera Type: Electric  
EVs: 252 HP / 4 Def / 252 SpA  
Modest Nature  
IVs: 0 Atk  
- Dragon Pulse  
- Volt Switch  
- Thunderbolt  
- Cotton Guard`,

greninja:`Greninja @ Choice Specs  
Ability: Protean  
Tera Type: Water  
EVs: 252 SpA / 4 SpD / 252 Spe  
Timid Nature  
- Hydro Pump  
- Ice Beam  
- Dark Pulse  
- U-turn`,

weavile:`Weavile @ Life Orb  
Ability: Pressure  
Tera Type: Dark  
EVs: 252 Atk / 4 SpD / 252 Spe  
Jolly Nature  
- Triple Axel  
- Knock Off  
- Ice Shard  
- Swords Dance`,

['hoopa-unbound']:`Hoopa-Unbound @ Assault Vest
Ability: Magician
EVs: 252 HP / 64 Atk / 120 SpA / 56 SpD / 16 Spe
Lonely Nature
- Knock Off
- Psychic Noise
- Drain Punch
- Thunderbolt`,

mamoswine:`Mamoswine @ Choice Scarf  
Ability: Thick Fat  
Tera Type: Ice  
EVs: 252 Atk / 4 SpD / 252 Spe  
Jolly Nature  
- Earthquake  
- Icicle Crash  
- Stealth Rock  
- Knock Off`,

blacephalon:`Blacephalon @ Ghostium Z  
Ability: Beast Boost  
Tera Type: Fire  
EVs: 4 Atk / 252 SpA / 252 Spe  
Hasty Nature  
- Fire Blast  
- Shadow Ball  
- Flame Charge  
- Calm Mind`,

['aegislash-shield']:`Aegislash @ Leftovers  
Ability: Stance Change  
Tera Type: Steel  
EVs: 252 HP / 252 Def / 4 SpD  
Impish Nature  
- Close Combat  
- Iron Head  
- King's Shield  
- Swords Dance`,

clodsire:`Clodsire @ Leftovers  
Ability: Water Absorb  
Tera Type: Poison  
EVs: 252 HP / 4 Atk / 252 SpD  
Careful Nature  
- Earthquake  
- Recover  
- Spikes  
- Haze`,

bewear:`Bewear @ Choice Band  
Ability: Scrappy  
Tera Type: Normal  
EVs: 252 HP / 252 Atk / 4 SpD  
Adamant Nature  
- Drain Punch  
- Earthquake  
- Facade  
- Return`,

nihilego:`Nihilego @ Power Herb  
Ability: Beast Boost  
Tera Type: Rock  
EVs: 252 SpA / 4 SpD / 252 Spe  
Timid Nature  
IVs: 0 Atk  
- Meteor Beam  
- Power Gem  
- Sludge Wave  
- Psyshock`,

buzzwole:`Buzzwole @ Rocky Helmet  
Ability: Beast Boost  
Tera Type: Bug  
EVs: 252 HP / 204 Atk / 48 Def / 4 SpD  
Adamant Nature  
- Close Combat  
- Ice Punch  
- Earthquake  
- Roost`,

ursaluna:`Ursaluna @ Flame Orb  
Ability: Guts  
Tera Type: Ground  
EVs: 248 HP / 252 Atk / 8 SpD  
Adamant Nature  
- Drain Punch  
- Headlong Rush  
- Facade  
- Fire Punch`,

infernape:`Infernape @ Life Orb  
Ability: Iron Fist  
Tera Type: Fire  
EVs: 252 Atk / 4 SpD / 252 Spe  
Jolly Nature  
- Close Combat  
- U-turn  
- Flare Blitz  
- Stealth Rock`,

toxapex:`Toxapex @ Leftovers  
Ability: Regenerator  
Tera Type: Poison  
EVs: 252 HP / 128 Def / 128 SpD  
Calm Nature  
IVs: 0 Atk  
- Baneful Bunker  
- Toxic  
- Recover  
- Scald`,

terrakion:`Terrakion @ Rockium Z  
Ability: Sturdy  
Tera Type: Rock  
EVs: 252 Atk / 4 SpD / 252 Spe  
Jolly Nature  
- Close Combat  
- Earthquake  
- Stone Edge  
- Stealth Rock`,

['manectric-mega']:`Manectric-Mega @ Manectite  
Ability: Intimidate  
Tera Type: Electric  
EVs: 252 SpA / 252 Spe  
Timid Nature  
IVs: 0 Atk  
- Overheat  
- Volt Switch  
- Thunder Wave  
- Thunderbolt`,

['sandy-shocks']:`Sandy Shocks @ Booster Energy  
Ability: Protosynthesis  
Tera Type: Electric  
EVs: 252 SpA / 4 SpD / 252 Spe  
Timid Nature  
IVs: 0 Atk  
- Earth Power  
- Volt Switch  
- Thunderbolt  
- Spikes`,

azelf:`Azelf @ Choice Specs  
Ability: Levitate  
Tera Type: Psychic  
EVs: 252 SpA / 4 SpD / 252 Spe  
Timid Nature  
- U-turn  
- Psychic  
- Trick  
- Flamethrower`,

salamence:`Salamence @ Heavy-Duty Boots  
Ability: Moxie  
Tera Type: Dragon  
EVs: 252 Atk / 4 SpD / 252 Spe  
Adamant Nature  
- Dragon Dance  
- Dual Wingbeat  
- Earthquake  
- Outrage`,

['tapu-fini']:`Tapu Fini @ Leftovers  
Ability: Misty Surge  
Tera Type: Water  
EVs: 252 HP / 44 Def / 208 SpA / 4 SpD  
Modest Nature  
IVs: 0 Atk  
- Calm Mind  
- Moonblast  
- Taunt  
- Surf`,

['iron-crown']:`Iron Crown @ Booster Energy  
Ability: Quark Drive  
Tera Type: Steel  
EVs: 80 HP / 172 SpA / 4 SpD / 252 Spe  
Timid Nature  
IVs: 20 Atk  
- Calm Mind  
- Psychic  
- Tachyon Cutter  
- Focus Blast`,

['gallade-mega']:`Gallade-Mega (M) @ Galladite  
Ability: Sharpness  
Tera Type: Psychic  
EVs: 252 Atk / 4 SpD / 252 Spe  
Jolly Nature  
- Knock Off  
- Swords Dance  
- Sacred Sword  
- Psycho Cut`,

//RU残奥会
wyrdeer:`Wyrdeer @ Assault Vest  
Ability: Psychic Surge  
Tera Type: Normal  
EVs: 252 HP / 236 SpD / 20 Spe  
Calm Nature  
IVs: 0 Atk  
- Expanding Force  
- Earth Power  
- Shadow Ball  
- Future Sight`, 

electivire:`Electivire @ Life Orb  
Ability: Flash Fire  
EVs: 252 Atk / 252 SpA / 4 SpD  
Serious Nature  
- Flamethrower  
- Volt Switch  
- Knock Off  
- Thunderclap`,

['mimikyu-totem-disguised']:`Mimikyu @ Red Card  
Ability: Disguise  
Tera Type: Ghost  
EVs: 252 Atk / 4 SpD / 252 Spe  
Jolly Nature  
- Play Rough  
- Shadow Claw  
- Swords Dance  
- Shadow Sneak`,

magmortar:`Magmortar
[Volt Absorb] @ Heavy-Duty Boots
- Taunt
- Searing Shot
- Scorching Sands
- Focus Blast
EVs: - Atk / 252 SpA / 4 SpD / 252+ Spe (Timid)
IVs: 0 Atk
Tera Type: Fire`,

['golem-alola']:`Golem-Alola
[Earth Eater] @ Magnet
- Double-Edge
- Earthquake
- Stone Edge
- Stealth Rock
EVs: 252 HP / 252+ Atk / - SpA / 4 SpD (Adamant)
IVs: 0 Def
Tera Type: Rock`,

crobat:`Crobat @ Choice Band  
Ability: Poison Touch  
Tera Type: Poison  
EVs: 252 Atk / 4 SpD / 252 Spe  
Jolly Nature  
- Noxious Torque  
- U-turn  
- Poison Fang  
- Brave Bird  `,

['weezing-galar']:`Weezing-Galar@ Rocky Helmet  
Ability: Levitate  
Tera Type: Poison  
EVs: 252 Atk / 252 Def / 4 SpA  
Relaxed Nature  
- Clear Smog  
- Gunk Shot  
- Play Rough  
- Explosion  `,

['heracross-mega'] :`Heracross-Mega@ Heracronite  
Ability: Skill Link  
Tera Type: Bug  
EVs: 252 HP / 252 Atk / 4 Def  
Adamant Nature  
- Close Combat  
- Bulk Up  
- Trailblaze  
- Rock Blast  `,

['steelix-mega']: `Steelix-Mega @ Steelixite  
Ability: Sand Force  
EVs: 252 HP / 252 Atk / 4 SpD  
Brave Nature  
IVs: 0 Spe  
- Earthquake  
- Gyro Ball  
- Stealth Rock  
- Stone Edge`,

['electrode-hisui']:`@ Life Orb  
Ability: Rock Head  
Tera Type: Electric  
EVs: 72 HP / 184 SpA / 252 Spe  
Timid Nature  
IVs: 0 Atk  
- Chloroblast  
- Leech Seed  
- Substitute  
- Thunder Wave  `,

incineroar:`Incineroar @ Heavy-Duty Boots  
Ability: Intimidate  
Tera Type: Fire  
EVs: 252 HP / 164 Atk / 92 SpD  
Adamant Nature  
- Flare Blitz  
- Knock Off  
- Will-O-Wisp  
- Parting Shot`,

primarina:`Primarina @ Assault Vest  
Ability: Liquid Voice  
Tera Type: Water  
EVs: 252 HP / 4 Def / 252 SpA  
Modest Nature  
IVs: 0 Atk  
- Hyper Voice  
- Moonblast  
- Ice Beam  
- Energy Ball`,

['decidueye-hisui']:`Decidueye-Hisui @ Flyinium Z  
Ability: Scrappy  
Tera Type: Grass  
EVs: 252 Atk / 4 Def / 252 Spe  
Adamant Nature  
- Triple Arrows  
- Leaf Blade  
- Triple Axel  
- Tailwind`,

['zoroark-gisui']:`Zoroark-Hisui @ Choice Specs  
Ability: Illusion  
Tera Type: Normal  
EVs: 252 SpA / 4 SpD / 252 Spe  
Timid Nature  
IVs: 0 Atk  
- Bitter Malice  
- Hyper Voice  
- Curse  
- Trick`,

krookodile:`Krookodile @ Life Orb  
Ability: Moxie  
Tera Type: Ground  
EVs: 252 Atk / 4 SpD / 252 Spe  
Jolly Nature  
- Earthquake  
- Knock Off  
- Scale Shot  
- Stealth Rock`,

['abomasnow-mega']:`Abomasnow-Mega @ Abomasite  
Ability: Snow Warning  
Tera Type: Grass  
- Avalanche  
- Wood Hammer  
- Ice Shard  
- Aurora Veil`,

cryogonal:`Cryogonal @ Heavy-Duty Boots  
Ability: Magic Bounce  
Tera Type: Ice  
EVs: 248 HP / 8 SpA / 252 Spe  
Timid Nature  
- Freeze-Dry  
- Rapid Spin  
- Recover  
- Chilly Reception`,

toedscruel:`Toedscruel @ Leftovers  
Ability: Mycelium Might  
Tera Type: Ground  
EVs: 252 HP / 4 SpA / 252 SpD  
Calm Nature  
- Spikes  
- Knock Off  
- Leaf Storm  
- Rapid Spin`,

['ninetales-alola']:`Ninetales-Alola @ Light Clay  
Ability: Snow Warning  
Tera Type: Ice  
EVs: 252 SpA / 4 SpD / 252 Spe  
Timid Nature  
IVs: 0 Atk  
- Freeze-Dry  
- Aurora Veil  
- Encore  
- Dazzling Gleam`,

dhelmise:`Dhelmise @ Life Orb  
Ability: Adaptability  
EVs: 248 HP / 252 Atk / 8 SpD  
IVs: 0 Spe  
- Wood Hammer  
- Poltergeist  
- Gyro Ball  
- Liquidation`,

slowking:`Slowking @ Leftovers  
Ability: Regenerator  
Tera Type: Water  
EVs: 252 HP / 252 SpA / 4 SpD  
Quiet Nature  
IVs: 0 Atk  
- Trick Room  
- Future Sight  
- Scald  
- Blizzard`,

durant:`Durant @ Choice Band  
Ability: Hustle  
Tera Type: Bug  
EVs: 252 Atk / 4 SpD / 252 Spe  
Jolly Nature  
- First Impression  
- Iron Head  
- X-Scissor  
- Stone Edge`,

tentacruel:`Tentacruel @ Black Sludge  
Ability: Rain Dish  
Tera Type: Water  
EVs: 252 HP / 240 SpD / 16 Spe  
Calm Nature  
- Acid Armor  
- Hydro Pump  
- Flip Turn  
- Rapid Spin`,

mandibuzz:`Mandibuzz (F) @ Leftovers  
Ability: Overcoat  
Tera Type: Dark  
EVs: 140 Atk / 112 Def / 4 SpD / 252 Spe  
Jolly Nature  
- Foul Play  
- Defog  
- Brave Bird  
- U-turn`,

quagsire:`Quagsire @ Leftovers  
Ability: Water Absorb  
Tera Type: Water  
EVs: 252 HP / 4 Atk / 252 Def  
Impish Nature  
- High Horsepower  
- Liquidation  
- Recover  
- Toxic`,

bruxish:`Bruxish @ Choice Scarf  
Ability: Dazzling  
Tera Type: Water  
EVs: 252 Atk / 4 SpD / 252 Spe  
Jolly Nature  
- Flip Turn  
- Iron Tail  
- Liquidation  
- Psychic Fangs`,

flygon:`Flygon @ Choice Scarf  
Ability: Tinted Lens  
Tera Type: Ground  
EVs: 252 Atk / 4 SpD / 252 Spe  
Jolly Nature  
- Dragon Claw  
- Earthquake  
- Steel Wing  
- U-turn`,

jellicent:`Jellicent @ Leftovers  
Ability: Wandering Spirit  
Tera Type: Water  
EVs: 252 HP / 4 SpA / 252 SpD  
Calm Nature  
IVs: 0 Atk  
- Acid Armor  
- Blizzard  
- Energy Ball  
- Recover`,

sneasel:`Sneasel @ Life Orb  
Ability: Technician  
EVs: 252 Atk / 4 SpD / 252 Spe  
Jolly Nature  
- Ice Shard  
- Fake Out  
- Knock Off  
- Triple Axel`,  

bronzong:`Bronzong @ Leftovers  
Ability: Heatproof  
Tera Type: Steel  
EVs: 4 HP / 252 SpA / 252 SpD  
Modest Nature  
IVs: 0 Atk  
- Calm Mind  
- Future Sight  
- Body Press  
- Stored Power`,

};
