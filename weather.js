#!/usr/bin/env node

import {getArgs} from "./helpers/args.js"
import { getIcon, getWeather } from "./services/api.service.js";
import { printError, printHelp, printSuccess, printWeather } from "./services/log.service.js";
import { getKeyValue, saveKeyValue } from "./services/storage.service.js";
import dedent from "dedent-js";








const saveToken = async(token) =>{
    if(!token.length){
        printError('Token was not found')
        return
    }
    try{
        await saveKeyValue('token', token)
        printSuccess('token saved')
    }catch (e){
        printError(e.message)
    }
}




const saveCity = async (city) =>{
    if(!city.length){
        printError('City was not found')
        return
    }
    try{
        await saveKeyValue('city', city)
        await getWeather() 
        printSuccess('City saved')
    }
    catch(e){
        await saveKeyValue('city', '')
        if(e?.response?.status == 404){
            printError('Wrong city');
        }else{
            printError(e.message)
        }
    }
}



const getForecast = async ()=>{
    try{
        const weather =  await getWeather()
        printWeather(weather, getIcon(weather.weather[0].icon))
        
    }catch(e){
        if(e?.response?.status == 404){ // ?. ete ka nor mti vor hawai undefined chstugi
            printError('Wrong city');
        }else if(e?.response?.status == 401){
            printError('Wrong token');
        }else{
            printError(e.message)
        }
    }
    
}




const initCLI = () => {
    const args = getArgs(process.argv)
    // console.log(process.env);
    if(args.h){
        // help
        return printHelp()
       
    }
    if(args.s){
        // save city
        return saveCity(args.s)
    }
    if(args.t){
        // save token
        return saveToken(args.t)
    }
    getForecast()
    // say weather
}

initCLI()


