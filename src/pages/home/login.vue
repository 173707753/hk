<template>
    <div class="login">
        <div class="login_form">
            <p>新型电力系统电力保供优化调度系统研究</p>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="登录" name="first">
                    <el-form :model="loginForm" :rules="rules" ref="loginForm" @submit.native.prevent>
                        <el-form-item label="" prop="account" class="elItem">
                            <el-input type="text" autocomplete="off" v-model="loginForm.account"
                                prefix-icon="el-icon-user-solid" placeholder="请输入用户名"></el-input>
                        </el-form-item>
                        <el-form-item label="" prop="password">
                            <el-input type="password" autocomplete="off" v-model="loginForm.password"
                                prefix-icon="el-icon-lock" placeholder="请输入密码"></el-input>
                        </el-form-item>
                        <el-form-item class="btns">
                            <el-button type="primary" @click="goToLogin" native-type="submit">登录</el-button>
                            <el-button @click="resetLoginForm">重置</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="注册" name="second">
                    <register></register>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
 
<script>
//引入注册组件
import register from '@/pages/home/register.vue';
export default {
    data() {
        var validateAccount = (rule, value, callback) => {
            if (value === "") {
                return callback(new Error("账号不能为空"));
            } else if (value === "admin") {
                callback();
            } else {
                callback(new Error("请输入正确的用户名"));
            }
        };
        var validatePassword = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            } else if (value === "123456") {
                callback();
            } else {
                callback(new Error("请输入正确的密码"));
            }
        };
        return {
            loginForm: {
                account: "admin",
                password: "123456",
            },
            activeName: 'first',//默认显示登录页面
            rules: {
                account: [
                    {
                        validator: validateAccount,
                        trigger: "blur",
                    },
                ],
                password: [
                    {
                        validator: validatePassword,
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    methods: {
        //固定的账户密码判断实现简单的登录跳转功能，只能测试用
        goToLogin() {
            this.$refs["loginForm"].validate((valid) => {
                if (valid) {
                    if (
                        this.loginForm.account != "admin" ||
                        this.loginForm.password != "123456"
                    ) {
                        this.$message.error("账号密码不正确");
                        return false;
                    } else {
                        this.$message({ message: "登陆成功", type: "success" });
                        this.$router.push("/main");
                    }
                } else {
                    this.$message.error("登陆失败");
                    return false;
                }
            });
        },
        resetLoginForm() {
            this.$refs["loginForm"].resetFields();
        },
        handleClick() { }
    },
    components: {
        register
    }
};
</script>
 
<style lang='scss' scoped>
.login {
    width: 100%;
    height: 100vh;
    background-image: url('../../assets/img/home/bg.jpg');
    background-size: 100% auto;
    background-position: center center;
    overflow: auto;
    position: relative;

    .login_form {
        width: 25vw;
        height: 32vh;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -200px;
        margin-top: -150px;
        padding: 10px;
        background: #fff;
        border-radius: 15px;
        box-shadow: 0 0 25px #f885ff;

        .btns {
            display: flex;
            justify-content: flex-end;
        }

        p {
            font-size: 2.5vh;
            text-align: center;
            font-weight: 600;
        }
    }

}
</style>