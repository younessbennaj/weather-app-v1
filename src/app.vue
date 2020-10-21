<template>
  <div class="example">{{ data.name }}</div>
</template>

<script>
export default {
  data () {
    return {
      data: {
    "coord": {
        "lon": 2.35,
        "lat": 48.85
    },
    "weather": [
        {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04d"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 291.2,
        "feels_like": 285.68,
        "temp_min": 290.15,
        "temp_max": 292.59,
        "pressure": 999,
        "humidity": 67
    },
    "visibility": 10000,
    "wind": {
        "speed": 8.7,
        "deg": 170,
        "gust": 14.9
    },
    "clouds": {
        "all": 100
    },
    "dt": 1603269927,
    "sys": {
        "type": 1,
        "id": 6550,
        "country": "FR",
        "sunrise": 1603261227,
        "sunset": 1603298974
    },
    "timezone": 7200,
    "id": 2988507,
    "name": "Paris",
    "cod": 200
}
    }
  }
}
</script>