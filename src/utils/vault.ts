import vault from "node-vault";
import { SecretsManager } from "./secretsManager";

export const VaultManager = {
  async getVaultCredentials() {
    const vaultCredentials = await SecretsManager.getVaultCredentials();
    return vault({
      apiVersion: "v1",
      endpoint: vaultCredentials.vaultAddr,
      token: vaultCredentials.vaultToken,
    });
  },
  async getSecret(secretPath: string) {
    try {
      const vaultClient = await this.getVaultCredentials();
      const secret = await vaultClient.read(secretPath);
      return secret;
    } catch (error) {
      return { message: "Error fetching secret" };
    }
  },
};
