<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form @submit="handleSubmit" :form="form">
        <a-form-item
          label="品牌"
		  :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-select
            placeholder="请选择品牌"
            v-decorator="[
              'brand',
              {rules: [{ required: true, message: '请选择品牌'}]}
            ]" >
            <a-select-option :value="item" v-for="item of brands">{{item}}</a-select-option>
            <!-- <a-select-option value="李大刀">李大刀</a-select-option> -->
          </a-select>
        </a-form-item>
        <a-form-item
          label="包装类型"
		  :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-select
            placeholder="请选择包装类型"
            v-decorator="[
              'package_type',
              {rules: [{ required: true, message: '请选择包装类型'}]}
            ]" >
            <a-select-option :value="item" v-for="item of types">{{item}}</a-select-option>
            <!-- <a-select-option value="李大刀">李大刀</a-select-option> -->
          </a-select>
        </a-form-item>

      <a-form-item
        label="标题"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          v-decorator="[
            'name',
            {rules: [{ required: true, message: '请输入标题' }]}
          ]"
          name="name"
          placeholder="给目标起个名字" />
      </a-form-item>
      <a-form-item
        label="描述"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-textarea
          rows="4"
          placeholder="请输入商品描述"
          v-decorator="[
            'description',
            {rules: [{ required: true, message: '请输入商品描述' }]}
          ]" />
      </a-form-item>
      <a-form-item
        label="价格"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        :required="false"
      >
        <a-input-number v-decorator="['price']" :min="0" :max="100" />
        <span> 元</span>
      </a-form-item>
      <a-form-item
        label="封面图片"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <!-- <a-textarea
          rows="4"
          placeholder="请输入商品描述"
          v-decorator="[
            'description',
            {rules: [{ required: true, message: '请输入商品描述' }]}
          ]" /> -->
      </a-form-item>
      <a-form-item
        :wrapperCol="{ span: 24 }"
        style="text-align: center"
      >
        <a-button htmlType="submit" type="primary">提交</a-button>
        <a-button style="margin-left: 8px">保存</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import {addGood} from '@/api/manage'
export default {
  name: 'BaseForm',
  data () {
    return {
      //description: '表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。',
	  value: 1,
    type:'new',//new,update
    brands:['维维碱LOVE天然泉水','乐百氏','怡宝','景田','雀巢','娃哈哈','燕京','农夫山泉','5100西藏冰川矿泉水','善品香山','时代峡谷'],
    types:['桶装','瓶装','泡茶'],  
      // form
    form: this.$form.createForm(this)

    }
  },
  methods: {
    async submit(data){
      let res=await addGood(data);
      console.info(res);

    },

    // handler
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          // eslint-disable-next-line no-console
          console.log('Received values of form: ', values);
          this.submit(values);
          //let res=await addGood(values);
        }
      })
    }
  },
  created(){
	  console.info(1);
  }
}
</script>
