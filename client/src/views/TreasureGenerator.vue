<template>
  <div class="view">
    <p>Treasure generator</p>

    <b-field label="CR rating">
        <b-select v-model="cr">
            <option
                v-for="option in data"
                :value="option"
                :key="option">
                {{ option }}
            </option>
        </b-select>

        <b-button>Generate</b-button>
    </b-field>

  </div>
</template>

<script>
export default {
  name: 'Treasure generator',

  data() {
    return {
      data: [0.25, 0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      cr: 2
    }
  },

  components: {
  }
}
</script>
