import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "io.ionic.starter",
  appName: "CW Mart",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
  plugins: {
    GoogleAuth: {
      scopes: ["profile", "email"],
      serverClientId:
        "471807870049-ulek4vks6u3fm10tgqghid06vqu0c19g.apps.googleusercontent.com",
      forceCodeForRefreshToken: true,
    },
  },
};

export default config;
