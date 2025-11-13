"use client";

import { SignOutButton } from "@/components/SignOutButton";
import "@/styles/global.css";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Page() {
  const { user } = useUser();

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
    <View className="flex-1 bg-slate-950">
      <ScrollView
        contentContainerClassName="flex-1"
        showsVerticalScrollIndicator={false}
      >
        <SignedIn>
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="flex-1 px-6 py-12"
          >
            {/* User Info Card */}
            <View className="bg-slate-800/80 border-2 border-slate-700 rounded-2xl p-6 mb-8 shadow-lg">
              <View className="flex-row items-center mb-4">
                <View className="w-12 h-12 bg-indigo-500/20 rounded-xl items-center justify-center mr-4">
                  <Text className="text-2xl">👤</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-slate-400 text-sm mb-1">
                    Información de usuario
                  </Text>
                  <Text className="text-white font-semibold text-base">
                    Tu cuenta
                  </Text>
                </View>
              </View>
              <View className="bg-slate-900/50 rounded-xl p-4">
                <Text className="text-slate-400 text-sm mb-2">
                  Correo
                </Text>
                <Text className="text-slate-300 font-mono text-xs leading-5">
                  {user?.emailAddresses[0].emailAddress}
                </Text>
              </View>
            </View>

            {/* Sign Out Button */}
            <SignOutButton />
          </Animated.View>
        </SignedIn>

        <SignedOut>
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="flex-1 justify-center items-center px-6 py-12"
          >
            {/* Welcome Content */}
            <View className="items-center mb-12">
              <Text className="text-5xl font-bold text-white text-center mb-4">
                Bienvenido
              </Text>
              <Text className="text-base text-slate-300 text-center leading-6 max-w-sm">
                Inicia sesión o crea una cuenta para comenzar tu experiencia
              </Text>
            </View>

            {/* Action Buttons */}
            <View className="w-full gap-10 mb-12">
              <Link href="/(auth)/sign-in" asChild>
                <TouchableOpacity
                  className="bg-black rounded-2xl py-5 shadow-xl"
                  activeOpacity={0.7}
                >
                  <Text className="text-white text-center font-bold text-lg tracking-wide">
                    Iniciar Sesión
                  </Text>
                </TouchableOpacity>
              </Link>

              <Link href="/(auth)/sign-up" asChild>
                <TouchableOpacity
                  className="bg-slate-800/80 border-2 border-slate-700 rounded-2xl py-5 shadow-lg"
                  activeOpacity={0.7}
                >
                  <Text className="text-white text-center font-bold text-lg tracking-wide">
                    Crear Cuenta
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </Animated.View>
        </SignedOut>
      </ScrollView>
    </View>
  );
}
