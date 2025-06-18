import { HashAlgorithm, VNPay } from 'vnpay';

export const vnpay = new VNPay({
  tmnCode: process.env.VNP_TMNCODE!,
  secureSecret: process.env.VNP_HASHSECRET!,
  vnpayHost: process.env.VNP_URL,
  testMode: true,
  hashAlgorithm: HashAlgorithm.SHA512,
});
