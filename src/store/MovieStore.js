import { observable } from 'mobx';
import axios from 'axios';
import _ from 'lodash';


const store = observable({
  movieList: [], // 메인 영화 리스트
  isMovieLoded: false, // 영화가 로드되었는지 체크
  sortMethod: '', // 소트 방법
  sortMethodName: '현재 상영중인 영화', // 소트 이름
  movieBg: '', // 메인 bg
  isMovieSelected: false, // 영화가 선택되었는지 체크
  selectedMovie: [], // 선택된 영화
  searchWord: '', // 검색어
  searchWordFix: '',
  recommendedMovie: [], // 추천 영화
  recommendCount: 3, // 추천영화 갯수
  movieTrailer: [], // 트레일러
  movieTrailerKey: '',
  isExisTrailer: false,
  isShowTrailer: false,

  credits: [],
  director: '',
  cast: [],
  castCount: 3,

  getApi(sortPram){
    // API 불러오기
    let SORT = '';
    const NOW_PLAYING = '/movie/now_playing';
    const TRENDING = '/trending/movie/week';
    const TOP_RATED = '/movie/top_rated';
    const UPCOMING = '/movie/upcoming';
    const searchKeyword = '&query=' + this.searchWordFix;
    const SEARCH = '/search/movie';
    const DEFAULT_URL = 'https://api.themoviedb.org/3';
    const API_KEY = '?api_key=cd966d78c5d6f111808969f4fa31cf71';
    const LANGUAGE_KR = '&language=ko-KR';

    if ( sortPram == '0') {
      // 현재상영중
      SORT = NOW_PLAYING;
      this.sortMethodName = '현재 상영중인 영화';
    }
    else if ( sortPram == '1' ) {
      // 최근 인기있는 영화
      SORT = TRENDING;
      this.sortMethodName = '최근 인기있는 영화'
    }
    else if (sortPram == '2') {
      // 고득점 영화
      SORT = TOP_RATED;
      this.sortMethodName = '최근 평점높은 영화'
    }
    else if (sortPram == '3') {
      // 최신 영화
      SORT = UPCOMING;
      this.sortMethodName = '최근 개봉 & 예정 영화'
    }
    else if (sortPram == '4') {
      // 검색
      SORT = SEARCH;
      this.sortMethodName = this.searchWordFix + ' 키워드로 검색한 영화'

      return axios.get(DEFAULT_URL + SORT + API_KEY + LANGUAGE_KR + searchKeyword)
        .then (response => response.data)
        .catch(err => console.log(err))
    }

    return axios.get(DEFAULT_URL + SORT + API_KEY + LANGUAGE_KR)
      .then (response => response.data)
      .catch(err => console.log(err))
  },

  async getMovies(sortPram){
    // 영화 리스트 불러오기
    const movies = await this.getApi(sortPram);

    if ( movies == undefined ) {
      this.setSearchFailed();
    } else {
      this.setMovie(movies.results);
      this.setSearchSuccess();
      this.checkMovieLoad(this.movieList);
      this.changeMovieBg(this.movieList[0].backdrop_path);
    }
  },
  setMovie(movieData){
    // 영화리스트 동기화
    this.movieList = movieData;
  },
  checkMovieLoad(movieObj){
    // 영화 로딩 체크
    if ( !_.isEmpty(movieObj) ) return this.isMovieLoded = true;
    else return false;
  },
  setSearchSuccess(){
    // 검색 성공
    this.isSuccessSearch = true;
  },
  setSearchFailed(){
    // 검색 실패
    this.movieList = [];
    this.isSuccessSearch = false;
  },
  setSearchKeyword(keyword){
    // 키워드받아오기
    this.searchWord = keyword;
  },
  setKeywordFix(){
    // 받아온 키워드를 검색어로 설정
    this.searchWordFix = this.searchWord;
  },
  changeMovieBg(theMovieBg){
    // 메인 BG 영화리스트와 동기화
    this.movieBg = theMovieBg;
  },
  movieSelectToggle(){
    // 영화 선택시 화면전환 토글
    if ( !this.isMovieSelected ) this.isMovieSelected = !this.isMovieSelected;
  },
  setBgRestore(){
    // 메인BG 초기화
    this.changeMovieBg(this.selectedMovie.backdrop_path);
  },
  backHome(){
    // 뒤로가기
    this.isMovieSelected = false;
  },
  setClearSelectedMovie(){
    // 선택된 영화 초기화
    this.selectedMovie = {};
  },
  setRecommendCountRestore(){
    // 선택된 영화 더 불러오기 카운트 초기화
    this.recommendCount = 3;
  },
  setHideTrailer(){
    this.isShowTrailer = false;
  },
  upCastCount(){
    this.castCount += 8;
  },
  setShowTrailer(){
    this.isShowTrailer = true;
  },
  async getRecommendMovie(id){
    // 추천영화 동기화
    const rMovie = await this.callRecommendMovie(id);
    this.setRecommendMovie(rMovie.results);
  },
  recommendMore(){
    // 선택된 영화 더 불러오기
    this.recommendCount = this.recommendCount + 6;
  },
  async getDetailMovie(id){
    const sMovie = await this.callDetail(id);
    this.setDetailInfo(sMovie);
    // console.log(this.selectedMovie);
    this.getTrailer(id);
    this.getCredit(id);
  },
  callDetail(id){
    // 영화 선택시 디테일정보 호출
    const DEFAULT_URL = 'https://api.themoviedb.org/3';
    const API_KEY = '?api_key=dc11dbd0605b4d60cc66ce5e8363e063';
    const LANGUAGE_KR = '&language=ko-KR';
    const MOVIE_ID = '/movie/'+id;

    return axios.get(DEFAULT_URL + MOVIE_ID + API_KEY + LANGUAGE_KR)
      .then (response => response.data)
      .catch (err => console.log(err))
  },
  setDetailInfo(detailInfo){
    // 디테일정보 동기화
    this.selectedMovie = detailInfo;
  },
  async getTrailer(id){
    // 트레일러 동기화
    const trailer = await this.callTrailer(id);
    this.setTrailer(trailer.results);
    if ( this.movieTrailer.length > 0 ) {
      this.setTrueTrailer();
      this.movieTrailerKey = this.movieTrailer[0].key;
    } else {
      this.setFalseTrailer();
      this.movieTrailerKey = '';
    }
  },
  async getCredit(id){
    const credit = await this.callCredit(id);
    this.setCredits(credit);
    this.getDirector();
    this.getCast();
  },
  callTrailer(id){
    // 트레일러 호출
    const DEFAULT_URL = 'https://api.themoviedb.org/3';
    const API_KEY = '?api_key=dc11dbd0605b4d60cc66ce5e8363e063';
    const LANGUAGE_KR = '&language=ko-KR';
    const TRAILER_MOVIE_ID = '/movie/'+id+'/videos';

    return axios.get(DEFAULT_URL + TRAILER_MOVIE_ID + API_KEY + LANGUAGE_KR)
      .then (response => response.data)
      .catch (err => console.log(err))
  },
  callCredit(id){
    const DEFAULT_URL = 'https://api.themoviedb.org/3';
    const API_KEY = '?api_key=dc11dbd0605b4d60cc66ce5e8363e063';
    const LANGUAGE_KR = '&language=ko-KR';
    const CREDIT_MOVIE_ID = '/movie/'+id+'/credits';

    return axios.get(DEFAULT_URL + CREDIT_MOVIE_ID + API_KEY + LANGUAGE_KR)
      .then (response => response.data)
      .catch (err => console.log(err))
  },
  setTrailer(trailer){
    // 트레일러 동기화
    this.movieTrailer = trailer;
  },
  setTrueTrailer(){
    this.isExisTrailer = true;
  },
  setFalseTrailer(){
    this.isExisTrailer = false;
  },
  setCredits(creditObj){
    this.credits = creditObj;
  },
  getDirector(){
    const director = this.credits.crew.filter(obj => obj.job === 'Director');
    this.director = {
      name: director[0].name,
      path: director[0].profile_path
    };
  //   console.log(director[0].name);
  },
  getCast(){
    const cast = this.credits.cast.map(obj => obj);
    this.cast = cast;
  },
  setCastCountRestore(){
    this.castCount = 3;
  },
  callRecommendMovie(id){
    // 추천영화 호출
    const DEFAULT_URL = 'https://api.themoviedb.org/3';
    const API_KEY = '?api_key=dc11dbd0605b4d60cc66ce5e8363e063';
    const LANGUAGE_KR = '&language=ko-KR';
    const RECOMMEND_MOVIE_ID = '/movie/'+id+'/recommendations';

    return axios.get(DEFAULT_URL + RECOMMEND_MOVIE_ID + API_KEY + LANGUAGE_KR)
      .then (response => response.data)
      .catch (err => console.log(err))
  },
  setRecommendMovie(recommendations){
    // 추천영화 동기화
    this.recommendedMovie = recommendations;
  }
})

export default store;
