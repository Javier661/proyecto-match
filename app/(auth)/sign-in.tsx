"use client";

import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const onSignInPress = async () => {
    if (!isLoaded) return;

    setLoading(true);
    setError("");

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
        setError("Something went wrong. Please try again.");
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || "Invalid email or password");
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-slate-950"
    >
      <ScrollView
        contentContainerClassName="flex-1"
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
          className="flex-1 justify-center px-6 py-12"
        >
          <View className="mb-10">
            <View className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl items-center justify-center mb-6 shadow-xl">
              <Text className="text-4xl">👋</Text>
            </View>
            <Text className="text-5xl font-bold text-white mb-3">
              Bienvenido
            </Text>
            <Text className="text-base text-slate-300 leading-6">
              Inicia sesión para continuar
            </Text>
          </View>

          {/* Error Message */}
          {error ? (
            <View className="bg-red-500/20 border-2 border-red-400/40 rounded-2xl p-4 mb-6">
              <Text className="text-red-300 text-base font-medium">
                {error}
              </Text>
            </View>
          ) : null}

          {/* Form */}
          <View className="space-y-6">
            {/* Email Input */}
            <View>
              <Text className="text-white text-base font-semibold mb-3 ml-1">
                Correo electrónico
              </Text>
              <View className="bg-slate-800/80 border-2 border-slate-700 rounded-2xl overflow-hidden shadow-lg">
                <TextInput
                  autoCapitalize="none"
                  value={emailAddress}
                  placeholder="tu@ejemplo.com"
                  placeholderTextColor="#475569"
                  onChangeText={setEmailAddress}
                  keyboardType="email-address"
                  className="px-5 py-5 text-white text-base"
                />
              </View>
            </View>

            {/* Password Input */}
            <View>
              <Text className="text-white text-base font-semibold mb-3 ml-1">
                Contraseña
              </Text>
              <View className="bg-slate-800/80 border-2 border-slate-700 rounded-2xl overflow-hidden shadow-lg">
                <TextInput
                  value={password}
                  placeholder="Ingresa tu contraseña"
                  placeholderTextColor="#475569"
                  secureTextEntry={true}
                  onChangeText={setPassword}
                  className="px-5 py-5 text-white text-base"
                />
              </View>
            </View>

            {/* Sign In Button */}
            <TouchableOpacity
              onPress={onSignInPress}
              disabled={loading || !emailAddress || !password}
              className={`bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl py-5 shadow-xl mt-4 ${
                loading || !emailAddress || !password
                  ? "opacity-40"
                  : "opacity-100"
              }`}
              activeOpacity={0.7}
            >
              <Text className="text-white text-center font-bold text-lg tracking-wide">
                {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View className="flex-row items-center my-10">
            <View className="flex-1 h-px bg-slate-700" />
            <Text className="mx-4 text-slate-400 text-sm font-medium">O</Text>
            <View className="flex-1 h-px bg-slate-700" />
          </View>

          {/* Sign Up Link */}
          <View className="flex-row justify-center items-center">
            <Text className="text-slate-300 text-base">
              ¿No tienes una cuenta?{" "}
            </Text>
            <Link href="/sign-up" asChild>
              <TouchableOpacity activeOpacity={0.7}>
                <Text className="text-indigo-400 font-bold text-base underline">
                  Registrarse
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
