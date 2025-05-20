import { useWeather } from '@/modules/weather/useWeather'
import React from 'react'
import { Text, View } from 'react-native'

export const CityWeatherItem = ({ city }: { city: string }) => {
  const { weather, loading, error } = useWeather(city)

  if (loading) return <Text>Loading {city}...</Text>
  if (error) return <Text>Error: {error}</Text>
  if (!weather) return null

  return (
    <View className="h-[100px]">
      <Text className="text-xl font-semibold text-blue-900">{city}</Text>
      <View className="mt-1 flex-row justify-between">
        <Text className="text-base text-blue-800">{weather.current.condition.text}</Text>
        <Text className="text-base text-blue-800">{weather.current.temp_c}°C</Text>
      </View>
    </View>
  )
}
