"use client"

import { SignOutButton } from "@/components/SignOutButton"
import "@/styles/global.css"
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo"
import { Link } from "expo-router"
import { useEffect, useRef } from "react"
import { Animated, ScrollView, Text, TouchableOpacity, View } from "react-native"


export default function Page() {
  const { user } = useUser()

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(30)).current

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
    ]).start()
  }, [])

  return (
    <View className="flex-1 bg-slate-950">
      <ScrollView contentContainerClassName="flex-1" showsVerticalScrollIndicator={false}>
        <SignedIn>
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="flex-1 px-6 py-12"
          >
            {/* Header */}
            <View className="mt-12 mb-10">
              <View className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl items-center justify-center mb-6 shadow-xl">
                <Text className="text-5xl">🎉</Text>
              </View>
              <Text className="text-5xl font-bold text-white mb-3">¡Bienvenido!</Text>
              <Text className="text-base text-slate-300">{user?.emailAddresses[0].emailAddress}</Text>
            </View>

            {/* User Info Card */}
            <View className="bg-slate-800/80 border-2 border-slate-700 rounded-2xl p-6 mb-8 shadow-lg">
              <View className="flex-row items-center mb-4">
                <View className="w-12 h-12 bg-indigo-500/20 rounded-xl items-center justify-center mr-4">
                  <Text className="text-2xl">👤</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-slate-400 text-sm mb-1">Información de usuario</Text>
                  <Text className="text-white font-semibold text-base">Tu cuenta</Text>
                </View>
              </View>
              <View className="bg-slate-900/50 rounded-xl p-4">
                <Text className="text-slate-400 text-sm mb-2">ID de Usuario</Text>
                <Text className="text-slate-300 font-mono text-xs leading-5">{user?.id}</Text>
              </View>
            </View>

            {/* Quick Actions */}
            <View className="mb-8">
              <Text className="text-white text-xl font-bold mb-4">Acciones rápidas</Text>

              <TouchableOpacity
                className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border-2 border-indigo-500/30 rounded-2xl p-5 mb-4 shadow-lg"
                activeOpacity={0.7}
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center flex-1">
                    <View className="w-12 h-12 bg-indigo-500 rounded-xl items-center justify-center mr-4">
                      <Text className="text-2xl">⚙️</Text>
                    </View>
                    <View className="flex-1">
                      <Text className="text-white font-bold text-base mb-1">Configuración del perfil</Text>
                      <Text className="text-slate-300 text-sm">Administra tu cuenta</Text>
                    </View>
                  </View>
                  <Text className="text-indigo-400 text-2xl ml-2">→</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-2 border-purple-500/30 rounded-2xl p-5 mb-4 shadow-lg"
                activeOpacity={0.7}
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center flex-1">
                    <View className="w-12 h-12 bg-purple-500 rounded-xl items-center justify-center mr-4">
                      <Text className="text-2xl">🎨</Text>
                    </View>
                    <View className="flex-1">
                      <Text className="text-white font-bold text-base mb-1">Preferencias</Text>
                      <Text className="text-slate-300 text-sm">Personaliza tu experiencia</Text>
                    </View>
                  </View>
                  <Text className="text-purple-400 text-2xl ml-2">→</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-gradient-to-r from-emerald-600/20 to-teal-600/20 border-2 border-emerald-500/30 rounded-2xl p-5 shadow-lg"
                activeOpacity={0.7}
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center flex-1">
                    <View className="w-12 h-12 bg-emerald-500 rounded-xl items-center justify-center mr-4">
                      <Text className="text-2xl">🔔</Text>
                    </View>
                    <View className="flex-1">
                      <Text className="text-white font-bold text-base mb-1">Notificaciones</Text>
                      <Text className="text-slate-300 text-sm">Gestiona tus alertas</Text>
                    </View>
                  </View>
                  <Text className="text-emerald-400 text-2xl ml-2">→</Text>
                </View>
              </TouchableOpacity>
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
              <View className="w-28 h-28 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl items-center justify-center mb-8 shadow-xl">
                <Text className="text-6xl">✨</Text>
              </View>
              <Text className="text-5xl font-bold text-white text-center mb-4">Bienvenido</Text>
              <Text className="text-base text-slate-300 text-center leading-6 max-w-sm">
                Inicia sesión o crea una cuenta para comenzar tu experiencia
              </Text>
            </View>

            {/* Action Buttons */}
            <View className="w-full space-y-4 mb-12">
              <Link href="/(auth)/sign-in" asChild>
                <TouchableOpacity
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl py-5 shadow-xl"
                  activeOpacity={0.7}
                >
                  <Text className="text-white text-center font-bold text-lg tracking-wide">Iniciar Sesión</Text>
                </TouchableOpacity>
              </Link>

              <Link href="/(auth)/sign-up" asChild>
                <TouchableOpacity
                  className="bg-slate-800/80 border-2 border-slate-700 rounded-2xl py-5 shadow-lg"
                  activeOpacity={0.7}
                >
                  <Text className="text-white text-center font-bold text-lg tracking-wide">Crear Cuenta</Text>
                </TouchableOpacity>
              </Link>
            </View>

            {/* Features List */}
            <View className="space-y-4 px-4">
              <View className="flex-row items-center">
                <View className="w-8 h-8 bg-indigo-500/20 rounded-lg items-center justify-center mr-4">
                  <Text className="text-indigo-400 text-xl">✓</Text>
                </View>
                <Text className="text-slate-300 text-base">Autenticación segura</Text>
              </View>
              <View className="flex-row items-center">
                <View className="w-8 h-8 bg-purple-500/20 rounded-lg items-center justify-center mr-4">
                  <Text className="text-purple-400 text-xl">✓</Text>
                </View>
                <Text className="text-slate-300 text-base">Rápido y confiable</Text>
              </View>
              <View className="flex-row items-center">
                <View className="w-8 h-8 bg-pink-500/20 rounded-lg items-center justify-center mr-4">
                  <Text className="text-pink-400 text-xl">✓</Text>
                </View>
                <Text className="text-slate-300 text-base">Interfaz hermosa</Text>
              </View>
            </View>
          </Animated.View>
        </SignedOut>
      </ScrollView>
    </View>
  )
}