<template>
  <el-row>
    <el-col :xs="0" :sm="8" :md="5" :lg="4" :xl="4">
      <div class="grid-content">
        <Sidebar></Sidebar>
      </div>
    </el-col>
    <el-col :xs="24" :sm="16" :md="19" :lg="20" :xl="20">
      <div class="grid-content">
        <TopNavbar></TopNavbar>
        <AllPrivateWanTable></AllPrivateWanTable>
      </div>
    </el-col>
  </el-row>
</template>

<script>
// @ is an alias to /src
import Sidebar from "@/components/Sidebar.vue";
import TopNavbar from "@/components/TopNavbar.vue";
export default {
  name: "Home",
  components: {
    Sidebar,
    TopNavbar,
  },
};
</script>
