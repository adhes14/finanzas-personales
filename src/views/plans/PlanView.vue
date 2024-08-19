<template>
  <div>
    <Modal v-model:modelValue="showModalNuevo">
      <PlanNewView @on-register="onRegister()" />
    </Modal>
    <Modal v-model:modelValue="showModalEdit">
      <PlanEditView @on-update="onUpdate()" :item="itemToEdit" />
    </Modal>
    <h1>Plans list</h1>
    <button @click="showModalNuevo = true" class="btn btn-primary">New</button>
    <button @click="buscar()" class="btn btn-lith" style="float:right">Search</button>
    <input type="search" style="float:right" v-model="textToSearch" @search="buscar()">
    <div style="margin: 20px 0;">
      <h3>Filters:</h3>
      <form @submit.prevent="filtrar()">
        <label for="category"> Category: </label>
        <select id="category" v-model="filter.categoryId">
          <option value="">All</option>
          <option :value="category.id" v-for="(category, index) in categoryList" :key="`category-${index}`">
            {{ category.name }}
          </option>
        </select>

        <label for="period"> Period: </label>
        <select id="period" v-model="filter.periodId">
          <option value="">All</option>
          <option :value="period.id" v-for="(period, index) in periodList" :key="`period-${index}`">
            {{ period.description }}
          </option>
        </select>
        <button type="submit" class="btn btn-lith">Filter</button>
      </form>
    </div>
    <table>
      <thead>
        <tr>
          <th>No.</th>
          <th>Category</th>
          <th>Period</th>
          <th>Frecuency</th>
          <th>Estimated amount</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in itemList" :key="index">
          <td>{{ 1 + index }}</td>
          <td>{{ item.category?.name }}</td>
          <td>{{ item.period?.description }}</td>
          <td>{{ item.frequency }}</td>
          <td>{{ item.estimated_amount }}</td>
          <td>
            <button @click="edit(item)" class="btn btn-dark" style="margin-right: 15px;">Edit</button>
            <button @click="Eliminar(item.id)" class="btn btn-danger">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Modal from '../../components/Modal.vue'
import PlanNewView from './PlanNewView.vue'
import PlanEditView from './PlanEditView.vue'

export default {
  name: 'PlanView',
  data() {
    return {
      currentPage: 1,
      totalPages: 100, // Este valor debe ser calculado según tus datos
      showModalNuevo: false,
      showModalEdit: false,
      itemToEdit: null,
      textToSearch: '',
      textToFilter: '',
      itemList: [],
      categoryList: [],
      periodList: [],
      path: '',
      filter: {
        start_date: null,
        end_date: null,
        categoryId: '',
        periodId: ''
      }
    }
  },
  components: {
    Modal,
    PlanNewView,
    PlanEditView
  },
  methods: {
    ...mapActions(['increment']),
    getList() {
      const vm = this;
      this.path = this.baseUrl + "/plans?_sort=start_date&_order=asc&_expand=category&_expand=period" + this.textToFilter + "&q=" + this.textToSearch;
      this.axios.get(this.path)
        .then(function (response) {
          vm.itemList = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    getCategoryList() {
      const vm = this;
      this.axios.get(this.baseUrl + "/categories")
        .then(function (response) {
          vm.categoryList = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    getPeriodList() {
      const vm = this;
      this.axios.get(this.baseUrl + "/periods")
        .then(function (response) {
          vm.periodList = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    edit(item) {
      this.itemToEdit = Object.assign({}, item);
      this.showModalEdit = true;
    },
    Eliminar(id) {
      if (confirm("¿Esta Seguro de eliminar el registro?")) {
        const vm = this;
        this.axios.delete(this.baseUrl + "/plans/" + id)
          .then(function (response) {
            vm.getList();
            vm.$toast.show("Registro eliminado.", "danger");
          })
          .catch(function (error) {
            console.error(error);
          });
      }

    },
    buscar() {
      this.getList();
    },
    filtrar() {
      this.textToFilter = '';
      if (this.filter.categoryId != null && this.filter.categoryId != '') {
        this.textToFilter += "&categoryId=" + this.filter.categoryId;
      }
      if (this.filter.periodId != null && this.filter.periodId != '') {
        this.textToFilter += "&periodId=" + this.filter.periodId;
      }
      this.getList();
    },
    onRegister(event) {
      this.getList();
      this.showModalNuevo = false;
      this.$toast.show('Registro exitoso', 'success');
    },
    onUpdate(event) {
      this.getList();
      this.showModalEdit = false;
      this.itemToEdit = null;
      this.$toast.show('Edicion exitosa', 'info');
    },
    showToast(message, type) {
      this.$toast.show(message, type);
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
  props: {
    // propiedades que el componente puede recibir.
  },
  mounted() {
    this.getList();
    this.getCategoryList();
    this.getPeriodList();
  },
  emits: [] // los eventos personalizados que el componente puede emitir.
}
</script>

<style></style>