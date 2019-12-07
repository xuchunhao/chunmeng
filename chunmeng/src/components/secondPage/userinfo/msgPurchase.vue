<template>
  <div class="msg-purchase">
    <div class="purchase-content">
      <router-link
        :to="{name:'purchase',params:{ purchase_id:item.purchase_id }}"
        tag="div"
        class="purchase-content-group-tpl"
        v-for="(item, index) in purchaseArray"
        :key="index"
      >
        <div>
          <p>
            订单状态:
            <span class="finish" v-if="item.purchase_state == 'finish'">已完成</span>
            <span class="paying" v-else-if="item.purchase_state == 'paying'">支付中</span>
          </p>
          <p>{{"订单编号:" + item.purchase_id}}</p>
          <p>{{"发起时间:" + item.creat_time}}</p>
          <p>{{"支付价格:" + item.purchase_price}}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import api from "@/api/index.js";

export default {
  data() {
    return {
      purchaseArray: []
    };
  },
  mounted() {
    api
      .addPurchase({
        id: 1,
        status: 0,
        type: "purchase",
        subtype: "list",
        data: {}
      })
      .then(res => {
        this.purchaseArray = res.data.data.list.filter(ele => {
          return ele.purchase_state != "cancel";
        });
        console.log(this.purchaseArray);
      });
  }
};
</script>

<style lang="sass">
  @import '@/assets/css/msgPurchase.scss'
</style>