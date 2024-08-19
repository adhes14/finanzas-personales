<template>
  <div>
    <h1>Create a user</h1>
    <form @submit.prevent="submitForm()">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="form.name" :class="{ 'is-invalid': errors.name }"
          placeholder="Type a name" />
        <div v-if="errors.name" class="invalid-feedback">{{ errors.name }}</div>
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="form.email" :class="{ 'is-invalid': errors.email }"
          placeholder="type an email" />
        <div v-if="errors.email" class="invalid-feedback">{{ errors.email }}</div>
      </div>

      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="form.password" :class="{ 'is-invalid': errors.password }"
          placeholder="Type a valid password"></input>
        <div v-if="errors.password" class="invalid-feedback">{{ errors.password }}</div>
      </div>

      <button type="submit" class="btn btn-primary">Create</button>
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'RegisterUserView',
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: ''
      },
      errors: {}
    };
  },
  methods: {
    ...mapActions(['increment']),
    validateForm() {
      this.errors = {};

      if (!this.form.name) {
        this.errors.name = 'Name is required';
      }

      if (!this.form.email) {
        this.errors.email = 'Email is required';
      } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(this.form.email)) {
        this.errors.email = 'Email is not valid';
      }

      if (!this.form.password) {
        this.errors.password = 'Password is required';
      }

      return Object.keys(this.errors).length === 0;
    },

    submitForm() {
      if (this.validateForm()) {
        // Enviar los datos al servidor
        this.save();
        // Reiniciar el formulario
        this.form = {
          name: '',
          email: '',
          password: ''
        };
      }
    },
    save() {
      const vm = this;
      this.axios.post(this.baseUrl + "/users", this.form)
        .then(function (response) {
          if (response.status == '201') {
            vm.$emit('on-register', response.data);
          }
          console.log(response);
          vm.itemList = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  },
  computed: {
    // propiedades computadas que dependen de otras propiedades reactivas
    ...mapState(['count']),
    ...mapGetters(['doubleCount', 'getBaseUrl']),
    baseUrl() {
      return this.getBaseUrl
    }
  },
}
</script>

<style scoped></style>