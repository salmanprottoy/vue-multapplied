<template lang="">
  <div style="margin: 5px; padding: 5px">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <span style="color: black">Timeframe </span>

          <el-button size="small" @click="getData('1Y')" plain>1Y</el-button>

          <el-button size="small" @click="getData('1M')" plain>1M</el-button>

          <el-button size="small" @click="getData('1W')" plain>1W</el-button>

          <el-button size="small" @click="getData('1D')" plain>1D</el-button>

          <el-button size="small" @click="getData('6H')" plain>6H</el-button>

          <el-button size="small" @click="getData('1H')" plain>1H</el-button>

          <el-button size="small" @click="getData('15M')" plain>15M</el-button>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card lass="box-card" v-loading="loading">
          <canvas id="system-chart"></canvas>
        </el-card>
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
              label: " 1 m",
              data: [],
              fill: false,
              tension: 0.5,
              backgroundColor: ["rgba(237, 194, 64, 0.2)"],
              borderColor: ["rgba(237, 194, 64, 1)"],
            },
            {
              label: " 5 m",
              data: [],
              fill: false,
              tension: 0.5,
              backgroundColor: ["rgba(148, 64, 237, 0.2)"],
              borderColor: ["rgba(148, 64, 237, 1)"],
            },
            {
              label: " 15 m",
              data: [],
              fill: false,
              tension: 0.5,
              backgroundColor: ["rgba(175, 216, 248, 0.2)"],
              borderColor: ["rgba(175, 216, 248, 1)"],
            },
          ],
        },
        options: {
          responsive: true,
          interaction: {
            mode: "index",
            intersect: false,
          },
          stacked: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            title: {
              display: true,
              text: "Load average",
              font: {
                size: 16,
                weight: "bold",
              },
            },
          },
        },
      },
    };
  },
  mounted() {
    const ctx = document.getElementById("system-chart");
    new Chart(ctx, this.chartData);
  },
  updated() {},
  created() {
    var currentTime = new Date().getTime();
    currentTime = currentTime / 1000;
    currentTime = parseInt(currentTime);
    var selectedTime = new Date().getTime() - 3600 * 24 * 1000;
    selectedTime = selectedTime / 1000;
    selectedTime = parseInt(selectedTime);
    var url = `https://ba-dev.turnium.com/metrics_api/query?db=bondingadmin&u=graph&p=5heP5GBAI5IP2rfHapKQVeHdlIJC7iryOApI2mubkAmv16zc112wLdd2&epoch=ms&q=SELECT+mean(%22shortterm%22)+FROM+%22load%22+WHERE++time+%3C+${currentTime}s+AND+time+%3E+${selectedTime}s+GROUP+BY+time(240s)+fill(null)+ORDER+BY+time+ASC%3BSELECT+mean(%22midterm%22)+FROM+%22load%22+WHERE++time+%3C+${currentTime}s+AND+time+%3E+${selectedTime}s+GROUP+BY+time(240s)+fill(null)+ORDER+BY+time+ASC%3BSELECT+mean(%22longterm%22)+FROM+%22load%22+WHERE++time+%3C+${currentTime}s+AND+time+%3E+${selectedTime}s+GROUP+BY+time(240s)+fill(null)+ORDER+BY+time+ASC%3B`;

    this.loading = true;

    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
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
              day: "numeric",
              month: "numeric",
              year: "numeric",
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
      });
  },
  methods: {
    getData(val) {
      var currentTime;
      currentTime = new Date().getTime() / 1000;
      currentTime = parseInt(currentTime);
      var selectedTime;
      var url;
      this.loading = true;

      if (val === "1Y") {
        selectedTime = new Date().getTime() - 3600 * 24 * 365 * 1000;
        selectedTime = selectedTime / 1000;
        selectedTime = parseInt(selectedTime);
        this.chartData.data.labels = [];
        this.chartData.data.datasets[0].data = [];
        this.chartData.data.datasets[1].data = [];
        this.chartData.data.datasets[2].data = [];

        url = `https://multapplied-staging.w3engineers.com/dev-api/metrics_api/query?db=bondingadmin&u=graph&p=5heP5GBAI5IP2rfHapKQVeHdlIJC7iryOApI2mubkAmv16zc112wLdd2&epoch=ms&q=SELECT+mean(%22shortterm%22)+FROM+%221h%22.%22load%22+WHERE++time+%3C+${currentTime}s+AND+time+%3E+${selectedTime}s+GROUP+BY+time(87600s)+fill(null)+ORDER+BY+time+ASC%3BSELECT+mean(%22midterm%22)+FROM+%221h%22.%22load%22+WHERE++time+%3C+${currentTime}s+AND+time+%3E+${selectedTime}s+GROUP+BY+time(87600s)+fill(null)+ORDER+BY+time+ASC%3BSELECT+mean(%22longterm%22)+FROM+%221h%22.%22load%22+WHERE++time+%3C+${currentTime}s+AND+time+%3E+${selectedTime}s+GROUP+BY+time(87600s)+fill(null)+ORDER+BY+time+ASC%3B`;

        axios
          .get(url, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            if (response.data.results[0].series)
              this.shortTerm = response.data.results[0].series[0].values;
            //console.log(this.shortTerm.length);
            if (response.data.results[1].series)
              this.midTerm = response.data.results[1].series[0].values;
            //console.log(this.midTerm.length);
            if (response.data.results[2].series)
              this.longTerm = response.data.results[2].series[0].values;
            //console.log(this.longTerm.length);

            for (var i = 0; i < this.shortTerm.length; i++) {
              //console.log(this.shortTerm[i][1]);
              var time = this.shortTerm[i][0];
              time = new Date(time);
              this.chartData.data.labels.push(
                time.toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
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
          });
      } else if (val === "1M") {
        selectedTime = new Date().getTime() - 3600 * 24 * 30 * 1000;
        selectedTime = selectedTime / 1000;
        selectedTime = parseInt(selectedTime);

        url = `https://multapplied-staging.w3engineers.com/dev-api/metrics_api/query?db=bondingadmin&u=graph&p=5heP5GBAI5IP2rfHapKQVeHdlIJC7iryOApI2mubkAmv16zc112wLdd2&epoch=ms&q=SELECT+mean(%22shortterm%22)+FROM+%221h%22.%22load%22+WHERE++time+%3C+${currentTime}s+AND+time+%3E+${selectedTime}s+GROUP+BY+time(7200s)+fill(null)+ORDER+BY+time+ASC%3BSELECT+mean(%22midterm%22)+FROM+%221h%22.%22load%22+WHERE++time+%3C+${currentTime}s+AND+time+%3E+${selectedTime}s+GROUP+BY+time(7200s)+fill(null)+ORDER+BY+time+ASC%3BSELECT+mean(%22longterm%22)+FROM+%221h%22.%22load%22+WHERE++time+%3C+${currentTime}s+AND+time+%3E+${selectedTime}s+GROUP+BY+time(7200s)+fill(null)+ORDER+BY+time+ASC%3B`;

        axios
          .get(url, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            if (response.data.results[0].series)
              this.shortTerm = response.data.results[0].series[0].values;
            //console.log(this.shortTerm.length);
            if (response.data.results[1].series)
              this.midTerm = response.data.results[1].series[0].values;
            //console.log(this.midTerm.length);
            if (response.data.results[2].series)
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
                  day: "numeric",
                  month: "short",
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
          });
      } else if (val === "1W") {
        selectedTime = new Date().getTime() - 3600 * 24 * 7 * 1000;
        selectedTime = selectedTime / 1000;
        selectedTime = parseInt(selectedTime);
        this.chartData.data.labels = [];
        this.chartData.data.datasets[0].data = [];
        this.chartData.data.datasets[1].data = [];
        this.chartData.data.datasets[2].data = [];

        url = `https://multapplied-staging.w3engineers.com/dev-api/metrics_api/query?db=bondingadmin&u=graph&p=5heP5GBAI5IP2rfHapKQVeHdlIJC7iryOApI2mubkAmv16zc112wLdd2&epoch=ms&q=SELECT+mean(%22shortterm%22)+FROM+%221m%22.%22load%22+WHERE++time+%3C+${currentTime}s+AND+time+%3E+${selectedTime}s+GROUP+BY+time(1680s)+fill(null)+ORDER+BY+time+ASC%3BSELECT+mean(%22midterm%22)+FROM+%221m%22.%22load%22+WHERE++time+%3C+${currentTime}s+AND+time+%3E+${selectedTime}s+GROUP+BY+time(1680s)+fill(null)+ORDER+BY+time+ASC%3BSELECT+mean(%22longterm%22)+FROM+%221m%22.%22load%22+WHERE++time+%3C+${currentTime}+AND+time+%3E+${selectedTime}s+GROUP+BY+time(1680s)+fill(null)+ORDER+BY+time+ASC%3B`;

        axios
          .get(url, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            if (response.data.results[0].series)
              this.shortTerm = response.data.results[0].series[0].values;
            //console.log(this.shortTerm.length);
            if (response.data.results[1].series)
              this.midTerm = response.data.results[1].series[0].values;
            //console.log(this.midTerm.length);
            if (response.data.results[2].series)
              this.longTerm = response.data.results[2].series[0].values;
            //console.log(this.longTerm.length);

            for (var i = 0; i < this.shortTerm.length; i++) {
              //console.log(this.shortTerm[i][1]);
              var time = this.shortTerm[i][0];
              time = new Date(time);
              this.chartData.data.labels.push(
                time.toLocaleString("en-US", {
                  weekday: "short",
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
          });
      } else if (val === "1D") {
        selectedTime = new Date().getTime() - 3600 * 24 * 1000;
        selectedTime = selectedTime / 1000;
        selectedTime = parseInt(selectedTime);
        this.chartData.data.labels = [];
        this.chartData.data.datasets[0].data = [];
        this.chartData.data.datasets[1].data = [];
        this.chartData.data.datasets[2].data = [];

        url = `https://ba-dev.turnium.com/metrics_api/query?db=bondingadmin&u=graph&p=5heP5GBAI5IP2rfHapKQVeHdlIJC7iryOApI2mubkAmv16zc112wLdd2&epoch=ms&q=SELECT+mean(%22shortterm%22)+FROM+%22load%22+WHERE++time+%3C+${currentTime}s+AND+time+%3E+${selectedTime}s+GROUP+BY+time(240s)+fill(null)+ORDER+BY+time+ASC%3BSELECT+mean(%22midterm%22)+FROM+%22load%22+WHERE++time+%3C+${currentTime}s+AND+time+%3E+${selectedTime}s+GROUP+BY+time(240s)+fill(null)+ORDER+BY+time+ASC%3BSELECT+mean(%22longterm%22)+FROM+%22load%22+WHERE++time+%3C+${currentTime}s+AND+time+%3E+${selectedTime}s+GROUP+BY+time(240s)+fill(null)+ORDER+BY+time+ASC%3B`;

        axios
          .get(url, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            if (response.data.results[0].series)
              this.shortTerm = response.data.results[0].series[0].values;
            //console.log(this.shortTerm.length);
            if (response.data.results[1].series)
              this.midTerm = response.data.results[1].series[0].values;
            //console.log(this.midTerm.length);
            if (response.data.results[2].series)
              this.longTerm = response.data.results[2].series[0].values;
            //console.log(this.longTerm.length);

            for (var i = 0; i < this.shortTerm.length; i++) {
              //console.log(this.shortTerm[i][1]);
              var time = this.shortTerm[i][0];
              time = new Date(time);
              this.chartData.data.labels.push(
                time.toLocaleString("en-US", {
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
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
          });
      } else if (val === "6H") {
        selectedTime = new Date().getTime() - 3600 * 6 * 1000;
        selectedTime = selectedTime / 1000;
        selectedTime = parseInt(selectedTime);
        this.chartData.data.labels = [];
        this.chartData.data.datasets[0].data = [];
        this.chartData.data.datasets[1].data = [];
        this.chartData.data.datasets[2].data = [];

        url = `https://ba-dev.turnium.com/metrics_api/query?db=bondingadmin&u=graph&p=5heP5GBAI5IP2rfHapKQVeHdlIJC7iryOApI2mubkAmv16zc112wLdd2&epoch=ms&q=SELECT+mean(%22shortterm%22)+FROM+%22load%22+WHERE++time+%3C+${currentTime}s+AND+time+%3E+${selectedTime}s+GROUP+BY+time(60s)+fill(null)+ORDER+BY+time+ASC%3BSELECT+mean(%22midterm%22)+FROM+%22load%22+WHERE++time+%3C+${currentTime}s+AND+time+%3E+${selectedTime}s+GROUP+BY+time(60s)+fill(null)+ORDER+BY+time+ASC%3BSELECT+mean(%22longterm%22)+FROM+%22load%22+WHERE++time+%3C+${currentTime}s+AND+time+%3E+${selectedTime}s+GROUP+BY+time(60s)+fill(null)+ORDER+BY+time+ASC%3B`;

        axios
          .get(url, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            if (response.data.results[0].series)
              this.shortTerm = response.data.results[0].series[0].values;
            //console.log(this.shortTerm.length);
            if (response.data.results[1].series)
              this.midTerm = response.data.results[1].series[0].values;
            //console.log(this.midTerm.length);
            if (response.data.results[2].series)
              this.longTerm = response.data.results[2].series[0].values;
            //console.log(this.longTerm.length);

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
          });
      } else if (val === "1H") {
        selectedTime = new Date().getTime() - 3600 * 1 * 1000;
        selectedTime = selectedTime / 1000;
        selectedTime = parseInt(selectedTime);
        this.chartData.data.labels = [];
        this.chartData.data.datasets[0].data = [];
        this.chartData.data.datasets[1].data = [];
        this.chartData.data.datasets[2].data = [];

        url = `https://ba-dev.turnium.com/metrics_api/query?db=bondingadmin&u=graph&p=5heP5GBAI5IP2rfHapKQVeHdlIJC7iryOApI2mubkAmv16zc112wLdd2&epoch=ms&q=SELECT+mean(%22shortterm%22)+FROM+%22load%22+WHERE++time+%3C+${currentTime}s+AND+time+%3E+${selectedTime}s+GROUP+BY+time(10s)+fill(null)+ORDER+BY+time+ASC%3BSELECT+mean(%22midterm%22)+FROM+%22load%22+WHERE++time+%3C+${currentTime}s+AND+time+%3E+${selectedTime}s+GROUP+BY+time(10s)+fill(null)+ORDER+BY+time+ASC%3BSELECT+mean(%22longterm%22)+FROM+%22load%22+WHERE++time+%3C+${currentTime}s+AND+time+%3E+${selectedTime}s+GROUP+BY+time(10s)+fill(null)+ORDER+BY+time+ASC%3B`;

        axios
          .get(url, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            if (response.data.results[0].series)
              this.shortTerm = response.data.results[0].series[0].values;
            //console.log(this.shortTerm.length);
            if (response.data.results[1].series)
              this.midTerm = response.data.results[1].series[0].values;
            //console.log(this.midTerm.length);
            if (response.data.results[2].series)
              this.longTerm = response.data.results[2].series[0].values;
            //console.log(this.longTerm.length);

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
          });
      } else if (val === "15M") {
        selectedTime = new Date().getTime() - 60 * 15 * 1000;
        selectedTime = selectedTime / 1000;
        selectedTime = parseInt(selectedTime);
        this.chartData.data.labels = [];
        this.chartData.data.datasets[0].data = [];
        this.chartData.data.datasets[1].data = [];
        this.chartData.data.datasets[2].data = [];

        url = `https://ba-dev.turnium.com/metrics_api/query?db=bondingadmin&u=graph&p=5heP5GBAI5IP2rfHapKQVeHdlIJC7iryOApI2mubkAmv16zc112wLdd2&epoch=ms&q=SELECT+mean(%22shortterm%22)+FROM+%22load%22+WHERE++time+%3C+${currentTime}s+AND+time+%3E+${selectedTime}s+GROUP+BY+time(10s)+fill(null)+ORDER+BY+time+ASC%3BSELECT+mean(%22midterm%22)+FROM+%22load%22+WHERE++time+%3C+${currentTime}s+AND+time+%3E+${selectedTime}s+GROUP+BY+time(10s)+fill(null)+ORDER+BY+time+ASC%3BSELECT+mean(%22longterm%22)+FROM+%22load%22+WHERE++time+%3C+${currentTime}s+AND+time+%3E+${selectedTime}s+GROUP+BY+time(10s)+fill(null)+ORDER+BY+time+ASC%3B`;

        axios
          .get(url, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            if (response.data.results[0].series)
              this.shortTerm = response.data.results[0].series[0].values;
            //console.log(this.shortTerm.length);
            if (response.data.results[1].series)
              this.midTerm = response.data.results[1].series[0].values;
            //console.log(this.midTerm.length);
            if (response.data.results[2].series)
              this.longTerm = response.data.results[2].series[0].values;
            //console.log(this.longTerm.length);

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
          });
      }
    },
  },
};
</script>
<style lang=""></style>
