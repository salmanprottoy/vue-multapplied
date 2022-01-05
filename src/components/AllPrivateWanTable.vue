<template lang="">
  <el-card class="box-card">
    <div style="display: flex; justify-content: space-between">
      <div>
        <span style="font-size: 20px">All private wan routers</span>
      </div>
      <div>
        <el-input
          prefix-icon="el-icon-search"
          color="black"
          v-model="input"
          debounce="500"
        >
        </el-input>
      </div>
    </div>
    <div style="padding: 10px; margin: 10px">
      <el-table
        :data="tableData.results"
        @sort-change="handleSortChange"
        style="width: 100%"
        stripe
        v-loading="loading"
      >
        <el-table-column prop="id" label="ID" sortable="custom" width="150">
          <div slot-scope="scope">
            <span>
              <router-link
                :to="{ name: 'Details', params: { id: scope.row.id } }"
                style="color: inherit"
              >
                {{ scope.row.id }}
              </router-link>
            </span>
          </div>
        </el-table-column>
        <el-table-column prop="name" label="Name" sortable width="200">
          <div slot-scope="scope">
            <span>
              <router-link
                :to="{ name: 'Details', params: { id: scope.row.id } }"
                style="color: inherit"
              >
                {{ scope.row.name }}
              </router-link>
            </span>
            <span
              v-if="scope.row.debug === true"
              style="
                background-color: #75caeb;
                color: white;
                padding: 3px;
                border-radius: 8%;
                font-size: 10px;
              "
            >
              debug
            </span>
          </div>
        </el-table-column>
        <el-table-column
          prop="routing_group.display_name"
          label="Routing group"
          sortable
          width="280"
        >
          <div slot-scope="scope">
            <span>
              {{ scope.row.routing_group.display_name }}
            </span>
            <span
              v-if="scope.row.is_primary_router === true"
              style="
                background-color: #75caeb;
                color: white;
                padding: 3px;
                border-radius: 8%;
                font-size: 10px;
              "
            >
              Primary router
            </span>
          </div>
        </el-table-column>
        <el-table-column prop="ip" label="IP" sortable="custom" width="150">
        </el-table-column>
        <el-table-column prop="ipv6" label="IPv6" sortable="custom" width="200">
          <div slot-scope="scope">
            <span v-if="scope.row.ipv6 === null">
              <i class="el-icon-minus"></i>
            </span>
            <span v-else>
              {{ scope.row.ipv6 }}
            </span>
          </div>
        </el-table-column>
        <el-table-column
          prop="version"
          label="Version"
          sortable="custom"
          width="150"
        >
          <div slot-scope="scope">
            <span v-if="scope.row.version === ''"> Never online </span>
            <span v-else>
              {{ scope.row.version }}
            </span>
          </div>
        </el-table-column>
        <el-table-column prop="status" label="Status" width="150">
          <div slot-scope="scope">
            <span v-if="scope.row.status === 'up'" style="color: #67c23a">
              <font-awesome-icon icon="circle"></font-awesome-icon>
            </span>
            <div v-if="scope.row.status === 'unknown'" style="color: #ccc">
              <font-awesome-icon icon="circle"></font-awesome-icon>
            </div>
          </div>
        </el-table-column>
        <el-table-column label="Actions" width="180">
          <div>
            <el-button plain icon="el-icon-edit" size="small"></el-button>
          </div>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next, jumper"
        @current-change="handleCurrentChange"
        :total="this.tableData.count"
        style="float: right"
      >
      </el-pagination>
    </div>
  </el-card>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      tableData: [],
      loading: true,
      input: "",
      page: 1,
    };
  },
  created() {
    const url = "/api/v4/private_wan_routers/?page_size=10";
    const token = "ZWtyYW1AdzNlbmdpbmVlcnMuY29tOm11bHRpQDNtMG4=";
    axios
      .get(url, {
        headers: {
          Authorization: `Basic ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        this.tableData = response.data;
        this.loading = false;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  watch: {
    input: function (value) {
      this.loading = true;
      const url = `/api/v4/private_wan_routers/?page_size=10&search=${value}`;
      const token = "ZWtyYW1AdzNlbmdpbmVlcnMuY29tOm11bHRpQDNtMG4=";
      axios
        .get(url, {
          headers: {
            Authorization: `Basic ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          this.tableData = response.data;
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  methods: {
    handleCurrentChange(val) {
      this.loading = true;
      const url = `/api/v4/private_wan_routers/?page=${val}&page_size=10&search=${this.input}`;
      const token = "ZWtyYW1AdzNlbmdpbmVlcnMuY29tOm11bHRpQDNtMG4=";
      axios
        .get(url, {
          headers: {
            Authorization: `Basic ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          this.tableData = response.data;
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    searchData() {
      this.loading = true;
      const url = `/api/v4/private_wan_routers/?page_size=10&search=${this.input}`;
      const token = "ZWtyYW1AdzNlbmdpbmVlcnMuY29tOm11bHRpQDNtMG4=";
      axios
        .get(url, {
          headers: {
            Authorization: `Basic ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          this.tableData = response.data;
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleSortChange(prop) {
      this.loading = true;
      if (prop.order == "ascending") {
        const url = `/api/v4/private_wan_routers/?page_size=10&search=${this.input}&ordering=${prop.prop}`;
        const token = "ZWtyYW1AdzNlbmdpbmVlcnMuY29tOm11bHRpQDNtMG4=";
        axios
          .get(url, {
            headers: {
              Authorization: `Basic ${token}`,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            this.tableData = response.data;
            this.loading = false;
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        const url = `/api/v4/private_wan_routers/?page_size=10&search=${this.input}&ordering=-${prop.prop}`;
        const token = "ZWtyYW1AdzNlbmdpbmVlcnMuY29tOm11bHRpQDNtMG4=";
        axios
          .get(url, {
            headers: {
              Authorization: `Basic ${token}`,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            this.tableData = response.data;
            this.loading = false;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>
<style lang="scss">
.el-input__icon {
  color: black;
}
.el-table__fixed,
.el-table__fixed-right {
  box-shadow: none;
}
</style>
