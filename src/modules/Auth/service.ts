import { User } from "../../types";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { DatabaseService } from "../Database/service";
import { Injectable, BadRequestException } from "@nestjs/common";
import { createUuid, hash, compare, FakeHashedPassword } from "../../utils";
import { LoginCredentials, SignupCredentials, AuthToken, GetUserQuery } from "./types";

@Injectable({})
export class AuthService {
  constructor(private database: DatabaseService, private tokens: JwtService, private config: ConfigService) { }

  /**
   * @throws errors if the user does not already exists, passwords don't match or problem signing auth token
   */
  public async login(credentials: LoginCredentials) {
    // dosent throw an error incase user dosent exists & stil compare submitted password 
    // to a fake hashed password  to prevent timing attacks
    const user = await this.getUser({ email: credentials.email });
    const match = await this.comparePasswordOrThrow(credentials.password, user?.password);
    const authToken = await this.signAuthToken({ userId: user.userId });

    // TODO: implement nestjs interceptors to remove password or sensetive properties from user object
    delete user.password;

    return {
      authToken,
      user
    };
  }

  /**
   * @throws errors if the email already exists or problem signing auth token
   */
  public async signup(credentials: SignupCredentials) {
    const user = await this.createUser(credentials);
    const authToken = await this.signAuthToken({ userId: user.userId });

    // TODO: implement nestjs interceptors to remove password or sensetive properties from user object
    delete user.password;

    return {
      authToken,
      user
    };
  }

  private async createUser(props: Partial<User>) {
    const uuid = createUuid();
    const password = await hash(props.password);

    return this.database.user.create({
      data: {
        isEmailVerified: false,
        password: password,
        userId: uuid,
        name: props.name,
        email: props.email,
      }
    });
  }

  private async getUser(query: GetUserQuery) {
    return this.database.user.findUnique({
      where: query
    });
  }

  private async comparePasswordOrThrow(password: string, hashedPassword?: string) {
    if (await compare(password, hashedPassword || FakeHashedPassword)) {
      return true;
    };

    throw new BadRequestException({
      message: "invalid email or password"
    });
  }

  private async signAuthToken(payload: AuthToken) {
    return this.tokens.signAsync(payload, {
      expiresIn: "15m",
      secret: this.config.get("TOKEN_SECRET") // enviroment variables are cached
    });
  }
}