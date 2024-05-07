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
        "968654527208-a00upkd8u9ssnkmga38flbk5dp348sf9.apps.googleusercontent.com",
      forceCodeForRefreshToken: true,
    },
  },
};

export default config;
