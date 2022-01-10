<template lang="">
  <div style="margin: 5px; padding: 5px">
    <el-row>
      <el-col :span="24">
        <el-button size="small" @click="getData('1Y')" plain>1Y</el-button>

        <el-button size="small" @click="getData('1M')" plain>1M</el-button>

        <el-button size="small" @click="getData('1W')" plain>1W</el-button>

        <el-button size="small" @click="getData('1D')" plain>1D</el-button>

        <el-button size="small" @click="getData('1H')" plain>1H</el-button>

        <el-button size="small" @click="getData('15M')" plain>15M</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div v-loading="loading">
          <canvas id="system-chart"></canvas>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import axios from "axios";
import Chart from "chart.js/auto";
export default {
  name: "SystemChart",
  data() {
    return {
      loading: true,
      shortTerm: [],
      midTerm: [],
      lognTerm: [],
      chartData: {
        type: "line",
        data: {
          labels: [],
          datasets: [
            {
              label: "Short Term",
              data: [],
              backgroundColor: ["rgba(255, 99, 132, 0.2)"],
              borderColor: ["rgba(255, 99, 132, 1)"],
              borderWidth: 1,
            },
            {
              label: "Mid Term",
              data: [],
              backgroundColor: ["rgba(94, 99, 132, 0.2)"],
              borderColor: ["rgba(94, 99, 132, 1)"],
              borderWidth: 1,
            },
            {
              label: "Long Term",
              data: [],
              backgroundColor: ["rgba(142, 199, 132, 0.2)"],
              borderColor: ["rgba(142, 99, 132, 1)"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: false,
            },
          },
        },
      },
    };
  },
  mounted() {
    const ctx = document.getElementById("system-chart");
    //console.log(this.chartData.data.datasets[0].data);
    //console.log(this.chartData.data.datasets[1].data);
    //console.log(this.chartData.data.datasets[2].data);
    new Chart(ctx, this.chartData);
  },
  created() {
    var currentTime = new Date().getTime() / 1000;
    currentTime = parseInt(currentTime);
    var selectedTime = new Date().getTime() / 1000 - 3600 * 24;
    selectedTime = parseInt(selectedTime);
    var url = `https://ba-dev.turnium.com/metrics_api/query?db=bondingadmin&u=graph&p=5heP5GBAI5IP2rfHapKQVeHdlIJC7iryOApI2mubkAmv16zc112wLdd2&epoch=ms&q=SELECT+mean(%22shortterm%22)+FROM+%22load%22+WHERE++time+%3C+${currentTime}s+AND+time+%3E+${selectedTime}s+GROUP+BY+time(300s)+fill(null)+ORDER+BY+time+ASC%3BSELECT+mean(%22midterm%22)+FROM+%22load%22+WHERE++time+%3C+${currentTime}s+AND+time+%3E+${selectedTime}s+GROUP+BY+time(300s)+fill(null)+ORDER+BY+time+ASC%3BSELECT+mean(%22longterm%22)+FROM+%22load%22+WHERE++time+%3C+${currentTime}s+AND+time+%3E+${selectedTime}s+GROUP+BY+time(300s)+fill(null)+ORDER+BY+time+ASC%3B#/`;

    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        this.loading = true;
        this.shortTerm = response.data.results[0].series[0].values;
        //console.log(this.shortTerm.length);
        this.midTerm = response.data.results[1].series[0].values;
        //console.log(this.midTerm.length);
        this.longTerm = response.data.results[2].series[0].values;
        //console.log(this.longTerm.length);
        this.chartData.data.labels = [];
        this.chartData.data.datasets[0].data = [];
        this.chartData.data.datasets[1].data = [];
        this.chartData.data.datasets[2].data = [];
        for (var i = 0; i < this.shortTerm.length; i++) {
          //console.log(this.shortTerm[i][1]);
          var time = this.shortTerm[i][0];
          time = new Date(time);
          this.chartData.data.labels.push(
            time.toLocaleString("en-US", { hour: "numeric", minute: "numeric" })
          );
          if (this.shortTerm[i][1] !== null) {
            this.chartData.data.datasets[0].data.push(
              this.shortTerm[i][1].toFixed(1)
            );
          } else {
            this.chartData.data.datasets[0].data.push(this.shortTerm[i][1]);
          }
        }
        for (var j = 0; j < this.midTerm.length; j++) {
          if (this.midTerm[j][1] !== null) {
            this.chartData.data.datasets[1].data.push(
              this.midTerm[j][1].toFixed(1)
            );
          } else {
            this.chartData.data.datasets[1].data.push(this.midTerm[j][1]);
          }
        }
        for (var k = 0; k < this.longTerm.length; k++) {
          if (this.longTerm[k][1] !== null) {
            this.chartData.data.datasets[2].data.push(
              this.longTerm[k][1].toFixed(1)
            );
          } else {
            this.chartData.data.datasets[2].data.push(this.longTerm[k][1]);
          }
        }
        this.loading = false;
        //console.log(this.chartData.data.datasets[1].data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    getData(val) {
      var currentTime;
      currentTime = new Date().getTime() / 1000;
      currentTime = parseInt(currentTime);
      var selectedTime;
      var timeDiff;

      if (val === "1Y") {
        selectedTime = new Date().getTime() / 1000 - 3600 * 24 * 365;
        selectedTime = parseInt(selectedTime);
        timeDiff = 900;
      } else if (val === "1M") {
        selectedTime = new Date().getTime() / 1000 - 3600 * 24 * 30;
        selectedTime = parseInt(selectedTime);
        timeDiff = 300;
      } else if (val === "1W") {
        selectedTime = new Date().getTime() / 1000 - 3600 * 24 * 7;
        selectedTime = parseInt(selectedTime);
        timeDiff = 120;
      } else if (val === "1D") {
        selectedTime = new Date().getTime() / 1000 - 3600 * 24;
        selectedTime = parseInt(selectedTime);
        timeDiff = 90;
      } else if (val === "1H") {
        selectedTime = new Date().getTime() / 1000 - 3600;
        selectedTime = parseInt(selectedTime);
        timeDiff = 10;
      } else if (val === "15M") {
        selectedTime = new Date().getTime() / 1000 - 60 * 15;
        selectedTime = parseInt(selectedTime);
        timeDiff = 10;
      }
      var url = `https://ba-dev.turnium.com/metrics_api/query?db=bondingadmin&u=graph&p=5heP5GBAI5IP2rfHapKQVeHdlIJC7iryOApI2mubkAmv16zc112wLdd2&epoch=ms&q=SELECT+mean(%22shortterm%22)+FROM+%22load%22+WHERE++time+%3C+${currentTime}s+AND+time+%3E+${selectedTime}s+GROUP+BY+time(${timeDiff}s)+fill(null)+ORDER+BY+time+ASC%3BSELECT+mean(%22midterm%22)+FROM+%22load%22+WHERE++time+%3C+${currentTime}s+AND+time+%3E+${selectedTime}s+GROUP+BY+time(${timeDiff}s)+fill(null)+ORDER+BY+time+ASC%3BSELECT+mean(%22longterm%22)+FROM+%22load%22+WHERE++time+%3C+${currentTime}s+AND+time+%3E+${selectedTime}s+GROUP+BY+time(${timeDiff}s)+fill(null)+ORDER+BY+time+ASC%3B#/`;

      axios
        .get(url, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          this.loading = true;
          this.shortTerm = response.data.results[0].series[0].values;
          //console.log(this.shortTerm.length);
          this.midTerm = response.data.results[1].series[0].values;
          //console.log(this.midTerm.length);
          this.longTerm = response.data.results[2].series[0].values;
          //console.log(this.longTerm.length);
          this.chartData.data.labels = [];
          this.chartData.data.datasets[0].data = [];
          this.chartData.data.datasets[1].data = [];
          this.chartData.data.datasets[2].data = [];
          for (var i = 0; i < this.shortTerm.length; i++) {
            //console.log(this.shortTerm[i][1]);
            var time = this.shortTerm[i][0];
            time = new Date(time);
            this.chartData.data.labels.push(
              time.toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
              })
            );
            if (this.shortTerm[i][1] !== null) {
              this.chartData.data.datasets[0].data.push(
                this.shortTerm[i][1].toFixed(1)
              );
            } else {
              this.chartData.data.datasets[0].data.push(this.shortTerm[i][1]);
            }
          }
          for (var j = 0; j < this.midTerm.length; j++) {
            if (this.midTerm[j][1] !== null) {
              this.chartData.data.datasets[1].data.push(
                this.midTerm[j][1].toFixed(1)
              );
            } else {
              this.chartData.data.datasets[1].data.push(this.midTerm[j][1]);
            }
          }
          for (var k = 0; k < this.longTerm.length; k++) {
            if (this.longTerm[k][1] !== null) {
              this.chartData.data.datasets[2].data.push(
                this.longTerm[k][1].toFixed(1)
              );
            } else {
              this.chartData.data.datasets[2].data.push(this.longTerm[k][1]);
            }
          }
          this.loading = false;
          //console.log(this.chartData.data.datasets[1].data);
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
  },
};
</script>
<style lang=""></style>
