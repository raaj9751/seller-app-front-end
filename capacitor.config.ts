import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.fairpirates.cwmart",
  appName: "CW Mart",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
  plugins: {
    GoogleAuth: {
      scopes: ["profile", "email"],
      serverClientId:
        "968654527208-3jdat9m8j62o6v8o1ai7q6m28jj5ht24.apps.googleusercontent.com",
      forceCodeForRefreshToken: true,
    },
  },
};

export default config;
