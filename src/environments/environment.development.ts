export const environment = {
    urlDetectIp: 'https://ipv4.myexternalip.com/json',
    urlCountryIpAddress: 'http://ip-api.com/json/',
    urlPlaces: 'https://nominatim.openstreetmap.org/search?format=json&q={place}',
    urlWeather: 'https://api.open-meteo.com/v1/forecast?current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,weather_code&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&latitude={lat}&longitude={lon}',
};
