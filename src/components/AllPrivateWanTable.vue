<template lang="">
  <el-card class="box-card">
    <div
      style="display: flex; align-items: center; justify-content: space-between"
    >
      <div>
        <span style="font-size: 20px">All private wan routers</span>
      </div>
      <div>
        <div style="display: flex; justify-content: space-between">
          <div style="margin-right: 3px">
            <el-input
              prefix-icon="el-icon-search"
              color="#333333"
              v-model="input"
              debounce="500"
            >
            </el-input>
          </div>
          <div style="margin-left: 3px">
            <el-cascader
              style="color: black"
              placeholder="Table Options"
              :options="options"
            >
            </el-cascader>
          </div>
        </div>
      </div>
    </div>
    <div style="padding: 10px; margin: 10px">
      <el-table
        :header-cell-style="{ color: '#333333' }"
        :data="tableData.results"
        @sort-change="handleSortChange"
        style="width: auto"
        v-loading="loading"
      >
        <el-table-column
          prop="id"
          label="ID"
          sortable="custom"
          min-width="80"
          width="auto"
        >
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
        <el-table-column
          prop="name"
          label="Name"
          sortable
          min-width="100"
          width="auto"
        >
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
          min-width="180"
          width="auto"
        >
          <div slot-scope="scope">
            <span>
              {{ scope.row.routing_group.display_name }}
            </span>
            <el-tooltip class="item" effect="light" placement="top-start">
              <div slot="content">
                Last updated:
                {{
                  new Date(scope.row.is_primary_router_updated).toDateString()
                }}
              </div>
              <span
                v-if="
                  scope.row.is_primary_router === true ||
                  scope.row.is_primary_router_updated !== null
                "
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
            </el-tooltip>
          </div>
        </el-table-column>
        <el-table-column
          prop="ip"
          label="IP"
          sortable="custom"
          min-width="100"
          width="auto"
        >
        </el-table-column>
        <el-table-column
          prop="ipv6"
          label="IPv6"
          sortable="custom"
          min-width="120"
          width="auto"
        >
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
          min-width="120"
          width="auto"
        >
          <div slot-scope="scope">
            <span v-if="scope.row.version === ''"> Never online </span>
            <span v-else>
              {{ scope.row.version }}
            </span>
          </div>
        </el-table-column>
        <el-table-column prop="status" label="Status" width="auto">
          <div slot-scope="scope">
            <el-tooltip class="item" effect="dark" placement="top">
              <div slot="content">
                Management Vpn:
                <br />
                <br />
                {{ scope.row.openvpn_ipv6 }}
                <br />
                <br />
                {{ scope.row.openvpn_ip }}
                <br />
                <br />
              </div>
              <span v-if="scope.row.status === 'up'" style="color: #67c23a">
                <font-awesome-icon icon="circle"></font-awesome-icon>
              </span>
              <span v-if="scope.row.status === 'down'" style="color: #ff4949">
                <font-awesome-icon icon="circle"></font-awesome-icon>
              </span>
              <span v-if="scope.row.status === 'unknown'" style="color: #ccc">
                <font-awesome-icon icon="circle"></font-awesome-icon>
              </span>
            </el-tooltip>
          </div>
        </el-table-column>
        <el-table-column label="Actions" width="auto">
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
      options: [
        {
          value: "10records",
          label: "Show 10 records",
        },
        {
          value: "25records",
          label: "Show 25 records",
        },
        {
          value: "50records",
          label: "Show 50 records",
        },
        {
          value: "100records",
          label: "Show 100 records",
        },
      ],
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
      .catch((error) => {});
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
        .catch((error) => {});
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
        .catch((error) => {});
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
        .catch((error) => {});
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
          .catch((error) => {});
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
          .catch((error) => {});
      }
    },
  },
};
</script>
<style lang="scss">
.el-input__icon {
  color: black;
}

.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #ececec !important;
}

.el-table__row:nth-child(2n-1) {
  background: #f0f7ff;
}
::placeholder {
  color: black !important;
}
</style>
