import keytar from "keytar";

interface UserSecrets {
  vaultAddr: string;
  vaultToken: string;
  secretPath: string;
}

export const SecretsManager = {
  async getUserCredentials(): Promise<
    Array<{ account: string; data: UserSecrets }>
  > {
    try {
      const allCredentials = await keytar.findCredentials(`user-secrets-vault`);
      return allCredentials.map((cred) => ({
        account: cred.account,
        data: JSON.parse(cred.password),
      }));
    } catch (error) {
      console.error("Error");
    }
  },

  async storeUser(
    vaultAddr: string,
    vaultToken: string,
    secretPath: string
  ): Promise<void> {
    try {
      const userInfo: UserSecrets = {
        vaultAddr,
        vaultToken,
        secretPath,
      };
      await keytar.setPassword(
        `user-secrets-vault`,
        "user-info",
        JSON.stringify(userInfo)
      );
      console.log("User stored successfully");
    } catch (error) {
      throw new Error("Internal Server Error");
    }
  },

  async getVaultCredentials(): Promise<UserSecrets> {
    const vaultCredentials = await SecretsManager.getUserCredentials();
    return vaultCredentials[0].data;
  },

  async deleteUserCredentials(): Promise<void> {
    await keytar.deletePassword(`user-secrets-vault`, "user-info");
  },
};
