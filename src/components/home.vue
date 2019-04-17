<template>
  <div class="home">
    <mt-header class="header">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="container">
      <swiper :options="swiperOption" :not-next-tick="notNextTick" v-if="showSwiper" ref="swiper" >
        <swiper-slide class="banner-swiper" v-for="(item,index) of videoList" :key="index">
          <video webkit-playsinline="true" x5-playsinline=""
                 x5-video-player-type="h5" x5-video-player-fullscreen="" playsinline preload="auto"
                 :poster="item.cover" :src="item.url" :playOrPause="playOrPause" x-webkit-airplay="allow"
                 x5-video-orientation="portrait" @click="playvideo"  @ended="onPlayerEnded($event)"
                 @timeupdate = "updateTime"
                 loop="loop">
          </video>
          <!--<img v-show="isVideoShow" class="play" @click="playvideo" :src="item.cover"/>-->
          <!--&lt;!&ndash; 播放暂停按钮 &ndash;&gt;-->
          <div class="production_box">
            <div class="production_name">
              @抖音
            </div>
            <div class="production_des">
              年轻的时候要注意‘养生’，少玩手机多睡觉！少玩手机多睡觉！少玩手机多睡觉！切记少玩手机多睡觉！少玩手机多睡觉！少玩手机多睡觉！@ 抖音小助手
            </div>
          </div>

          <div class="tools_right">
            <div class="tools_r_li" @click="changeFollow(item,index)">
              <i class="iconfont icon-shoucang icon_right" :class="item.follow?'follow_active':''"></i>
              <div class="tools_r_num">28.1w</div>
            </div>
            <div class="tools_r_li" @click="changeShare">
              <i class="iconfont icon-iconfontforward icon_right"></i>
              <div class="tools_r_num">5.5w</div>
            </div>
          </div>
					<div v-show="iconPlayShow" class="play" @click="playvideo"></div>
        </swiper-slide>
      </swiper>
      
    </div>
    <!-- 底部作品描述 -->

    <div class="loading" ref="loading"></div>
    <footer>
      <div class="top">首页</div>
      <div class="my">我的</div>
    </footer>
    <div class="share_hover" v-show=""></div>
    <div class="share_box" :class="showShareBox?'share_active':''">
      <div class="share_tips">分享到</div>
      <ul class="share_ul">
        <li class="share_li pengyouquan_li">
          <i class="iconfont icon-pengyouquan pengyouquan"></i>
        </li>
        <li class="share_li">
          <i class="iconfont icon-weixin weixin"></i>
        </li>
        <li class="share_li" @click="copyUrl">
          <i class="iconfont icon-lianjie lianjie"></i>
        </li>
        <div class="clear"></div>
      </ul>
      <div class="share_cancel" @click="cancelShare">取消</div>
    </div>
  </div>
</template>

<script>
  import { Header } from 'mint-ui';

  export default {

    name: 'Home',
    data () {
      return {
				plagFlag:false,
        showSwiper:'true',
        notNextTick: true,
        swiperOption:{
          current:0,
          // autoplay: 3000,
          speed: 500,
          loop: true,
					play:0,
          freeMode:false,
          direction:'vertical',
          pagination : '.swiper-pagination',
          height:window.innerHeight,
					onTransitionStart(swiper){
						console.log('start')
						let video = document.querySelectorAll('video')[this.current]
						video.pause()
					},
          onTransitionEnd (swiper) {
						console.log('end')
            this.current=swiper.activeIndex
						let video2 = document.querySelectorAll('video')[this.current]
						video2.play()
						this.play++
          }
        },
        videoList: [{
          url: require('@/static/test1.mp4'),
          cover: require('@/static/test1.png'),
          follow:false,
        }, {
          url:  require('@/static/test2.mp4'),
          cover: require('@/static/test2.png'),
          follow:true,
        }, {
          url:  require('@/static/test3.mp4'),
          cover: require('@/static/test3.png'),
          follow:false,
        }, {
          url:  require('@/static/test4.mp4'),
          cover: require('@/static/test4.png'),
          follow:false,
        }],
        isVideoShow: true,
        playOrPause: false,
        videoTime:0,
        currentTime:-1,
        video: null,
        iconPlayShow: true,
        // isAndroid: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, // android终端
        // isiOS: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
        tabIndex:0,
        showShareBox:false
      }
    },
		watch:{
			'swiperOption.play':function(e){
				alert('aaa')
			}
		},
    computed:{
      swiper(){
        return this.$refs.swiper.swiper
      },
      percent(){
        return (this.currentTime/this.videoTime)*100 +'%'
      }
    },
    methods:{
      updateTime(e){
        this.currentTime = e.target.currentTime;
      },
      playvideo(){
        let video = document.querySelectorAll('video')[this.swiperOption.current]
        this.videoTime = video.duration;
        if (this.playOrPause) {
          video.pause()
          this.iconPlayShow = true
        } else {
          video.play()
          this.iconPlayShow = false
        }
        this.playOrPause = !this.playOrPause
      },
      copyUrl(){

      },
      //改变菜单
      changeTab(index){
        this.tabIndex =index
      },
      //改变收藏状态
      changeFollow(item,index){
        this.videoList[index].follow = !this.videoList[index].follow
      },
      //展示分享弹窗
      changeShare(){
        this.showShareBox=true
      },
      //取消分享
      cancelShare(){
        this.showShareBox=false
      },
    },
    watch:{
      currentTime(){
        let widthPercent = (this.currentTime/this.videoTime)*100
        this.$refs.loading.style.width=widthPercent+'%'
      },
			'swiperOption.play':function(e){
				if(e===1){
					return false
				}
				if(this.iconPlayShow === true){
					 this.iconPlayShow = false
				}
			}
    },
    mounted(){
      this.swiper.slideTo(1, 1000, true)
    },
    comments:{
      Header
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../comon/common.scss";
  .home{
    .header{
      position: fixed;
      z-index: 9999;
      background: transparent;
        .mint-button{
          color: white;
        }
    }
    .container{
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      margin: auto;
      overflow: hidden;
      .banner-swiper{
        width: 100%;
        height: 100%;
        overflow: hidden;
        .video_box{
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
          margin: auto;
        }
        video{
          width: 100%;
          height: 100%;
          object-fit: fill;
          /*object-position: 0 0;*/
        }




      }
      .play{
        background: url("../assets/play.svg") no-repeat ;
        background-size: 100% 100%;
        width:px2em(200);
        height: px2em(100);
        opacity: .4;
        position: absolute;
        right: 0;
        left: 0;
        margin: auto;

      }
    }
    .loading{
      height: 1px;
      width: 0%;
      background-color: white;
      position: absolute;
      bottom: px2em(70);
    }
    footer{
      border-top: 1px solid rgba(255,255,255,0.2);
      width: 100%;
      position: absolute;
      bottom: 0;
      display: flex;
      align-items: center;
      height: px2em(70);
      div{

        flex: 1;
        text-align: center;
        color: white;
        font-size: px2em(24);
      }

    }
    /* 点赞，转发 */
    .tools_right {

      z-index: 1001;
      position: relative;
      width: px2em(50);
      margin-left: 90%;
      right: 0;
      bottom: px2em(600)
    }

    .tools_r_li {
      margin-bottom: 20px;
      color: #fff;
      font-size: 14px;
    }

    .tools_r_li:last-child {
      margin-bottom: 0px;
    }

    .icon_right {
      margin-bottom: 5px;
      font-size: px2em(30);
      display: block;
      text-shadow: 0px 0px 10px #9d9d9d;
      /*transition: .5s;*/
    }

    .production_box {
      z-index: 1001;
      position: relative;
      /* right: 16px; */
      bottom: px2em(220);
      text-align: left;
      padding: 0 15px 15px 15px;
      color: #fff;
      width: 100%;
      left: 0;
      box-sizing: border-box;
      background: -webkit-linear-gradient(top, rgba(0,0,0,0.2),rgba(0,0,0,0)); /* Safari 5.1 - 6.0 */
      background: -o-linear-gradient(top, rgba(0,0,0,0.2), rgba(0,0,0,0)); /* Opera 11.1 - 12.0 */
      background: -moz-linear-gradient(top, rgba(0,0,0,0.2),rgba(0,0,0,0)); /* Firefox 3.6 - 15 */
      background: linear-gradient(to top, rgba(0,0,0,0.2), rgba(0,0,0,0)); /* 标准的语法 */
    }
    .production_name {
      font-weight: 700;
      font-size: 18px;
      margin-bottom: 10px;
    }

    .production_des {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      min-height: 62px;
    }
    .container_bottom{
      position: fixed;
      bottom:0;
      width: 100%;
      background: rgba(0,0,0,0.2);
      height: 60px;
      border-top: 1px solid rgba(255,255,255,0.7);
    }

    .production_top{
      display: inline-block;
      padding: 6px;
      margin-bottom: 5px;
      background: rgba(0,0,0,.3);
      border-radius: 6px;
      margin-top: 5px;
    }
    .product_go{
      color: #fbdd21;
    }
    .production_title{
      margin-left: 4px;
    }
    .bottom_tab{
      width: 50%;
      text-align: center;
      float: left;
      color: #c9c9c9;
      padding: 10px 0;
    }
    .bottom_tab_span{
      line-height: 38px;
      border-bottom: 2px solid transparent;
      font-weight: 600;
      font-size: 16px;
      display: inline-block;
      padding: 0 4px;
      transition: .5s all;
    }
    .tab_active .bottom_tab_span{
      border-bottom: 2px solid #fff;
      color: #fff;
    }
    .icon-shoucang{
      transition: .5s all;
    }
    .follow_active{
      color: #f44;
      animation: showHeart .5s ease-in-out 0s;
    }
    /*animation-name：用来调用@keyframes定义好的动画，与@keyframes定义的动画名称一致*/
    /*animation-duration ：指定元素播放动画所持续的时间*/
    /*animatino-timing-function ： 和transition中的transition-timing-function 中的值一样。根据上面@keframes中分析的animation中可能存在多个小动画，因此这里的值设置是针对每一个小动画所在时间范围内的属性变换速率。*/
    /*animation-delay：定义在浏览器开始执行动画之前等待的时间，这里是指整个animation执行之前的等待时间，而不是上面说的多个小动画*/
    /*animation-iteration-count：定义动画的播放次数，其通常为整数，默认是1,；取值为infinite，动画将无限次的播放。*/
    /*animation-direction：主要用来设置动画播放方向*/
    @keyframes showHeart {
      0%{
        color: #f44;
        transform: scale(1);
      }
      25%{
        color: #fff;
        transform: scale(0);
      }
      80%{
        color: #f44;
        transform: scale(1.5);
      }
      100%{
        color: #f44;
        transform: scale(1);
      }
    }
    /*分享样式*/
    .share_hover{
      position: fixed;
      display: none;

    }

    .share_box{
      position: fixed;
      bottom: -300px;
      width: 100%;
      z-index: 1002;
      background: #fff;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      transition: .5s;
    }
    .share_tips{
      text-align: center;
      line-height: px2em(50);
      color: #333;
    }
    .share_ul{
      box-sizing: border-box;
      padding: 0 px2em(30) px2em(75);
      border-bottom: 1px solid #e8e8e8;
    }
    .share_li{
      float: left;
      width: 33%;
      text-align: center;
    }
    .share_li i{
      font-size: 44px;
    }
    .share_cancel{
      text-align: center;
      line-height: 48px;
      color: #777;
      text-align: center;
    }
    .pengyouquan{
      color: #47D000;

    }
    .pengyouquan_li{
      animation: rotating 8s linear infinite
    }
    @keyframes rotating{
      from{transform:rotate(0)}
      to{transform:rotate(360deg)}
    }
    .weixin{
      color:#20CA2E;
    }
    .lianjie{
      color: #cdcdcd;
    }
    .share_active{
      bottom: 0px;
    }
  }

</style>
