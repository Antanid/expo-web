import { SafeAreaView, View, Text, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useLocalSearchParams } from "expo-router";

export default function WeatherScreen() {
  const { city } = useLocalSearchParams();

  return (
    <SafeAreaView className="flex-1 bg-blue-50 p-4">
      <View className="my-6 flex justify-center items-center">
        <Text className="text-xl font-semibold text-gray-800">{city}</Text>
        <Text className="text-5xl font-bold text-blue-600 mt-2">22°C</Text>
        <Text className="text-md text-gray-600">Sunny</Text>
      </View>

      <View className="flex w-full justify-center items-center">
        <Text className="text-lg font-semibold text-gray-700 mb-2">
          This Week
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {weeklyForecast.map((day, index) => (
          <View
            key={index}
            className="bg-white rounded-xl p-4 flex-row justify-between items-center mb-3 mx-4"
          >
            <View className="flex flex-row items-center">
              <Text className="text-gray-800 font-medium text-base">
                {day.day}
              </Text>
              <Image source={{ uri: day.icon }} className="w-10 h-10" />
            </View>
            <Text className="text-blue-600 font-bold text-base">
              {day.temp}
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const weeklyForecast = [
  {
    day: "Mon",
    temp: "22°C",
    icon: "https://openweathermap.org/img/wn/01d.png",
  },
  {
    day: "Tue",
    temp: "24°C",
    icon: "https://openweathermap.org/img/wn/02d.png",
  },
  {
    day: "Wed",
    temp: "20°C",
    icon: "https://openweathermap.org/img/wn/03d.png",
  },
  {
    day: "Thu",
    temp: "19°C",
    icon: "https://openweathermap.org/img/wn/04d.png",
  },
  {
    day: "Fri",
    temp: "21°C",
    icon: "https://openweathermap.org/img/wn/01d.png",
  },
  {
    day: "Sat",
    temp: "23°C",
    icon: "https://openweathermap.org/img/wn/02d.png",
  },
  {
    day: "Sun",
    temp: "18°C",
    icon: "https://openweathermap.org/img/wn/10d.png",
  },
];
