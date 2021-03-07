<template>
  <div class="" v-if="monster">
    <p class="bold main-title">{{monster.name}}</p>
    <p class="bold">{{monster.size}}, {{monster.type}}</p>

    <div class="separator"></div>

    <p class="text"><strong class="bold">Armor Class:</strong>  {{monster.armor_class}}</p>
    <p class="text"><strong class="bold">Hit Points:</strong>  {{monster.hit_points}}</p>
    <p class="text"><strong class="bold">Speed:</strong>  {{getSpeedString(monster.speed)}}</p>

    <div class="separator"></div>

    <b-table
      :data="abilityData">
      <b-table-column field="Strength" label="STR" v-slot="props" centered>
        <span class="bold">
          {{props.row.Strength}} ({{getModifier(props.row.Strength)}})
        </span>
      </b-table-column>
      <b-table-column field="Dexterity" label="DEX" v-slot="props" centered>
        <span class="bold">
          {{props.row.Dexterity}} ({{getModifier(props.row.Dexterity)}})
        </span>
      </b-table-column>
      <b-table-column field="Constitution" label="CON" v-slot="props" centered>
        <span class="bold">
          {{props.row.Constitution}} ({{getModifier(props.row.Constitution)}})
        </span>
      </b-table-column>
      <b-table-column field="Intelligence" label="INT" v-slot="props" centered>
        <span class="bold">
          {{props.row.Intelligence}} ({{getModifier(props.row.Intelligence)}})
        </span>
      </b-table-column>
      <b-table-column field="Wisdom" label="WIS" v-slot="props" centered>
        <span class="bold">
          {{props.row.Wisdom}} ({{getModifier(props.row.Wisdom)}})
        </span>
      </b-table-column>
      <b-table-column field="Charisma" label="CHA" v-slot="props" centered>
        <span class="bold">
          {{props.row.Charisma}} ({{getModifier(props.row.Charisma)}})
        </span>
      </b-table-column>
    </b-table>

    <div class="separator"></div>

    <p class="text"><strong class="bold">Saving throws:</strong> {{getSavingThrowsString(monster)}}</p>
    <p class="text"><strong class="bold">Skills:</strong>  {{getSkillsString(monster)}}</p>
    <p class="text"><strong class="bold">Damage Resistances:</strong>  {{monster.damage_resistances}}</p>
    <p class="text"><strong class="bold">Damage Immunities:</strong>  {{monster.damage_immunities}}</p>
    <p class="text"><strong class="bold">Senses:</strong>  {{monster.senses}}</p>
    <p class="text"><strong class="bold">Languages:</strong>  {{monster.languages}}</p>
    <p class="text"><strong class="bold">Challenge:</strong>  {{monster.challenge_rating}} ({{getXPFromCR(monster.challenge_rating)}} XP)</p>

    <div class="separator"></div>

    <p class="sub-title title-footer bold">Actions</p>
    <div v-for="action in monster.actions" :key="action.name">
      <p class="action-text text"><strong class="bold">{{action.name}}.</strong> {{action.desc}}</p>
    </div>

    <p>{{monster}}</p>
  </div>
</template>

<script>
import Utility from '../utility'
export default {
  name: 'Monster',

  data() {
    return {
      abilityData: []
    }
  },

  props: {
    monster: Object
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

  created: function() {
    this.getAbilityData(this.monster)
  },

  components: {
  }
}
</script>

<style scoped lang="scss">
@import '../sass/myvars.scss';

  .action-text {
    margin-top: 4px;
  }

  .background {
    background-color: $tertiary;
  }
</style>
