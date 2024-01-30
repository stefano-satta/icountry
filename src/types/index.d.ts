export interface ItemProps {
    id: number;
    text: string;
    isCompleted: boolean;
    creationDate: string;
}

export interface CityWeather {
    name: string;
    state: string;
    country: string;
    lat?: number;
    lon?: number;
}

export interface Meteo {
    coord: Coord
    weather: Weather[]
    base: string
    main: MainWeather
    visibility: number
    wind: Wind
    clouds: Clouds
    dt: number
    sys: Time
    timezone: number
    id: number
    name: string
    cod: number
  }
  
  export interface Coord {
    lon: number
    lat: number
  }
  
  export interface Weather {
    id: number
    main: string
    description: string
    icon: string
  }
  
  export interface MainWeather {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
    sea_level: number
    grnd_level: number
  }
  
  export interface Wind {
    speed: number
    deg: number
    gust: number
  }
  
  export interface Clouds {
    all: number
  }
  
  export interface Time {
    type: number
    id: number
    country: string
    sunrise: number
    sunset: number
  }
  