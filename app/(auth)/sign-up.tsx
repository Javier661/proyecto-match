"use client"

import { useSignUp } from "@clerk/clerk-expo"
import { Link, useRouter } from "expo-router"
import React, { useEffect, useRef, useState } from "react"
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = useState("")
  const [password, setPassword] = useState("")
  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

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

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return

    setLoading(true)
    setError("")

    try {
      await signUp.create({
        emailAddress,
        password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" })

      setPendingVerification(true)
    } catch (err: any) {
      setError(err.errors?.[0]?.message || "Something went wrong. Please try again.")
      console.error(JSON.stringify(err, null, 2))
    } finally {
      setLoading(false)
    }
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return

    setLoading(true)
    setError("")

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace("/")
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2))
        setError("Verification incomplete. Please try again.")
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || "Invalid verification code")
      console.error(JSON.stringify(err, null, 2))
    } finally {
      setLoading(false)
    }
  }

  if (pendingVerification) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 bg-slate-950"
      >
        <ScrollView contentContainerClassName="flex-1" showsVerticalScrollIndicator={false}>
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
            <Text className="text-4xl font-bold text-white mb-3">Revisa tu correo</Text>
            <Text className="text-base text-slate-300 leading-6">
              Hemos enviado un código de verificación a{"\n"}
              <Text className="text-indigo-400 font-semibold">{emailAddress}</Text>
            </Text>
          </View>            {/* Error Message */}
            {error ? (
              <View className="bg-red-500/20 border-2 border-red-400/40 rounded-2xl p-4 mb-6">
                <Text className="text-red-300 text-base font-medium">{error}</Text>
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
                  loading || !code || code.length < 6 ? "opacity-40" : "opacity-100"
                }`}
                activeOpacity={0.7}
              >
                <Text className="text-white text-center font-bold text-lg tracking-wide">
                  {loading ? "Verificando..." : "Verificar Correo"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Resend Code */}
            <View className="mt-10 items-center">
              <Text className="text-slate-300 text-base mb-3">¿No recibiste el código?</Text>
              <TouchableOpacity
                onPress={onSignUpPress}
                className="bg-slate-800/60 border border-slate-700 px-6 py-3 rounded-xl"
                activeOpacity={0.7}
              >
                <Text className="text-indigo-400 font-bold text-base">Reenviar Código</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-slate-950"
    >
      <ScrollView contentContainerClassName="flex-1" showsVerticalScrollIndicator={false}>
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
          className="flex-1 justify-center px-6 py-12"
        >
          <View className="mb-10">
            <View className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl items-center justify-center mb-6 shadow-xl">
              <Text className="text-4xl">✨</Text>
            </View>
            <Text className="text-5xl font-bold text-white mb-3">Crear cuenta</Text>
            <Text className="text-base text-slate-300 leading-6">
              Únete hoy y comienza
            </Text>
          </View>

          {/* Error Message */}
          {error ? (
            <View className="bg-red-500/20 border-2 border-red-400/40 rounded-2xl p-4 mb-6">
              <Text className="text-red-300 text-base font-medium">{error}</Text>
            </View>
          ) : null}

          {/* Form */}
          <View className="space-y-6">
            {/* Email Input */}
            <View>
              <Text className="text-white text-base font-semibold mb-3 ml-1">Correo electrónico</Text>
              <View className="bg-slate-800/80 border-2 border-slate-700 rounded-2xl overflow-hidden shadow-lg focus:border-indigo-500">
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
              <Text className="text-white text-base font-semibold mb-3 ml-1">Contraseña</Text>
              <View className="bg-slate-800/80 border-2 border-slate-700 rounded-2xl overflow-hidden shadow-lg">
                <TextInput
                  value={password}
                  placeholder="Crea una contraseña segura"
                  placeholderTextColor="#475569"
                  secureTextEntry={true}
                  onChangeText={setPassword}
                  className="px-5 py-5 text-white text-base"
                />
              </View>
              <View className="flex-row items-center mt-3 ml-1">
                <Text className="text-slate-400 text-sm">💡 </Text>
                <Text className="text-slate-400 text-sm">
                  Debe tener al menos 8 caracteres
                </Text>
              </View>
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity
              onPress={onSignUpPress}
              disabled={loading || !emailAddress || !password}
              className={`bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl py-5 shadow-xl mt-4 ${
                loading || !emailAddress || !password ? "opacity-40" : "opacity-100"
              }`}
              activeOpacity={0.7}
            >
              <Text className="text-white text-center font-bold text-lg tracking-wide">
                {loading ? "Creando cuenta..." : "Crear Cuenta"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View className="flex-row items-center my-10">
            <View className="flex-1 h-px bg-slate-700" />
            <Text className="mx-4 text-slate-400 text-sm font-medium">O</Text>
            <View className="flex-1 h-px bg-slate-700" />
          </View>

          {/* Sign In Link */}
          <View className="flex-row justify-center items-center">
            <Text className="text-slate-300 text-base">¿Ya tienes una cuenta? </Text>
            <Link href="/sign-in" asChild>
              <TouchableOpacity activeOpacity={0.7}>
                <Text className="text-indigo-400 font-bold text-base underline">Iniciar sesión</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}