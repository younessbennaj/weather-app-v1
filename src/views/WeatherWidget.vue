<template>
    <div class="widget">
        <h2 class="widget__location"><i class="material-icons icon">location_on</i> <span class="sidebar__location-text">{{location}}</span></h2>
        <p class="widget__temp">{{temp}}<span class="widget__temp--celcius">ºC</span></p>
        <p class="widget__date">{{dateString}}</p>
    </div>
</template>

<script>
import moment from "moment";

const data = {
  coord: {
    lon: 2.35,
    lat: 48.85
  },
  weather: [
    {
      id: 804,
      main: "Clouds",
      description: "overcast clouds",
      icon: "04d"
    }
  ],
  base: "stations",
  main: {
    temp: 291.2,
    feels_like: 285.68,
    temp_min: 290.15,
    temp_max: 292.59,
    pressure: 999,
    humidity: 67
  },
  visibility: 10000,
  wind: {
    speed: 8.7,
    deg: 170,
    gust: 14.9
  },
  clouds: {
    all: 100
  },
  dt: 1603269927,
  sys: {
    type: 1,
    id: 6550,
    country: "FR",
    sunrise: 1603261227,
    sunset: 1603298974
  },
  timezone: 7200,
  id: 2988507,
  name: "Paris",
  cod: 200
};

// function kelvinToCelcius(temp) {
//   return Math.floor(temp - 273.15);
// }

const town = data.name;

let dateString = moment.unix(data.dt);
dateString = dateString.locale("fr").format("LL");

// const temp = kelvinToCelcius(data.main.temp);

export default {
  props: ["city", "temperature"],
  watch: {
    city: function(newVal, oldVal) {
      console.log(newVal, oldVal);
      this.location = newVal;
    }
  },
  data() {
    return {
      temp: this.temperature,
      dateString,
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

