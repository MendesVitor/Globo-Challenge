/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

export function validateEnvVars(): void {
  validEnvVars(REQUIRED_ENV_VARS);
}

function validEnvVars(envVars: string[]): void {
  envVars.forEach((envVar) => {
    const val = process.env[envVar];
    if (val === '' || val === null || val === undefined) {
      throw new Error(`Required ENV VAR not set: ${envVar}`);
    }
  });
}

const REQUIRED_ENV_VARS = [
  'DB_HOST',
  'DB_NAME',
  'DB_USERNAME',
  'DB_PASSWORD',
  'DB_PORT',
  'DB_SYNCHRONIZE',
  'DB_AUTOLOADMODELS',
  'APP_PORT',
];

export const DB_HOST = process.env.DB_HOST;
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_NAME;
export const DB_PORT = Number(process.env.DB_PORT);
export const DB_AUTOLOADMODELS =
  process.env.DB_AUTOLOADMODELS === 'true' ? true : false;
export const DB_SYNCHRONIZE =
  process.env.DB_SYNCHRONIZE === 'true' ? true : false;
export const APP_PORT = process.env.APP_PORT;
