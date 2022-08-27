import https from 'https'
import { getKeyValue, TOKEN_DICTIONARY} from './storage.service.js'
import axios from 'axios'
const getIcon = (icon) => {
	switch (icon.slice(0, -1)) {
		case '01':
			return '☀️';
		case '02':
			return '🌤️';
		case '03':
			return '☁️';
		case '04':
			return '☁️';
		case '09':
			return '🌧️';
		case '10':
			return '🌦️';
		case '11':
			return '🌩️';
		case '13':
			return '❄️';
		case '50':
			return '🌫️';
	}
};
const getWeather = async ()=>{
    const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city) 
    const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token);
    if(!token){
        throw new Error('API key was not found, ypu can set it by command -t [API_KEY]')
    }
    if(!city){
        throw new Error('City was not found, ypu can set it by command -s [CITY_NAME]')
    }
    const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params:{
            q: city,
            appid: token,
            lang: 'en',
            units: 'metric'
        }
    })
    // const a = await axios.get(`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
    // console.info(a.data);
    return data

    // const url = new URL(`https://api.openweathermap.org/data/2.5/weather`) // vor dzerov chavelcnenq arjeqnery
    // url.searchParams.append('q', city) // talis enq tvyalnery inqy arden vorpes url kapuma
    // url.searchParams.append('appid', token)
    // url.searchParams.append('lang', 'ru')
    // url.searchParams.append('units', 'metric')
    
    // https.get(url, (response)=>{
    //     let res = ''
    //     response.on('data', (chunk)=>{
    //         res += chunk
    //     })
    //     response.on('end', ()=>{
    //         console.log(res);
    //     })
    // })
}

export {getWeather,getIcon}