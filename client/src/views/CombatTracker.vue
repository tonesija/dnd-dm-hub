<template>
  <div class="view">
    <p class="title">Combat Tracker</p>

    <b-table
    :data="data"
    hoverable>
      <b-table-column field="name" label="Name" sortable v-slot="props">
        {{props.row.name}}
      </b-table-column>

      <b-table-column field="initiative" label="Initiative" :custom-sort="initiativeSort" sortable width="75" numeric v-slot="props">
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

    <div class="separator"></div>

    <b-field grouped label="Add a creature">
        <b-field label="Monster name" label-position="on-border">
            <b-input placeholder="Monster name" v-model="newName"></b-input>
        </b-field>
        <b-field label="Initiative" label-position="on-border" expanded>
            <b-input maxlength="2" placeholder="Initiative" v-model="newInitiative"></b-input>
        </b-field>
        <b-field label="Hit points" label-position="on-border" expanded>
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
      if(!this.newName){
        this.toast("You must provide a creature name.")
        return
      }
      let newCreature = {
        name: this.newName,
        initiative: this.newInitiative,
        hp: this.newHP
      }
      this.data.push(newCreature)

      this.newName = null
      this.newInitiative = null
      this.newHP = null
    },

    handleKeyPress(e){
      if(e.key == 'Enter'){
        this.addCreature()
      }
    },

    remove(row){
      let index = 0
      for(let obj of this.data){
        if(obj.name == row.name)
          break
        index++
      }
      this.data.splice(index, 1)
    },
    toast(msg) {
      this.$buefy.toast.open({
          duration: 1500,
          message: msg,
          position: 'is-bottom',
          type: 'is-primary'
      })
    },

    initiativeSort(a, b, isAsc) {
      if(isAsc)
      return parseInt(a.initiative) < parseInt(b.initiative)
      else
      return parseInt(a.initiative) > parseInt(b.initiative)
    }
  },

  mounted() {
    window.addEventListener('keydown', this.handleKeyPress);
  },

  destroyed() {
    window.removeEventListener("keydown", this.handleKeyPress)
  }
}
</script>
