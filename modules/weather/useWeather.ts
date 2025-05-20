import { WeatherData } from '@/modules/weather/type'
import axios from 'axios'
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

        const response = await axios.get('https://api.weatherapi.com/v1/forecast.json', {
          params: {
            key: API_KEY,
            q: city,
            days: 7,
            aqi: 'no',
            alerts: 'no',
          },
        })

        const data = response.data

        setWeather({
          current: data.current,
          forecast: data.forecast.forecastday,
        })
      } catch (err: any) {
        setError(err.response?.data?.error?.message || err.message || 'Error fetching weather data')
      } finally {
        setTimeout(() => setLoading(false), 500)
      }
    }

    fetchWeather()
  }, [city])

  return { weather, loading, error }
}
