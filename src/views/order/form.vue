
<template>
  <!-- <page-view
    title="单号：234231029431"
    logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png"
  >-->
  <page-view
    :title="title"
    logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png"
  >
    <detail-list slot="headerContent" size="small" :col="2" class="detail-layout">
      <detail-list-item term="订单编号">{{orderDetail.number}}</detail-list-item>
      <!-- <detail-list-item term="订购产品">XX服务</detail-list-item> -->
      <detail-list-item term="创建时间">{{orderDetail.create_time}}</detail-list-item>
      <!-- <detail-list-item term="关联单据">
        <a>12421</a>
      </detail-list-item>-->
      <detail-list-item term="备注">{{orderDetail.remark}}</detail-list-item>
    </detail-list>
    <a-row slot="extra" class="status-list">
      <a-col :xs="12" :sm="12">
        <div class="text">状态</div>
        <div class="heading">{{orderDetail.status}}</div>
      </a-col>
      <a-col :xs="12" :sm="12">
        <div class="text">订单金额</div>
        <div class="heading">¥ {{orderDetail.total_price}}</div>
      </a-col>
    </a-row>
    <!-- actions -->
    <template slot="action">
      <!-- <a-button-group style="margin-right: 4px;">
        <a-button>操作</a-button>
        <a-button>操作</a-button>
        <a-button>
          <a-icon type="ellipsis" />
        </a-button>
      </a-button-group>-->
      <a-button type="primary" v-if="orderDetail.order_code==1" @click="delivery">确认发货</a-button>
      <a-button type="primary" v-if="orderDetail.order_code==10" @click="finishOrder">完成订单</a-button>
      <a-button type="danger" class="cancel-btn" @click="cancelOrder">取消订单</a-button>
    </template>

    <!-- <a-card :bordered="false" title="流程进度" v-if="orderDetail.order_code!=-100">
      <a-steps
        :direction="isMobile() && 'vertical' || 'horizontal'"
        :current="currentStatus"
        progressDot
      >
      待付款0", "待发货"1, "待收货"10, "待评价"20, "已完成"30 -100已关闭 //-200超过支付期限交易关闭
      this.currentStatus 
        <a-step title="订单已生成"></a-step>
        <a-step title="等待付款" v-if="orderDetail.order_code=0"></a-step>
        <a-step title="已付款" v-if="orderDetail.order_code>0"></a-step>
        <a-step title="等待发货" v-if="orderDetail.order_code=1"></a-step>
        <a-step title="已发货" v-if="orderDetail.order_code>1"></a-step>
        <a-step title="等待完成" v-if="orderDetail.order_code>=10"></a-step>
        <a-step title="已完成" v-if="orderDetail.order_code>=10"></a-step>
      </a-steps>
    </a-card>-->

    <a-card style="margin-top: 24px" :bordered="false" title="收货信息">
      <detail-list>
        <detail-list-item term="姓名">{{orderDetail.address.name}}</detail-list-item>
        <detail-list-item term="联系方式">{{orderDetail.address.phone}}</detail-list-item>
        <detail-list-item term="收货地址">{{orderDetail.address.address_all}}</detail-list-item>
      </detail-list>
    </a-card>
    <a-card style="margin-top: 24px" :bordered="false" title="商品信息">
      <a-table
        :columns="goodsColumns"
        :rowKey="record => record._id"
        :dataSource="goodsData"
        :pagination="false"
      >
        <template slot="name" slot-scope="name">{{name.first}} {{name.last}}</template>
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)">详情</a>
            <a-divider type="vertical" />
          </template>
        </span>
      </a-table>
    </a-card>
    <!-- 操作 -->
    <!-- <a-card style="margin-top: 24px" :bordered="false" title="操作日志">
      <a-table :columns="operationColumns" :dataSource="operation1" :pagination="false">
        <template slot="status" slot-scope="status">
          <a-badge :status="status | statusTypeFilter" :text="status | statusFilter" />
        </template>
      </a-table>
    </a-card>-->
  </page-view>
</template>

<script>
import { mixinDevice } from '@/utils/mixin'
import { PageView } from '@/layouts'
import DetailList from '@/components/tools/DetailList'
import { getOrderDetail, updateOrder, cancelOrder } from '@/api/manage'
const DetailListItem = DetailList.Item

export default {
  name: 'Advanced',
  components: {
    PageView,
    DetailList,
    DetailListItem
  },
  mixins: [mixinDevice],
  data() {
    return {
      id: '',
      currentStatus: 1,
      goodsColumns: [
        // {
        //   title: '商品编号',
        //   dataIndex: 'id',
        //   key: 'id'
        // },
        {
          title: '商品名称',
          dataIndex: 'name',
          key: 'name'
        },
        // {
        //   title: '商品条码',
        //   dataIndex: 'barcode',
        //   key: 'barcode'
        // },
        {
          title: '单价',
          dataIndex: 'price',
          key: 'price',
          align: 'right'
        },
        {
          title: '数量（件）',
          dataIndex: 'num',
          key: 'num',
          align: 'right'
        },
        {
          title: '金额',
          dataIndex: 'total_price',
          key: 'total_price',
          align: 'right'
        }
      ],
      goodsData: [],
      orderDetail: {},
      operationColumns: [
        {
          title: '操作类型',
          dataIndex: 'type',
          key: 'type'
        },
        {
          title: '操作人',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '执行结果',
          dataIndex: 'status',
          key: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '操作时间',
          dataIndex: 'updatedAt',
          key: 'updatedAt'
        },
        {
          title: '备注',
          dataIndex: 'remark',
          key: 'remark'
        }
      ],
      operation1: [
        {
          key: 'op1',
          type: '订购关系生效',
          name: '曲丽丽',
          status: 'agree',
          updatedAt: '2017-10-03  19:23:12',
          remark: '-'
        },
        {
          key: 'op2',
          type: '财务复审',
          name: '付小小',
          status: 'reject',
          updatedAt: '2017-10-03  19:23:12',
          remark: '不通过原因'
        },
        {
          key: 'op3',
          type: '部门初审',
          name: '周毛毛',
          status: 'agree',
          updatedAt: '2017-10-03  19:23:12',
          remark: '-'
        },
        {
          key: 'op4',
          type: '提交订单',
          name: '林东东',
          status: 'agree',
          updatedAt: '2017-10-03  19:23:12',
          remark: '很棒'
        },
        {
          key: 'op5',
          type: '创建订单',
          name: '汗牙牙',
          status: 'agree',
          updatedAt: '2017-10-03  19:23:12',
          remark: '-'
        }
      ],
      title: '单号：'
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        agree: '成功',
        reject: '驳回'
      }
      return statusMap[status]
    },
    statusTypeFilter(type) {
      const statusTypeMap = {
        agree: 'success',
        reject: 'error'
      }
      return statusTypeMap[type]
    },
    formateDateFilter(value) {
      return value.slice(0, 10)
    }
  },
  created() {
    console.info(this.$route.params.id)
    this.id = this.$route.params.id
    this.getDetail()
  },
  methods: {
    getDetail() {
      getOrderDetail({ id: this.id }).then(res => {
        console.info(2)
        console.info(res.data)
        //return res.data

        this.loading = false
        this.goodsData = res.data.goods
        this.orderDetail = res.data
        let state
        switch (res.data.order_code) {
          //待付款0", "待发货"1, "待收货"10, "待评价"20, "已完成"30 -100已关闭 //-200超过支付期限交易关闭
          case 0:
            state = 2
            break
          case 1:
            state = 4
            break
          case 10:
            state = 6
            break
          case 20:
            state = 6
            break
          case 30:
            state = 7
            break
        }
        this.currentStatus = status
        this.title = `单号：${res.data.number}`
        //this.pagination = pagination;
      })
    },
    //确认发货
    delivery() {
      updateOrder({ orderId: this.id, state: 1 }).then(res => {
        if (res.code == 0) {
          //window.location.reload()
        }
      })
    },
    //完成订单
    finishOrder() {
      updateOrder({ orderId: this.id, state: 10 }).then(res => {
        if (res.code == 0) {
          window.location.reload()
        }
      })
    },
    //取消订单
    cancelOrder() {
      cancelOrder({ orderId: this.id }).then(res => {
        if (res.code == 0) {
          window.location.reload()
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.detail-layout {
  margin-left: 44px;
}
.text {
  color: rgba(0, 0, 0, 0.45);
}

.heading {
  color: rgba(0, 0, 0, 0.85);
  font-size: 20px;
}

.no-data {
  color: rgba(0, 0, 0, 0.25);
  text-align: center;
  line-height: 64px;
  font-size: 16px;

  i {
    font-size: 24px;
    margin-right: 16px;
    position: relative;
    top: 3px;
  }
}

.mobile {
  .detail-layout {
    margin-left: unset;
  }
  .text {
  }
  .status-list {
    text-align: left;
  }
}
.cancel-btn {
  margin-left: 15px;
}
</style>
