import { Text, View } from "react-native";

export default function Divider() {
  return (
    <View className="flex-row items-center my-10">
      <View className="flex-1 h-px bg-slate-700" />
      <Text className="mx-4 text-slate-400 text-sm font-medium">O</Text>
      <View className="flex-1 h-px bg-slate-700" />
    </View>
  );
}
