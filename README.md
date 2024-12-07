# 🍞 TimeToast (타임토스트) - 흩어지는 기억을 담는 나만의 토스트

**👐🏻 TimeToast는 기록의 목적인 “보존”과 “전달”을 가능하게 하며, 지속적인 공유가 가능한 추억 아카이빙 서비스입니다.**

<!-- ![readme-thumbnail](https://github.com/user-attachments/assets/d39abe73-3896-4957-99bd-cd7d6aad5852) -->
![img](https://github.com/user-attachments/assets/d9a14333-f9f6-41f5-96ae-9d5727014dc3)

<br>

- Github URL: https://github.com/cherrywajelly

<br>
  

## 👥 **Team-cherry wa jelly**

**👩‍👩‍👧‍👦 R&R**

| 학번 | 이름 | 포지션 |
| --- | --- | --- |
| 201920756 | 이장원 | 🔦 DevOps, Frontend |
| 202020735 | 이예인 | 📱 Backend |
| 202021138 | 이채민 | 💻 Frontend |
| 202126863 | 정문영 | 🖥️ Backend |

<br>

## **🔎 서비스 소개**

### 💡 목적 및 필요성
기존 SNS 플랫폼은 순간을 공유하는 단기적인 기록에 초점을 둬, 기록의 일회적 소비에 그치는 편입니다. 또한 여러 사용자가 같은 기록물에 유기적으로 글을 작성하고 관리하기 어려워, 기록의 핵심 목적인 <b>“보존"</b>과 <b>“전달"</b>을 충족하지 못합니다. 이에 기록의 본질적인 목적을 달성할 수 있는, <b>“지속적인 공유가 가능한 추억 아카이빙 서비스 : TimeToast”</b>를 제안하고자 합니다.

<br>


### 🗂️ 핵심 기능

![slide2](https://github.com/user-attachments/assets/cacc47ce-a0e5-41e9-a149-6a7f2bbbb6b8)
![slide3](https://github.com/user-attachments/assets/2b4c1d35-447b-49ee-9a9f-d1e3d175bd7c)
![slide1](https://github.com/user-attachments/assets/874fb9eb-77b9-41aa-8e14-847f1e0977d2)


### 🗣️ 유저 persona

![Slide 16_9 - 79](https://github.com/user-attachments/assets/dd5e915b-e4c7-4571-b306-d7357756f42a)
![Slide 16_9 - 81](https://github.com/user-attachments/assets/307b610f-4e3b-4939-bb29-674388713bd6)
![Slide 16_9 - 98](https://github.com/user-attachments/assets/fe3582af-e5c2-4d8d-9c99-4c0a27137e27)

<br>

## **🏛 Architecture**

### **📜 ERD 설계도**

<img width="888" alt="스크린샷 2024-11-21 오후 7 54 52" src="https://github.com/user-attachments/assets/825e0c03-1c8c-4933-b09e-77cf87eedbb6">

### **☁ 클라우드 인프라**

![infra](https://github.com/user-attachments/assets/7dee919e-2b4d-44a3-baf1-e2a2191447c5)

### **🔄 CI/CD**

![CICD](https://github.com/user-attachments/assets/7e91ee40-07bb-4655-b0a8-1e6cae97fb57)

<br>

## **🔄 CI/CD 파이프라인**

### **📝 Pull Request**

1. Notify Trigger
    1. Notify Trigger

    2. Create Thread

2. Fetch Application
    1. Git Clone

3. Test Application
    1. Test Application

4. Notify Results
    1. Notify Results

### **✅ Merge Approve**

1. Notify Trigger
    1. Notify Trigger

    2. Create Thread

2. Fetch Application
    1. Git Clone

3. Build Push Image
    1. Create DotEnv

    2. Build Push Image
    
4. Fetch Manifest
    1. Git clone

5. Update Manifest
    1. Update Manifest

    2. Upload Manifest

6. Notify Results
    1. Notify Results

### **❌ Merge Reject**

1. Notify Trigger
    1. Notify Trigger

    2. Create Thread

2. Notify Results
    1. Notify Results

### Description

- Notify Trigger - GitHub의 동작을 통해 어떤 파이프라인이 작동되었는지 Slack으로 알림을 전송합니다.

- Create Thread - 해당 파이프라인 작동에 대해 의견을 나눌 수 있도록 Thread를 생성합니다.

- Fetch Application - Application에 대해 작업을 할 수 있도록 Application Repository를 Clone합니다.

- Create DotEnv - Next.js와 React.js에서 환경변수를 주입하기 위해 Kubernetes Secret으로부터 환경변수를 읽어와 .env 파일을 생성합니다.

- Build Push Image - 컨테이너 빌드 도구 중 Buildah를 사용해 컨테이너를 빌드하고 Container Registry에 Push합니다.

- Fetch Manifest - Manifest를 변경하기 위해 Manifest Repository를 Clone합니다.

- Update Manifest - Build한 이미지의 태그로 Deployment에서 요구하는 이미지를 변경합니다.

- Upload Manifest - 수정사항을 Manifest Repository에 적용시키고 ArgoCD에 Webhook을 보내 Kubernetes Cluster에 배포합니다.

- Notify Results - 파이프라인 작동 결과 보고서를 Slack으로 전송합니다. 만약 파이프라인 실행 도중 실패한 작업이 있다면 실패했음을 알립니다.

<br>

## **💻 Technology**

### 🖥️ Frontend

<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/> <img src="https://img.shields.io/badge/Recoil-3578E5?style=for-the-badge&logo=recoil&logoColor=white"/> <img src="https://img.shields.io/badge/PWA-571DC2?style=for-the-badge&logo=pwa&logoColor=white"/> <img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=next.js&logoColor=white"/> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"/> <img src="https://img.shields.io/badge/yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white"/> <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/> <img src="https://img.shields.io/badge/tanstack%20query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"/> <img src="https://img.shields.io/badge/jest-C21325?style=for-the-badge&logo=jest&logoColor=white"/>

### 📀 Backend

<img src="https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white"/> <img src="https://img.shields.io/badge/Spring%20Security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white"/> <img src="https://img.shields.io/badge/Spring%20Data%20JPA-6DB33F?style=for-the-badge&logoColor=white"/> <img src="https://img.shields.io/badge/Spring%20REST%20Docs-6DB33F?style=for-the-badge&logoColor=white"/> <img src="https://img.shields.io/badge/QueryDSL-3399FF?style=for-the-badge&logoColor=white"/> <img src="https://img.shields.io/badge/Gradle-02303A?style=for-the-badge&logo=gradle&logoColor=white"/> <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white"/> <img src="https://img.shields.io/badge/OAuth2-0088FF?style=for-the-badge&logo=OAuth&logoColor=white"/> <img src="https://img.shields.io/badge/Testcontainers-4da4b2?style=for-the-badge&logoColor=white"/> <img src="https://img.shields.io/badge/JaCoCo-751b0d?style=for-the-badge&logoColor=white"/>

### 💻 Infra
<img src="https://img.shields.io/badge/Oracle-F80000?style=for-the-badge&logo=oracle&logoColor=white"/> <img src="https://img.shields.io/badge/tekton-FD495C?style=for-the-badge&logo=tekton&logoColor=white"/> <img src="https://img.shields.io/badge/argocd-EF7B4D?style=for-the-badge&logo=argo&logoColor=white"/> <img src="https://img.shields.io/badge/prometheus-E6522C?style=for-the-badge&logo=prometheus&logoColor=white"/> <img src="https://img.shields.io/badge/grafana-F46800?style=for-the-badge&logo=grafana&logoColor=white"/> <img src="https://img.shields.io/badge/cloudflare-F38020?style=for-the-badge&logo=cloudflare&logoColor=white"/> <img src="https://img.shields.io/badge/kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white"/> <img src="https://img.shields.io/badge/helm-0F1689?style=for-the-badge&logo=helm&logoColor=white"/> <img src="https://img.shields.io/badge/fluent%20bit-49BDA5?style=for-the-badge&logo=fluent%20bit&logoColor=white"/>

### 💾 DB
<img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white"/> <img src="https://img.shields.io/badge/H2-004080?style=for-the-badge&logoColor=white"/>

### 🤝🏻 Co-working Tool

<img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"/> <img src="https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white"/> <img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white"/> <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white"/> <img src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white"/> <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white"/> <img src="https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white"/>

<br>

## 기술 스택 선정 이유

### 📘 Frontend

| Tech | Description |
| --- | --- |
| Next.js | SEO 향상기본적으로 React는 Client Side Rendering(CSR)을 사용하여 SEO에 취약하다는 단점이 있습니다.이를 보완하기 위하여 pre-rendering을 통해 Server-Side Rendering(SSR)을 가능하게 하는 React 프레임워크인 Next.js를 사용하여 성능을 향상시키고자 하였습니다. |
| React | 어드민 페이지에선 CSR로 빠른 렌더링을 제공하는 것이 좋다고 판단되어 React 라이브러리를 선정하였습니다. 이는 사용자 인터페이스를 만들기 위한 강력하고 유연한 JavaScript 라이브러리로서, 컴포넌트 기반 아키텍처와 가상 DOM을 통해 빠른 렌더링을 제공합니다. 모듈 개발 컴포넌트 재사용성과 가독성이 뛰어나며, 커뮤니티와 생태계가 크기 때문에 문제 해결이나 모듈 개발에 도움이 되기에 React로 선정하였습니다. |
| TypeScript | 코드 안정화 TypeScript는 정적 타입 언어로, 코드를 더 안정적으로 만들고 개발자 사이의 협업을 용이하게 해줍니다.생산성컴파일 단계에서 에러를 발견하여 런타임 오류를 방지하며, 코드 힌트와 자동 완성을 제공하여 개발 생산성을 높여주는 장점이 있어 TypeScript를 선정하게 되었습니다. |
| Yarn | Yarn은 JavaScript 패키지 매니저로, 빠른 속도 및 높은 신뢰성과 보안성을 제공하여 효율적인 프로젝트 관리가 가능합니다. |
| Tanstack-Query | 효율적인 Data Fetching 및 관리데이터 캐싱 등의 기능을 존재하여 불필요한 데이터 요청을 줄일 수 있습니다. |
| TailwindCSS | 개발의 편의성 HTML과 CSS 파일을 별도로 개발 및 관리할 필요가 없기 때문에 개발하기에 편리하고, 랩핑하는 각 태그의 클래스명을 고민할 시간을 절약할 수 있어 빠른 개발이 가능합니다. |
| Recoil | Recoil은 React 애플리케이션의 상태 관리를 간단하게 만드는 라이브러리로, 컴포넌트 간 데이터 공유를 용이하게 합니다. 중앙 상태 관리 패턴과 비교했을 때 코드의 복잡성을 줄이며, 복잡한 상태 관리를 쉽게 구현할 수 있다는 점이 메리트가 있어 상태 관리 라이브러리로 Recoil을 선정하였습니다. |

### 📀 Back-end

| Tech | Description |
| --- | --- |
| springboot | 간편하게 Spring Framework를 사용하여 개발의 생산성을 높이고자 선정하였습니다. |
| java 17 | 장기 지원이 보장되면서도 비교적 최신 기능들을 제공하여 비교적 안정적으로 성능 개선을 할 수 있다는 장점이 있습니다. 또한 Spring Boot 3.0.x 이후의 버전부터는 Java 17 이상을 요구하기 때문에, 최신 스프링 부트 프로젝트에서는 Java 17을 사용해야 하기에 선정하였습니다. |
| gradle | 빌드 도구 중 편리한 의존성 관리와 유연한 확장, 빠른 빌드 속도를 장점으로 가지고 있어 선정하였습니다. |
| MySQL | 서비스가 RDBMS와 더 적합하다고 생각하였습니다. 그래서, 오픈 소스 기반의 RDBMS로 비용과 안정성 측면에서 장점이 있고, Backend 개발자 모두 개발 경험이 있는 MySQL을 선정하였습니다. |
| Spring Data JPA | 서비스에 RDBMS를 사용하기 때문에, ORM 기술을 활용하여 생산성을 높이기 위해 Spring Data JPA를 선정하였습니다. |
| Spring security | 사용자의 인증과 권한 관리를 효과적으로 하여 보안 위협으로부터 보호하기 위해 선정하였습니다. |
| JWT | Json 객체에 정보를 저장하고 있는 토큰으로, 유저 인증/인가를 위해 선정하였습니다. |
| Oauth2 | 신뢰할 수 있는 외부 어플리케이션의 open API를 활용하여 권한 인증을 하는 표준 프로토콜로, 카카오, 구글 소셜 로그인 기능 구현을 위해 선정하였습니다. |
| Testcontainers | JUnit을 지원하는 Java 라이브러리로, Docker container 기반으로 DBMS 이미지를 통해 일회용 인스턴스를 활용한 test가 가능해 선정하였습니다. |
| JaCoCo | Java의 테스트 커버리지를 측정하기 위한 오픈소스 도구로, 코드의 완성도를 판단하기 위해 선정하였습니다. |
| Spring Rest Docs + Swagger | 테스트 코드를 기반으로 한 문서 자동화 도구로, 신뢰성 있는 API 명세와 테스트를 위해 선정하였습니다. |
| 결제 | Kakao의 OPEN API를 활용하여, kakaopay 결제 구현하였습니다. |

### 💻 **DevOps**

| Tech | Description |
| --- | --- |
| Kubernetes | 컨테이너로 서버를 실행하는 환경에서 컨테이너를 오케스트레이션하기 위해 사용합니다. |
| ArgoCD | SSOT 기반으로 GitOps 패턴을 적용하여 매니페스트를 관리해 애플리케이션을 자동으로 동기화하고 배포하기 위해 사용합니다. |
| Tekton | 쿠버네티스 네이티브하게 동작하는 CI도구로 컨테이너에서 실행되는 쉘스크립트까지 제어할 수 있기 때문에 사용합니다. |
| Git | 하나의 레포지토리에서 작업할 때 브랜치를 통해 작업 공간을 분리하고 작업 결과를 올리기 위해, 코드의 버전 관리를 위해 사용합니다. |
| GitHub | Issue, Pull Request, Merge 등 Git CLI로 하기 힘든 작업을 GUI의 도움을 받아 편하게 하기 위해 사용합니다. |
| Buildah | CI/CD 환경에서 컨테이너를 빌드하기 위해 docker가 아닌 다른 컨테이너 빌드 도구를 사용합니다. |
| Helm | 다양한 환경에서 배포되는 yaml 파일들을 관리하고 인프라 구성을 일관되게 관리하기 위해 사용합니다. |
| Prometheus | 하드웨어나 애플리케이션에서 메트릭 정보를 수집하고 가공하기 위해 사용합니다. |
| Grafana | 메트릭과 로그 정보를 시각화하여 보여주기 위해 사용합니다. |
| Loki | Fluent Bit로부터 받은 로그들을 가공하기 위해 사용합니다. |
| Fluent Bit | 애플리케이션으로부터 로그를 추출하는 agent로 사용합니다. |
| Oracle | Virtual Machine, Load Balancer, Container Engine For Kubernetes, Object Storage 등의 서비스를 사용합니다. |
| Config Syncer | 쿠버네티스에서 다른 네임스페이스로 Config Map, Secret을 공유하기 위해 사용합니다. |
| Sealed Secrets | Base64로 인코딩된 Secret의 값을 암호화하기 위해 사용합니다. |
| Cloudflare | DNS 도메인을 등록하기 위해 사용합니다. |

### ⛏️ **Business Tools**

| Tech | Description |
| --- | --- |
| Slack | 모니터링 정보와 CI/CD 파이프라인의 실행에 대한 정보를 받아오기 위해서 사용합니다. |
| Google Docs | Google Docs는 실시간으로 문서 작성 및 편집이 가능한 클라우드 기반 협업 도구로, 여러 사용자가 동시에 작업할 수 있어 팀 협업에 매우 유용합니다. 자동 저장 기능을 통해 데이터 유실 위험이 없으며, 어디서든 인터넷만 있으면 접근이 가능하다는 장점이 있어 주 툴로 선정하였습니다. 또한, Google Workspace와의 연동을 통해 문서 공유, 댓글 달기, 제안 모드 등 팀 간의 원활한 피드백과 효율적인 협업을 지원하기에 적극 활용할 예정입니다. |
| Notion | Notion은 다양한 문서 관리와 협업 기능을 제공하는 올인원 워크스페이스로, 팀 프로젝트의 생산성과 효율성을 크게 향상시킵니다. 직관적인 UI로 빠르게 문서를 생성하고 공유할 수 있으며, 태스크 관리, 일정 조율 등 여러 협업 도구를 한 플랫폼에서 통합 관리할 수 있다는 장점이 있습니다. 특히, 데이터베이스 기능을 활용해 프로젝트의 변화나 진척 상황을 체계적으로 기록하고 추적할 수 있어, 팀원 간의 원활한 소통과 정보 공유에 용이하여 노션을 적극적으로 사용하고자 합니다. |
| Figma | Figma는 인터페이스 디자인을 위한 협업 툴로, 기획을 위한 브레인스토밍, 기획 발표 자료 제작과 와이어프레임 및 서비스 인터페이스 디자인을 통합적으로 관리 및 협업하기 위해 선정하였습니다. |

### ⌨️ **외부 API**

| Tech | Description |
| --- | --- |
| FCM | FCM(Firebase Cloud Messaging)은 안정적인 푸시 알림 전송을 위해 많이 사용되는 외부 API로, Google의 클라우드 인프라를 기반으로 빠르고 확실한 메시지 전송이 가능합니다. 또한 다양한 플랫폼을 지원하며, 서버 설정이 간편하고 확장성이 뛰어나 프로젝트 규모에 관계없이 손쉽게 통합할 수 있습니다. |
| Slack | Slack App을 통해 채널에 메시지 전송, 스레드 생성의 동작을 하는 API를 사용합니다. |

<br>

## 🔖 Naming Rules

### 🖥️ Frontend

- **Folder**: `kebab-case`
- **File**: `PascalCase`
- **Component**: `PascalCase`
- **Constant**: `SCREAMING_SNAKE_CASE`
- **Variable**: `camelCase`
- **State(atom, recoil)**: `camelCaseState`
- **Interface**
    - **props**: `PascalCaseProps`
    - **api response**: `camelCaseProps`

### 🖥️ Backend

- **Package** : `kebab-case`
- **Class** : `PascalCase`
- **Constant** : `UPPERCASE`
- **Method** : `camelCase`
- **Variables** : `camelCase`

<br>

## **🗂️ Commit Convention**

| Header | 기능 |
| --- | --- |
| 🌈  Update | 변경 사항 업데이트 |
| 📍  feat | 새로운 기능 추가 |
| 🔨  fix | 버그 수정 |
| 📝  docs | 문서 수정 |
| 🎨  style | 코드 포멧팅 |
| 🤖  refactor | 코드 리팩토링 |
| ✅  test | 테스트 코드 |
| 🚚  chore | 빌드 업무 수정, 패키지 매니저 수정 |
| 💬  comment | 주석 추가 및 변경 |
| ✂️  remove | 파일, 폴더 삭제 |
| 🔧  rename | 파일, 폴더명 수정 |

<br>

## **🐬 Git Flow**

<img width="738" alt="gitflow" src="https://github.com/Team-baebae/29th_Semi_README/assets/113423517/69f432a8-3764-4cbe-9f62-81372ebe13d0">

- **`main`** : 출시 가능한 프로덕션 코드의 브랜치
- **`dev`** : 다음 버전을 개발하는 브랜치
- **`feat`** : 이슈 단위로 기능을 개발하는 브랜치
    - 브랜치 네이밍 : `feat/#이슈번호/[topic]`
- **`fix`** : 이슈 단위로 버그를 수정하는 브랜치
    - 브랜치 네이밍: `fix/#이슈번호/[topic]`

| Header | 기능 |
| --- | --- |
| 📍  main | 최종 배포할 서비스 내용의 브랜치 |
| 🔨  dev | 주요 개발 브랜치, 이 브랜치를 기준으로 각자 작업한 기능을 merge |
| 📝  feat | 기능 개발 브랜치, 개발이 완료 시 dev 브랜치에 merge |
| 🎨  test | 테스트 코드 개발 브랜치, 개발 완료 시 dev 브랜치에 merge |
