<template>
    <div class="widget">
        <p class="widget__temp">{{temp}}<span class="widget__temp--celcius">ºC</span></p>
        <p class="widget__date">{{date}}</p>
        <h2 class="widget__location"><i class="material-icons icon">location_on</i> <span class="sidebar__location-text">{{location}}</span></h2>
    </div>
</template>

<script>
export default {
  //city: props to init the location
  props: ["city", "weather"],
  watch: {
    //Watch if the city prop change over the time
    city: function(newVal, oldVal) {
      //Set location local state to the new value of this prop
      this.location = newVal;
    },
    weather: function(newVal, oldVal) {
      this.temp = newVal.temp;
      this.date = newVal.date;
    }
  },
  data() {
    return {
      //temp local state initialized with the weather data prop object
      temp: this.weather.temp,
      //same for the date local state
      date: this.weather.date,
      //location is initialized with the city prop passed from the parent component
      location: this.city
    };
  }
};
</script>

<style lang="scss" scoped>
$light-grey: #88869d;
$grey: #e7e7eb;

.widget {
  grid-column-start: 1;
  grid-column-end: 5;
  display: flex;
  align-items: center;
  /* justify-content: space-around; */
  flex-direction: column;
  padding: 0 46px;

  &__location {
    font-weight: 600;
    font-size: 18px;
    line-height: 21px;
    color: $light-grey;

    &-text {
      text-transform: capitalize;
    }

    i {
      vertical-align: bottom;
    }
  }

  &__date {
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    color: $light-grey;
  }

  &__temp {
    font-weight: 500;
    font-size: 144px;
    line-height: 169px;

    &--celcius {
      font-size: 80px;
      color: $light-grey;
    }
  }
}
</style>

