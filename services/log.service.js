import chalk from "chalk"
import dedent from "dedent-js";
const printError = (error) => {
    console.log(chalk.bgRed("ERROR") + ' ' + error);
}

const printSuccess = (message) => {
    console.log(chalk.bgGreen("SUCCESS")+ ' ' + message);
}

const printHelp = () => {
    console.log(
        dedent`${chalk.bgCyan('HELP')}
        Without parameters - say weather
        -s [CITY] to set city
        -h for help
        -t [API_KEY] to save token
        `
    );
}
const printWeather = (weather,icon) => {
        console.log(
            dedent`${chalk.bgYellow(' WEATHER ')} Weather in city ${weather.name}
            ${icon} ${weather.weather[0].description}
            Temperature: ${weather.main.temp} (feels like: ${weather.main.feels_like})
            Humidity: ${weather.main.humidity}
            Wind speed: ${weather.wind.speed}
        `);
}
export {printError, printSuccess, printHelp, printWeather}