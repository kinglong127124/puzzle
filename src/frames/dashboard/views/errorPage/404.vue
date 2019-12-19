<template>
  <div class="errorPage404-container">
    <div class="page404">
      <div class="bullshit">
        <div class="bullshit__oops">啊哦！让页面飞一会儿....</div>
        <div class="bullshit__info">请检查您输入的网址是否正确，请点击以下按钮返回首页，谢谢！</div>
        <router-link to="/" class="bullshit__return-home">返回首页</router-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Page404',
  computed: {
    message() {
      return '未找到页面......';
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .errorPage404-container {
    background: #7395FF;
    height: 100%;
  }
  .page404 {
  position: relative;
  top: 16%;
  width: 800px;
  height: 600px;
  padding: 0 50px;
  overflow: hidden;
  background: #7395FF url(../../assets/img/errorPage/404.png) no-repeat;
  margin: 0 auto;
  .bullshit {
    position: relative;
    float: left;
    width: 500px;
    padding: 30px 0;
    overflow: hidden;
    left: 18%;
    top: 64%;
    text-align: center;
    &__oops {
      font-size: 38px;
      font-weight: bold;
      line-height: 40px;
      color: #fff;
      margin-bottom: 20px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
    }
    &__info {
      font-size: 16px;
      line-height: 21px;
      color: #fff;
      opacity: 0;
      margin-bottom: 30px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.2s;
      animation-fill-mode: forwards;
    }
    &__return-home {
      display: block;
      float: left;
      width: 200px;
      height: 52px;
      background: #fff;
      border-radius: 100px;
      text-align: center;
      color: #7395FF;
      opacity: 0;
      font-size: 24px;
      line-height: 52px;
      cursor: pointer;
      margin-left: 30%;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.3s;
      animation-fill-mode: forwards;
    }
    @keyframes slideUp {
      0% {
        transform: translateY(60px);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
}
  @media screen and(max-height:768px ){
    .page404{
      top: 3%;
    }
  }
</style>
