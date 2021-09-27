## 프로젝트
React와 MobX 사용하여 만든 영화사이트입니다.

<br />
> 아래 링크에서 프로젝트 데모 확인이 가능합니다. <br />
https://isu-mobx-movie.netlify.app/

<br />

#### 사용기술
- HTML5 / CSS3
- React
- React Hooks
- MobX
- SCSS(BEM 활용)

<br />
<hr />
<br />


### ⚡ 배경화면 전환
![Animation1](https://user-images.githubusercontent.com/29578054/132247220-02c06dcc-9d8a-469f-93f1-c0140fe4a4a0.gif)
<br />
onMouseOver 이벤트 시, store의 movieBg를 변경함으로써 구현했습니다.
<br />

### ⚡ 메뉴 선택
![Animation2](https://user-images.githubusercontent.com/29578054/132247245-cef82aea-de36-45d4-9fe4-334c6fb3f104.gif)
<br />
Material-UI로 헤더를 구현했습니다.
<br />

### ⚡ 검색기능
![Animation3](https://user-images.githubusercontent.com/29578054/132247268-aeb68ee8-54b0-4be2-92a8-bdcee59d6208.gif)


### ⚡ 영화 상세정보 확인
![Animation11_2](https://user-images.githubusercontent.com/29578054/132248844-8f59f343-4bf2-4d28-b827-cbdc27ce2c9c.gif)


### ⚡ 영화 트레일러 확인
![Animation5](https://user-images.githubusercontent.com/29578054/132247873-df8251c6-cb68-4302-bda8-8fe72de014f7.gif)
<br />
store의 movieTrailerKey를 활용하였고, iframe 통해 구현했습니다.
<br />

### ⚡ 반응형 웹
![모바일웹](https://user-images.githubusercontent.com/29578054/131370459-7d002d89-7f6c-4bc4-a7b0-9a8537fee29a.PNG)
<br />
데스크탑, 아이패드, 모바일 순으로 반응형 웹을 구현하였습니다.
<br />
<br />
<br />

### 🌵 후기

이번 프로젝트에서는 Redux 말고 MobX를 통해 상태관리를 해보고자 프로젝트를 시작해보았습니다.<br />
MobX를 공부하면서 직접 경험해보니<br />
MobX는 불변성을 반드시 유지할 필요가 없었고, 코드가 생각보다 간결하고 쉽게 개발할 수 있었습니다.<br />
또한, 비동기 동작 액션을 실행시키기 위해 thunk 등의 미들웨어가 불필요하다는 것을 알 수 있었으며<br />
React 함수형으로 개발을 진행하면서 hooks를 사용중이었는데<br />
mobx-react 라이브러리를 통해, decorators(@action, @observable) 없이도 프로젝트를 완성할 수 있었습니다.<br />
이번 경험으로 규모가 작은 프로젝트 같은 경우는, <br />
Redux 말고도 MobX 또한 상태관리를 위해 알맞다고 느낄 수 있었습니다.<br />
<br />
<br />
<br />
<br />
