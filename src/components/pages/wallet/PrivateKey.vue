<template>
  <div class="hello">
  <!-- {{ privateKey }}
    {{ publicKey }} -->
  <!-- <h1>{{ msg }}</h1> -->
  <!-- <h2>Essential Links</h2> -->
  <!-- <ul> -->
  <!-- <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
        <br>
        <a> address: {{ address }}</a>
        <br>
        <a> digest: {{ digest }}</a>
        <br>
        <a> sign: {{ sign }}</a>
        <br>
        <a> {{ publicKey }}</a>
      </li>
      {{ base64 }} -->
  <!-- </ul> -->
</div></template>

<script>
// import crypto from "crypto";
// import exp from "ecdsa/lib/index.js";
// import { byteLength, toByteArray, fromByteArray } from 'base64-js'
import { fromByteArray } from 'base64-js'
import bitcoinjs from 'bitcoinjs-lib'
import { accountCreate } from '@/api/fetch'
import { getInfo } from '@/utils/common'

const Base64 = require('js-base64').Base64
export default {
  name: 'PrivateKey',
  data() {
    return {
      key: null,
      base64: '',
      privateKey: '',
      publicKey: '',
      digest: '',
      sign: '',
      address: '',
      keyData: ''
    }
  },
  created: function() {
    this.genKey()
  },
  mounted: function() {
    this.accountCreate2()
  },
  methods: {
    // 随机生成私钥
    genKey() {
      if (!localStorage.privateKey) {
        // var exp = exp;
        // var secp256k1 = secp256k1;
        var bitjs = bitcoinjs
        var ecpair = bitjs.ECPair.makeRandom()
        var privateKey = ecpair.privateKey
        var publicKey = ecpair.publicKey
        var ribhash = bitjs.crypto.ripemd160(publicKey)
        var address = bitjs.address.toBase58Check(ribhash, 1)
        // var wif = bitjs.ECPair.fromWIF(ecpair.toWIF(), 0)
        this.privateKey = privateKey
        this.publicKey = publicKey
        this.address = 'T-' + address
        var tx = {
          transaction_type: 0,
          sender_addr: this.address,
          receiver_addr: this.address,
          property_key: '$$',
          transaction_params: '',
          timestamp: '0',
          last_msg_digest: '0',
          random_nounce: '0',
          work_proof: '0'
        }

        var str =
          tx.sender_addr +
          tx.receiver_addr +
          tx.property_key +
          tx.transaction_params +
          tx.transaction_type +
          tx.timestamp +
          tx.random_nounce +
          tx.work_proof +
          tx.last_msg_digest
        // console.log('hash str:' + str)
        var digest = bitjs.crypto.sha256(str)
        this.digest = fromByteArray(digest)
        //   var digest1 = toByteArray(this.digest)
        // let signature = ecpair.sign(digest);
        // var tx = new bitjs.TransactionBuilder()
        // tx.addInput(this.address, 0)
        // tx.addOutput(this.address, 0)
        var txSign = ecpair.sign(digest)
        // let signature1 = new Uint8Array(signature,1,64)
        // signature1[0]=1
        this.sign = fromByteArray(txSign)
        // localStorage.sign = this.sign
      }
    },
    // 后台请求创建账号
    accountCreate2() {
      let vm = this
      if (!localStorage.privateKey) {
        accountCreate(this.address, this.sign)
          .then(res => {
            this.keyData = res
            // 存储私钥
            if (this.keyData.Result === 1) {
              this.privateKey = Base64.encode(this.privateKey) // base64加密私钥
              localStorage.privateKey = this.privateKey
              getInfo(vm, this.address)
              this.address = Base64.encode(this.address)
              localStorage.account = this.address
              this.$store.commit('SetAccount', this.address)
            }
          })
          .catch(res => {
            alert(res)
          })
      } else {
        this.$store.commit('SetAccount', localStorage.getItem('account'))
        this.address = Base64.decode(localStorage.getItem('account'))
        getInfo(vm, this.address)
      }
    }
  }
}
</script>

<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
