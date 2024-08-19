<template>
  <div>
    <h1>Editar Cita</h1>
    <form @submit.prevent="submitForm" v-if="form">
      <div class="form-group">
        <label for="user">User:</label>
        <select id="user" v-model="form.userId" :class="{ 'is-invalid': errors.userId }" @change="setData()">
          <option :value="user.id" v-for="(user, index) in userList" :key="`user-${index}`">{{
            user.name }}
          </option>
        </select>
        <div v-if="errors.userId" class="invalid-feedback">{{ errors.userId }}</div>
      </div>

      <div class="form-group">
        <label for="category">Category:</label>
        <select id="category" v-model="form.categoryId" :class="{ 'is-invalid': errors.categoryId }">
          <option :value="category.id" v-for="(category, index) in categoryList" :key="`cliente-${index}`">{{
            category.name }}
          </option>
        </select>
        <div v-if="errors.categoryId" class="invalid-feedback">{{ errors.categoryId }}</div>
      </div>

      <div class="form-group">
        <label for="period">Period:</label>
        <select id="period" v-model="form.periodId" :class="{ 'is-invalid': errors.periodId }">
          <option :value="period.id" v-for="(period, index) in periodList" :key="`cliente-${index}`">{{
            period.description }}
          </option>
        </select>
        <div v-if="errors.periodId" class="invalid-feedback">{{ errors.periodId }}</div>
      </div>

      <div class="form-group">
        <label for="frequency">Frequency:</label>
        <input type="text" id="frequency" v-model="form.frequency" :class="{ 'is-invalid': errors.frequency }"
          placeholder="Type frequency" />
        <div v-if="errors.frequency" class="invalid-feedback">{{ errors.frequency }}</div>
      </div>

      <div class="form-group">
        <label for="estimated_amount">Estimated amount:</label>
        <input type="number" id="estimated_amount" v-model="form.estimated_amount"
          :class="{ 'is-invalid': errors.estimated_amount }" placeholder="Type estimated_amount" />
        <div v-if="errors.estimated_amount" class="invalid-feedback">{{ errors.estimated_amount }}</div>
      </div>

      <button type="submit" class="btn btn-primary">Registrar</button>
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'PlanEditView',
  data() {
    return {
      userList: [],
      categoryList: [],
      periodList: [],
      form: {
        categoryId: null,
        periodId: null,
        frequency: null,
        estimated_amount: null,
      },
      errors: {}
    };
  },
  props: ['item'],
  methods: {
    ...mapActions(['increment']),
    validateForm() {
      this.errors = {};

      if (!this.form.userId) {
        this.errors.userId = 'User is required';
      }

      if (!this.form.categoryId) {
        this.errors.categoryId = 'Category is required';
      }

      if (!this.form.periodId) {
        this.errors.periodId = 'Period is required';
      }

      if (!this.form.frequency) {
        this.errors.frequency = 'Frequency is required';
      }

      if (!this.form.estimated_amount) {
        this.errors.estimated_amount = 'Estimated amount is required';
      }

      return Object.keys(this.errors).length === 0;
    },

    submitForm() {
      if (this.validateForm()) {
        // Enviar los datos al servidor
        this.save();
        // Reiniciar el formulario
        this.form = {
          userId: null,
          categoryId: null,
          periodId: null,
          frequency: null,
          estimated_amount: null,
        };
      }
    },
    save() {
      const vm = this;
      this.axios.patch(this.baseUrl + "/plans/" + this.item.id, this.form)
        .then(function (response) {
          if (response.status == '200') {
            vm.$emit('on-update', response.data);
          }
          vm.itemList = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    getUserList() {
      const vm = this;
      this.axios.get(this.baseUrl + "/users")
        .then(function (response) {
          vm.userList = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    setData() {
      const vm = this;
      this.axios.get(this.baseUrl + "/categories?userId=" + this.form.userId)
        .then(function (response) {
          vm.categoryList = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });

      this.axios.get(this.baseUrl + "/periods?userId=" + this.form.userId)
        .then(function (response) {
          vm.periodList = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
  },
  computed: {
    // propiedades computadas que dependen de otras propiedades reactivas
    ...mapState(['count']),
    ...mapGetters(['doubleCount', 'getBaseUrl']),
    baseUrl() {
      return this.getBaseUrl
    },
    form() {
      return Object.assign({}, this.item);
    }
  },
  mounted() {
    this.getUserList();
  },
}
</script>

<style scoped></style>