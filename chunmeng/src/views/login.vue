<template >
  <div class="login">
    <login-header></login-header>
    <login-form></login-form>
  </div>
</template>

<script>
import loginHeader from '@/components/login/loginHeader';
import loginForm from '@/components/login/loginForm';

export default {
  components:{
    loginHeader,
    loginForm
  },
}
</script>