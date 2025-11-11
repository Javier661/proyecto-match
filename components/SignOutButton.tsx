"use client"

import { useClerk } from "@clerk/clerk-expo"
import { useRouter } from "expo-router"
import { Text, TouchableOpacity, View } from "react-native"

export function SignOutButton() {
  const { signOut } = useClerk()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.replace("/")
  }

  return (
    <TouchableOpacity
      onPress={handleSignOut}
      className="bg-red-500/20 border-2 border-red-400/40 rounded-2xl py-5 mt-auto shadow-lg"
      activeOpacity={0.7}
    >
      <View className="flex-row items-center justify-center">
        <Text className="text-2xl mr-3">🚪</Text>
        <Text className="text-red-300 text-center font-bold text-lg">Cerrar Sesión</Text>
      </View>
    </TouchableOpacity>
  )
}