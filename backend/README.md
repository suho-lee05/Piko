# Piko Backend API Server

기본적인 Node.js Express 백엔드 서버입니다.

## 설설치

```bash
npm install
```

## 실행

### 개발 모드 (nodemon 사용)
```bash
npm run dev
```

### 프로덕션 모드
```bash
npm start
```

서버는 기본적으로 포트 5000에서 실행됩니다.

## 환경설정

`.env` 파일을 만들어 다음과 같이 설정합니다:

```
PORT=5000
NODE_ENV=development
```

## API 엔드포인트

- `GET /api/health` - 서버 상태 확인

## 디렉토리 구조

```
backend/
├── src/
│   ├── server.js          # 메인 서버 파일
│   ├── routes/            # API 라우트
│   ├── controllers/       # 비즈니스 로직
│   ├── models/            # 데이터 모델
│   └── config/            # 설정 파일
├── package.json
├── .env.example
└── .gitignore
```
