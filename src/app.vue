<template>
  <div class="container">
    <section class="sidebar">
      <form class="form">
        <select v-model="location" class="form__select" name="location" id="location">
          <!-- <option value="nice">Nice</option>
          <option value="lyon">Lyon</option>
          <option value="paris">Paris</option> -->
          <option v-for="city in cities" :key="city" value="nice">{{city}}</option>
        </select>
        <!-- <input class="form__input" type="text" placeholder="search location"> -->
        <input class="form__button" type="submit" value="Search" v-on:click="refreshCurrentWeather">
      </form>
      <h2 class="sidebar__location"><i class="material-icons icon">location_on</i> <span class="sidebar__location-text">{{location}}</span></h2>
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

const cities = ["Nice", "Lyon", "Paris"];

export default {
  data() {
    return {
      location: "paris",
      temp,
      dateString,
      cities,
      refreshCurrentWeather: e => {
        e.preventDefault();
        this.temp = Math.floor(Math.random() * 40);
      }
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

.form {
  width: 100%;
  display: flex;
  justify-content: flex-start;

  &__select {
    display: inline-block;
    width: 70%;
    height: 64px;
    border: 1px solid #616475;
    padding-left: 12px;
    font-size: 16px;
    background: #1e213a;
    color: $grey;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;

    option {
      height: 64px;
    }
  }

  &__button {
    height: 64px;
    width: 30%;
    font-size: 16px;
    background-color: #3c47e9;
    border: 1px solid #3c47e9;
    color: $grey;
    cursor: pointer;
  }
}

.sidebar {
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