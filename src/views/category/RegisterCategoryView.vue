<template>
  <div>
    <h1>Registrar Categorias</h1>
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
        <label for="name">Category name:</label>
        <input type="text" id="name" v-model="form.name" :class="{ 'is-invalid': errors.name }"
          placeholder="Type name" />
        <div v-if="errors.name" class="invalid-feedback">{{ errors.name }}</div>
      </div>

      <div class="form-group">
        <label for="type">Type:</label>
        <select id="type" v-model="form.type" :class="{ 'is-invalid': errors.type }">
          <option :value="type" v-for="(type, index) in typeList" :key="`type-${index}`">{{ type }}
          </option>
        </select>
        <div v-if="errors.type" class="invalid-feedback">{{ errors.type }}</div>
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
      typeList: [
        "income",
        "expense"
      ],
      form: {
        name: '',
        type: '',
        userId: null,
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

      if (!this.form.type) {
        this.errors.type = 'type is required';
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
          name: '',
          type: '',
          userId: null
        };
      }
    },
    save() {
      const vm = this;
      this.axios.post(this.baseUrl + "/categories", this.form)
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