import ErrorMessage from "@/shared/components/ErrorMessage";
import FormField from "@/shared/components/FormField";
import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { signInService } from "../services/signIn";
import SignIn from "./SignIn";

export default function FormSignIn() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignInPress = async () => {
    if (!isLoaded) return;

    setLoading(true);
    setError("");

    try {
      const result = await signInService(
        signIn,
        setActive,
        emailAddress,
        password
      );

      if (result.success) {
        router.replace("/");
      } else {
        setError(result.error || "Something went wrong. Please try again.");
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      {error ? <ErrorMessage error={error} /> : null}

      {/* Form */}
      <View className="gap-10">

        <FormField
          label="Correo electrónicoo"
          placeholder="Ingresa tu correo"
          value={emailAddress}
          onChangeText={setEmailAddress}
        />

        <FormField
          label="Contraseña"
          placeholder="Ingresa tu contraseña"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <SignIn onSignInPress={onSignInPress} loading={loading} />
      </View>
    </View>
  );
}
