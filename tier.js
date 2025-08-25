const tierPokemons = {
    ou: [
        'alomomola', 'araquanid', 'cinderace', 'clefable', 'corviknight',
        'darkrai', 'dondozo', 'dragapult', 'dragonite', 'enamorus',
        'garganacl', 'gholdengo', 'glimmora', 'gliscor', 'great tusk',
        'hatterene', 'iron-crown', 'iron-moth', 'iron-treads', 'iron-valiant',
        'kingambit', 'kyurem', 'landorus-therian', 'moltres', 'ogerpon-wellspring',
        'pecharunt', 'primarina', 'raging-bolt', 'samurott-hisui', 'slowking-galar',
        'ting-lu', 'tinkaton', 'walking-wake', 'weavile', 'zamazenta', 'zapdos'
    ],
    uubl: [ //15个
         'blaziken', 'garchomp','hoopa-unbound','iron-boulder','iron-hands',
         'kommo-o','latias','meowscarada','moltres-galar','okidogi',
         'pelipper','polteageist','quaquaval','rillaboom','ursaluna',
    ],
    uu: [
        'arcanine-hisui', 'azumarill', 'blissey', 'clodsire', 'cobalion',
                    'comfey', 'conkeldurr', 'deoxys speed', 'donphan', 'excadrill',
                    'greninja-ash', 'greninja','hawlucha', 'heatran', 'hydrapple', 'iron jugulis',
                    'keldeo', 'latios', 'lokix', 'mandibuzz', 'metagross',
                    'ogerpon', 'ogerpon cornerstone', 'revavroom', 'rotom wash',
                    'sandy shocks', 'scizor', 'serperior', 'sinistcha', 'skarmory',
                    'skeledirge', 'slowking', 'thundurus-therian', 'tornadus-therian',
                    'toxapex', 'tyranitar', 'zarude'
    ],
    // 可以继续添加其他分级
    uber: [
        'annihilape', 'arceus', 'archaludon', 'baxcalibur', 'calyrex-ice', 'chien-pao', 'chi-yu',
        'deoxys', 'deoxys-attack', 'dialga', 'dialga-origin',
        'espathra', 'eternatus',
        'flutter mane',
        'giratina', 'giratina-origin', 'gouging fire', 'groudon',
        'ho-oh',
        'iron bundle',
        'koraidon', 'kyogre', 'kyurem-black', 'kyurem-white',
        'landorus', 'lugia', 'lunala', 'magearna', 'mewtwo',
        'necrozma-dawn-wings', 'necrozma-dusk-mane',
        'ogerpon-hearthflame', 'palafin-hero', 'palkia', 'palkia-origin',
        'rayquaza', 'regieleki', 'reshiram', 'roaring moon',
        'shaymin-sky', 'sneasler', 'solgaleo', 'spectrier',
        'terapagos', 'terapagos-stellar', 'terapagos-terastal',
        'ursaluna-bloodmoon', 'urshifu', 'urshifu-rapid-strike', 'urshifu-single-strike',
        'volcarona',
        'zacian', 'zacian-crowned', 'zamazenta-crowned', 'zekrom'
    ],
    第一赛段: [ //30
       'gigalith', 'sandslash', 'poliwrath', 'lanturn',
                    'pelipper', 'escavalier', 'amoonguss', 'chesnaught', 'ampharos-Mega',
                    'crawdaunt', 'lucario', 'flygon', 'articuno',
                    'tapu-bulu', '', 'hoopa',"meloetta-aria","ampharos-mega","ninetales","darmanitan-standard","zarude","glimmora","slowbro","primarina",
                    "pidgeot-mega","forretress","charizard","goodra","aerodactyl","golisopod","staraptor","moltres-galar"

    ],

    第二赛段: [ //30
        'keldeo-ordinary', 'aegislash-shield', 'sableye-mega', 'corviknight', 'volcanion', 
        'jellicent', 'tornadus-therian', 'slowking-galar', 'greninja', 'iron-crown', 
        'tapu-fini', 'articuno', 'terrakion', 'manectric-mega', 'golisopod', 'sandy-shocks', 'tangrowth',
        'magnezone', 'azelf', 'gallade-mega', 'mimikyu', 'haxorus', 'hoopa-unbound', 'blacephalon'
        ,'clodsire','bewear','nihilego','buzzwole',
        'salamence','infernape'
    ],
    RU残奥会:[ //30
      'incineroar','primarina','krookodile','abomasnow-mega','cryogonal','toedscruel',
      'ninetales-alola','zoroark-hisui','decidueye-hisui','dhelmise','crobat','weezing-galar',
      'heracross-mega','steelix-mega','electrode-hisui','electivire','magmortar','wyrdeer','mimikyu',
      'golem-alola','slowking','durant','tentacruel','quagsire','bruxish',
      'bronzong','sneasel','flygon','jellicent','mandibuzz'
    ],

    第三赛段:[ //37
      'absol-mega','venusaur-mega',//灾兽，妙蛙花
      'gyarados','rotom-wash','celesteela','latios','ting-lu',//暴鲤龙，洗衣机，铁火辉夜，拉帝欧斯，古鼎鹿
      'clefable','cobalion','golisopod','garchomp','zapdos',//皮可西，勾帕路翁，具甲武者，烈咬陆鲨，闪电鸟
      'landorus-therian','zeraora','ceruledge','raging-bolt','glimmora',//土地云，捷拉奥拉，苍炎刃鬼，猛雷鼓，晶光花
      'iron-valiant','gholdengo','magearna','moltres','iron-treads',//铁舞者，赛富豪，玛机雅娜，火焰鸟，铁辙迹
      'terapagos-terastal','toxapex','iron-boulder','kartana','heatran',//泰勒巴格斯，超坏星，铁磐岩，纸御剑，席多蓝恩
      'dialga','hawlucha','ogerpon-cornerstone-mask','houndoom-mega','hippowdon',//帝牙卢卡，摔角鹰人，岩砰砰，黑鲁加，河马兽
      'electivire','magmortar','lilligant-hisui','nidoking','hydrapple'//电击魔兽，鸭嘴炎兽，洗翠群姐，尼多王，密集大蛇


    ],

    第四赛段:[ //37
      'flygon','scizor-mega','starmie','fezandipiti','pelipper',//沙漠蜻蜓，m巨钳螳螂，宝石海星，毒鸡，大嘴鸥
      'heracross-mega','rotom-mow','skarmory','latias','meowscarada',//m赫拉，洗衣机，盔甲鸟，拉帝亚斯，假面猫
      'dracozolt','cobalion','lokix','thundurus-therian',//雷鸟龙，勾帕路翁，烈腿蝗，雷电云
      'archaludon','dragonite','rillaboom','blastoise',//铝钢桥龙，快龙，轰擂金刚猩，水箭龟
      'kleavor','okidogi','','moltres','excadrill',//，够赞狗，火焰鸟，龙头地鼠
      'tauros','slowbro','mienshao','palossand','cofagrigus',//肯泰罗，呆壳兽，师傅鼬，沙堡，死神棺
      'starmie','archeops','wo-chien','audino-mega','quagsire',//宝石海星，始祖大鸟，古简蜗，m差不多，沼王
      'cradily','kingdra','hydrapple','kyurem','articuno-galar'//摇篮百合，刺龙王，密集大蛇，酋雷姆，急冻鸟


    ],

};
