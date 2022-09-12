import { JwtSecret } from "../../constants";
import { JwtModuleOptions } from "@nestjs/jwt";

export const getDefaultJwtConfigs = (): JwtModuleOptions => {
  return {
    secret: process.env[JwtSecret],
    signOptions: { expiresIn: "15m" }
  };
};