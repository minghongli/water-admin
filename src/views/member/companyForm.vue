<template>
  <div>
    <a-card :bordered="false">
      <detail-list title="用户信息">
        <detail-list-item term="公司名称">{{data.companyName}}</detail-list-item>
        <detail-list-item term="公司地址">{{data.address}}</detail-list-item>
        <detail-list-item term="联系人">{{data.userName}}</detail-list-item>
        <detail-list-item term="联系电话">{{data.phone}}</detail-list-item>
        <detail-list-item term="发票类型">{{data.invoice}}</detail-list-item>
        <detail-list-item term="月需求量">{{data.demandOfMonth}}</detail-list-item>
        <detail-list-item term="单次送水">{{data.singleNumber}}</detail-list-item>
        <detail-list-item term="品牌">{{data.brand}}</detail-list-item>
        <detail-list-item term="创建时间">{{data.created_at}}</detail-list-item>
      </detail-list>
      <a-divider style="margin-bottom: 32px" />
    </a-card>
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
      <a-form @submit="handleSubmit" :form="form">
        <a-form-item
          label="状态"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          :required="false"
          help
        >
          <a-radio-group v-model="value">
            <a-radio :value="1">已联系</a-radio>
            <a-radio :value="2">未联系</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          label="备注"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-textarea
            rows="4"
            placeholder="请填写备注"
            v-decorator="[
            'description',
            {rules: [{ required: false, message: '请输入备注' }]}
          ]"
          />
        </a-form-item>
        <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center">
          <!-- <a-button htmlType="submit" type="primary">提交</a-button> -->
          <a-button style="margin-left: 8px" @click="save()">保存</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import { mixinDevice } from '@/utils/mixin'
import { PageView } from '@/layouts'
import DetailList from '@/components/tools/DetailList'
import { getCompanyDetail } from '@/api/manage'
const DetailListItem = DetailList.Item
export default {
  name: 'BaseForm',
  components: {
    PageView,
    DetailList,
    DetailListItem
  },
  data() {
    return {
      id: '',
      description: '',
      value: 1,
      data: {},
      // form
      form: this.$form.createForm(this)
    }
  },
  created() {
    this.id = this.$route.params.id
    this.getDetail()
  },
  methods: {
    // handler
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          // eslint-disable-next-line no-console
          console.log('Received values of form: ', values)
        }
      })
    },
    getDetail() {
      getCompanyDetail({ id: this.id }).then(res => {
        this.data = res.data
        console.info(this.data)
        //this.pagination = pagination;
      })
    },
    save() {}
  }
}
</script>
