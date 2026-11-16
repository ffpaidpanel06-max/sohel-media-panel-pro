# SOHEL MEDIA PANEL

Purple + black responsive dashboard starter.

## Local setup
1. Node.js 18+ और PostgreSQL database रखें।
2. `npm install` चलाएँ।
3. `.env.example` की कॉपी `.env` बनाकर `DATABASE_URL`, `JWT_SECRET` और `ADMIN_EMAIL` भरें।
4. `npm start` चलाएँ और `http://localhost:3000` खोलें।
5. `ADMIN_EMAIL` वाले ईमेल से पहले account register करें; वह account admin बनेगा।

## Render deployment
- GitHub पर इस folder की files push करें और Render Web Service बनाएँ।
- Build command: `npm install`; Start command: `npm start`.
- Render PostgreSQL database का Internal Database URL `DATABASE_URL` में लगाएँ।
- `JWT_SECRET` कम-से-कम 32 अक्षरों का random secret रखें; `ADMIN_EMAIL` में admin account का ईमेल दें।

## Features
Registration/login, hashed passwords, JWT auth, PostgreSQL schema, sample marketing services, order placement/history, wallet top-up request, admin deposit approval और order overview.

## जरूरी सीमाएँ
UPI payment अपने-आप verify नहीं होता: admin को अपने UPI/bank app में भुगतान देखकर request approve करनी होगी। यह starter किसी बाहरी SMM provider से जुड़ा नहीं है; orders manual fulfillment के लिए pending रहते हैं। केवल वैध marketing services दें और संबंधित platform policies का पालन करें। Production से पहले payment gateway verification, backups, privacy policy, terms, audit logs और security review जोड़ें।
