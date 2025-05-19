import { useRouter } from 'expo-router'
import { useSearchParams } from 'expo-router/build/hooks'
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

export default function Forecast() {
  const params = useSearchParams()
  const router = useRouter()

  const city = params.get('city') || 'Unknown city'

  return (
    <SafeAreaView className="flex-1 bg-blue-50 p-4">
      <TouchableOpacity onPress={() => router.back()}>
        <Text className="text-bold ml-4 text-lg text-gray-600">{'< Back'}</Text>
      </TouchableOpacity>
      <View className="my-6 flex items-center justify-center">
        <Text className="text-xl font-semibold text-gray-800">{city}</Text>
        <Text className="mt-2 text-5xl font-bold text-blue-600">22°C</Text>
        <Text className="text-md text-gray-600">Sunny</Text>
      </View>

      <View className="flex w-full items-center justify-center">
        <Text className="mb-2 text-lg font-semibold text-gray-700">This Week</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {weeklyForecast.map((day, index) => (
          <View
            key={index}
            className="mx-4 mb-3 flex-row items-center justify-between rounded-xl bg-white p-4"
          >
            <View className="flex flex-row items-center">
              <Text className="text-base font-medium text-gray-800">{day.day}</Text>
              <Image source={{ uri: day.icon }} className="h-10 w-10" />
            </View>
            <Text className="text-base font-bold text-blue-600">{day.temp}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const weeklyForecast = [
  {
    day: 'Mon',
    temp: '22°C',
    icon: 'https://openweathermap.org/img/wn/01d.png',
  },
  {
    day: 'Tue',
    temp: '24°C',
    icon: 'https://openweathermap.org/img/wn/02d.png',
  },
  {
    day: 'Wed',
    temp: '20°C',
    icon: 'https://openweathermap.org/img/wn/03d.png',
  },
  {
    day: 'Thu',
    temp: '19°C',
    icon: 'https://openweathermap.org/img/wn/04d.png',
  },
  {
    day: 'Fri',
    temp: '21°C',
    icon: 'https://openweathermap.org/img/wn/01d.png',
  },
  {
    day: 'Sat',
    temp: '23°C',
    icon: 'https://openweathermap.org/img/wn/02d.png',
  },
  {
    day: 'Sun',
    temp: '18°C',
    icon: 'https://openweathermap.org/img/wn/10d.png',
  },
]
