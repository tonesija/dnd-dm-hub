<template>
  <div class="view">
    <p class="title">Combat Tracker</p>

    <b-table
    :data="data"
    hoverable
    narrowed>
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
          <b-button @click="remove(props.row)" icon-left="trash-alt"></b-button>
      </b-table-column>
    </b-table>

    <div class="separator"></div>

    <b-field grouped group-multiline label="Add a creature">
        <b-field class="margin-top">
            <b-checkbox v-model="isPlayer"></b-checkbox>
        </b-field>
        <b-field class="margin-top" label="Creature" label-position="on-border">
            <b-autocomplete 
            placeholder="Creature name" 
            v-model="newName"
            :loading="isFetching"
            @typing="getAsyncData"
            @select="onAutocompleteSelect"
            :data="autocompleteNames"
            expanded>
          </b-autocomplete>
        </b-field>
        <b-field class="margin-top" label="Initiative" label-position="on-border">
            <b-numberinput controls-position="compact"
            v-model="newInitiative"></b-numberinput>
        </b-field>
        <b-field class="margin-top" label="Hit points" label-position="on-border">
            <b-numberinput controls-position="compact"
            v-model="newHP"></b-numberinput>
        </b-field>
  
        <b-field class="margin-top" expanded>
            <b-button type="is-primary" @click="addCreature" icon-right="plus">Add</b-button>
        </b-field>
    </b-field>

    <p class="sub-title title-footer">Monster sheets</p>
    <b-tabs type="is-boxed"
      v-if="monsters.length != 0" v-model="activeTab">
        <b-tab-item v-for="mon in monsters" :key="mon.slug">
            <template #header class="tab-header">
                <span> {{mon.name}} </span> <button @click="removeTab(mon.slug)" class="delete float-right"></button> 
            </template>
            <Monster :monster="mon"></Monster>
        </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import MonstersService from '../services/monstersService'

import Monster from '../components/Monster'

import Utility from '../utility'
export default {
  name: 'Monsters',

  data() {
    return {
      data: [],
      autocompleteData: [],
      autocompleteNames: [],
      newName: null,
      newInitiative: null,
      newHP: null,
      newSlug: null,
      isPlayer: false,
      isFetching: false,
      monsters: [],
      activeTab: 0
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
        baseName: this.newName,
        initiative: this.newInitiative,
        hp: this.newHP
      }
      this.data.push(newCreature)
      Utility.addNumbering(this.data)

      if(!this.isPlayer)
      MonstersService.getMonster(this.newSlug).then((res => {
        if(!Utility.isMonsterInArray(this.newSlug, this.monsters)){
          this.monsters.push(res.data)
        }
        
        
      })).catch(() => {
        //ignore
        console.log("dobroee")
      })
      
      this.newName = null
      this.newInitiative = null
      this.newHP = null
    },

    handleKeyPress(e){
      if(e.key == 'Enter'){
        this.addCreature()
      }
    },
    async getAsyncData(name){
      if(this.isPlayer) return
      if (!name.length) {
        this.autocompleteNames = []
        this.autocompleteData = []
        return
      }
      this.isFetching = true
      this.autocompleteData = (await MonstersService.getMonstersSearch(name)).data.results
      this.autocompleteNames = this.autocompleteData.map((item) => {
        return item.name
      })
      this.isFetching = false
    },
    async onAutocompleteSelect(name){
      if(this.isPlayer) return
      for(let mon of this.autocompleteData){
        if(mon.name == name){
          this.newSlug = mon.slug
          break
        }
      }
      let mon = (await MonstersService.getMonster(this.newSlug)).data
      this.newHP = mon.hit_points
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
    removeTab(slug){
      console.log("click")
      let i = 0
      for(let mon of this.monsters){
        if(slug == mon.slug){
          break
        }
        i++
      }
      this.monsters.splice(i, 1)
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
  },

  components: {
    Monster
  }
}
</script>

<style scoped>
  .tab-header {
    padding: 0px;
  }
  .margin-top {
    margin-top: 1em;
  }
</style>
