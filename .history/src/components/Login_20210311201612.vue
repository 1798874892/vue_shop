<template>
   <div class="login_container">
       <div class="login_box">
           <!-- 头像区域 -->
           <div class="avatar_box">
               <img src="../assets/logo1.png" alt="">
           </div>
           <!-- 登录表单区域 -->
       </div>
   </div>
</template>

<script>
export default {
    data() {
        return {};
    },

    components: {},

    computed:{},

    mounted () {},

    methods: {},
}
</script>

<style scoped lang='less'>
    .login_container {
        background-color: #2b6b8b;
        height: 100%;
    }

    .login_box {
        width: 450px;
        height: 300px;
        background-color: #fff;
        border-radius: 3px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .avatar_box {
        height: 130px;
        width: 130px;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left: 50%;
    }
</style>