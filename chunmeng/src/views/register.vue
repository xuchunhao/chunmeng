<template >
  <div class="register">
    <register-header />
    <register-form />
  </div>
</template>

<script>
import registerHeader from '@/components/register/registerHeader';
import registerForm from '@/components/register/registerForm';

export default {
  components:{
    registerHeader,
    registerForm
  }
}
</script>

