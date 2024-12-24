import fs from "fs";

// export const getSSLCredentials = async () => {
//   try {
//     // Récupérer les clés depuis keytar
//     const existingPrivateKey = await keytar.getPassword(
//       "ssl-keys",
//       "private-key"
//     );
//     const existingCertificate = await keytar.getPassword(
//       "ssl-keys",
//       "certificate"
//     );

//     if (existingPrivateKey && existingCertificate) {
//       return {
//         key: existingPrivateKey,
//         cert: existingCertificate,
//       };
//     }

//     const privateKey = fs.readFileSync("key.pem", "utf8");
//     const certificate = fs.readFileSync("cert.pem", "utf8");

//     await keytar.setPassword("ssl-keys", "private-key", privateKey);
//     await keytar.setPassword("ssl-keys", "certificate", certificate);

//     fs.unlinkSync("key.pem");
//     fs.unlinkSync("cert.pem");

//     return {
//       key: privateKey,
//       cert: certificate,
//     };
//   } catch (error) {
//     throw new Error(error);
//   }
// };
