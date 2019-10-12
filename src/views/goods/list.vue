<template>
  <div>
    <a-card :bordered="false" class="ant-pro-components-tag-select">
      <a-form :form="form" layout="inline">
        <!-- <standard-form-row title="所属类目" block style="padding-bottom: 11px;">
          <a-form-item>
            <tag-select>
              <tag-select-option value="Category1">类目一</tag-select-option>
              <tag-select-option value="Category2">类目二</tag-select-option>
              <tag-select-option value="Category3">类目三</tag-select-option>
              <tag-select-option value="Category4">类目四</tag-select-option>
              <tag-select-option value="Category5">类目五</tag-select-option>
              <tag-select-option value="Category6">类目六</tag-select-option>
              <tag-select-option value="Category7">类目七</tag-select-option>
              <tag-select-option value="Category8">类目八</tag-select-option>
              <tag-select-option value="Category9">类目九</tag-select-option>
              <tag-select-option value="Category10">类目十</tag-select-option>
            </tag-select>
          </a-form-item>
        </standard-form-row> -->
        <standard-form-row title="" grid last>
          <a-row>
            <a-col :lg="8" :md="10" :sm="10" :xs="24">
              <a-form-item :wrapper-col="{ sm: { span: 16 }, xs: { span: 24 } }" label="品牌">
                <a-select
                  style="max-width: 200px; width: 100%;"
                  placeholder="所有"
                  v-decorator="['rate']"
                >
                  <a-select-option :value="item" v-for="item of brands" :key="item">{{item}}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg="8" :md="10" :sm="10" :xs="24">
              <a-button type="primary" icon="plus" @click="handleNew()">新建</a-button>
            </a-col>
          </a-row>
        </standard-form-row>
      </a-form>
    </a-card>

    <div class="ant-pro-pages-list-projects-cardList">
      <a-list :loading="loading" :data-source="data" :grid="{ gutter: 24, xl: 6, lg: 4, md: 4, sm: 3, xs: 2 }">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-card class="ant-pro-pages-list-projects-card" hoverable @click="handleEdit(item)">
            <img slot="cover" :src="item.pic_url" :alt="item.title" />
            <a-card-meta :title="item.name">
              <!-- <template slot="description">
                <ellipsis :length="50">{{ item.description }}</ellipsis>
              </template> -->
            </a-card-meta>
            <div class="cardItemContent1">
              <span>{{ item.price }}</span>
              <!-- <span>{{ item.updatedAt | fromNow }}</span> -->
              
              <!-- <div class="avatarList">
                <avatar-list size="mini">
                  <avatar-list-item
                    v-for="(member, i) in item.members"
                    :key="`${item.id}-avatar-${i}`"
                    :src="member.avatar"
                    :tips="member.name"
                  />
                </avatar-list>
              </div> -->
            </div>
          </a-card>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { TagSelect, StandardFormRow, Ellipsis, AvatarList } from '@/components'
const TagSelectOption = TagSelect.Option
const AvatarListItem = AvatarList.AvatarItem

export default {
  components: {
    AvatarList,
    AvatarListItem,
    Ellipsis,
    TagSelect,
    TagSelectOption,
    StandardFormRow
  },
  data () {
    return {
      brands:['维维碱LOVE天然泉水','乐百氏','怡宝','景田','雀巢','娃哈哈','燕京','农夫山泉','5100西藏冰川矿泉水','善品香山','时代峡谷'],
      brand_id:-1,
      data: [],
      form: this.$form.createForm(this),
      loading: true
    }
  },
  filters: {
    fromNow (date) {
      return moment(date).fromNow()
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    handleChange (value) {
      console.log(`selected ${value}`)
    },
    getList () {
      this.$http.get('/v1/getGoodsList', { params: { count: 8,brand_id:this.brand_id } }).then(res => {
        console.log('res', res)
        this.data = res.result
        this.loading = false
      })
    },
    handleNew(){
      console.info(2);
      this.$router.push('/goods/new');
    },
    handleEdit (goods) {
      console.info(goods);
      this.$router.push(`/goods/form/${goods._id}`);
      //this.$emit('onEdit', record)
    },
  }
}
</script>

<style lang="less" scoped>
.ant-pro-components-tag-select {
  /deep/ .ant-pro-tag-select .ant-tag {
    margin-right: 24px;
    padding: 0 8px;
    font-size: 14px;
  }
}
.ant-pro-pages-list-projects-cardList {
  margin-top: 24px;

  /deep/ .ant-card-meta-title {
    margin-bottom: 4px;
  }

  /deep/ .ant-card-meta-description {
    height: 44px;
    overflow: hidden;
    line-height: 22px;
  }

  .cardItemContent1 {
    display: flex;
    height: 20px;
    margin-top: 16px;
    margin-bottom: -4px;
    line-height: 20px;

    > span {
      flex: 1 1;
      color: rgba(0,0,0,.45);
      font-size: 14px;
      color:red;
    }

    /deep/ .ant-pro-avatar-list {
      flex: 0 1 auto;
    }
  }
}
</style>
