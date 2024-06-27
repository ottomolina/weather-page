export const environment = {
    urlDetectIp: 'https://ipv4.myexternalip.com/json',
    urlCountryIpAddress: 'https://api.country.is/',
    urlPlaces: 'https://nominatim.openstreetmap.org/search?format=json&q={place}',
    urlWeather: 'https://api.open-meteo.com/v1/forecast?current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,weather_code&hourly=temperature_2m,apparent_temperature,wind_speed_10m,wind_gusts_10m,wind_direction_10m,relative_humidity_2m,precipitation,precipitation_probability,weather_code&daily=sunrise,sunset,precipitation_probability_max,precipitation_sum,weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&latitude={lat}&longitude={lon}&forecast_days=14',
};
