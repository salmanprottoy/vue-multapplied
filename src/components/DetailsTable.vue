<template lang="">
  <el-card class="box-card" v-loading="loading">
    <div slot="header" class="clearfix">
      <router-link to="/" style="text-decoration: none; color: inherit">
        <el-button
          type="primary"
          icon="el-icon-arrow-left"
          size="medium"
          plain
          round
          >Back</el-button
        >
      </router-link>
      <span style="padding: 0 5%; font-size: 30px">{{ tableData.name }} </span>
    </div>
    <div
      class="text item"
      style="
        font-size: 16px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      "
      v-if="tableData"
    >
      <h2>
        Private WAN router ID : <span> {{ tableData.id }} </span>
      </h2>
      <h2>
        Name :
        <span>
          {{ tableData.name }}
        </span>
      </h2>
      <h2>
        IP :
        <span>
          {{ tableData.ip }}
        </span>
      </h2>
      <h2>
        IPv6 :
        <span>
          {{ tableData.ipv6 }}
        </span>
      </h2>
      <h2>
        Routing group :
        <span>
          {{ tableData.routing_group.display_name }}
        </span>
      </h2>
      <h2>
        Management VPN IPV4 :
        <span>
          {{ tableData.openvpn_ip }}
        </span>
      </h2>
      <h2>
        Management VPN IPV6 :
        <span>
          {{ tableData.openvpn_ipv6 }}
        </span>
      </h2>
      <h2>
        Management VPN Server :
        <span>
          {{ tableData.openvpn_server }}
        </span>
      </h2>
    </div>
    <div v-else>
      <el-empty> No data found! </el-empty>
    </div>
  </el-card>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      id: this.$route.params.id,
      tableData: [],
      loading: true,
    };
  },
  created() {
    const url = `/api/v4/private_wan_routers/${this.id}`;
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
        console.log(this.tableData);
      })
      .catch((error) => {
        if (error.response.status == "404") {
          console.log("data not found");
        }
      });
  },
};
</script>

<style lang=""></style>
