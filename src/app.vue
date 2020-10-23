<template>
  <!-- Template need to be simple and declarative => no complex operation here -->
  <!-- => just display data to users -->
  <div class="container">
    <section class="sidebar">
      <WeatherForm v-bind:updateLocation="refreshCurrentWeather" v-bind:city="location" />
      <WeatherWidget v-bind:weather="weatherData" v-bind:city="location"/>
      <p v-if="error" class="error">{{error}}</p>
    </section>
    <main class="main">
      <router-link to="/currentWeather/lyon">Home</router-link>
      <router-link to="/forecastChart/lyon">Forecast</router-link>
      <router-view />
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

export default {
  mounted() {
    //Called the first time the component is mouted
    this.getData();
  },
  watch: {
    location: function() {
      //Each time the location is updated, when need to fetch the data from API
      this.getData();
    }
  },
  methods: {
    getData: function() {
      //this method is called when we need to retrieve the weather data
      //for a precise location
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?q=${
            this.location
          }&appid=d8226f44f17257daa0c78241180a1474`
        )
        .then(
          response => {
            //Set the new weather data to data local state
            this.data = response.data;
            this.error = null;
          },
          error => {
            this.error = "Impossible de récupérer la méteo";
          }
        );
    }
  },
  computed: {
    weatherData: function() {
      // Here, this.data is our declarative dependencies
      // Each time this.data change, weatherData is re-computed
      //NO ASYNC CODE HERE => put it in a method
      return {
        //Hold the temperature in Celcius
        temp: this.data ? formatData(this.data).temp : null,
        //Set date prop in the correct fomat fr
        date: this.data ? formatData(this.data).date : null
      };
    }
  },
  data() {
    console.log(this.$router);
    return {
      error: null,
      data: null,
      //The list of cities avaible in the select input
      cities: ["Nice", "Lyon", "Paris"],
      //initialized with the value of the city parameter in Url
      location: this.$route.params.location,
      //Set when the component is mounted
      // weatherData: null,
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

.error {
  color: red;
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