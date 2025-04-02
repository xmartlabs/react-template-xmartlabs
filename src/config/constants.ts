const fetchVariable = (varName: string, defaultValue?: string) => {
  if (!import.meta.env[varName] && typeof defaultValue === "undefined") {
    throw new Error(`Mandatory environment variable ${varName} is not set.`);
  }
  return String(import.meta.env[varName] ?? defaultValue);
};

const nodeEnv = fetchVariable("MODE");
const environment = {
  isDevelopment: nodeEnv === "development",
  isProduction: nodeEnv === "production",
};

export const constants = {
  apiBaseURL: fetchVariable("VITE_API_BASE_URL", "REPLACE ME"),

  logLevel: fetchVariable("VITE_LOG_LEVEL", "info"),

  environment,
};
