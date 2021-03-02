<template>
  <div class="view">
    <p>Monsters</p>

    <b-table
    :data="data"
    paginated
    :total="total"
    :per-page="perPage"
    :loading="loading"
    
    @page-change="onPageChange"
    backend-pagination

    backend-filtering
    @filters-change="onFilter"
    
    backend-sorting
    :default-sort-direction="'desc'"
    :default-sort="['name', 'desc']"
    @sort="onSort">

    <b-table-column field="name" label="Name" sortable searchable v-slot="props">
        {{ props.row.name }}
    </b-table-column>

    <b-table-column field="challenge_rating" label="CR" sortable width="40" numeric v-slot="props">
        {{ props.row.challenge_rating }}
    </b-table-column>

    <b-table-column field="type" label="Type" sortable v-slot="props">
        {{ props.row.type }}
    </b-table-column>

    </b-table>

  </div>
</template>

<script>
import MonstersService from '../services/monstersService'

export default {
  name: 'Monsters',

  data() {
    return {
      data: [],
      perPage: 20,
      total: 0,
      page: 1,
      loading: false,
      filter: null
    }
  },

  methods: {
    onPageChange(page) {
      this.page = page
      this.loadAsyncData()
    },
    
    onSort(field, order) {
      this.sortField = field
      this.sortOrder = order
      this.loadAsyncData()

      console.log('SORTING ' + this.sortField + '  ' + this.sortOrder)
    },

    onFilter(filter) {
      this.filter = filter.name
      this.loadAsyncData()
    },

    async loadAsyncData() {
      this.loading = true

      let data = (await MonstersService.getMonsters(this.page, this.perPage, this.sortField, this.sortOrder, this.filter))
        .data
      this.data = data.results
      this.total = data.count

      this.loading = false
    }
  },

  created: async function() {
    this.loadAsyncData()
  },

  components: {
  }
}
</script>
