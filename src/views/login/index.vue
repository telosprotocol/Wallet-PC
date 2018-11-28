<template>
  <div class="login">
    <hamburger/>
    <div class="wrapper">
      <div class="login-area">
        <div class="title">Please Login</div>
        <div class="login-item" @click="facebookLogin">
          <img src="@/assets/images/login/facebook.png" class="logoimage">
          <div class="loginapp">Facebook</div>
        </div>
        <div class="login-item google-item" @click="googleLogin">
          <img src="@/assets/images/login/google.png" class="logoimage googleimage">
          <div class="loginapp googleentry">Google</div>
        </div>
        <div v-if="show" class="login-loading">
          <img src="@/assets/images/loading.gif" class="loading-image">
          <div class="loading">loading...</div>
        </div>
      </div>
    </div>
    <common-footer/>
  </div>
</template>

<script>
import Hamburger from '@/components/Hamburger'
import CommonFooter from '@/components/pages/common/Footer'
import firebase from 'firebase'

export default {
  name: 'Login',
  components: {
    Hamburger,
    CommonFooter
  },
  data() {
    return {
      uid: '',
      displayName: '',
      photoURL: '',
      email: '',
      providerId: '',
      accessToken: '',
      show: false
    }
  },
  computed: {
    loginSuc() {
      return this.$store.state.user.uid !== 0
    }
  },
  watch: {
    loginSuc: function(val, oldval) {
      if (val) {
        if (this.$route.params.type === 'activepage') {
          this.$router.push('/activepage')
        } else {
          this.$router.push('/testnet/wallet')
        }
      }
    }
  },
  methods: {
    getUserInfo() {
      return {
        uid: this.uid,
        displayName: this.displayName,
        photoURL: this.photoURL,
        email: this.email,
        providerId: this.providerId,
        accessToken: this.accessToken,
        federatedId: '',
        code: localStorage.getItem('code')
      }
    },
    // Facebook登录
    facebookLogin() {
      var provider = new firebase.auth.FacebookAuthProvider()
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          const data = result.user.providerData[0]
          this.uid = data.uid
          this.displayName = data.displayName
          this.photoURL = data.photoURL
          this.email = data.email
          this.providerId = data.providerId
          this.accessToken = result.credential.accessToken
          this.show = true
          this.$store.dispatch('Login', this.getUserInfo())
          localStorage.removeItem('code')
        })
        .catch(error => {
          console.log(error)
        })
    },
    // google登录
    googleLogin() {
      var provider = new firebase.auth.GoogleAuthProvider()
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          this.show = true
          const data = result.user.providerData[0]
          this.displayName = data.displayName
          this.uid = data.uid
          this.photoURL = data.photoURL
          this.email = data.email
          this.providerId = data.providerId
          this.accessToken = result.credential.accessToken
          this.$store.dispatch('Login', this.getUserInfo())
          localStorage.removeItem('code')
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
.login {
  width: 100%
  background: #f5f5f5

  .wrapper {
    background: url('../../assets/images/login/background.jpg') no-repeat
    background-size:100%
    width: 100%
    padding: 210px 0px
    .login-area {
      position relative
      width: 25%
      margin: 0 auto
      height: 300px
      background-color: #ffffff
      box-shadow: 0px 10px 16px 0px rgba(69, 90, 117, 0.1)
      border-radius: 8px
      opacity: 0.9
      padding: 57px 0 62px 0

      .title {
        color: #000
        font-weight: 600
        font-size: 18px
        font-weight: 550
        margin: 0 auto
        text-align: center
      }

      .login-item {
        width: 59.5%
        height: 48px
        background-color: #3b5998
        border-radius: 6px
        background: #0E1456
        margin: 0 auto
        margin-top: 36px
        cursor: pointer
        overflow: hidden

        .logoimage {
          float: left
          width: 5.8%
          height: 27px
          margin: 10px 0 10px 33px
        }

        .googleimage {
          width: 42px
          height: 42px
          margin: 3px 0 2px 14px
        }

        .loginapp {
          float: left
          margin-left: 18%
          font-weight: 550
          color: #fff
          font-size: 16px
          line-height: 48px
        }

        .googleentry {
          color: #1f233a
        }
      }

      .google-item {
        background-color: #fcfdfe
        border: solid 1px #c7d9e6
      }
      .loading-image{
        position :absolute
        left: 0
        right: 0
        top:0
        bottom:0
        margin-left: auto
        margin-right: auto
      }
      .loading{
        position:absolute
        left:45%
        top:50%
      }
    }
  }
}
</style>
