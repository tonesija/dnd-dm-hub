<template>
  <div class="view">
    <p class="title">Combat Tracker</p>

    <b-table
    :data="data"
    hoverable
    draggable>
      <b-table-column field="name" label="Name" sortable v-slot="props">
        {{props.row.name}}
      </b-table-column>

      <b-table-column field="initiative" label="Initiative" sortable width="75" numeric v-slot="props">
          <b-input v-model="props.row.initiative"></b-input>
      </b-table-column>

      <b-table-column field="hp" label="HP" sortable width="75" numeric v-slot="props">
          <b-input v-model="props.row.hp"></b-input>
      </b-table-column>

      <b-table-column field="effects" label="Effects" v-slot="props">
        <b-input v-model="props.row.effects"></b-input>
      </b-table-column>

      <b-table-column width="100" v-slot="props">
          <b-button @click="remove(props.row)">X</b-button>
      </b-table-column>
    </b-table>

    <b-field grouped>
        <b-field>
            <b-input placeholder="Monster name" v-model="newName"></b-input>
        </b-field>
        <b-field expanded>
            <b-input maxlength="2" placeholder="Initiative" v-model="newInitiative"></b-input>
        </b-field>
        <b-field expanded>
            <b-input maxlength="2" placeholder="HP" v-model="newHP"></b-input>
        </b-field>
        <b-field expanded>
            <b-button type="is-primary" @click="addCreature">Add</b-button>
        </b-field>
    </b-field>

  </div>
</template>

<script>
export default {
  name: 'Monsters',

  data() {
    return {
      data: [],
      newName: null,
      newInitiative: null,
      newHP: null
    }
  },

  methods: {
    onSort(field, order) {
      console.log(field, order)
    },
    rowClicked(row) {
      console.log('Row clicker, ', row)
    },
    addCreature(){
      let newCreature = {}
      newCreature.name = this.newName
      newCreature.initiative = this.newInitiative
      newCreature.hp = this.newHP

      this.data.push(newCreature)

      this.newName = null
      this.newInitiative = null
      this.newHP = null
    },

    remove(row){
      let index = 0
      for(let obj of this.data){
        if(obj.name == row.name)
          break
        index++
      }
      this.data.splice(index, 1)
    }
  },

  created: async function() {
  },

  components: {
  }
}
</script>
