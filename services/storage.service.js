// zut sovorelu hamar

// import {homedir} from 'os'
// import {join, basename, dirname, extname, relative, isAbsolute,resolve, sep} from 'path'
    
// // homedir - talisa kompi home papken
// var filePath = join(homedir(), '../weather-data.json') // join- miacnuma mi qani hascener

// const saveKeyValue =(key, value)=>{
//     console.log(basename(filePath)); // anuny file-i
//     console.log(dirname(filePath)); // vor papki meja gtnvum file-y
//     console.log(extname(filePath)); // extention-y file-i
//     console.log(relative(filePath, dirname(filePath))); // inch petqa anel vor araji hasceic hasnel erkrordin
//     console.log(isAbsolute(filePath)); // absolute-a hascen te che chi sksvum ketikov banov
//     console.log(resolve('..')); // inch klini ete nerka es fayli het anenq et gorcuxuyuny
//     console.log(sep); // talisa seperatory windows \ mac / kara tarbervi os-ic 
// }

// export {saveKeyValue}










import {homedir} from 'os'
import {join} from 'path'
import {promises} from 'fs'

// homedir - talisa kompi home papken
const filePath = join(homedir(), '/weather-data.json') // join- miacnuma mi qani hascener

const TOKEN_DICTIONARY = {
    token: 'token',
    city: 'city'
}


const saveKeyValue = async(key, value)=>{
    let data ={}
    if(await isExist(filePath)){
        const file = await promises.readFile(filePath)
        data = JSON.parse(file)
    }

    data[key] = value
    await promises.writeFile(filePath, JSON.stringify(data))
}

const getKeyValue = async (key) => {
    if(await isExist(filePath)){
        const file = await promises.readFile(filePath)
        const data = JSON.parse(file)
        return data[key]
    }
    return undefined
}

const isExist = async (path)=>{
    try{
        await promises.stat(path)
        return true
    }
    catch (e){
        return false
    }
}

export {saveKeyValue, getKeyValue, TOKEN_DICTIONARY}