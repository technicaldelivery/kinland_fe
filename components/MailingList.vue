<template>
<div class="email-form-wrapper">
  <div class="close-background" @click="$emit('close')"></div>
  <div
    class="email-form" 
    :class="{ 'submitted': submitted }"
    :style="{ backgroundColor: backgroundColor }"
  >
    <!-- <IconCross @click.native="$emit('close')" inactive="white" active="black" /> -->
    <div class="close" :class="{ 'submitted': submitted }">
      <button 
        class="ts-s small-caps"
        @click="$emit('close')"
      >
        close
      </button>
    </div>
    <div v-if="!submitted" class="title">
      <h4>Sign up for the Kinland newsletter</h4>
    </div>
    <!-- <p>For updates on our activities, please feel free </p> -->
    <div v-if="!submitted" class="subscribe">
      <div class="inputs">
        <input
          @click.stop
          autofocus
          type="text"
          name="First Name"
          v-model="firstName"
          placeholder="First Name"
          autocomplete="off"
        >
        <input
          @click.stop
          autofocus
          type="text"
          name="Surname"
          v-model="secondName"
          placeholder="Surname"
          autocomplete="off"
        >
        <input
          @click.stop
          autofocus
          type="text"
          name="Email Subscription"
          v-model="email"
          placeholder="Email Address"
          autocomplete="off"
        >
      </div>
    </div>
    <!-- <div v-if="!submitted" class="legal">
      By subscribing you give us permission to receive and manage this data. For information on how we will process and protect your data, please see our <a class="underline" href="#">Privacy Policy</a>.
    </div> -->
    <button v-if="!submitted" class="subscribe-button ts-s small-caps" @click.stop="subscribe(email, firstName, secondName)" type="button" name="button">submit</button>
    <div class="submitted ts-s small-caps" v-else-if="submitted && error">
      we were unable to subscribe you, you may have subscribed already
    </div>
    <div class="submitted ts-s small-caps" v-else>
      thank you for subscribing
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    backgroundColor: {
      type: String,
      default: 'white'
    }
  },
  data() {
    return {
      email: '',
      firstName: '',
      secondName: '',
      submitted: false,
      notification: true,
      mailingList: true,
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      error: false
    }
  },
  computed: {
    isEmailValid() {
      return (this.email == "") ? "" : (this.reg.test(this.email)) ? 'has-success' : 'has-error';
    },
  },
  methods: {
    async subscribe(address, firstName, secondName) {
      if (this.email === '' || this.firstName === '' || this.secondName === '') {
        alert('Please enter information')
      } else {
        if (this.isEmailValid === 'has-success') {
          try {
            await this.$axios.post(
              '/.netlify/functions/subscribe',
              {
                email: this.email,
                firstName: this.firstName,
                secondName: this.secondName,
                headers: { 'Access-Control-Allow-Origin': '*' }
              }
            )
            this.submitted = true;
            this.$emit('submit')
          } catch (e) {
            this.submitted = true;
            this.error = true;
          }
        } else {
          alert('Error: Please enter a valid email address.')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.email-form-wrapper {
  position: fixed;
  top: 0; right: 0; bottom: 0; left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  // backdrop-filter: blur(1em);
}
.close-background {
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  z-index: -1;
}

.email-form {
  padding: calc(4 * var(--fm));
  background-color: white;
  color: black;
  transform: translateZ(0);
  display: flex;
  flex-direction: column;
  @include desktop { width: 50%; }
  @include laptop { width: 50%; }
  @include tablet {  width: calc(100% - 2 * var(--fm)); }
  @include phone { 
    width: 100%;
    margin: var(--fm);
    // width: calc(100% - 2 * var(--fm));
    padding: var(--fm);
  }
  &.submitted {
    @include phone {
      // padding: 0;
      flex-direction: column-reverse;
    }
  }
  .close {
    position: absolute;
    right: 0;
    padding: var(--fm);
    @include tablet-and-laptop-and-desktop {
      top: 0;
    }
    @include phone {
      bottom: 0;
    }
    &.submitted {
      @include phone {
        position: relative;
        padding-bottom: 0;
      }
    }
  }
  .title {
    width: 100%;
    transform: translateZ(0);
    display: flex;
    @include typography-medium;
  }
  h4 {
    flex: 1;
    // margin-bottom: var(--fm);
  }
  .title, .submitted {
    // @include phone {
    //   padding-right: calc(2 * var(--fm));
    // }
  }
  .subscribe {
    display: flex;
    align-items: flex-end;
    margin: calc(4 * var(--fm)) 0;
    @include typography-medium;
    .inputs {
      width: 100%;
      border-top: 1px solid black;
      .names {
        display: flex;
        // margin: calc(0.25 * var(--fm)) 0;
        input {
          &:nth-child(1) {
            // margin-right: calc(0.25 * var(--fm));
          }
          &:nth-child(2) {
            // margin-left: calc(0.25 * var(--fm));
          }
        }
      }
    }
    input, button {
      padding: calc(0.25 * var(--fm)) 0;
    }
    input {
      font-family: inherit;
      color: inherit;
      width: 100%;
      background-color: inherit !important;
      border-bottom: 1px solid black;
      -webkit-box-shadow: none;
      &::placeholder {
        color: inherit;
      }
      &:focus {
        outline: none;
      }
      &:-internal-autofill-selected {
        background-color: inherit !important;
      }
      &:-internal-autofill-previewed {
        background-color: inherit !important;
      }
      &:-webkit-autofill {
        -webkit-text-fill-color: inherit !important;
      }
    }
  }
  .subscribe-options {
    label {
      display: block;
    }
    input {
      opacity: 0;
      position: absolute;
    }
    .radio-indicator {
      width: 0.75em;
      height: 0.75em;
      border: 1px solid black;
      border-radius: 50%;
      // margin: .25em;
      &.selected {
        background-color: black;
      }
    }
  }
  .radio-group {
    width: 100%;
    .radio {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      cursor: pointer;
      input {
        opacity: 0;
        position: absolute;
      }
      .radio-indicator {
        width: 0.75em;
        height: 0.75em;
        border: 1px solid black;
        // border-radius: 50%;
        // margin: .25em;
        &.selected {
          background-color: black;
        }
      }
      .radio-caption {
        flex-grow: 1;
        padding: 0.5em;
      }
      .radio-label {
        padding-left: 0.5em;
      }
    }
  }
  .subscribe-button {
    align-self: flex-start;
    // background-color: white;
    // color: black;
    // border-color: white;
    // margin-top: var(--fm);
    // padding: var(--m-s-half) var(--m-s-half) calc(0.25 * var(--fm)) var(--m-s-half);
    // border: 1px solid white;
    &:hover {
    // background-color: black;
    // color: white;
    // border-color: black;
    }
  }
}

input:-webkit-autofill { transition: all 0s 50000s; }

</style>
