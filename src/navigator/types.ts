export type AuthStackParamList = {
  Login: undefined;
  Otp: {phone: string; name?: string};
};

export type AppStackParamList = {
  Home: {phone: string};
};

export type RootStackParamList = AuthStackParamList & AppStackParamList;
