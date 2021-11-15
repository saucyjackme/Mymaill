<template>
  <div class="wrapper">
    <ul class="content">
      <li>分类列表1</li>
      <li>分类列表2</li>
      <li>分类列表3</li>
      <li>分类列表4</li>
      <li>分类列表5</li>
      <li>分类列表6</li>
      <li>分类列表7</li>
      <li>分类列表8</li>
      <li>分类列表9</li>
      <li>分类列表10</li>
      <li>分类列表11</li>
      <li>分类列表12</li>
      <li>分类列表13</li>
      <li>分类列表14</li>
      <li>分类列表15</li>
      <li>分类列表16</li>
      <li>分类列表17</li>
      <li>分类列表18</li>
      <li>分类列表19</li>
      <li>分类列表20</li>
      <li>分类列表21</li>
      <li>分类列表22</li>
      <li>分类列表23</li>
      <li>分类列表24</li>
      <li>分类列表25</li>
      <li>分类列表26</li>
      <li>分类列表27</li>
      <li>分类列表28</li>
      <li>分类列表29</li>
      <li>分类列表30</li>
      <li>分类列表31</li>
      <li>分类列表32</li>
    </ul>
  </div>
</template>
<script>
import BScroll from 'better-scroll'


export default {
  name: 'Category',
  data() {
    return {
      bscroll: null
    };
  },
  mounted() {
    // let wrapper = document.querySelector('.wrapper')
    // probeType:监听实时位置：默认为0,1不监听，2监听,光标动的时候侦测 离开时不侦测（虽然有滚动惯性）；3：只要是滚动都监测
    this.bscroll = new BScroll(document.querySelector('.wrapper'),{
      probeType:2,
      pullUpLoad:true
    });
    // this.bscroll.on('scroll',(position)=>{
    //   console.log(position);
    // })
    this.bscroll.on('pullingUp',()=>{
      console.log('上拉加载更多');
      setTimeout(()=>{
        this.bscroll.finishPullUp();
      },2000)
    })
  },
  methods: {}
};
</script>
<style scoped>
  .wrapper {
    height: 150px;
    background-color: red;
    overflow: hidden;
    /* overflow-y: scroll; */
  }
</style>
