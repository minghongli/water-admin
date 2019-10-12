<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form @submit="handleSubmit" :form="form">
      <a-form-item
        label="品牌"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
      >
        <a-select
          placeholder="请选择品牌"
          v-decorator="[
              'brand',
              {rules: [{ required: true, message: '请选择品牌'}]}
            ]"
        >
          <a-select-option :value="item" v-for="(item,index) of brands" :key="index">{{item}}</a-select-option>
          <!-- <a-select-option value="李大刀">李大刀</a-select-option> -->
        </a-select>
      </a-form-item>
      <a-form-item
        label="容量"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
      >
        <a-select
          placeholder="请选择容量"
          v-decorator="[
              'capacity',
              {rules: [{ required: true, message: '请选择品牌'}]}
            ]"
        >
          <a-select-option :value="item" v-for="(item,index) of capacitys" :key="index">{{item}}</a-select-option>
          <!-- <a-select-option value="李大刀">李大刀</a-select-option> -->
        </a-select>
      </a-form-item>
      <a-form-item
        label="包装类型"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
      >
        <a-select
          placeholder="请选择包装类型"
          v-decorator="[
              'package_type',
              {rules: [{ required: true, message: '请选择包装类型'}]}
            ]"
        >
          <a-select-option :value="item" v-for="(item,index) of package_types" :key="index">{{item}}</a-select-option>
          <!-- <a-select-option value="李大刀">李大刀</a-select-option> -->
        </a-select>
      </a-form-item>

      <a-form-item
        label="名称"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
      >
        <a-input
          v-decorator="[
            'name',
            {rules: [{ required: true, message: '请输入名称' }]}
          ]"
          name="name"
          placeholder="请填写名称"
        />
      </a-form-item>
      <a-form-item
        label="描述"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
      >
        <a-textarea
          rows="4"
          placeholder="请输入商品描述"
          v-decorator="[
            'description',
            {rules: [{ required: true, message: '请输入商品描述' }]}
          ]"
        />
      </a-form-item>
      <a-form-item
        label="价格"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        :required="false"
      >
        <a-input-number
          v-decorator="['price',{rules: [{ required: true, message: '请输入商品价格' }]}]"
          :min="0"
          :max="100"
        />
        <span>元</span>
      </a-form-item>
      <a-form-item
        label="封面图片"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
      >
        <div class="clearfix">
          <!-- action="https://app.watercui.cn/v1/uploadImg" -->
          <a-upload
            action="http://localhost:3002/v1/uploadImg"
            listType="picture-card"
            :fileList="fileList"
            @preview="handlePreview"
            @change="handleChange"
          >
            <div v-if="fileList.length < 3">
              <a-icon type="plus" />
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </div>
        <!-- <a-textarea
          rows="4"
          placeholder="请输入商品描述"
          v-decorator="[
            'description',
            {rules: [{ required: true, message: '请输入商品描述' }]}
        ]" />-->
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center">
        <a-button htmlType="submit" type="primary">提交</a-button>
        <a-button style="margin-left: 8px">保存</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import { addGood } from '@/api/manage'
export default {
  name: 'BaseForm',
  data() {
    return {
      //description: '表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。',
      value: 1,
      type: 'new', //new,update
      brands: [
        '维维碱LOVE天然泉水',
        '乐百氏',
        '怡宝',
        '景田',
        '雀巢',
        '娃哈哈',
        '燕京',
        '农夫山泉',
        '5100西藏冰川矿泉水',
        '善品香山',
        '时代峡谷'
      ],
      package_types: ['桶装', '瓶装', '泡茶'],
      capacitys:['18.9L','15.9L','2L','17.8L','330ML*24','348ML*24','350ML*24','380ML*24','4L*4'],
      // form
      form: this.$form.createForm(this),
      previewVisible: false,
      previewImage: '',
      fileList: [
        {
          uid: '-1',
          name: 'xxx.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        }
      ]
    }
  },
  methods: {
    async submit(data) {
      let res = await addGood(data)
      console.info(res)
    },

    // handler
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          // eslint-disable-next-line no-console
          console.log('Received values of form: ', values)
          this.submit(values)
          //let res=await addGood(values);
        }
      })
    },
    handleCancel() {
      this.previewVisible = false
    },
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handleChange({ fileList }) {
      this.fileList = fileList
    }
  },
  created() {
    console.info(1)
  }
}
</script>

<style>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>