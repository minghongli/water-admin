<template>
  <div>
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="6" :sm="24">
            <a-form-item label="公司名称">
              <a-input v-model="queryParam.companyName" placeholder />
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="状态">
              <a-select v-model="queryParam.status" placeholder="请选择" default-value="-1" @change="search">
                <a-select-option value="-1">全部</a-select-option>
                <a-select-option value="0">未联系</a-select-option>
                <a-select-option value="1">已联系</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
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
      <!-- <template slot="name" slot-scope="name">{{name.first}} {{name.last}}</template> -->
      <template slot="status" slot-scope="status">
        <span v-if="status!=1">未联系</span>
        <span v-if="status==1">已联系</span>
      </template>

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
import { getCompany } from '@/api/manage'

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
          title: '公司名称',
          dataIndex: 'companyName'
        },
        {
          title: '公司地址',
          dataIndex: 'address'
        },
        {
          title: '联系电话',
          dataIndex: 'phone'
        },
        {
          title: '联系人',
          dataIndex: 'userName'
        },
        {
          title: '创建时间',
          dataIndex: 'created_at',
          sorter: true
        },
        // {
        //   title: '更新时间',
        //   dataIndex: 'update_time',
        //   sorter: true
        // },
        {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
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
    this.getList()
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
    getList(params = {}) {
      //Object.assign(parameter, this.queryParam)
      getCompany(params).then(res => {
        console.info(res.data)
        //return res.data
        this.loading = false
        this.data = res.result
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
      this.$router.push({ name: 'companyForm', params: { id: record._id } })
    },
    handleOk() {},

    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    resetSearchForm() {
      this.queryParam = {
        date: moment(new Date())
      }
    },
    search() {
      this.getList(this.queryParam);
    }
  }
}
</script>
