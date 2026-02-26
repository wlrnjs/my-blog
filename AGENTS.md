# AGENTS.md

이 문서는 AI 에이전트가 이 코드베이스에서 작업할 때 참고하는 지침서입니다.

---

## 언어 규칙 (필수)

- **모든 PR 제목, PR 설명, 코드 리뷰 코멘트는 반드시 한국어로 작성한다.**
- 커밋 메시지 본문도 한국어로 작성한다. (prefix는 영어 허용: `feat:`, `fix:` 등)
- 코드 내 주석도 한국어로 작성한다.

---

## 프로젝트 개요

**wlrnjs-blog**는 서지권(Seojikwon)의 개인 프론트엔드 개발 블로그입니다.
프론트엔드 개발 과정에서 마주한 문제와 해결 과정을 기록하는 기술 블로그입니다.

- **라이브 URL**: https://www.wlrnjs.xyz
- **목적**: 개인 기술 블로그

---

## 기술 스택

| 분류          | 기술                                |
| ------------- | ----------------------------------- |
| 프레임워크    | Next.js 16 (App Router)             |
| 언어          | TypeScript                          |
| 스타일링      | Tailwind CSS v3                     |
| UI 라이브러리 | @heroicons/react, next-themes       |
| 데이터베이스  | Supabase (PostgreSQL)               |
| 인증/스토리지 | Supabase                            |
| 마크다운      | react-markdown, rehype-_, remark-_  |
| 분석          | Vercel Analytics, Google Analytics  |
| 배포          | Vercel                              |
| 코드 포맷터   | Prettier + prettier-plugin-tailwind |
| 린터          | ESLint (eslint-config-next)         |

---

## 아키텍처: Feature-Sliced Design (FSD)

이 프로젝트는 **Feature-Sliced Design** 아키텍처를 따릅니다.
레이어 계층 구조를 반드시 준수해야 합니다: `app` → `widgets` → `features` → `entities` → `shared`

```
src/
├── app/                    # Next.js App Router (라우팅, 레이아웃, 프로바이더)
│   ├── (route)/            # 페이지 라우트 (about, posts, projects, tags)
│   ├── providers/          # React 컨텍스트 프로바이더 (ThemeProvider)
│   ├── layout.tsx          # 루트 레이아웃 (폰트, 메타데이터, 분석 도구)
│   ├── globals.css         # 전역 CSS
│   ├── robots.ts           # SEO robots 설정
│   └── sitemap.ts          # 동적 사이트맵 생성
│
├── widgets/                # 독립적인 대형 UI 섹션
│   ├── header/             # 사이트 전체 헤더
│   ├── CategorySidebar/    # 카테고리 내비게이션 사이드바
│   ├── post-list/          # 포스트 목록 위젯
│   └── external-links/     # 외부 링크 컴포넌트
│
├── features/               # 사용자 인터랙션 기능
│   └── mode-toggle.tsx     # 다크/라이트 모드 토글
│
├── entities/               # 비즈니스 엔티티
│   ├── post/               # 포스트 관련 로직 및 UI
│   │   ├── api/            # 포스트 관련 Supabase API 호출
│   │   ├── ui/             # 포스트 전용 UI 컴포넌트
│   │   └── styles/         # 포스트 전용 스타일 (예: 코드 하이라이팅)
│   ├── category/           # 카테고리 관련 로직
│   ├── tag/                # 태그 관련 로직
│   ├── about/              # 어바웃 페이지 엔티티
│   └── project/            # 프로젝트 페이지 엔티티
│
└── shared/                 # 재사용 가능한 원시 요소 (비즈니스 로직 없음)
    ├── lib/                # 유틸리티 함수 (cn, 날짜 포맷 등)
    ├── supabase/           # Supabase 클라이언트 및 타입 정의
    ├── types/              # 전역 TypeScript 타입
    └── ui/                 # 범용 재사용 가능한 UI 컴포넌트
```

---

## 핵심 규칙 및 제약사항

### 레이어 의존성 규칙 (FSD)

- **하위 레이어는 절대 상위 레이어를 import해서는 안 됩니다.**
  - (가능) `entities/post`는 `shared/`에서 import 가능
  - (불가) `shared/`는 `entities/`나 `widgets/`에서 import 불가
  - (불가) `entities/`는 `features/`나 `widgets/`에서 import 불가
- 각 레이어는 자신보다 **아래에 있는** 레이어에서만 import 해야 합니다.

### Supabase

- 반드시 공유 Supabase 클라이언트를 사용합니다: `import { supabase } from "@/shared/supabase"`
- `src/shared/supabase/supabase.ts` 외부에서 새로운 Supabase 클라이언트를 **절대 생성하지 않습니다.**
- 모든 Supabase 스키마 타입 (`Post`, `Category`, `Tag` 등)은 `src/shared/supabase/supabase.ts`에 정의되어 있습니다.
- Supabase Storage에 저장된 이미지는 `atdzilbcixdjgtubodtv.supabase.co`에서 제공됩니다.

### 이미지

- `<img>` 태그 대신 항상 Next.js `<Image>` 컴포넌트를 사용합니다.
- 외부 이미지 도메인은 반드시 `next.config.js`의 `images.remotePatterns`에 등록해야 합니다.
- OG 이미지는 `public/metadata/`에 위치합니다.

### 스타일링

- 모든 스타일링에 **Tailwind CSS**를 사용합니다.
- 다크 모드는 `next-themes`의 `class` 전략으로 활성화 — `dark:` 변형 클래스를 사용합니다.
- 조건부 클래스 병합 시 `@/shared/lib`의 `cn()` 유틸리티를 사용합니다. (`clsx` + `tailwind-merge` 조합)
- 꼭 필요한 경우가 아니면 인라인 스타일을 작성하지 않습니다.
- Tailwind 클래스 순서는 `prettier-plugin-tailwindcss`가 자동 관리합니다 — 수동으로 재정렬하지 않습니다.

### TypeScript

- TypeScript 사용은 **필수** — `any` 타입은 절대 사용하지 않습니다.
- 모든 컴포넌트 props에는 명시적인 타입 정의가 필요합니다.
- 객체 형태에는 `interface`, 유니온 및 별칭에는 `type`을 사용합니다.

### 컴포넌트

- 컴포넌트 파일은 **PascalCase** 사용 (예: `PostCard.tsx`)
- 유틸리티/훅 파일은 **camelCase** 사용 (예: `formatDateKoreanYMD.ts`)
- 각 컴포넌트 폴더에는 해당하는 경우 `index.ts` 배럴 export를 추가합니다.

### 환경 변수

- 소스 코드에 환경 변수나 시크릿을 **절대 하드코딩하지 않습니다.**
- 필수 환경 변수:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `NEXT_PUBLIC_GA_ID`

---

## 개발 명령어

```bash
# 개발 서버 시작 (Turbopack)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 빌드 로컬 미리보기
npm run preview

# 프로덕션 서버 시작
npm start
```

> 이 프로젝트에는 테스트 스크립트가 설정되어 있지 않습니다. 명시적으로 요청받지 않는 한 테스트 파일을 추가하지 않습니다.

---

## Prettier 설정

```json
{
  "semi": true,
  "singleQuote": false,
  "trailingComma": "es5",
  "printWidth": 100,
  "tabWidth": 2,
  "endOfLine": "lf",
  "bracketSpacing": true,
  "jsxSingleQuote": false
}
```

모든 코드는 이 Prettier 설정을 준수해야 합니다.

---

## 라우팅 구조 (App Router)

| 라우트        | 경로            | 설명                         |
| ------------- | --------------- | ---------------------------- |
| 홈            | `/`             | 블로그 홈 / 포스트 목록      |
| 포스트 상세   | `/posts/[slug]` | 개별 포스트 페이지           |
| 태그별 포스트 | `/tags/[slug]`  | 태그로 필터링된 포스트 목록  |
| 프로젝트      | `/projects`     | 포트폴리오 / 프로젝트 페이지 |
| 어바웃        | `/about`        | 자기소개 페이지              |

---

## 절대 하면 안 되는 것들

- `any` TypeScript 타입 사용 금지
- 프로덕션 코드에 `console.log` 남기기 금지
- 상위 FSD 레이어에서 import 금지 (예: `shared`가 `entities`에서 import)
- `src/shared/supabase/supabase.ts` 외부에서 새 Supabase 클라이언트 생성 금지
- `<img>` 태그 사용 금지 — 항상 Next.js `<Image>` 컴포넌트 사용
- 환경 변수 값 하드코딩 금지
- Tailwind 클래스를 사용할 수 있는데 인라인 스타일 작성 금지
- Tailwind 클래스 수동 재정렬 금지 (`prettier-plugin-tailwindcss`가 처리)
- `next.config.js` 업데이트 없이 외부 이미지 도메인 사용 금지
- PR 설명, 코멘트, 커밋 메시지 본문을 영어로 작성 금지

---

## SEO 가이드라인

- 모든 페이지에는 적절한 `metadata` export가 있어야 합니다. (title, description, openGraph)
- 페이지 제목에는 템플릿 패턴을 사용합니다: `"%s | 지권"`
- OG 이미지 크기: `1200x630`
- `robots.ts`와 `sitemap.ts`는 앱 루트에 위치하며 SEO 파일을 자동 생성합니다.

---

## 커밋 컨벤션

```
feat:     새로운 기능 추가
fix:      버그 수정
style:    스타일/포맷 변경 (기능 변경 없음)
refactor: 코드 리팩토링
docs:     문서 수정
chore:    빌드 설정, 패키지 업데이트 등
```

커밋 메시지 예시:

```
feat: 태그별 포스트 필터링 기능 추가
fix: 다크 모드 전환 시 깜빡임 현상 수정
```
