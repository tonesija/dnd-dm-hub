<template>
  <div class="view">
    <div v-if="mon">
      <MonsterInfo :monster="mon"></MonsterInfo>
    </div>
  </div>
</template>

<script>
import MonsterInfo from '../components/Monster'

import MonstersService from '../services/monstersService'
export default {
  name: 'Monster',

  data() {
    return {
      mon: null
    }
  },

  methods: {
  },

  created: async function() {
    this.mon = (await MonstersService.getMonster(this.$route.params.slug)).data
  },

  components: {
    MonsterInfo
  }
}
</script>

<style scoped>
  .action-text {
    margin-top: 4px;
  }
</style>
