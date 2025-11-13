"use client";

import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
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
  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    setLoading(true);
    setError("");

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
        setError("Verification incomplete. Please try again.");
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || "Invalid verification code");
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
              <Text className="text-4xl">✉️</Text>
            </View>
            <Text className="text-4xl font-bold text-white mb-3">
              Revisa tu correo
            </Text>
            <Text className="text-base text-slate-300 leading-6">
              Hemos enviado un código de verificación a{"\n"}
              <Text className="text-indigo-400 font-semibold">
                {emailAddress}
              </Text>
            </Text>
          </View>{" "}
          {/* Error Message */}
          {error ? (
            <View className="bg-red-500/20 border-2 border-red-400/40 rounded-2xl p-4 mb-6">
              <Text className="text-red-300 text-base font-medium">
                {error}
              </Text>
            </View>
          ) : null}
          {/* Verification Code Input */}
          <View className="space-y-6">
            <View>
              <Text className="text-white text-base font-semibold mb-3 ml-1">
                Código de verificación
              </Text>
              <View className="bg-slate-800/80 border-2 border-slate-700 rounded-2xl overflow-hidden shadow-lg">
                <TextInput
                  value={code}
                  placeholder="000000"
                  placeholderTextColor="#475569"
                  onChangeText={setCode}
                  keyboardType="number-pad"
                  maxLength={6}
                  className="px-6 py-6 text-white text-3xl text-center tracking-widest font-bold"
                />
              </View>
            </View>

            {/* Verify Button */}
            <TouchableOpacity
              onPress={onVerifyPress}
              disabled={loading || !code || code.length < 6}
              className={`bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl py-5 shadow-xl mt-4 ${
                loading || !code || code.length < 6
                  ? "opacity-40"
                  : "opacity-100"
              }`}
              activeOpacity={0.7}
            >
              <Text className="text-white text-center font-bold text-lg tracking-wide">
                {loading ? "Verificando..." : "Verificar Correo"}
              </Text>
            </TouchableOpacity>
          </View>
          {/* Resend Code */}
          {/*    <View className="mt-10 items-center">
              <Text className="text-slate-300 text-base mb-3">
                ¿No recibiste el código?
              </Text>
              <TouchableOpacity
                onPress={onSignUpPress}
                className="bg-slate-800/60 border border-slate-700 px-6 py-3 rounded-xl"
                activeOpacity={0.7}
              >
                <Text className="text-indigo-400 font-bold text-base">
                  Reenviar Código
                </Text>
              </TouchableOpacity>
            </View> */}
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
