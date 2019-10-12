<template>
  <div>
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="6" :sm="24">
            <a-form-item label="订单编号">
              <a-input v-model="queryParam.id" placeholder />
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="发货状态">
              <a-select v-model="queryParam.delivery_state" placeholder="请选择" default-value="0">
                <a-select-option value="0">未发货</a-select-option>
                <a-select-option value="1">已发货</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
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
    <create-form ref="createModal" @ok="handleOk" />
    <step-by-step-modal ref="modal" @ok="handleOk" />
  </div>
</template>

<script>
import moment from 'moment'
import { STable } from '@/components'
import StepByStepModal from './modules/StepByStepModal'
import CreateForm from './modules/CreateForm'
import { getRoleList, getOrders, getPendingOrders } from '@/api/manage'

export default {
  name: 'TableList',
  components: {
    STable,
    CreateForm,
    StepByStepModal
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
          title: '订单编号',
          dataIndex: 'number'
        },
        {
          title: '会员账号',
          dataIndex: 'name'
        },
        // {
        //   title: '服务调用次数',
        //   dataIndex: 'callNo',
        //   sorter: true,
        //   needTotal: true,
        //   customRender: text => text + ' 次'
        // },
        {
          title: '支付状态',
          dataIndex: 'status',
          needTotal: true
        },
        {
          title: '订单状态',
          dataIndex: 'delivery_state',
          needTotal: true
        },
        {
          title: '总金额',
          dataIndex: 'total_price',
          sorter: true
        },
        {
          title: '下单时间',
          dataIndex: 'create_time',
          sorter: true
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        console.log('loadData.parameter', parameter)
        console.info(1)
        return getOrders(Object.assign(parameter, this.queryParam)).then(res => {
          return res.data
        })
      },
      selectedRowKeys: [],
      selectedRows: [],

      // custom table alert & rowSelection
      options: {
        alert: {
          show: true,
          clear: () => {
            this.selectedRowKeys = []
          }
        },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      },
      optionAlertShow: false
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
      getPendingOrders(params).then(res => {
        console.info(2)
        console.info(res.data)
        //return res.data

        this.loading = false
        this.data = res.data
        //this.pagination = pagination;
      })
    },
    tableOption() {
      if (!this.optionAlertShow) {
        this.options = {
          alert: {
            show: true,
            clear: () => {
              this.selectedRowKeys = []
            }
          },
          rowSelection: {
            selectedRowKeys: this.selectedRowKeys,
            onChange: this.onSelectChange
          }
        }
        this.optionAlertShow = true
      } else {
        this.options = {
          alert: false,
          rowSelection: null
        }
        this.optionAlertShow = false
      }
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
    },

    resetSearchForm() {
      this.queryParam = {
        date: moment(new Date())
      }
    }
  }
}
</script>
