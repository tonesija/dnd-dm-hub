<template>
  <div class="view" v-if="monster">
    <p class="title">{{monster.name}}</p>
    <p>{{monster.size}}, {{monster.type}}</p>

    <div class="separator"></div>

    <p><strong>Armor Class:</strong>  {{monster.armor_class}}</p>
    <p><strong>Hit Points:</strong>  {{monster.hit_points}}</p>
    <p><strong>Speed:</strong>  {{getSpeedString(monster.speed)}}</p>

    <div class="separator"></div>

    <b-table
      :data="abilityData">
      <b-table-column field="Strength" label="STR" v-slot="props" centered>
        {{props.row.Strength}} ({{getModifier(props.row.Strength)}})
      </b-table-column>
      <b-table-column field="Dexterity" label="DEX" v-slot="props" centered>
        {{props.row.Dexterity}} ({{getModifier(props.row.Dexterity)}})
      </b-table-column>
      <b-table-column field="Constitution" label="CON" v-slot="props" centered>
        {{props.row.Constitution}} ({{getModifier(props.row.Constitution)}})
      </b-table-column>
      <b-table-column field="Intelligence" label="INT" v-slot="props" centered>
        {{props.row.Intelligence}} ({{getModifier(props.row.Intelligence)}})
      </b-table-column>
      <b-table-column field="Wisdom" label="WIS" v-slot="props" centered>
        {{props.row.Wisdom}} ({{getModifier(props.row.Wisdom)}})
      </b-table-column>
      <b-table-column field="Charisma" label="CHA" v-slot="props" centered>
        {{props.row.Charisma}} ({{getModifier(props.row.Charisma)}})
      </b-table-column>
    </b-table>

    <div class="separator"></div>

    <p><strong>Saving throws:</strong> {{getSavingThrowsString(monster)}}</p>
    <p><strong>Skills:</strong>  {{getSkillsString(monster)}}</p>
    <p><strong>Damage Resistances:</strong>  {{monster.damage_resistances}}</p>
    <p><strong>Damage Immunities:</strong>  {{monster.damage_immunities}}</p>
    <p><strong>Senses:</strong>  {{monster.senses}}</p>
    <p><strong>Languages:</strong>  {{monster.languages}}</p>
    <p><strong>Challenge:</strong>  {{monster.challenge_rating}} ({{getXPFromCR(monster.challenge_rating)}} XP)</p>

    <div class="separator"></div>

    <p class="sub-title title-footer">Actions</p>
    <div v-for="action in monster.actions" :key="action.name">
      <p class="action-text"><strong>{{action.name}}.</strong> {{action.desc}}</p>
    </div>

    <p>{{monster}}</p>
  </div>
</template>

<script>
import MonstersService from '../services/monstersService'

import Utility from '../utility'
export default {
  name: 'Monster',

  data() {
    return {
      monster: null,
      abilityData: []
    }
  },

  methods: {
    getSpeedString(speed) {
      let str = ''
      for(let key in speed){
        str += key + ': ' + speed[key]/5 + ', '
      }
      return this.removeComma(str)
    },
    getAbilityData(monster) {
      this.abilityData = []
      let row = {
        Strength: monster.strength,
        Dexterity: monster.dexterity,
        Constitution: monster.constitution,
        Intelligence: monster.intelligence,
        Wisdom: monster.wisdom,
        Charisma: monster.charisma
      }
      this.abilityData.push(row)
    },
    getSavingThrowsString(monster) {
      let str = ''
      for(let key in this.abilityData[0]){
        let ability = key.substring(0,3)
        let num = this.getModifier(monster[key.toLowerCase()])
        if(monster[key.toLowerCase()+'_save']){
          num = monster[key.toLowerCase()+'_save']
        }
        str += ability + ': ' + num + ', '
      }
      return this.removeComma(str)
    },
    getSkillsString(monster){
      let str = ''
      for(let key in monster.skills){
        str += key + ': ' + monster.skills[key] + ', '
      }
      return this.removeComma(str)
    },
    getModifier(abilityScore){
      return Math.floor((abilityScore - 10)/2)
    },
    getXPFromCR(cr){
      return Utility.getXPFromCR(cr)
    },
    removeComma(str){
      return str.substring(0, str.length - 2)
    }
  },

  created: async function() {
    this.monster = (await MonstersService.getMonster(this.$route.params.slug)).data
    this.getAbilityData(this.monster)
  },

  components: {
  }
}
</script>

<style scoped>
  .action-text {
    margin-top: 4px;
  }
</style>
