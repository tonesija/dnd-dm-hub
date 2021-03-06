const xpMap = new Map()

xpMap[1/8] = 25
xpMap[1/4] = 50
xpMap[1/2] = 100
xpMap[1] = 200
xpMap[2] = 450
xpMap[3] = 700
xpMap[4] = 1100
xpMap[5] = 1800
xpMap[6] = 2300
xpMap[7] = 2900
xpMap[8] = 3900
xpMap[9] = 5000
xpMap[10] = 5900
xpMap[11] = 7200
xpMap[12] = 8400
xpMap[13] = 10000
xpMap[14] = 11500
xpMap[15] = 13000

function getXPFromCR(cr){
    return xpMap[cr]
}

function isMonsterInArray(slug, monsters){
    for(let mon of monsters){
        if(slug == mon.slug) return true
    }
    return false
}

function addNumbering(monsters){
    let ammountMap = new Map()
    for(let mon of monsters){
        ammountMap[mon.baseName] = 0
    }
    for(let mon of monsters){
        ammountMap[mon.baseName]++
    }
    for(let i = monsters.length - 1; i >= 0; --i){
        monsters[i].name = monsters[i].baseName + ' ' + ammountMap[monsters[i].baseName]
        ammountMap[monsters[i].baseName]--
    }
}

exports.getXPFromCR = getXPFromCR
exports.isMonsterInArray = isMonsterInArray
exports.addNumbering = addNumbering