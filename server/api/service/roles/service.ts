import { JWT, JWK } from "jose";
import { readFileSync } from "fs";
import { resolve, join, relative } from "path";
import request from "request-promise-native";
import l from "../../../common/logger";

const auth_config = {
  "timbrook480@gmail.com": "web_admin"
}

export class RoleBroker {
  key: JWK.Key;

  constructor() {
    const conf = readFileSync(resolve("/var/run/secrets/jwk.json"));
    const data = JSON.parse(conf.toString());
    this.key = JWK.asKey(data);
  }

  async lookupEmailConfig(email: string): Promise<string> {
    const token = JWT.sign(
      {
        role: "role_lookup"
      },
      this.key,
      {
        audience: "role",
        expiresIn: "1 second",
      }
    );
    const res = await request.get(`https://timbrook.tech/api/p/roles?email=eq.${email}&select=role`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.pgrst.object+json"
      }
    }).json();
    return res.role;
  }

  async generateToken(email: string): Promise<string> {
    const role = await this.lookupEmailConfig(email);
    l.info("Giving %s role %s", email, role);
    const token = JWT.sign(
      {
        email,
        role,
      },
      this.key,
      {
        audience: ["role"],
        expiresIn: "5 minute"
      }
    );
    return token;
  }

}
