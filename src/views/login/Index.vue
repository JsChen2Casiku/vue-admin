<template>
  <!--外层必须要有一层元素进行包裹-->
  <div id="login">
    <!--内容区-->
    <div class="login_warp login_warp2">
      <ul class="menu_tab">
        <li :class="{'current': isActive==item.current}" @click="toggleMenu(item)" v-for="(item, index) in menuTab" :key="item.id">{{ item.text }}</li>
      </ul>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login_form">
        <el-form-item prop="username" class="form-item">
          <label>用户名</label>
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password" class="form-item">
          <label>密码</label>
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="model=='register'" prop="repeatPassword" class="form-item">
        <!--<el-form-item prop="repeatPassword" class="form-item" v-show="model == 'register'" >-->
          <label>重复密码</label>
          <el-input type="password" v-model="ruleForm.repeatPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="code" class="form-item">
          <label>验证码</label>
          <el-row :gutter="20">
            <el-col :span="15">
              <el-input v-model.number="ruleForm.code"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" class="block" @click="">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" class="login_btn block" @click="submitForm('ruleForm')">提交</el-button>
          <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>

<script>
import {stripscript,verifyCode} from "@/utils/validate";
export default {
  name: "login",
  data: function () {
    const checkCode = (rule, value, callback) => {
      //过滤数据
      //this.ruleForm.code = stripscript(value);
      //value = this.ruleForm.code;
      //let reg = /^[a-z0-9]{6}$/;
      //console.log(value);
      if (!value) {
        return callback(new Error('验证码不能为空'));
      }
      if (verifyCode(value)) {
        return callback(new Error('验证码格式错误'));
      }
      callback();
      /*setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        }
      }, 1000);*/
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        /*if (this.ruleForm.password !== '') {
          this.$refs.ruleForm.validateField('password');
        }*/
        callback();
      }
    };
    const validateRepeatPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入重复密码'));
      } else if (value != this.ruleForm.password){
        callback(new Error('两次输入密码不一致'));
      }else {
        /*if (this.ruleForm.password !== '') {
          this.$refs.ruleForm.validateField('password');
        }*/
        callback();
      }
    };
    const validateUser = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        callback();
      }
    };
    return {
      menuTab: [
        {text: "登录", current: true, type: 'login'},
        {text: "注册", current: false, type: 'register'}
      ],
      isActive: true,
      model: 'login',
      ruleForm: {
        username: '',
        password: '',
        repeatPassword: '',
        code: ''
      },
      rules: {
        username: [
          {validator: validateUser, trigger: 'blur'}
        ],
        password: [
          {validator: validatePass, trigger: 'blur'}
        ],
        repeatPassword: [
          {validator: validateRepeatPass, trigger: 'blur'}
        ],
        code: [
          {validator: checkCode, trigger: 'blur'}
        ]
      }
    }
  },
  //数据驱动视图
  methods: {
    toggleMenu(item){
      this.menuTab.forEach((elem, index) => {
        this.menuTab[index].current = false;
        elem.current = false;
      })
      this.model = item.type;
      item.current = true
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
  created() {
    console.log("创建时...");
  },
  mounted() {
    console.log("挂载时...")
  }

}
</script>

<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: lightblue;
}
.login_warp {
  width: 330px;
  margin: auto;
}
.menu_tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0, 0, 0, .1);
  }
}
.login_form {
  margin-top: 29px;
  label {
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: white;
  }
  .form-item {
    margin-bottom: 14px;
  }
  .block {
    display: block;
    width: 100%;
    //margin-top: 19px;
  }
  .login_btn {
    margin-top: 19px;
  }
}
</style>