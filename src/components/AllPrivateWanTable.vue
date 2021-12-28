<template lang="">
  <el-card class="box-card">
    <h2>All private wan routers</h2>
    <el-table
      ref="filterTable"
      :data="tableData"
      :default-sort="{
        prop: 'id',
        order: 'descending',
        prop: 'name',
        order: 'desending',
        prop: 'routing_group',
        order: 'desending',
        prop: 'ip',
        order: 'desending',
        prop: 'ipv6',
        order: 'desending',
        prop: 'version',
        order: 'desending',
        prop: 'status',
        order: 'desending',
        prop: 'actions',
        order: 'desending',
      }"
      style="width: 100%"
    >
      <el-table-column prop="id" label="ID" sortable width="180">
      </el-table-column>
      <el-table-column prop="name" label="Name" sortable width="180">
      </el-table-column>
      <el-table-column
        prop="routing_group.display_name"
        label="Routing group"
        sortable
        width="180"
      >
      </el-table-column>
      <el-table-column prop="ip" label="IP" sortable width="180">
      </el-table-column>
      <el-table-column prop="ipv6" label="IPv6" sortable width="180">
      </el-table-column>
      <el-table-column prop="version" label="Version" sortable width="180">
      </el-table-column>
      <el-table-column prop="status" label="Status" sortable width="180">
      </el-table-column>
      <el-table-column prop="id" label="Actions" width="180">
        <el-button
          type="primary"
          plain
          circle
          icon="el-icon-info"
          @click="getId(id)"
        ></el-button>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="1000" style="width: 100%">
    </el-pagination>
  </el-card>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    const url = "/api/v4/private_wan_routers/";
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
        console.log(this.tableData);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    getId(id) {
      console.log(id);
    },
  },
};
</script>
<style lang=""></style>
