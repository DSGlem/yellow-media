<template>
  <div class="form">
    <p
      v-if="initialNumber"
      :class="['initial-value', { 'initial-value--even': isEvenInitialNumber }]"
    >
      initial value: <b>{{ initialNumber }}</b>
    </p>
    <form action="" @submit.prevent="handleFormSubmit" @reset="hadleFormReset">
      <label for="">
        <!-- when input doesn't have "type='number'" v-model.number returns '44' in case with '44jhjfdgergr'. -->
        <input type="number" v-model.lazy="inputData" />
      </label>
      <p class="form__errors">
        <span v-show="isTouched"> {{ errorsList }}</span>
      </p>
      <button type="submit" :disabled="!isSubmitAllowed">Set</button>
      <button type="reset">Clear</button>
    </form>
  </div>
</template>
<script>
import { FORM_ERRORS } from "@/constants";
import { isEvenNumber, isNumber } from "@/helpers";
export default {
  data() {
    return {
      errors: [],
      initialNumber: null,
      testNumber: null,
      testLocalKey: "num23",
      isTouched: false,
    };
  },
  created() {
    this.inputData = localStorage.getItem(this.testLocalKey)
      ? parseFloat(localStorage.getItem(this.testLocalKey))
      : null;
    this.initialNumber = this.inputData;

    this.unwatchTestNumber = this.$watch("testNumber", (newVal) => {
      if (newVal) {
        this.unwatchTestNumber();
        this.isTouched = true;
      }
    });
  },
  computed: {
    inputData: {
      set: function (value) {
        if (isNumber(value)) {
          this.testNumber = parseFloat(value);
          this.removeError(FORM_ERRORS.VALUE);
          return;
        }
        if (!this.isErrorExist(FORM_ERRORS.VALUE) && !isNumber(value)) {
          this.errors.push(FORM_ERRORS.VALUE);
        }
      },
      get: function () {
        return this.testNumber;
      },
    },
    errorsList() {
      return this.errors.map((item) => item.text).join(",");
    },
    isEvenInitialNumber() {
      return isEvenNumber(this.initialNumber);
    },
    isSubmitAllowed() {
      return isNumber(this.inputData) && !this.errors.length;
    },
  },
  methods: {
    removeError(error) {
      if (this.errors.length) {
        const index = this.errors.find((item) => item.value !== error.value);
        this.errors.splice(index);
      }
    },
    isErrorExist(error) {
      if (
        this.errors.find((item) => item.value === error.value) &&
        this.errors.length
      ) {
        return true;
      }
      return false;
    },
    handleFormSubmit() {
      if (this.inputData) {
        this.removeError(FORM_ERRORS.EMPTY);
        localStorage.setItem(this.testLocalKey, this.inputData);
        return;
      }

      if (!this.isErrorExist(FORM_ERRORS.EMPTY) && !this.inputData) {
        this.errors.push(FORM_ERRORS.EMPTY);
      }
    },
    hadleFormReset() {
      this.errors = [];
      this.inputData = null; // native behavior removes value in input, but v-model don't set new value
      localStorage.removeItem(this.testLocalKey);
    },
  },
};
</script>
<style lang="scss" scoped>
$evenNumberColor: var(--color-font-active);
$oddNumberColor: var(--color-font-error);
.form__errors {
  color: var(--color-font-error);
}
.initial-value {
  color: $oddNumberColor;
}
.initial-value--even {
  color: $evenNumberColor;
}
</style>
