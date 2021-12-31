<template lang="">
  <el-card class="box-card" >
    <div style="display: flex; justify-content: space-between"> 
      <div>
        <h1 style="font-size:20px">All private wan routers</h1>
      </div>
      <div>
        <el-input
          placeholder="Type something"
          prefix-icon="el-icon-search"
          v-model="input"
          @input="searchData">
        </el-input>
      </div>
    </div>
    
    <el-table
      :data="tableData.results"
       @sort-change="handleSortChange"
      style="width: 100%"
      border
      v-loading="loading"
    >
      <el-table-column prop="id" label="ID" sortable="custom"  width="100">
      </el-table-column>
      <el-table-column prop="name" label="Name" sortable width="120">
      </el-table-column>
      <el-table-column
        prop="routing_group.display_name"
        label="Routing group"
        sortable
        width="200"
      >
      </el-table-column>
      <el-table-column prop="ip" label="IP" sortable="custom"  width="150">
      </el-table-column>
      <el-table-column prop="ipv6" label="IPv6" sortable="custom"  width="200">
      </el-table-column>
      <el-table-column prop="version" label="Version" sortable="custom"  width="100">
      </el-table-column>
      <el-table-column prop="status" label="Status" sortable="custom"  width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.status === 'up'" style="color:green; font-size:18px">
            <i class="el-icon-open"></i>
          </span>
          <div v-if="scope.row.status === 'unknown'" style="color:red; font-size:20px" >
            <i class="el-icon-turn-off"></i>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Actions" width="180">
        <template slot-scope="scope">
          <router-link :to="{ name: 'Details', params: { id: scope.row.id }}">
            <el-button
            type="primary"
            plain
            circle
            icon="el-icon-info"
            @click="getId(scope.row.id)"
          ></el-button>
          </router-link>
         </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange" :total="this.tableData.count" style=" float:right">
    </el-pagination>
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
      page:1,
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
        this.loading= false;       
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    getId(id) {
      console.log(id);
    },
    handleCurrentChange(val){
      this.loading= true;
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
          this.loading= false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    searchData(){
      this.loading= true;
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
          this.loading= false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleSortChange( prop ){
      this.loading= true;
      if(prop.order =="ascending"){
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
            this.loading= false;
          })
          .catch((error) => {
            console.log(error);
          });
      }
      else{
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
            this.loading= false;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  },
};
</script>
<style lang=""></style>
