export async function signUpService(
  signUp: any,
  emailAddress: string,
  password: string
) {
  const signUpAttempt = await signUp.create({
    emailAddress,
    password,
  });

  if (signUpAttempt.status === "complete") {
    const session = await signUp.prepareEmailAddressVerification({
      strategy: "email_code",
    });

    if (!session) {
      return { success: false, error: "No session created" };
    }

    return { success: true };
  }

  if(signUpAttempt.status === 422){
    return { success: false, error: "Correo electronico ya registrado, por favor intenet con otro"  };
  }

  return { success: false, error: signUpAttempt.status };
}
