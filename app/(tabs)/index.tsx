import { FormInput } from '@/components/form'
import { FlashList } from '@shopify/flash-list'
import { useRouter } from 'expo-router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'

const LOCATIONS = [
  { id: '1', city: 'San Francisco', temp: '18°C', weather: 'Cloudy' },
  { id: '2', city: 'New York', temp: '22°C', weather: 'Sunny' },
  { id: '3', city: 'Tokyo', temp: '25°C', weather: 'Rainy' },
  { id: '4', city: 'Paris', temp: '20°C', weather: 'Windy' },
]

export default function HomeScreen() {
  const { control, watch } = useForm({ defaultValues: { search: '' } })
  const search = watch('search').toLowerCase()
  const router = useRouter()

  const filteredLocations = LOCATIONS.filter(loc => loc.city.toLowerCase().includes(search))

  return (
    <SafeAreaView className="flex-1 bg-white pt-6">
      <FormInput
        control={control}
        name="search"
        inputProps={{
          placeholder: 'Search city...',
          className: 'bg-gray-100 rounded-xl px-4 py-3 mx-4 text-base text-black',
          placeholderTextColor: '#888',
        }}
      />

      <FlashList
        estimatedItemSize={104}
        data={filteredLocations}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        className="mt-6"
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/forecast?city=${item.city}`)}
            className="mx-4 mb-4 rounded-2xl bg-blue-100 p-4"
          >
            <Text className="text-xl font-semibold text-blue-900">{item.city}</Text>
            <View className="mt-1 flex-row justify-between">
              <Text className="text-base text-blue-800">{item.weather}</Text>
              <Text className="text-base text-blue-800">{item.temp}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  )
}
