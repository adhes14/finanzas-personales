<template>
  <div>
    <h1>Create periods</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="user">User:</label>
        <select id="user" v-model="form.userId" :class="{ 'is-invalid': errors.userId }">
          <option :value="user.id" v-for="(user, index) in userList" :key="`user-${index}`">{{
            user.name }}
          </option>
        </select>
        <div v-if="errors.userId" class="invalid-feedback">{{ errors.userId }}</div>
      </div>

      <div class="form-group">
        <label for="description">Description:</label>
        <input type="text" id="description" v-model="form.description" :class="{ 'is-invalid': errors.description }"
          placeholder="Type description" />
        <div v-if="errors.description" class="invalid-feedback">{{ errors.description }}</div>
      </div>

      <div class="form-group">
        <label for="start_date">Start date:</label>
        <input type="date" id="start_date" v-model="form.start_date" :class="{ 'is-invalid': errors.start_date }"
          placeholder="Type start date" />
        <div v-if="errors.start_date" class="invalid-feedback">{{ errors.start_date }}</div>
      </div>

      <div class="form-group">
        <label for="end_date">End date:</label>
        <input type="date" id="end_date" v-model="form.end_date" :class="{ 'is-invalid': errors.end_date }"
          placeholder="Type end date" />
        <div v-if="errors.end_date" class="invalid-feedback">{{ errors.end_date }}</div>
      </div>

      <button type="submit" class="btn btn-primary">Create</button>
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'RegisterCategory',
  data() {
    return {
      userList: [],
      form: {
        description: '',
        start_date: '',
        end_date: '',
        userId: null,
      },
      errors: {}
    };
  },
  methods: {
    ...mapActions(['increment']),
    validateForm() {
      this.errors = {};

      if (!this.form.description) {
        this.errors.description = 'Description is required';
      }

      if (!this.form.start_date) {
        this.errors.start_date = 'Start date is required';
      }

      if (!this.form.end_date) {
        this.errors.end_date = 'End date is required';
      }

      if (!this.form.userId) {
        this.errors.userId = 'User is required';
      }

      return Object.keys(this.errors).length === 0;
    },

    submitForm() {
      if (this.validateForm()) {
        // Enviar los datos al servidor
        this.save();
        // Reiniciar el formulario
        this.form = {
          description: '',
          start_date: '',
          end_date: '',
          userId: null,
        };
      }
    },
    save() {
      const vm = this;
      this.axios.post(this.baseUrl + "/periods", this.form)
        .then(function (response) {
          if (response.status == '201') {
            vm.$emit('on-register', response.data);
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
  },
  computed: {
    // propiedades computadas que dependen de otras propiedades reactivas
    ...mapState(['count']),
    ...mapGetters(['doubleCount', 'getBaseUrl']),
    baseUrl() {
      return this.getBaseUrl
    }
  },
  mounted() {
    this.getUserList();
  },
}
</script>

<style scoped></style>