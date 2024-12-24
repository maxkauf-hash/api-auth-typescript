// import keytar from "keytar";
// import { generateApiKey } from "./crypto";

// export const getPassportCredentials = async () => {
//   try {
//     const existingPrivateKey = await keytar.getPassword(
//       "passport-keys",
//       "private-key"
//     );

//     if (existingPrivateKey) {
//       return existingPrivateKey;
//     }

//     const privateKey = generateApiKey();

//     await keytar.setPassword("passport-keys", "private-key", privateKey);

//     return privateKey;
//   } catch (error) {
//     throw new Error(error);
//   }
// };
