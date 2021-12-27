<template>
  <el-row>
      <el-col :span="4">
        <Sidebar></Sidebar>
      </el-col>
      <el-col :span="20">
        <TopNavbar></TopNavbar>
      </el-col>
  </el-row>
</template>

<script>
// @ is an alias to /src
import Sidebar from "@/components/Sidebar.vue";
import TopNavbar from '@/components/TopNavbar.vue';

export default {
  name: "Dashboard",
  components: {
    Sidebar,
    TopNavbar
    
  },
};
</script>
