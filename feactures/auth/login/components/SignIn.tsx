import { Text, TouchableOpacity } from "react-native";

interface SignUp {
  onSignInPress: () => void;
  /*   statusForm: boolean;
   */ loading: boolean;
}

export default function SignIn({ onSignInPress, loading }: SignUp) {
  return (
    <TouchableOpacity
      onPress={onSignInPress}
      /*       disabled={statusForm}
       */ className={`bg-black rounded-2xl py-5 shadow-xl mt-4`}
      activeOpacity={0.7}
    >
      <Text className="text-white text-center font-bold text-lg tracking-wide">
        {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
      </Text>
    </TouchableOpacity>
  );
}
