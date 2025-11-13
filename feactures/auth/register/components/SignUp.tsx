import { Text, TouchableOpacity } from "react-native";

interface SignUp {
  onSignUpPress: () => void;
  /*statusForm: boolean;*/
  loading: boolean;
}

export default function SignUp({ onSignUpPress, loading }: SignUp) {
  return (
    <TouchableOpacity
      onPress={onSignUpPress}
      /*       disabled={loading || !emailAddress || !password}*/
      className={`bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl py-5 shadow-xl mt-4`}
      activeOpacity={0.7}
    >
      <Text className="text-white text-center font-bold text-lg tracking-wide">
        {loading ? "Creando cuenta..." : "Crear Cuenta"}
      </Text>
    </TouchableOpacity>
  );
}
