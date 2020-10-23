<template>
    <div>
        <h2>Forecast Chart</h2>
        <p>Chart here</p>
        <p>{{message}}</p>

        <chart-maker v-bind:params="params">
    <tr>
        <th scope="row">style.css</th> <!-- Here is the label of the row -->
        <td style="--value: 12;"> <!-- Here is the value of the row, which will be use to create the chart -->
            <span>12&nbsp;ms</span> <!-- Here is the value label of the row, which will be diplay to the user -->
        </td>
    </tr>
    <tr>
        <th scope="row">chart.css</th>
        <td style="--value: 42;">
            <span>42&nbsp;ms</span>
        </td>
    </tr>
</chart-maker>
    </div>
</template>

<script>
// export default {
//   data() {
//     return {
//       message: "Hello World"
//     };
//   }
// };

import ChartMaker from "vue-chartmaker";

export default {
  name: "ForecastChart",
  components: {
    ChartMaker
  },
  data: function() {
    return {
      message: "Hello World",
      params: {
        id: "loading-time",
        title: "Loading time",
        description: "Loading time of all css files in milliseconds",
        type: "bar",
        xMax: 100
      }
    };
  }
};
</script>

