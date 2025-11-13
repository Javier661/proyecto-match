"use client";

import FormSignIn from "@/feactures/auth/login/components/FormSignIn";
import Divider from "@/shared/components/Divider";
import { Link } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Page() {
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
          className="justify-center px-6 py-12"
        >
          {/* Bienvenida */}
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

          {/*Formulario loginF*/}
          <FormSignIn />

          <Divider />
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
