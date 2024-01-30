export const truncateText = (text: string, maxLength: number = 50) => {
    return text.length >= maxLength ? `${text.substring(0, 50)}...` : text;
}

export const getWeatherIcon = (icon: string | undefined): string => {
    return icon ? `http://openweathermap.org/img/w/${icon}.png` : '';
}

export const getCelsiusTemp = (kelvinDeg: number | undefined): string => {
    return kelvinDeg ? `${Math.round(kelvinDeg - 273.15)} °C` : '';
}