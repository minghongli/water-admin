<template>
  <div>
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <!-- <a-col :md="6" :sm="24">
            <a-form-item label="订单编号">
              <a-input v-model="queryParam.id" placeholder />
            </a-form-item>
          </a-col>-->
          <a-col :md="6" :sm="24">
            <a-form-item label="订单状态">
              <a-select
                v-model="queryParam.order_state"
                placeholder="请选择"
                default-value="-1"
                @change="onSelectChange()"
              >
                <!-- 待付款0", "待发货"1, "待收货"10, "待评价"20, "已完成"30 -1已取消 -->
                <a-select-option value="-1">全部</a-select-option>
                <a-select-option value="0">待付款</a-select-option>
                <a-select-option value="1">待发货</a-select-option>
                <a-select-option value="10">待收货</a-select-option>
                <a-select-option value="30">已完成</a-select-option>
                <a-select-option value="-100">已取消</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="支付状态">
              <a-select
                v-model="queryParam.pay_state"
                placeholder="请选择"
                default-value="-1"
                @change="onSelectChange()"
              >
                <a-select-option value="-1">全部</a-select-option>
                <a-select-option value="0">未支付</a-select-option>
                <a-select-option value="200">已支付</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <!-- <a-col :md="6" :sm="24">
            <a-form-item label="发货状态">
              <a-select
                v-model="queryParam.delivery_state"
                placeholder="请选择"
                default-value="0"
                @change="selectOrders()"
              >
                <a-select-option value="-1">全部</a-select-option>
                <a-select-option value="0">未发货</a-select-option>
                <a-select-option value="1">已发货</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>-->
          <!-- <a-col :md="!advanced && 8 || 24" :sm="24">
            <span
              class="table-page-search-submitButtons"
              :style="advanced && { float: 'right', overflow: 'hidden' } || {} "
            >
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
              <a @click="toggleAdvanced" style="margin-left: 8px">
                {{ advanced ? '收起' : '展开' }}
                <a-icon :type="advanced ? 'up' : 'down'" />
              </a>
            </span>
          </a-col>-->
        </a-row>
      </a-form>
    </div>

    <!-- <div class="table-operator">
      <a-button type="primary" icon="plus" @click="handleEdit()">新建</a-button>
      <a-button type="dashed" @click="tableOption">{{ optionAlertShow && '关闭' || '开启' }} alert</a-button>
      <a-dropdown v-action:edit v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1">
            <a-icon type="delete" />删除
          </a-menu-item>
          lock | unlock
          <a-menu-item key="2">
            <a-icon type="lock" />锁定
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作
          <a-icon type="down" />
        </a-button>
      </a-dropdown>
    </div>-->

    <!-- <s-table
      ref="table"
      size="default"
      rowKey="key"
      :columns="columns"
      :data="loadData"
      :alert="options.alert"
      :rowSelection="options.rowSelection"
    >
      <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
        </template>
        <a-dropdown>
          <a class="ant-dropdown-link">
            更多
            <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="javascript:;">详情</a>
            </a-menu-item>
            <a-menu-item v-if="$auth('table.disable')">
              <a href="javascript:;">禁用</a>
            </a-menu-item>
            <a-menu-item v-if="$auth('table.delete')">
              <a href="javascript:;">删除</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </span>
    </s-table>-->
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
import { getRoleList, getOrders } from '@/api/manage'

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
      queryParam: {
      },
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
        // {
        //   title: '会员账号',
        //   dataIndex: 'name'
        // },
        // {
        //   title: '支付状态',
        //   dataIndex: 'status',
        //   needTotal: true
        // },
        {
          title: '订单状态',
          dataIndex: 'status',
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
      this.$router.push({ name: 'orderDetail', params: { id: record._id } })
    },
    handleOk() {},

    // resetSearchForm() {
    //   this.queryParam = {
    //     date: moment(new Date())
    //   }
    // },
    onSelectChange() {
      let params = {
        order_state: this.queryParam.order_state,
        pay_state: this.queryParam.pay_state
        //delivery_state: this.queryParam.delivery_state
      }
      console.info(params);
      this.getOrders(params)
    }
  }
}
</script>
