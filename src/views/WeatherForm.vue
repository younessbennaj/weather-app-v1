<template>
    <form class="form">
        <select v-model="location" class="form__select" name="location" id="location">
          <option v-for="city in cities" :key="city" v-bind:value="city">{{city}}</option>
        </select>
        <!-- <input class="form__input" type="text" placeholder="search location"> -->
        <input class="form__button" type="submit" value="Search" v-on:click="(e) => refreshCurrentWeather(e, location)">
      </form>
</template>

<script>
const cities = ["nice", "lyon", "paris"];
export default {
  props: ["city", "updateLocation"],
  data() {
    return {
      cities,
      location: this.city,
      refreshCurrentWeather: this.updateLocation
    };
  }
};
</script>

<style lang="scss" scoped>
$light-grey: #88869d;
$grey: #e7e7eb;

.form {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding-top: 40px;

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
      text-transform: uppercase;
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
</style>


