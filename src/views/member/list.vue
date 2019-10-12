<template>
  <div>
    <!-- <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="6" :sm="24">
            <a-form-item label="订单编号">
              <a-input v-model="queryParam.id" placeholder />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>-->
    <a-table
      :columns="columns"
      :rowKey="record => record._id"
      :dataSource="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <template slot="name" slot-scope="name">{{name.first}} {{name.last}}</template>
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleEdit(record)">详情</a>
          <a-divider type="vertical" />
        </template>
      </span>
    </a-table>
    <!-- <create-form ref="createModal" @ok="handleOk" />
    <step-by-step-modal ref="modal" @ok="handleOk"/>-->
  </div>
</template>

<script>
import moment from 'moment'
import { STable } from '@/components'
// import StepByStepModal from './modules/StepByStepModal'
// import CreateForm from './modules/CreateForm'
import { getRoleList, getOrders } from '@/api/manage'

export default {
  name: 'TableList',
  components: {
    STable
    // CreateForm,
    //   StepByStepModal
  },
  data() {
    return {
      data: [],
      pagination: {},
      loading: false,
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '#',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '手机号',
          dataIndex: 'number'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  created() {
    //this.tableOption()
    //getRoleList({ t: new Date() })
    this.getOrders()
  },
  methods: {
    handleTableChange(pagination, filters, sorter) {
      console.log(pagination)
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      this.getOrders({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters
      })
    },
    getOrders(params = {}) {
      //Object.assign(parameter, this.queryParam)
      getOrders(params).then(res => {
        console.info(2)
        console.info(res.data)
        //return res.data

        this.loading = false
        this.data = res.data
        //this.pagination = pagination;
      })
    },

    handleEdit(record) {
      //this.$emit('onEdit', record)
      console.info(record)
      //this.$refs.modal.edit(record)
      //this.
      this.$router.push({ name: 'orderDetail', params: { id: record._id } })
    },
    handleOk() {},

    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced() {
      this.advanced = !this.advanced
    }
  }
}
</script>
