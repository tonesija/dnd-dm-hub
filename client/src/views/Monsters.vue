<template>
  <div class="view">
    <p>Monsters</p>

    <b-field grouped group-multiline>
      <b-button label="Reset filters" @click="resetFilters"></b-button>
    </b-field>

    <b-table
    :data="data"
    paginated
    :total="total"
    :per-page="perPage"
    :loading="loading"
    hoverable
    @click="rowClicked"
    
    @page-change="onPageChange"
    backend-pagination

    backend-filtering
    @filters-change="onFilter"
    
    backend-sorting
    :default-sort-direction="'asc'"
    :default-sort="['name', 'asc']"
    @sort="onSort">

    <b-table-column field="name" label="Name" sortable searchable>
      <template
          #searchable="props">
          <b-input
              v-model="props.filters['name']"
              placeholder="Search..."
              size="is-small" />
      </template>
      <template v-slot="props">
          {{ props.row['name'] }}
      </template>
    </b-table-column>

    <b-table-column field="challenge_rating" label="CR" sortable :custom-sort="crSort" searchable width="100" numeric v-slot="props">
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
      filter: null,
      cr: null
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
      if(filter.name){
        this.filter = filter.name
        console.log('Filtering by Name!', this.filter)
      } else this.filter = null

      if(filter.challenge_rating){
        this.cr = filter.challenge_rating
        console.log('Filtering by CR!', this.cr)
      } else this.cr = null

      this.loadAsyncData()
    },

    crSort(a, b, isAsc){
      if(isAsc)
      return a.challenge_rating < b.challenge_rating
      else
      return a.challenge_rating > b.challenge_rating
    },

    async loadAsyncData() {
      this.loading = true

      let data = (await MonstersService.getMonsters(this.page, this.perPage, this.sortField, this.sortOrder, this.filter, this.cr))
        .data
      this.data = data.results
      this.total = data.count

      this.loading = false
    },

    resetFilters(){
      this.cr = null
      this.filter = null
      this.loadAsyncData()
    },

    rowClicked(row) {
      console.log('Row clicker, ', row)
      this.$router.push('/monsters/' + row.slug)
    }
  },

  created: async function() {
    this.loadAsyncData()
  },

  components: {
  }
}
</script>
