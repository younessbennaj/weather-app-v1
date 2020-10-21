<template>
  <div class="container">
    <section class="sidebar">
      <h2 class="sidebar__location"><i class="material-icons icon">location_on</i> {{town}}</h2>
      <p class="sidebar__temp">{{temp}}<span class="sidebar__temp--celcius">ºC</span></p>
      <p class="sidebar__date">{{dateString}}</p>
    </section>
    <main class="main">

    </main>
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

function kelvinToCelcius(temp) {
  return Math.floor(temp - 273.15);
}

const town = data.name;

let dateString = moment.unix(data.dt);
dateString = dateString.locale("fr").format("LL");

const temp = kelvinToCelcius(data.main.temp);

export default {
  data() {
    return {
      temp,
      dateString,
      town
    };
  }
};
</script>

<style lang="scss" scoped>
$light-grey: #88869d;
$grey: #e7e7eb;

.container {
  box-sizing: border-box;
  overflow: auto;
  height: 100vh;
  width: 100vw;
  background-color: #1e213a;
  color: $grey;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
}

.main {
  grid-column-start: 5;
  grid-column-end: -1;
  background: #100e1d;
}

.sidebar {
  grid-column-start: 1;
  grid-column-end: 5;
  display: flex;
  align-items: center;
  /* justify-content: space-around; */
  flex-direction: column;

  &__location {
    font-weight: 600;
    font-size: 18px;
    line-height: 21px;
    color: $light-grey;

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