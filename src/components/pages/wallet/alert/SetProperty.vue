
<template>
  <div ref="property" class="setProperty">
    <div class="toggle-area">
      <div class="toggle-key">Create Alias name</div>
      <div class="key-input">
        <span class="personalKey">Alias name:</span>
        <input v-model="property_value" type="text" name="text" placeholder="Special characters are not supported" class="input-text">
        <span/>
      </div>
      <div class="attention">*The alias name you have applied will be created  when it reaches a consensus on chain. It can not be modified once it has been created.</div>
      <div class="sure-close">
        <span class="sure" @click="createProperty">Yes</span>
        <span class="sure close" @click="closeProperty">Cancel</span>
      </div>
    </div>
  </div>
</template>

<script>
import { setProperty } from '@/api/fetch'
import { getProperty, genKey } from '@/utils/common'
export default {
  name: 'SetProperty',
  data() {
    return {
      property_value: '',
      sign: ''
    }
  },
  computed: {
    property_str() {
      return this.$store.state.user.alias
    }
  },
  watch: {
    property_value(newVal, oldVal) {
      var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
      if (pattern.test(newVal)) {
        this.property_value = oldVal
      } else {
        this.property_value = newVal
      }
      var len = 0
      for (var i = 0; i < newVal.length; i++) {
        var c = newVal.charCodeAt(i)
        if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
          len++
        } else {
          len += 2
        }
      }
      if (len > 12) {
        this.property_value = oldVal
      }
    }
  },
  created() {
    getProperty(this)
  },
  mounted() {
    this.creationProperty()
  },
  methods: {
    creationProperty() {
      if (!localStorage.getItem('property')) {
        this.show = true
      } else {
        this.show = false
      }
    },
    // 关闭创建property窗口
    closeProperty() {
      this.$refs.property.style.display = 'none'
      this.property_value = ''
      this.$store.commit('SetShowProp', false)
    },
    createProperty() {
      if (!this.property_value.trim()) {
        this.$toast({
          'toastMsg': 'Alias name must not be empty'
        })
        return
      }
      let account = this.$store.state.user.address
      let propertyKey = '@name'
      let propertyValue = this.property_value
      let lasthash = this.$store.state.user.lasthash
      genKey(this)
      setProperty(account, propertyKey, propertyValue, lasthash, this.sign).then(res => {
        if (res.Result === 1) {
          this.$toast({
            'toastMsg': 'Alias name creation success'
          })
          this.property_value = ''
          getProperty(this)
          localStorage.setItem('alias', propertyValue)
          this.$store.commit('SET_USER_PROP', propertyValue)
          // getInfo(this, account)
          // localStorage.setItem('property', propertyValue)
        } else {
          this.$toast({
            'toastMsg': 'Property creation failed, please try again later'
          })
        }
        this.show = false
        this.closeProperty()
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.setProperty
  position:absolute
  left:0
  top:0
  width:100%
  height:100%
  background:rgba(0,0,0,0.6)
  z-index:999
  .toggle-area
    width:500px
    height 240px
    background :#ff0
    position: fixed
    left: 50%
    top: 30%
    // display: none
    width: 500px
    height: 240px
    background: #fff
    padding: 20px
    transform translate(-50%)
    z-index:1000
    .toggle-key
      font-size: 16px
      font-weight: 550
    .key-input
      margin-top: 15px
      .personalKey
        display:inline-block
        margin-right: 15px
        color #444444
      .input-text
        padding-left:10px
        height: 40px
        width: 300px
        border:1px solid rgba(89,104,240,1)
    .attention
      margin-top:30px
      color #888888
      font-size 14px
    .sure-close
      margin-top: 30px
      .sure
        display: inline-block
        width: 80px
        height: 30px
        color: #ffffff
        text-align:center
        line-height: 30px
        background:#5968F0
        margin-right: 20px
        cursor pointer
      .close
        background:#ccc
        border:1px solid #cccccc
</style>
