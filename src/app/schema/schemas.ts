type Alert = {
    severity: "info" | "success" | "warning" | "error";
    message: string;
};

type CityData = {
    id: number;
    name: string;
    local_names: {
        [key: string]: string;
    };
    lat: number;
    lon: number;
    country: string;
    state: string;
}[];

type WeatherData = {
    coord: {
        lon: number;
        lat: number;
    };
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
    base: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    visibility: number;
    wind: {
        speed: number;
        deg: number;
    };
    clouds: {
        all: number;
    };
    dt: number;
    sys: {
        type: number;
        id: number;
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
};

type ForecastData = {
    cod: string;
    message: number;
    cnt: number;
    list: {
        dt: number;
        main: {
            temp: number;
            feels_like: number;
            temp_min: number;
            temp_max: number;
            pressure: number;
            sea_level: number;
            grnd_level: number;
            humidity: number;
            temp_kf: number;
        };
        weather: {
            id: number;
            main: string;
            description: string;
            icon: string;
        }[];
        clouds: {
            all: number;
        };
        wind: {
            speed: number;
            deg: number;
            gust: number;
        };
        visibility: number;
        pop: number;
        sys: {
            pod: string;
        };
        dt_txt: string;
    }[];
};

type AirQualityData = {
    coord: {
        lon: number;
        lat: number;
    };
    list: {
        main: {
            aqi: number;
        };
        components: {
            co: number;
            no: number;
            no2: number;
            o3: number;
            so2: number;
            pm2_5: number;
            pm10: number;
            nh3: number;
        };
        dt: number;
    }[];
};

type AQITableData = {
    co: number;
    no: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
    nh3: number;
};

type UVData = {
    result: {
        uv: number;
        uv_time: string;
        uv_max: number;
        uv_max_time: string;
        ozone: number;
        ozone_time: string;
        safe_exposure_time: {
            st1: number;
            st2: number;
            st3: number;
            st4: number;
            st5: number;
            st6: number;
        };
        sun_info: {
            sun_times: {
                solarNoon: string;
                nadir: string;
                sunrise: string;
                sunset: string;
                sunriseEnd: string;
                sunsetStart: string;
                dawn: string;
                dusk: string;
                nauticalDawn: string;
                nauticalDusk: string;
                nightEnd: string;
                night: string;
                goldenHourEnd: string;
                goldenHour: string;
            };
            sun_position: {
                azimuth: number;
                altitude: number;
            };
        };
    };
};
