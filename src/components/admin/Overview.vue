<template>
  <div class="overview">
    <div class="container h-100">
      <div class="intro h-100">
        <div class="row h-100 align-items-center">
          <div class="col-md-6">
            <h1>{{ $t('adminPage.overview.title') }}</h1>
            <p>{{ $t('adminPage.overview.text') }}</p>
          </div>
          <div class="col-md-6">
              <img src="@/assets/img/overview.svg" class="img-fluid" alt="overview image">
          </div>
        </div>
      </div>
    </div>
    
      <apexchart width="500" type="area" :options="options" :series="series"></apexchart>

    <b-alert show variant="info mt-2">
    <h4 class="alert-heading"><i class="fas fa-exclamation-triangle"></i> {{ $t('alerts.graph-construction.title') }}</h4>
    <hr>
    <p>
      {{ $t('alerts.graph-construction.body') }}
    </p>
    <p class="mb-0">
      {{ $t('alerts.graph-construction.p') }}
    </p>
  </b-alert>

  </div>
</template>
<script>
import { db, fbAuth } from '@/assets/js/firebase';
import {
        mapGetters,
        mapState
    } from 'vuex';
export default {
  data () {
    return {
      products: [],
      options: {
        chart:  {
          id: 'vuechart-example',
          background: 'lightgrey',
          stacked: true,
          events: {
            beforeMount: () => {
              // calculation of number of users each month
              let months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
              setTimeout(() => {
                if (this.users) {
                  const counts = months.map(month => {
                    let count = 0;
                      for (const user of this.users) {
                        if (user.metadata.creationTime.toLowerCase().includes(month)) {
                          ++count
                      }
                    }
                      return count
                  })
                  // updating chart data
                    this.series = [{
                      data: counts
                    }]
                  console.log(this.series)
                }
              }, 1000)
            }
          },
        },
        xaxis: {
          categories: ['jan', 'feb', 'mar', 'apr', 'may', 'Jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
          text: 'month'
        },
        yaxis: {
            title: {
              text: 'users'
            },
            // min: 5,
            // max: 40
          },
          legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5
          }
      },
      series: [{
        name: 'new users',
        data: [0, 0, 0, 0, 0]
        // data: this.calculated
      }]
    }
  },
  methods: {
    // updateChart() {
    //    const newData = this.calculated
    //    this.series = [{
    //      data: newData
    //    }]
    // }
  },
  computed: 
    mapState({ users: state => state.users }),
    calculatedData() {
      
    },
  created() {
    db.collection("products").onSnapshot(snapShot => {
            snapShot.forEach(doc => {
                this.products.push(doc.data())
            });
        });

    this.$store.dispatch('listAllUsers')
  }
}

</script>
