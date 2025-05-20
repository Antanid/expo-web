import { WeatherData } from '@/modules/weather/type'
import { useEffect, useState } from 'react'

const API_KEY = '91e454b70aa349daa5783549252005'

export const useWeather = (city: string) => {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!city) return

    const fetchWeather = async () => {
      try {
        setLoading(true)
        setError(null)

        // Request weather by city name (7-day forecast)
        const res = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(city)}&days=7&aqi=no&alerts=no`,
        )

        if (!res.ok) {
          const errData = await res.json()
          throw new Error(errData.error?.message || 'Error fetching weather data')
        }

        const data = await res.json()

        setWeather({
          current: data.current,
          forecast: data.forecast.forecastday, // array of forecast days
        })
      } catch (err: any) {
        setError(err.message || 'Error fetching weather data')
      } finally {
        setTimeout(() => setLoading(false), 500)
      }
    }

    fetchWeather()
  }, [city])

  return { weather, loading, error }
}
