스마일게이트 윈터데브캠프 인증 시스템
==================================

현재 프론트엔드 없이 기본적인 백엔드 기능만 구현한 상태입니다.
-------------------------
* 가입, 로그인, 유저 정보 업데이트
* 인증 서버 (현재 http 사용. 추후 https로 분리해야함)
* 비밀번호 암호화
***
추가로 구현해야 하는 기능
-----------------
* 프론트엔드 페이지
* 캐시 (Redis)
* E-Mail 인증
* 비밀번호 찾기
***

기술스택
--------
* Nest JS
* PostgreSQL
* jwt
***

확인받고 싶은 부분 (만든 게 거의 없어서 리뷰는 나중에 한꺼번에 부탁드리겠습니다...)
-----------------
1. MSA 구조를 지향하며 만들었는데 제대로 적용한 건지 궁금합니다. MSA 구조가 아니라면 어떻게 해야하는지도 궁금합니다.

개발 관련해서 궁금한 부분
-------------------------
1. Nest JS 공식문서에서 https 서버에 관한 내용을 보면 아래와 같이 나와있습니다.
```
const httpsOptions = {
  key: fs.readFileSync('./secrets/private-key.pem'),
  cert: fs.readFileSync('./secrets/public-certificate.pem'),
};

const server = express();
const app = await NestFactory.create(
  AppModule,
  new ExpressAdapter(server),
);
await app.init();

http.createServer(server).listen(3000);
https.createServer(httpsOptions, server).listen(443);
```
저 코드를 넣고 실행시키면 fs.readFileSync() 부분에서 디렉토리를 찾을 수 없다는 오류가 발생하는데 그 이유가 궁금합니다.
***
2. 인증을 수행할 때 쓰는 Guard는 라우팅 전에 작동하는 미들웨어로 알고 있습니다. 이 Guard를 사용하는 이유가 궁금합니다.
```
@UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }
```
***
3. Redis에 저장한 정보를 어떻게 사용해야하는지 궁금합니다. 
   지금은 Redis에서 찾은 값을 프론트엔드로 보내서 브라우저 쿠키에 이용하는 식으로 이해하고 있는데 이게 맞을까요?
