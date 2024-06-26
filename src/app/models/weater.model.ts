export interface Weather {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  current_units: CurrentUnits
  current: Current
  hourly_units: HourlyUnits
  hourly: Hourly
  daily_units: DailyUnits
  daily: Daily
}

export interface CurrentUnits {
  time: string
  interval: string
  temperature_2m: string
  relative_humidity_2m: string
  apparent_temperature: string
  is_day: string
  precipitation: string
  rain: string
  weather_code: string
}

export interface Current {
  time: string
  interval: number
  temperature_2m: number
  relative_humidity_2m: number
  apparent_temperature: number
  is_day: number
  precipitation: number
  rain: number
  weather_code: number
}

export interface HourlyUnits {
  time: string
  temperature_2m: string
  apparent_temperature: string
  wind_speed_10m: string
  wind_gusts_10m: string
  wind_direction_10m: string
  relative_humidity_2m: string
  precipitation: string
  precipitation_probability: string
  weather_code: string
}

export interface Hourly {
  time: string[]
  temperature_2m: number[]
  apparent_temperature: number[]
  wind_speed_10m: number[]
  wind_gusts_10m: number[]
  wind_direction_10m: number[]
  relative_humidity_2m: number[]
  precipitation: number[]
  precipitation_probability: number[]
  weather_code: number[]
}

export interface DailyUnits {
  time: string
  sunrise: string
  sunset: string
  precipitation_sum: string
  precipitation_probability_max: string
  weather_code: string
  temperature_2m_max: string
  temperature_2m_min: string
}

export interface Daily {
  time: string[]
  sunrise: string[]
  sunset: string[]
  precipitation_sum: number[]
  precipitation_probability_max: number[]
  weather_code: number[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
}
  