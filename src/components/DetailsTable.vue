<template lang="">
  <el-container>
    <el-card class="box-card" v-loading="loading">
      <h2>
        Private WAN router ID : <span> {{ tableData.id }}</span>
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
          {{ tableData.ip6 }}
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
    </el-card>
  </el-container>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      tableData: [],
      id: this.$route.params.id,
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
        console.log(error);
      });
  },
};
</script>

<style lang=""></style>
