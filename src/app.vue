<template>
  <!-- Template need to be simple and declarative => no complex operation here -->
  <!-- => just display data to users -->
  <div class="container">
    <section class="sidebar">
      <!-- <router-link to="/">Home</router-link>
      <router-link to="about">About</router-link>
      <router-view /> -->
      <WeatherForm v-bind:updateLocation="refreshCurrentWeather" v-bind:city="location" />
      <WeatherWidget v-bind:weather="weatherData" v-bind:city="location"/>
    </section>
    <main class="main">

    </main>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";
import WeatherForm from "./views/WeatherForm.vue";
import WeatherWidget from "./views/WeatherWidget.vue";

//Convert Kelvin in Celcius, needed due to the api return temperature in Kelvin
function kelvinToCelcius(temp) {
  return Math.floor(temp - 273.15);
}

//Convert unix timestamp to fr date
function unixToFrDate(date) {
  let dateString = moment.unix(date);
  return dateString.locale("fr").format("LL");
}

function formatData(data) {
  return {
    town: data.name,
    date: unixToFrDate(data.dt),
    temp: kelvinToCelcius(data.main.temp)
  };
}

let getWeatherData = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        "http://api.openweathermap.org/data/2.5/weather?q=paris&appid=d8226f44f17257daa0c78241180a1474"
      )
      .then(response => {
        const date = formatData(response.data).date;
        const temp = formatData(response.data).temp;
        const cities = ["Nice", "Lyon", "Paris"];

        resolve({
          date,
          temp,
          cities
        });
      });
  });
};

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

// let dateString = moment.unix(data.dt);
// dateString = dateString.locale("fr").format("LL");

// const temp = kelvinToCelcius(data.main.temp);

// const cities = ["Nice", "Lyon", "Paris"];

export default {
  mounted() {
    //The component instance is mounted and accessible in the DOM tree
    axios
      .get(
        "http://api.openweathermap.org/data/2.5/weather?q=paris&appid=d8226f44f17257daa0c78241180a1474"
      )
      .then(response => {
        //Parse our response to return data in correct format for the view
        this.weatherData = {
          //Hold the temperature in Celcius
          temp: formatData(response.data).temp,
          //Set date prop in the correct fomat fr
          date: formatData(response.data).date
        };
      });
  },
  // methods: {
  //   // a computed getter
  //   getData: function() {
  //     console.log("called");
  //     var vm = this;
  //     axios
  //       .get(
  //         "http://api.openweathermap.org/data/2.5/weather?q=paris&appid=d8226f44f17257daa0c78241180a1474"
  //       )
  //       .then(function(response) {
  //         vm.date = formatData(response.data).date;
  //         vm.temp = formatData(response.data).temp;
  //         vm.cities = ["Nice", "Lyon", "Paris"];
  //       });
  //   }
  // },
  data() {
    return {
      //The list of cities avaible in the select input
      cities: ["Nice", "Lyon", "Paris"],
      //initialized with the value of the city parameter in Url
      location: this.$route.params.location,
      //Set when the component is mounted
      weatherData: null,
      refreshCurrentWeather: (e, location) => {
        e.preventDefault();
        this.temp = Math.floor(Math.random() * 40);
        this.location = location;
      }
    };
  },
  components: {
    WeatherForm,
    WeatherWidget
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