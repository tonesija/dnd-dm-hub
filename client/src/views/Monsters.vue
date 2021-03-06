<template>
  <div class="view">
    <p class="bold main-title">Monsters</p>

    <b-table
    :data="data"
    paginated
    :total="total"
    :per-page="perPage"
    :loading="loading"
    hoverable
    
    @page-change="onPageChange"
    backend-pagination

    backend-filtering
    @filters-change="onFilter"
    
    backend-sorting
    :default-sort-direction="'asc'"
    :default-sort="['name', 'asc']"
    @sort="onSort"
    
    class="bold">

    <b-table-column field="name" label="Name" sortable searchable>
      <template
          #searchable="props">
          <b-input
              v-model="props.filters['name']"
              placeholder="Search..."/>
      </template>
      <template v-slot="props">
        <router-link :to="'monsters/' + props.row.slug">
          <span class="bold">
            {{ props.row['name'] }}
          </span>
        </router-link>
        
      </template>
    </b-table-column>

    <b-table-column class="bold" field="challenge_rating" label="CR" sortable :custom-sort="crSort" searchable width="100" numeric v-slot="props">
        <span class="bold">
          {{ props.row.challenge_rating }}
        </span>
    </b-table-column>
    <b-table-column class="bold" field="hit_points" label="Hit points" sortable width="100" numeric v-slot="props">
        <span class="bold">
          {{ props.row.hit_points }}
        </span>
    </b-table-column>

    <b-table-column field="type" label="Type" sortable v-slot="props">
          <span>
            {{ props.row['type'] }}
          </span>
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
      nameFilter: null,
      crFilter: null
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
        this.nameFilter = filter.name
        console.log('Filtering by Name!', this.nameFilter)
      } else this.nameFilter = null

      if(filter.challenge_rating){
        this.crFilter = filter.challenge_rating
        console.log('Filtering by CR!', this.crFilter)
      } else this.crFilter = null

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

      let data = (await MonstersService.getMonsters(
          this.page, this.perPage, this.sortField, this.sortOrder, 
          this.nameFilter, this.crFilter)).data
      this.data = data.results
      this.total = data.count

      console.log(this.data)

      this.loading = false
    },

    resetFilters(){
      this.crFilter = null
      this.nameFilter = null
      this.loadAsyncData()
    }
  },

  created: async function() {
    this.loadAsyncData()
  },

  components: {
  }
}
</script>

<style scoped lang="scss">

</style>
