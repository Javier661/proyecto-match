import { Text, View } from "react-native";

interface ErrorMessage {
  error: string;
}

export default function ErrorMessage({ error }: ErrorMessage) {
  return (
    <View className="bg-red-500/20 border-2 border-red-400/40 rounded-2xl p-4 mb-6">
      <Text className="text-red-300 text-base font-medium">{error}</Text>
    </View>
  );
}
