<template>
  <div :class="prefixCls">
    <div class="lf">
      <img
        class="bg1 animate__animated animate__fadeInDown"
        src="@/assets/images/login-bg-1.jpg"
        alt=""
      />
    </div>
    <div class="rt">
      <a-form
        class="login-form"
        ref="formRef"
        :model="formState"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <div class="title">欢迎登录！</div>
        <a-form-item label="" name="username">
          <a-input
            v-model:value="formState.username"
            placeholder="账号"
            autocomplete="off"
          >
            <template #prefix
              ><UserOutlined style="color: rgba(0, 0, 0, 0.25)"
            /></template>
          </a-input>
        </a-form-item>
        <a-form-item label="" name="password">
          <a-input
            v-model:value="formState.password"
            type="password"
            placeholder="密码"
            autocomplete="off"
          >
            <template #prefix
              ><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
            /></template>
          </a-input>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="onSubmit">登 录</a-button>
          <a-button style="margin-left: 10px" @click="resetForm">重置</a-button>
        </a-form-item>
      </a-form>
      <div class="rt-tips">四川中京安民科技有限公司</div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRaw } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { useDesign } from "@/utils/useDesign";
const { prefixCls } = useDesign("login");
export default {
  name: "Login",
  setup() {
    const store = useStore(); // 获取store 实例
    const { query } = useRoute();
    const router = useRouter();
    const formRef = ref();
    const formState = reactive({ name: undefined, password: undefined });
    const redirect = query.redirect;
    console.log(redirect);

    const rules = {
      username: [
        { required: true, trigger: "blur", message: "用户名不能为空" },
      ],
      password: [{ required: true, trigger: "blur", message: "密码不能为空" }],
    };
    const onSubmit = () => {
      formRef.value
        .validate()
        .then(() => {
          let { username, password } = toRaw(formState);
          store
            .dispatch("Login", { username, password })
            .then(() => {
              router.push({ path: redirect || "/" }).catch(() => {});
            })
            .catch(() => {});
        })
        .catch((error) => {
          console.log("error", error);
        });
    };
    const resetForm = () => {
      formRef.value.resetFields();
    };
    return {
      prefixCls,
      labelCol: { style: { width: "0" } },
      wrapperCol: { span: 20 },
      formState,
      formRef,
      rules,
      onSubmit,
      resetForm,
    };
  },
  components: {
    UserOutlined,
    LockOutlined,
  },
  data() {
    return {};
  },
};
</script>
<style lang="less">
@prefix-cls: ~"@{namespace}-login";

.@{prefix-cls}{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f8;
  .lf {
    position: relative;
    text-align: center;
    .bg1 {
      width: 513px;
      height: 745px;
      display: block;
    }
  }
  .rt {
    // width: 556px;
    position: relative;
    .login-form {
      margin: 80px auto;
      background: #ffffff;
      box-shadow: 0px 0px 34px 0px rgba(66, 88, 145, 0.13);
      width: 787px;
      height: 745px;
      padding: 134px 173.5px 132px;
      .title {
        text-align: center;
        color: #7183ac;
        height: 44px;
        font-size: 34px;
        font-weight: 500;
        line-height: 44px;
        position: relative;
        margin-bottom: 130px;
      }
      .ant-row.ant-form-item{
        display: flex;
        justify-content: center;
        .ant-input{
          border: none;
          color: #7183ac;
          font-size: 18px;
          font-weight: 700;
          background-color: #ffffff;
          padding: 10px 0 10px 0px;
          border-radius: 0;
          height: 40px;
          line-height: 40px;
        }
      }
      input:-webkit-autofill,
      select:-webkit-autofill,
      textarea:-webkit-autofill,
      input:-internal-autofill-selected {
        -webkit-box-shadow: 0 0 0 1000px #ffffff inset !important;
        box-shadow: inset 0 0 0 1000px #ffffff !important;
        background-color: #ffffff !important;
        color: #7183ac !important;
        background-image: none;
        -webkit-transition: background-color 50000s ease-in-out 0s;
        transition: background-color 50000s ease-in-out 0s;
      }
    }
    .rt-tips {
      position: absolute;
      bottom: 30px;
      width: 100%;
      height: 20px;
      font-size: 12px;
      color: #b3b3b3;
      line-height: 20px;
      text-align: center;
    }
  }
}
</style>
