import fs from 'fs';
import path from 'path';

export function writeCaPemIfNotExists() {
  const certPath = path.join(process.cwd(), 'src', 'app', 'certs', 'ca.pem');

  if (fs.existsSync(certPath)) return;

  const content = process.env.CA_PEM_CONTENT;
  if (!content) {
    console.error('⚠️ CA_PEM_CONTENT environment variable is missing.');
    return;
  }

  fs.mkdirSync(path.dirname(certPath), { recursive: true });
  fs.writeFileSync(certPath, content, 'utf-8');
  console.log('✅ ca.pem created from environment variable.');
}
