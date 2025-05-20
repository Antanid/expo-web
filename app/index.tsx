import { FormInput } from '@/components/form'
import { CityWeatherItem } from '@/layout/weatherItem'
import { useDebounce } from '@/utils/useDebounce'
import { FlashList } from '@shopify/flash-list'
import { useRouter } from 'expo-router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Button, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'

const Index = [
  { id: '1', city: 'San Francisco', temp: '18°C', weather: 'Cloudy' },
  { id: '2', city: 'New York', temp: '22°C', weather: 'Sunny' },
  { id: '3', city: 'Tokyo', temp: '25°C', weather: 'Rainy' },
  { id: '4', city: 'Paris', temp: '20°C', weather: 'Windy' },
]

export default function Locations() {
  const { control, watch, setValue } = useForm({ defaultValues: { search: '' } })
  const search = watch('search').toLowerCase()
  const router = useRouter()

  const debouncedSearch = useDebounce(search, 500)

  const filteredLocations = Index.filter(loc => loc.city.toLowerCase().includes(debouncedSearch))

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FormInput
        control={control}
        name="search"
        inputProps={{
          placeholder: 'Search city...',
          className: 'bg-gray-100 rounded-xl px-4 py-3 mx-4 text-base text-black mt-6 ',
          placeholderTextColor: '#888',
        }}
      />

      {filteredLocations.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-lg text-gray-500">No results found</Text>
          <Button title="Clear" onPress={() => setValue('search', '')} />
        </View>
      ) : (
        <View className="flex-1">
          <FlashList
            estimatedItemSize={88}
            data={filteredLocations}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            className="mt-6"
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => router.push(`/forecast?city=${item.city}`)}
                className="mx-4 mb-4 rounded-2xl bg-blue-100 p-4"
              >
                <CityWeatherItem city={item.city} />
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  )
}
