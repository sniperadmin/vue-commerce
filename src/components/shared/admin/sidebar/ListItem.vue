<template>
  <li class="sidebar">
  <router-link :to="url">
    <i :class="`fa fa-${iconName}`"></i>
    <span class="menu-text mx-2">{{ buttonName }}</span>
    <mdb-badge v-if="underConstruction" color="grey darken-3">{{ $t('alerts.graph-construction.title') }}
    </mdb-badge>
    <span v-if="productsVal" class="badge badge-pill badge-primary">{{ productsVal }}</span>
    </router-link>
  </li>
</template>

<script>
  import { mdbBadge } from 'mdbvue';
  export default {
    name: 'ListItem',
    components: {
      mdbBadge
    },
    props: {
      url: {
        type: String,
        default: ''
      },
      iconName: {
        type: String,
        default: ''
      },
      buttonName: {
        type: String,
        default: ''
      },
      underConstruction: {
        type: Boolean,
        default: false
      },
      productsVal: {
        type: Number,
        default: 0
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>