import { Text, TextInput, View } from "react-native";

interface FormField {
  label: string;
  placeholder: string;
  secureTextEntry?: boolean;
  value: string;
  onChangeText: (value: string) => void;
}

export default function FormField({
  label,
  placeholder,
  secureTextEntry,
  value,
  onChangeText,
}: FormField) {
  return (
    <View>
      <Text className="text-white text-base font-semibold mb-3 ml-1">
        {label}
      </Text>
      <View className="bg-slate-800/80 border-2 border-slate-700 rounded-2xl overflow-hidden shadow-lg">
        <TextInput
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#475569"
          secureTextEntry={secureTextEntry || false}
          onChangeText={onChangeText}
          className="px-5 py-5 text-white text-base"
        />
      </View>
    </View>
  );
}
