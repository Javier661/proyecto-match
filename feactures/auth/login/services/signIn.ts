
export async function signInService(
  signIn: any,
  setActive: (params: { session: string }) => Promise<void>,
  identifier: string,
  password: string
) {
  const signInAttempt = await signIn.create({
    identifier,
    password,
  });

  if (signInAttempt.status === "complete") {
    const sessionId = signInAttempt.createdSessionId;

    if (!sessionId) {
      return { success: false, error: "No session created" };
    }

    await setActive({ session: sessionId });
    return { success: true };
  }

  return { success: false, error: "Incomplete sign-in" };
}
