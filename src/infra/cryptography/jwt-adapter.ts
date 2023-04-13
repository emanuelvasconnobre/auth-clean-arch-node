import { Decrypter, Encrypter } from "@/data/protocols/cryptography";

import jwt from "jsonwebtoken";

export class JwtAdapter implements Decrypter, Encrypter {
  constructor(private readonly secret: string) {}

  async encrypt(plaintext: string): Promise<string> {
    const ciphertext = jwt.sign({ id: plaintext }, this.secret);
    return ciphertext;
  }

  async decrypt(cyphertext: string): Promise<string> {
    const plaintext = (await jwt.verify(cyphertext, this.secret)).toString();
    return plaintext;
  }
}
