import ErrorMessage from "@/shared/components/ErrorMessage";
import FormField from "@/shared/components/FormField";
import { useSignUp } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import SignUp from "./SignUp";

export default function FormSignUp() {
  const { isLoaded, signUp } = useSignUp();

  const [emailAddress, setEmailAddress] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle submission of sign-up form
  /* const onSignUpPress = async () => {
    if (!isLoaded) return;

    setLoading(true);
    setError("");

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      const session = await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      console.log(session.status)

    } catch (err: any) {
      setError(
        err.errors?.[0]?.message || "Something went wrong. Please try again."
      );
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  }; */

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    setLoading(true);
    setError("");

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      const session = await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      router.replace("/verification");
    } catch (err: any) {
      setError(
        err.errors?.[0]?.message || "Something went wrong. Please try again."
      );
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="gap-10">
      {error ? <ErrorMessage error={error} /> : null}

      <FormField
        label="Nombre completo"
        value={name}
        placeholder="Camilo Rojas"
        onChangeText={setName}
      />

      <FormField
        label="Correo electrónico"
        value={emailAddress}
        placeholder="tu@ejemplo.com"
        onChangeText={setEmailAddress}
      />

      {/* Password Input */}
      <View>
        <FormField
          label="Contraseña"
          value={password}
          placeholder="Crea una contraseña segura"
          secureTextEntry={true}
          onChangeText={setPassword}
        />
        <View className="flex-row items-center mt-3 ml-1">
          <Text className="text-slate-400 text-sm">💡 </Text>
          <Text className="text-slate-400 text-sm">
            Debe tener al menos 8 caracteres
          </Text>
        </View>
      </View>

      <SignUp loading={loading} onSignUpPress={onSignUpPress} />
    </View>
  );
}
