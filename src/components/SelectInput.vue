<template>
  <div class="select-input">
    <label :for="id">{{ label }}</label>

    <select :id="id" :value="modelValue" @change="$emit('update:modelValue', $event.target.value)">
      <option
        v-for="number in options"
        :key="number"
        :value="number"
      >
        {{ number }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'SelectInput',

  props: {
    label: {
      type: String,
      required: true
    },

    id: {
      type: String,
      required: true
    },

    options: {
      type: Array,
      required: true
    },

    modelValue: {
      default: ''
    }
  },

  emits: ['update:modelValue']
}
</script>